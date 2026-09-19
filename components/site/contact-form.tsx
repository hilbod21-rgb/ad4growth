"use client";
import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Locale } from "@/lib/config";
import { tr, copy } from "@/lib/content/copy";
import { track } from "@/lib/analytics";
import { Checkbox } from "@/components/ui/checkbox";
import { inquirySchema } from "@/lib/inquiry";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
function Choice({
  name,
  label,
  options,
  initial,
}: {
  name: string;
  label: string;
  options: [string, string][];
  initial?: string;
}) {
  return (
    <label className="form-label">
      <span>{label}</span>
      <Select name={name} defaultValue={initial || options[0][0]}>
        <SelectTrigger className="form-select">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map(([v, t]) => (
            <SelectItem value={v} key={v}>
              {t}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  );
}
export function ContactForm({ lang, deliveryConfigured = false }: { lang: Locale; deliveryConfigured?: boolean }) {
  const c = copy(lang),
    query = useSearchParams();
  const service = query.get("service");
  const [services, setServices] = useState<string[]>(
    service === "chatgpt_ads"
      ? ["chatgpt_ads"]
      : service === "google_ads"
        ? ["google_ads"]
        : [],
  );
  const [state, setState] = useState<
    "idle" | "sending" | "success" | "unconfigured" | "error" | "validation"
  >("idle");
  const started = useRef(false);
  const submitting = useRef(false);
  const converted = useRef(new Set<string>());
  const [comm, setComm] = useState("email");
  const labels = tr(
    lang,
    [
      "Name",
      "Unternehmen",
      "Website",
      "E-Mail",
      "Bevorzugte Sprache",
      "Kanal",
      "Was verkaufen Sie?",
      "Zielmarkt / Region",
      "Monatliches Werbebudget",
      "Google Ads bereits aktiv?",
      "ChatGPT Ads bereits aktiv?",
      "Primäre Conversion",
      "Nachricht",
      "Bevorzugte Kommunikation",
      "Telefonnummer oder Nutzername",
    ],
    [
      "Name",
      "Company",
      "Website",
      "Email",
      "Preferred language",
      "Channel",
      "What do you sell?",
      "Target market / region",
      "Monthly media budget",
      "Google Ads already active?",
      "ChatGPT Ads already active?",
      "Primary conversion",
      "Message",
      "Preferred communication",
      "Phone number or username",
    ],
    [
      "Ім’я",
      "Компанія",
      "Сайт",
      "Електронна пошта",
      "Бажана мова",
      "Канал",
      "Що ви продаєте?",
      "Цільовий ринок / регіон",
      "Місячний рекламний бюджет",
      "Google Ads уже активні?",
      "ChatGPT Ads уже активні?",
      "Основна конверсія",
      "Повідомлення",
      "Спосіб зв’язку",
      "Номер телефону або ім’я користувача",
    ],
    [
      "Имя",
      "Компания",
      "Сайт",
      "Электронная почта",
      "Предпочтительный язык",
      "Канал",
      "Что вы продаёте?",
      "Целевой рынок / регион",
      "Месячный рекламный бюджет",
      "Google Ads уже активны?",
      "ChatGPT Ads уже активны?",
      "Основная конверсия",
      "Сообщение",
      "Способ связи",
      "Номер телефона или имя пользователя",
    ],
  );
  const field = (
    name: string,
    label: string,
    type = "text",
    required = false,
    extra: Record<string, unknown> = {},
  ) => (
    <label className="form-label">
      <span>
        {label}
        {required ? " *" : ""}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        maxLength={name === "email" ? 254 : 200}
        {...extra}
      />
    </label>
  );
  const unknown = tr(
    lang,
    "Bitte wählen",
    "Please choose",
    "Оберіть",
    "Выберите",
  );
  const yn: [string, string][] = [
    ["unknown", unknown],
    ["yes", tr(lang, "Ja", "Yes", "Так", "Да")],
    ["no", tr(lang, "Nein", "No", "Ні", "Нет")],
  ];
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = {
      ...Object.fromEntries(new FormData(e.currentTarget)),
      services,
    };
    const parsed = inquirySchema.safeParse(data);
    if (!parsed.success) {
      setState("validation");
      return;
    }
    if (submitting.current || state === "success") return;
    submitting.current = true;
    setState("sending");
    track("contact_form_attempt", {
      service: services.join(","),
      locale: lang,
      status: "attempt",
    });
    try {
      const r = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const answer = (await r.json()) as {
        ok?: boolean;
        reference?: string;
        error?: string;
      };
      if (r.ok && answer.ok && answer.reference) {
        setState("success");
        if (!converted.current.has(answer.reference)) {
          converted.current.add(answer.reference);
          track("generate_lead", {
          service: services.join(","),
          locale: lang,
          status: "accepted",
        });
        }
      } else {
        setState(answer.error === "unconfigured" ? "unconfigured" : "error");
      }
    } catch {
      setState("error");
    } finally {
      submitting.current = false;
    }
  }
  return (
    <form
      onSubmit={submit}
      onFocus={() => {
        if (!started.current) {
          started.current = true;
          track("contact_form_start", { locale: lang });
        }
      }}
      className="inquiry-form"
    >
      {!deliveryConfigured && <p className="form-notice">
        {tr(
          lang,
          "Vorschau: Der Versand ist noch nicht eingerichtet. Sie können die Anfrage ausfüllen und als Textdatei sichern; sie wird noch nicht zugestellt.",
          "Preview: delivery is not configured yet. You can complete the inquiry and save it as a text file; it will not be delivered yet.",
          "Попередня версія: надсилання ще не підключено. Заповніть запит і збережіть його як текстовий файл; його ще не буде доставлено.",
          "Предварительная версия: отправка ещё не подключена. Заполните запрос и сохраните его как текстовый файл; он пока не будет доставлен.",
        )}
      </p>}
      <div className="form-grid">
        {field("name", labels[0], "text", true, {
          minLength: 2,
          autoComplete: "name",
        })}
        {field("email", labels[3], "email", true, { autoComplete: "email" })}
        {field("company", labels[1], "text", false, {
          autoComplete: "organization",
        })}
        {field("website", labels[2], "url", false, {
          placeholder: "https://",
          autoComplete: "url",
        })}
        <Choice
          name="language"
          label={labels[4]}
          options={["de", "en", "uk", "ru"].map((x) => [x, x.toUpperCase()])}
          initial={lang}
        />
        <fieldset className="service-checks">
          <legend>{labels[5]} *</legend>
          {[
            ["google_ads", "Google Ads"],
            ["chatgpt_ads", "ChatGPT Ads"],
          ].map(([id, name]) => (
            <label key={id}>
              <Checkbox
                checked={services.includes(id)}
                onCheckedChange={(checked) => {
                  setServices((list) =>
                    checked ? [...list, id] : list.filter((x) => x !== id),
                  );
                  track("service_select", {
                    service: id,
                    selected: !!checked,
                    locale: lang,
                  });
                }}
                aria-label={name}
              />
              <span>{name}</span>
            </label>
          ))}
        </fieldset>
      </div>
      <details className="form-more">
        <summary>
          {tr(
            lang,
            "Projektdetails ergänzen",
            "Add project details",
            "Додати деталі проєкту",
            "Добавить детали проекта",
          )}{" "}
          <span>+</span>
        </summary>
        <div className="form-grid">
          {field("offer", labels[6])}
          {field("market", labels[7])}
          <Choice
            name="budget"
            label={labels[8]}
            options={[
              ["unknown", unknown],
              ["under-1000", "< €1.000"],
              ["1000-3000", "€1.000–3.000"],
              ["3000-10000", "€3.000–10.000"],
              ["10000+", "€10.000+"],
            ]}
          />
          <Choice
            name="conversion"
            label={labels[11]}
            options={[
              ["lead", "Lead"],
              ["purchase", tr(lang, "Kauf", "Purchase", "Покупка", "Покупка")],
              [
                "booking",
                tr(lang, "Buchung", "Booking", "Бронювання", "Бронирование"),
              ],
              ["call", tr(lang, "Anruf", "Call", "Дзвінок", "Звонок")],
              [
                "signup",
                tr(
                  lang,
                  "Registrierung",
                  "Signup",
                  "Реєстрація",
                  "Регистрация",
                ),
              ],
              ["other", tr(lang, "Andere", "Other", "Інша", "Другая")],
            ]}
          />
          <Choice name="googleActive" label={labels[9]} options={yn} />
          <Choice name="chatgptActive" label={labels[10]} options={yn} />
          <label className="form-label">
            <span>{labels[13]}</span>
            <Select
              name="communication"
              defaultValue="email"
              onValueChange={setComm}
            >
              <SelectTrigger className="form-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["email", "whatsapp", "telegram", "call"].map((x) => (
                  <SelectItem value={x} key={x}>
                    {x === "call"
                      ? tr(lang, "Anruf", "Call", "Дзвінок", "Звонок")
                      : x === "email"
                        ? "E-Mail"
                        : x === "whatsapp"
                          ? "WhatsApp"
                          : "Telegram"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>
          {comm !== "email" && field("handle", labels[14])}
        </div>
      </details>
      <label className="form-label message-label">
        <span>{labels[12]} *</span>
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={4}
        />
      </label>
      <div className="honeypot" aria-hidden="true">
        <label>
          Website confirmation
          <input name="website_confirm" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <p className="subtle">
        {tr(
          lang,
          "Pflichtfelder sind mit * markiert. Informationen zur Verarbeitung finden Sie unter",
          "Required fields are marked *. Read about data processing in our",
          "Обов’язкові поля позначено *. Інформація про обробку даних:",
          "Обязательные поля отмечены *. Информация об обработке данных:",
        )}{" "}
        <a className="text-link" href={`/${lang}/datenschutz`}>
          {c.privacy}
        </a>
        .
      </p>
      <div className="form-actions">
        <button className="button" type="submit" disabled={state === "sending" || state === "success"}>
          {state === "sending"
            ? tr(lang, "Wird gesendet…", "Sending…", "Надсилання…", "Отправка…")
            : tr(
                lang,
                "Anfrage senden",
                "Send inquiry",
                "Надіслати запит",
                "Отправить запрос",
              )}{" "}
          <span>↗</span>
        </button>
        <button
          type="button"
          className="text-link"
          onClick={(e) => {
            const form = e.currentTarget.closest("form")!;
            const data = new FormData(form);
            const body =
              "services: " +
              services.join(", ") +
              "\n" +
              Array.from(data.entries())
                .filter(([k]) => k !== "website_confirm")
                .map(([k, v]) => `${k}: ${v}`)
                .join("\n");
            const url = URL.createObjectURL(
              new Blob([body], { type: "text/plain;charset=utf-8" }),
            );
            const a = document.createElement("a");
            a.href = url;
            a.download = "ad4growth-inquiry.txt";
            a.click();
            setTimeout(() => URL.revokeObjectURL(url), 1000);
          }}
        >
          {tr(
            lang,
            "Als Text sichern ↓",
            "Save as text ↓",
            "Зберегти текст ↓",
            "Сохранить текст ↓",
          )}
        </button>
      </div>
      <div
        aria-live="polite"
        role="status"
        className={`form-status ${state === "success" ? "success" : ""}`}
      >
        {state === "success"
          ? tr(
              lang,
              "Ihre Anfrage wurde zugestellt.",
              "Your inquiry has been delivered.",
              "Ваш запит доставлено.",
              "Ваш запрос доставлен.",
            )
          : state === "unconfigured"
            ? tr(
                lang,
                "Nicht gesendet: Der Versand ist noch nicht verbunden. Ihre Eingaben bleiben im Formular.",
                "Not sent: delivery is not connected yet. Your entries remain in the form.",
                "Не надіслано: надсилання ще не підключено. Дані залишилися у формі.",
                "Не отправлено: отправка ещё не подключена. Данные остались в форме.",
              )
            : state === "error"
              ? tr(
                  lang,
                  "Nicht zugestellt. Bitte später erneut versuchen oder als Text sichern.",
                  "Not delivered. Try again later or save as text.",
                  "Не доставлено. Спробуйте пізніше або збережіть текст.",
                  "Не доставлено. Попробуйте позже или сохраните текст.",
                )
              : state === "validation"
                ? tr(
                    lang,
                    "Bitte mindestens einen Kanal wählen und Name, E-Mail, Website-URL sowie Nachricht (mindestens 10 Zeichen) prüfen.",
                    "Select at least one channel and check your name, email, website URL and message (at least 10 characters).",
                    "Оберіть принаймні один канал і перевірте ім’я, пошту, URL та повідомлення (від 10 символів).",
                    "Выберите хотя бы один канал и проверьте имя, почту, URL и сообщение (от 10 символов).",
                  )
                : null}
      </div>
    </form>
  );
}
