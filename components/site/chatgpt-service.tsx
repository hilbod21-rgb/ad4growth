import { ArrowUpRight, ArrowDown } from "lucide-react";
import { ServicePrice, ServiceScope } from "./service-commercial";
import { type Locale } from "@/lib/config";
import { copy, tr } from "@/lib/content/copy";
import { serviceCopy } from "@/lib/content/services";
import { BottomCTA } from "./sections";

export function ChatGPTService({ lang }: { lang: Locale }) {
  const c = copy(lang),
    s = serviceCopy(lang, true);
  return (
    <div className="chat-service">
      <section className="chat-service-hero wrap">
        <div>
          <p className="kicker">CHATGPT ADS / CONVERSATIONAL INTENT</p>
          <h1>
            {tr(
              lang,
              "Werbung dort, wo Entscheidungen entstehen",
              "Advertising where decisions take shape",
              "Реклама там, де формуються рішення",
              "Реклама там, где формируются решения",
            )}
          </h1>
          <p className="chat-service-intro">
            {tr(
              lang,
              "Menschen fragen, vergleichen und konkretisieren ihren Bedarf in ChatGPT. Wir prüfen, ob dieser Kontext zu Ihrem Angebot passt, und planen einen messbaren Einstieg in ChatGPT Ads.",
              "People ask, compare and refine their needs in ChatGPT. We assess whether this context fits your offer and plan a measurable entry into ChatGPT Ads.",
              "У ChatGPT люди запитують, порівнюють і уточнюють потреби. Перевіряємо, чи відповідає цей контекст вашій пропозиції, та плануємо вимірюваний запуск ChatGPT Ads.",
              "В ChatGPT люди спрашивают, сравнивают и уточняют потребности. Проверяем, подходит ли этот контекст вашему предложению, и планируем измеримый запуск ChatGPT Ads.",
            )}
          </p>
          <ServicePrice lang={lang} chat />
          <a
            className="button"
            href={`/${lang}/contact?service=chatgpt_ads`}
          >
            {c.serviceCta("ChatGPT Ads")} <span><ArrowUpRight className="ui-icon" aria-hidden="true" strokeWidth={1.5} /></span>
          </a>
          <a className="chat-price-link" href="#scope">
            {tr(
              lang,
              "Preise & Leistungsumfang",
              "Pricing & scope",
              "Ціни та склад робіт",
              "Цены и состав работ",
            )}{" "}
            <ArrowDown className="ui-icon" aria-hidden="true" strokeWidth={1.5} />
          </a>
        </div>
        <aside className="conversation-brief">
          <p className="kicker">
            {tr(
              lang,
              "SO ENTSTEHT EIN BEDARF · BEISPIEL",
              "HOW A NEED TAKES SHAPE · EXAMPLE",
              "ЯК ФОРМУЄТЬСЯ ПОТРЕБА · ПРИКЛАД",
              "КАК ФОРМИРУЕТСЯ ПОТРЕБНОСТЬ · ПРИМЕР",
            )}
          </p>
          <blockquote>
            {tr(
              lang,
              "„Welche Buchhaltung passt zu meinem kleinen Unternehmen?“",
              "“Which accounting service fits my small business?”",
              "«Яка бухгалтерія підійде моєму малому бізнесу?»",
              "«Какая бухгалтерия подойдёт моему малому бизнесу?»",
            )}
          </blockquote>
          <div className="conversation-context">
            <span>
              {tr(lang, "KONTEXT", "CONTEXT", "КОНТЕКСТ", "КОНТЕКСТ")}
            </span>
            <p>
              {tr(
                lang,
                "Kleines Unternehmen. Konkrete Aufgabe. Eine Entscheidung steht an.",
                "Small business. A specific task. A decision to make.",
                "Малий бізнес. Конкретне завдання. Попереду рішення.",
                "Малый бизнес. Конкретная задача. Предстоит решение.",
              )}
            </p>
          </div>
          <div className="conversation-context">
            <span>
              {tr(
                lang,
                "UNSERE AUFGABE",
                "OUR ROLE",
                "НАША РОБОТА",
                "НАША РАБОТА",
              )}
            </span>
            <p>
              {tr(
                lang,
                "Angebot und Werbekontext zusammenbringen. Die Zielaktion messbar machen.",
                "Connect the offer with the advertising context. Make the target action measurable.",
                "Поєднати пропозицію з рекламним контекстом. Зробити цільову дію вимірюваною.",
                "Связать предложение с рекламным контекстом. Сделать целевое действие измеримым.",
              )}
            </p>
          </div>
          <p className="conversation-caption">
            {tr(
              lang,
              "Konzeptbeispiel, kein Screenshot eines Anzeigenformats. Werbung ist keine gekaufte Empfehlung in einer KI-Antwort.",
              "Concept example, not a screenshot of an ad format. Advertising is not a paid recommendation in an AI answer.",
              "Приклад концепції, не скриншот рекламного формату. Реклама — не куплена рекомендація у відповіді ШІ.",
              "Пример концепции, не скриншот рекламного формата. Реклама — не купленная рекомендация в ответе ИИ.",
            )}
          </p>
        </aside>
      </section>
      <section className="chat-access wrap">
        <h2>
          {tr(
            lang,
            "Vor dem Start: Zugang klären",
            "Before launch: confirm access",
            "До запуску: перевірити доступ",
            "До запуска: проверить доступ",
          )}
        </h2>
        <p>
          {c.availability}{" "}
          {tr(
            lang,
            "Leistungsumfang und Start bestätigen wir vor der Beauftragung.",
            "We confirm scope and launch before commissioning.",
            "Обсяг робіт і запуск підтверджуємо до замовлення.",
            "Объём работ и запуск подтверждаем до заказа.",
          )}
        </p>
      </section>
      <section className="chat-delivery wrap">
        <div className="chat-delivery-heading">
          <p className="kicker">
            {tr(
              lang,
              "VON DER PRÜFUNG ZUR BETREUUNG",
              "FROM ASSESSMENT TO MANAGEMENT",
              "ВІД ПЕРЕВІРКИ ДО УПРАВЛІННЯ",
              "ОТ ПРОВЕРКИ ДО УПРАВЛЕНИЯ",
            )}
          </p>
          <h2>
            {tr(
              lang,
              "Was wir für Sie übernehmen",
              "What we take care of",
              "Що ми беремо на себе",
              "Что мы берём на себя",
            )}
          </h2>
        </div>
        <div className="chat-delivery-grid">
          {s.work.map(([title, body], i) => (
            <article key={title}>
              <span className="chat-delivery-number">0{i + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <ServiceScope lang={lang} chat />
      <BottomCTA lang={lang} service="chatgpt_ads" />
    </div>
  );
}
