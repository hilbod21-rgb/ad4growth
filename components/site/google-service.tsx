import Link from "next/link";
import { type Locale } from "@/lib/config";
import { copy, tr } from "@/lib/content/copy";
import { serviceCopy } from "@/lib/content/services";
import { ServicePrice, ServiceScope } from "./service-commercial";
import { BottomCTA } from "./sections";
export function GoogleService({ lang }: { lang: Locale }) {
  const c = copy(lang),
    s = serviceCopy(lang, false);
  return (
    <div className="chat-service google-service">
      <section className="chat-service-hero wrap">
        <div>
          <p className="kicker">GOOGLE ADS / SUCHMASCHINENWERBUNG</p>
          <h1>
            {tr(
              lang,
              "Ihre Leistung. Genau dann, wenn sie gesucht wird",
              "Your service. Right when people search for it",
              "Ваші послуги. Саме тоді, коли їх шукають",
              "Ваши услуги. Именно тогда, когда их ищут",
            )}
          </h1>
          <p className="chat-service-intro">
            {tr(
              lang,
              "Google Ads für Unternehmen, die aus relevanten Suchanfragen neue Kontakte und Käufe gewinnen möchten. Wir übernehmen Recherche, Kampagnenaufbau, Conversion-Tracking und laufende Optimierung.",
              "Google Ads for businesses looking to turn relevant searches into inquiries and purchases. We handle research, campaign setup, conversion tracking and ongoing optimization.",
              "Google Ads для бізнесу, який прагне перетворювати цільові пошукові запити на звернення й покупки. Беремо на себе дослідження, налаштування кампаній, трекінг і постійну оптимізацію.",
              "Google Ads для бизнеса, который хочет превращать целевые поисковые запросы в обращения и покупки. Берём на себя исследование, настройку кампаний, трекинг и постоянную оптимизацию.",
            )}
          </p>
          <Link className="button" href={`/${lang}/contact?service=google_ads`}>
            {c.serviceCta("Google Ads")} ↗
          </Link>
        </div>
        <aside className="service-commercial-aside">
          <p className="kicker">
            GOOGLE ADS /{" "}
            {tr(lang, "KONDITIONEN", "PRICING", "УМОВИ", "УСЛОВИЯ")}
          </p>
          <ServicePrice lang={lang} chat={false} />
          <a className="text-link" href="#scope">
            {tr(
              lang,
              "Was ist enthalten?",
              "What is included?",
              "Що входить?",
              "Что входит?",
            )}{" "}
            ↓
          </a>
        </aside>
      </section>
      <section className="search-explainer wrap">
        <div>
          <p className="kicker">SEARCH INTENT</p>
          <h2>
            {tr(
              lang,
              "Ein Suchbegriff ist der Anfang. Die passende Anfrage das Ziel",
              "A search term is the start. A relevant inquiry is the goal",
              "Пошуковий запит — початок. Цільове звернення — мета",
              "Поисковый запрос — начало. Целевое обращение — цель",
            )}
          </h2>
        </div>
        <div className="search-example">
          <p className="kicker">
            {tr(
              lang,
              "BEISPIEL EINER SUCHANFRAGE",
              "EXAMPLE SEARCH QUERY",
              "ПРИКЛАД ПОШУКОВОГО ЗАПИТУ",
              "ПРИМЕР ПОИСКОВОГО ЗАПРОСА",
            )}
          </p>
          <p className="search-query">
            ⌕{" "}
            {tr(
              lang,
              "Steuerberatung für mein Unternehmen",
              "accountant for my business",
              "бухгалтер для мого бізнесу",
              "бухгалтер для моего бизнеса",
            )}
          </p>
          <p>
            {tr(
              lang,
              "Wir prüfen die Absicht hinter der Suche, stimmen Anzeige und Zielseite darauf ab und messen die vereinbarte Zielaktion. Unpassende Suchbegriffe werden ausgeschlossen.",
              "We assess the intent, align the ad and landing page, and measure the agreed target action. Irrelevant search terms are excluded.",
              "Перевіряємо намір, узгоджуємо оголошення й цільову сторінку, вимірюємо погоджену дію. Нецільові запити виключаємо.",
              "Проверяем намерение, согласуем объявление и целевую страницу, измеряем согласованное действие. Нецелевые запросы исключаем.",
            )}
          </p>
        </div>
      </section>
      <section className="chat-delivery wrap">
        <div className="chat-delivery-heading">
          <p className="kicker">SEA / MANAGEMENT</p>
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
      <ServiceScope lang={lang} chat={false} />
      <BottomCTA lang={lang} service="google_ads" />
    </div>
  );
}
