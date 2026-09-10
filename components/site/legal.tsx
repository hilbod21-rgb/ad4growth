import { type Locale, business } from "@/lib/config";
import { copy, tr } from "@/lib/content/copy";
export function LegalPage({
  lang,
  privacy,
}: {
  lang: Locale;
  privacy: boolean;
}) {
  const c = copy(lang);
  return (
    <section className="legal wrap">
      <p className="eyebrow">
        LEGAL / {tr(lang, "ENTWURF", "DRAFT", "ЧЕРНЕТКА", "ЧЕРНОВИК")}
      </p>
      <h1>{privacy ? c.privacy : c.imprint}</h1>
      <aside className="article-callout">
        {tr(
          lang,
          "Noch nicht zur öffentlichen Nutzung freigegeben. Diese Seite ist ein Platzhalter und keine vollständige Rechtserklärung. Die Angaben müssen vor dem öffentlichen Start ergänzt und geprüft werden.",
          "Not approved for public use. This page is a placeholder, not a complete legal statement. Complete and review it before public launch.",
          "Ще не схвалено для публічного використання. Це шаблон, а не повний правовий документ. Доповніть і перевірте його перед публічним запуском.",
          "Пока не одобрено для публичного использования. Это шаблон, а не полный правовой документ. Дополните и проверьте его перед публичным запуском.",
        )}
      </aside>
      {privacy ? (
        <>
          <h2>
            {tr(
              lang,
              "Aktueller technischer Stand",
              "Current technical setup",
              "Поточна технічна реалізація",
              "Текущая техническая реализация",
            )}
          </h2>
          <p>
            {tr(
              lang,
              "Die Website bindet keine externen Analyse- oder Werbetracker ein. Schriftarten werden über Systemschriften dargestellt. Das Formular ist noch nicht an einen Versanddienst angeschlossen; Anfragen werden nicht zugestellt und nicht in einer Anwendungsdatenbank gespeichert. Beim Versuch des Versands verarbeitet der Server die Formulardaten zur Prüfung.",
              "The website embeds no external analytics or ad trackers and uses system fonts. The form is not connected to a delivery service; inquiries are not delivered or saved in an application database. When submission is attempted, the server processes form data for validation.",
              "Сайт не підключає зовнішні аналітичні чи рекламні трекери та використовує системні шрифти. Форму не підключено до сервісу надсилання: запити не доставляються й не зберігаються в базі застосунку. Під час спроби надсилання сервер обробляє дані для валідації.",
              "Сайт не подключает внешние аналитические или рекламные трекеры и использует системные шрифты. Форма не подключена к сервису отправки: запросы не доставляются и не сохраняются в базе приложения. При попытке отправки сервер обрабатывает данные для валидации.",
            )}
          </p>
          <h2>
            {tr(
              lang,
              "Vor Veröffentlichung ergänzen",
              "Complete before publication",
              "Доповнити перед публікацією",
              "Дополнить перед публикацией",
            )}
          </h2>
          <ul>
            {tr(
              lang,
              [
                "Verantwortlicher, Anschrift und Datenschutzkontakt",
                "Hosting-Anbieter, technische Protokolle und Aufbewahrungsdauer",
                "Zwecke und Rechtsgrundlagen der Verarbeitung",
                "Eingesetzter E-Mail- oder CRM-Dienst und Empfänger",
                "Löschfristen, Betroffenenrechte und zuständige Aufsichtsbehörde",
                "Gegebenenfalls Einwilligungsverwaltung für künftige Analyse- und Werbedienste",
              ],
              [
                "Controller, address and privacy contact",
                "Hosting provider, technical logs and retention periods",
                "Processing purposes and legal bases",
                "Email or CRM provider and data recipients",
                "Deletion periods, data subject rights and supervisory authority",
                "Consent management for any future analytics or advertising services",
              ],
              [
                "Відповідальна особа, адреса та контакт для приватності",
                "Хостинг, технічні журнали та строки зберігання",
                "Цілі й правові підстави обробки",
                "Постачальник пошти або CRM та отримувачі даних",
                "Строки видалення, права суб’єктів і наглядовий орган",
                "Керування згодою для майбутніх аналітичних і рекламних сервісів",
              ],
              [
                "Ответственное лицо, адрес и контакт по приватности",
                "Хостинг, технические журналы и сроки хранения",
                "Цели и правовые основания обработки",
                "Поставщик почты или CRM и получатели данных",
                "Сроки удаления, права субъектов и надзорный орган",
                "Управление согласием для будущих аналитических и рекламных сервисов",
              ],
            ).map((x) => (
              <li key={x}>
                {x} —{" "}
                <strong>
                  {tr(lang, "OFFEN", "PENDING", "НЕ ЗАПОВНЕНО", "НЕ ЗАПОЛНЕНО")}
                </strong>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <dl className="legal-data">
          <dt>{tr(lang, "Marke", "Brand", "Бренд", "Бренд")}</dt>
          <dd>{business.brand}</dd>
          <dt>
            {tr(
              lang,
              "Ansprechpartner",
              "Contact person",
              "Контактна особа",
              "Контактное лицо",
            )}
          </dt>
          <dd>{business.founder.name}</dd>
          {tr(
            lang,
            [
              "Vollständige Anbieterbezeichnung / Rechtsform",
              "Ladungsfähige Anschrift",
              "E-Mail / direkter Kontakt",
              "Umsatzsteuer-Identifikationsnummer, falls vorhanden",
              "Registerangaben, falls erforderlich",
            ],
            [
              "Full legal provider name / entity type",
              "Serviceable business address",
              "Email / direct contact",
              "VAT identification number, if applicable",
              "Registration details, if required",
            ],
            [
              "Повна назва постачальника / правова форма",
              "Юридична адреса",
              "Пошта / прямий контакт",
              "Ідентифікаційний номер ПДВ, якщо є",
              "Реєстраційні дані, якщо потрібні",
            ],
            [
              "Полное название поставщика / правовая форма",
              "Юридический адрес",
              "Почта / прямой контакт",
              "Идентификационный номер НДС, если есть",
              "Регистрационные данные, если нужны",
            ],
          ).map((x) => (
            <div key={x}>
              <dt>{x}</dt>
              <dd className="placeholder">
                {tr(
                  lang,
                  "NOCH ZU ERGÄNZEN",
                  "TO BE COMPLETED",
                  "ПОТРІБНО ЗАПОВНИТИ",
                  "НУЖНО ЗАПОЛНИТЬ",
                )}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}
