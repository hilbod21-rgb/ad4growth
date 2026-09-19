import { Search, ArrowUpRight, ArrowDownLeft, ArrowDown } from "lucide-react";
import { Operator } from "./operator";
import { business, euro, setupPrice, monthlyPrice, type Locale } from "@/lib/config";
import { copy, tr } from "@/lib/content/copy";
import { publishedArticles } from "@/lib/content/articles";
import { MeasurementSystem } from "./measurement-system";
import { TrackedLink } from "./navigation";
export function Home({ lang }: { lang: Locale }) {
  const c = copy(lang);
  const words = tr(
    lang,
    ["Ihre Kunden", "suchen bereits.", "Erreichen wir sie."],
    ["Your customers", "are searching.", "Let’s reach them."],
    ["Ваші клієнти", "вже шукають.", "Знайдемо їх."],
    ["Ваши клиенты", "уже ищут.", "Найдём их."],
  );
  return (
    <div className="new-home">
      <div className="hero-band">
        <section className="new-hero wrap" id="pricing">

          <div className="new-hero-copy">
            <p className="kicker">PERFORMANCE MARKETING · PAID ACQUISITION</p>
            <h1>
              {words[0]}
              <br />
              {words[1]}
              <br />
              <span>{words[2].replace(/\.$/, "")}</span>
            </h1>
            <p className="new-lead">
              {tr(
                lang,
                "Wir erreichen Menschen, die nach Ihrem Angebot suchen oder ihre nächste Entscheidung vorbereiten. Mit Google Ads, ChatGPT Ads und einem klaren Blick auf das Ergebnis.",
                "Reach people searching for your offer or considering their next decision. With Google Ads, ChatGPT Ads and a clear focus on the outcome.",
                "Знаходимо людей, які шукають вашу пропозицію або обирають рішення. Через Google Ads, ChatGPT Ads і чіткий фокус на результаті.",
                "Находим людей, которые ищут ваше предложение или выбирают решение. Через Google Ads, ChatGPT Ads и понятный фокус на результате.",
              )}
            </p>
            <TrackedLink
              event="hero_cta_click"
              className="button"
              href={`/${lang}/contact`}
            >
              {tr(
                lang,
                "Über Ihr Projekt sprechen",
                "Let’s discuss your project",
                "Обговорити ваш проєкт",
                "Обсудить ваш проект",
              )}{" "}
              <span><ArrowUpRight className="ui-icon" aria-hidden="true" strokeWidth={1.5} /></span>
            </TrackedLink>
            <a className="hero-secondary" href="#channels">
              {tr(
                lang,
                "Die zwei Kanäle verstehen",
                "Explore the two channels",
                "Як працюють два канали",
                "Как работают два канала",
              )}{" "}
              <ArrowDown className="ui-icon" aria-hidden="true" strokeWidth={1.5} />
            </a>
          </div>
          <aside className="new-offer">
            <div className="offer-heading">
              <span>
                {tr(
                  lang,
                  "Zwei Kanäle. Klare Konditionen.",
                  "Two channels. Clear terms.",
                  "Два канали. Прозорі умови.",
                  "Два канала. Понятные условия.",
                )}
              </span>
              <a
                href="#channels"
                aria-label={tr(
                  lang,
                  "Kanäle vergleichen",
                  "Compare channels",
                  "Порівняти канали",
                  "Сравнить каналы",
                )}
              >
                <ArrowDownLeft className="ui-icon" aria-hidden="true" strokeWidth={1.5} />
              </a>
            </div>
            {business.services.map((s, i) => (
              <div className="new-product-price" key={s.id}>
                <div className="product-price-title">
                  <span>{s.number}</span>
                  <a href={`/${lang}/${s.slug}`}>{s.name} <ArrowUpRight className="ui-icon" aria-hidden="true" strokeWidth={1.5} /></a>
                </div>
                <p>{i ? "Conversational intent" : "Search intent"}</p>
                <div className="new-price-grid">
                  <div>
                    <small>
                      {tr(
                        lang,
                        "SETUP · EINMALIG",
                        "SETUP · ONE-TIME",
                        "НАЛАШТУВАННЯ · РАЗОВО",
                        "НАСТРОЙКА · РАЗОВО",
                      )}
                    </small>
                    <strong><button type="button" className="price-reaction">{euro(setupPrice(s.key))}</button></strong><small className="net-price-label">netto</small>

                  </div>
                  <div>
                    <small>
                      {tr(
                        lang,
                        "BETREUUNG",
                        "MANAGEMENT",
                        "УПРАВЛІННЯ",
                        "УПРАВЛЕНИЕ",
                      )}
                    </small>
                    <strong><button type="button" className="price-reaction">{euro(monthlyPrice(s.key))}</button></strong><small className="net-price-label">netto</small>
                    <span>{c.month}</span>
                  </div>
                </div>
              </div>
            ))}
            <div className="media-budget">
              <span>
                {tr(
                  lang,
                  "Werbebudget separat",
                  "Media budget separate",
                  "Рекламний бюджет окремо",
                  "Рекламный бюджет отдельно",
                )}
              </span>
              <strong>
                {tr(lang, "ab", "from", "від", "от")}{" "}
                {euro(business.minimumMediaBudget)} {c.month}
              </strong>
            </div>
            <p className="offer-note">{c.taxNote}</p>
            <p className="offer-note">
              {c.launchNote.replace("{n}", String(business.launch.clientLimit))}{" "}
              {tr(
                lang,
                "Der passende Werbeetat hängt von Markt und Ziel ab.",
                "The right budget depends on your market and objective.",
                "Потрібний бюджет залежить від ринку та мети.",
                "Подходящий бюджет зависит от рынка и цели.",
              )}
            </p>
          </aside>
        </section>
      </div>
      <section className="channel-section wrap" id="channels">
        <div className="new-section-top">
          <p className="kicker">
            01 /{" "}
            {tr(
              lang,
              "WO WIR KUNDEN ERREICHEN",
              "WHERE WE REACH CUSTOMERS",
              "ДЕ МИ ЗНАХОДИМО КЛІЄНТІВ",
              "ГДЕ МЫ НАХОДИМ КЛИЕНТОВ",
            )}
          </p>
          <h2>
            {tr(
              lang,
              <>
                Die nächste Anfrage beginnt
                <br />
                mit einer Suche. Oder einem Gespräch
              </>,
              <>
                The next inquiry starts
                <br />
                with a search. Or a conversation
              </>,
              <>
                Наступний запит починається
                <br />з пошуку. Або з розмови
              </>,
              <>
                Следующая заявка начинается
                <br />с поиска. Или с разговора
              </>,
            )}
          </h2>
        </div>
        <div className="channel-stories">
          <article>
            <div className="channel-number" aria-hidden="true">
              01
            </div>
            <p className="kicker">GOOGLE ADS</p>
            <h3>
              {tr(
                lang,
                "Gefunden werden, wenn jemand Sie braucht",
                "Be found when someone needs you",
                "Бути помітними, коли ви потрібні",
                "Быть заметными, когда вы нужны",
              )}
            </h3>
            <p>
              {tr(
                lang,
                "Mit Google Ads erreichen Sie Menschen, die aktiv nach Ihren Leistungen suchen. Wir recherchieren relevante Keywords, strukturieren Suchkampagnen und stimmen Anzeigen auf Ihr Angebot ab. Conversion-Tracking macht Anfragen und Käufe messbar – als Grundlage für die laufende SEA-Betreuung.",
                "Google Ads reaches people actively searching for your services. We research relevant keywords, structure search campaigns and align ads with your offer. Conversion tracking measures inquiries and purchases, giving ongoing paid search management a clear basis.",
                "Google Ads допомагає охопити людей, які активно шукають ваші послуги. Досліджуємо ключові слова, будуємо пошукові кампанії та узгоджуємо оголошення з пропозицією. Відстеження конверсій дає змогу вимірювати запити й покупки та керувати пошуковою рекламою (SEA).",
                "Google Ads помогает охватить людей, которые активно ищут ваши услуги. Исследуем ключевые слова, строим поисковые кампании и согласуем объявления с предложением. Отслеживание конверсий позволяет измерять заявки и покупки и управлять поисковой рекламой (SEA).",
              )}
            </p>
            <div className="intent-example">
              <small>
                {tr(
                  lang,
                  "BEISPIEL EINER SUCHANFRAGE",
                  "EXAMPLE SEARCH QUERY",
                  "ПРИКЛАД ПОШУКОВОГО ЗАПИТУ",
                  "ПРИМЕР ПОИСКОВОГО ЗАПРОСА",
                )}
              </small>
              <span>
                <Search className="ui-icon" aria-hidden="true" strokeWidth={1.5} />{" "}
                {tr(
                  lang,
                  "Steuerberatung für mein Unternehmen",
                  "accountant for my business",
                  "бухгалтер для мого бізнесу",
                  "бухгалтер для моего бизнеса",
                )}
              </span>
            </div>
            <p className="channel-conclusion">
              {tr(
                lang,
                "Ein konkreter Bedarf. Ihr Angebot im richtigen Moment.",
                "A specific need. Your offer at the right moment.",
                "Конкретна потреба. Ваша пропозиція у потрібний момент.",
                "Конкретная потребность. Ваше предложение в нужный момент.",
              )}
            </p>
            <a className="text-link" href={`/${lang}/google-ads`}>
              {c.explore} <ArrowUpRight className="ui-icon" aria-hidden="true" strokeWidth={1.5} />
            </a>
          </article>
          <article className="conversation-story">
            <div className="channel-number" aria-hidden="true">
              02
            </div>
            <p className="kicker">CHATGPT ADS</p>
            <h3>
              {tr(
                lang,
                "Präsent sein, während eine Entscheidung entsteht",
                "Be present while a decision takes shape",
                "Бути поруч, коли формується рішення",
                "Быть рядом, когда формируется решение",
              )}
            </h3>
            <p>
              {tr(
                lang,
                "Suche ist längst mehr als eine Liste von Links. In ChatGPT stellen Menschen Fragen, vergleichen Angebote und konkretisieren ihren Bedarf im Gespräch. Werbung kann auch in diesem Entscheidungskontext sichtbar werden.",
                "Search can be more than a list of links. In ChatGPT, people ask questions, compare options and refine their needs in conversation. Advertising can appear within this decision-making context.",
                "Пошук — це не лише список посилань. У ChatGPT люди ставлять запитання, порівнюють варіанти й уточнюють потреби в розмові. Реклама може з’явитися в цьому контексті вибору.",
                "Поиск — это не только список ссылок. В ChatGPT люди задают вопросы, сравнивают варианты и уточняют потребности в разговоре. Реклама может появиться в этом контексте выбора.",
              )}
            </p>
            <div className="intent-example">
              <small>
                {tr(
                  lang,
                  "BEISPIEL EINER FRAGE",
                  "EXAMPLE QUESTION",
                  "ПРИКЛАД ЗАПИТАННЯ",
                  "ПРИМЕР ВОПРОСА",
                )}
              </small>
              <span>
                {tr(
                  lang,
                  "„Welche Buchhaltung passt zu meinem kleinen Unternehmen?“",
                  "“Which accounting service fits my small business?”",
                  "«Який бухгалтерський сервіс підійде моєму невеликому бізнесу?»",
                  "«Какой бухгалтерский сервис подойдёт моему небольшому бизнесу?»",
                )}
              </span>
            </div>
            <p className="channel-conclusion">
              {tr(
                lang,
                "Ein eigener Werbekanal. Keine gekauften Empfehlungen in KI-Antworten.",
                "A distinct advertising channel. Not paid recommendations inside AI answers.",
                "Окремий рекламний канал. Не куплені рекомендації у відповідях ШІ.",
                "Отдельный рекламный канал. Не купленные рекомендации в ответах ИИ.",
              )}
            </p>
            <a className="text-link" href={`/${lang}/chatgpt-ads`}>
              {c.explore} <ArrowUpRight className="ui-icon" aria-hidden="true" strokeWidth={1.5} />
            </a>
            <p className="platform-footnote">
              {c.availability} <a href="https://ads.openai.com/">OpenAI <ArrowUpRight className="ui-icon" aria-hidden="true" strokeWidth={1.5} /></a>
            </p>
          </article>
        </div>
      </section>
      <MeasurementSystem lang={lang} />
      {publishedArticles(lang).length > 0 && <section className="home-insights wrap" id="insights">
        <div>
          <p className="kicker">05 / BLOG</p>
          <h2>
            {tr(
              lang,
              "Gedanken hinter der Arbeit",
              "The thinking behind the work",
              "Думки, що стоять за роботою",
              "Мысли, которые стоят за работой",
            )}
          </h2>
          <p>
            {tr(
              lang,
              "Über Werbung, Kundenakquisition und die Entscheidungen dahinter.",
              "On advertising, customer acquisition and the decisions behind them.",
              "Про рекламу, залучення клієнтів і рішення за ними.",
              "О рекламе, привлечении клиентов и решениях за ними.",
            )}
          </p>
          <a className="text-link" href={`/${lang}/insights`}>
            {tr(lang, "Zum Blog", "Read the blog", "До блогу", "Открыть блог")}{" "}
            <ArrowUpRight className="ui-icon" aria-hidden="true" strokeWidth={1.5} />
          </a>
        </div>
        <div className="journal-preview">
          {publishedArticles(lang).length ? (
            publishedArticles(lang)
              .slice(0, 2)
              .map((a) => (
                <a
                  className="featured-insight"
                  key={a.slug}
                  href={`/${lang}/insights/${a.slug}`}
                >
                  <div>{a.category}</div>
                  <h3>{a.title}</h3>
                  <p>{a.description}</p>
                </a>
              ))
          ) : (
            <p>
              {tr(
                lang,
                "Die ersten Fachartikel sind in Vorbereitung. Hier erscheinen Analysen zu Messung, Akquisition und Kampagnenentscheidungen.",
                "The first articles are in preparation. This journal will cover measurement, acquisition and campaign decisions.",
                "Перші статті готуються. Тут будуть аналізи вимірювання, залучення й рішень щодо кампаній.",
                "Первые статьи готовятся. Здесь будут разборы измерения, привлечения и решений по кампаниям.",
              )}
            </p>
          )}
        </div>
      </section>}
      <Operator lang={lang} />
      <section className="new-contact wrap" id="contact">
        <div>
          <p className="kicker">LET’S TALK BUSINESS</p>
          <h2>
            {tr(
              lang,
              "Ihr Angebot verdient<br/>die richtigen Kunden",
              "Your offer deserves<br/>the right customers",
              "Вашій пропозиції потрібні<br/>відповідні клієнти",
              "Вашему предложению нужны<br/>подходящие клиенты",
            )
              .split("<br/>")
              .map((s, i) => (
                <span key={i}>
                  {s}
                  <br />
                </span>
              ))}
          </h2>
          <p>{c.contactBody}</p>
          <a className="button" href={`/${lang}/contact`}>
            {c.cta} <span><ArrowUpRight className="ui-icon" aria-hidden="true" strokeWidth={1.5} /></span>
          </a>
        </div>
      </section>
    </div>
  );
}
