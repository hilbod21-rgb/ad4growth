import { type Locale, business } from "@/lib/config";
import { operator } from "./operator";
import { tr } from "./copy";
export type ArticleBlock =
  | {
      type: "paragraph" | "quote" | "callout" | "formula" | "code";
      text: string;
    }
  | { type: "heading"; id: string; text: string; level?: 2 | 3 }
  | { type: "list"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | {
      type: "image";
      src: string;
      alt: string;
      caption: string;
      width: number;
      height: number;
    }
  | {
      type: "chart";
      caption: string;
      data: { label: string; value: number }[];
    };
export interface Article {
  slug: string;
  locale: Locale;
  status: "draft" | "demo" | "published";
  title: string;
  description: string;
  author: typeof business.editorial | typeof operator;
  publishedAt: string | null;
  updatedAt: string;
  category: string;
  tags: string[];
  readingMinutes: number;
  body: ArticleBlock[];
  references: { title: string; url: string }[];
  relatedSlugs: string[];
  seo: { title: string; description: string };
  hero?: { src: string; alt: string; width: number; height: number };
}
export const demoSlug = "cpa-vs-cac";
export function demoArticle(lang: Locale): Article {
  const title = tr(
    lang,
    "CPA ist nicht CAC. Ein Lead ist noch kein Kunde.",
    "CPA is not CAC. A lead is not yet a customer.",
    "CPA — не CAC. Лід ще не є клієнтом.",
    "CPA — не CAC. Лид ещё не клиент.",
  );
  const description = tr(
    lang,
    "Ein Lehrbeispiel zum Unterschied zwischen Conversion-Kosten und Kundenakquisitionskosten.",
    "An educational example of the difference between conversion costs and customer acquisition costs.",
    "Навчальний приклад різниці між вартістю конверсії та залучення клієнта.",
    "Учебный пример разницы между стоимостью конверсии и привлечения клиента.",
  );
  return {
    slug: demoSlug,
    locale: lang,
    status: "demo",
    title,
    description,
    author: business.editorial,
    publishedAt: null,
    updatedAt: "2026-09-10",
    category: "Measurement",
    tags: ["CPA", "CAC", "Conversion"],
    readingMinutes: 4,
    relatedSlugs: [],
    references: [],
    seo: { title, description },
    body: [
      {
        type: "callout",
        text: tr(
          lang,
          "Demo / Artikelvorlage. Alle Zahlen sind frei gewählte Rechenwerte. Keine Kampagnenergebnisse, keine Prognose. Vor einer redaktionellen Veröffentlichung fachlich prüfen und freigeben.",
          "Demo / article template. All figures are invented teaching inputs. Not campaign results or a forecast. Review and approve before editorial publication.",
          "Демо / шаблон статті. Усі числа — умовні навчальні значення. Це не результати кампаній і не прогноз. Перед публікацією потрібні перевірка та схвалення.",
          "Демо / шаблон статьи. Все числа — условные учебные значения. Это не результаты кампаний и не прогноз. Перед публикацией нужны проверка и одобрение.",
        ),
      },
      {
        type: "heading",
        id: "conversion",
        text: tr(
          lang,
          "Zuerst die Conversion definieren",
          "Start by defining the conversion",
          "Спочатку визначте конверсію",
          "Сначала определите конверсию",
        ),
      },
      {
        type: "paragraph",
        text: tr(
          lang,
          "Eine Conversion ist eine zuvor definierte Aktion. Bei einem Onlineshop kann das ein Kauf sein, bei einem Dienstleister eine Anfrage. Der gleiche Begriff beschreibt damit unterschiedliche Stufen einer Kundenbeziehung. Ein ausgefülltes Formular sagt noch nichts darüber aus, ob die Person zum Angebot passt oder später kauft.",
          "A conversion is a predefined action. For an online shop it may be a purchase; for a service business, an inquiry. The same term can describe different stages of a customer relationship. A completed form does not tell you whether a person fits the offer or will buy later.",
          "Конверсія — це заздалегідь визначена дія. Для магазину це може бути покупка, для сервісного бізнесу — запит. Один термін описує різні етапи відносин із клієнтом. Заповнена форма ще не говорить, чи підходить людині пропозиція і чи купить вона згодом.",
          "Конверсия — это заранее определённое действие. Для магазина это может быть покупка, для сервисного бизнеса — заявка. Один термин описывает разные этапы отношений с клиентом. Заполненная форма ещё не говорит, подходит ли человеку предложение и купит ли он позже.",
        ),
      },
      {
        type: "heading",
        id: "cpa",
        text: tr(
          lang,
          "CPA: Kosten einer Zielaktion",
          "CPA: the cost of a target action",
          "CPA: вартість цільової дії",
          "CPA: стоимость целевого действия",
        ),
      },
      {
        type: "formula",
        text: "CPA = Ad spend / Conversions\n€1.000 / 25 = €40",
      },
      {
        type: "paragraph",
        text: tr(
          lang,
          "In diesem Beispiel entstehen aus 1.000 Euro Werbeausgaben 25 Anfragen. Jede Anfrage kostet im Durchschnitt 40 Euro Werbebudget. Management, Vertriebsarbeit und andere Kosten sind hier nicht enthalten. Ob 40 Euro sinnvoll sind, hängt von der Qualität der Anfragen, der Abschlussquote und der Marge ab.",
          "In this example, €1,000 of ad spend generates 25 inquiries. Each inquiry costs €40 in media on average. Management, sales work and other costs are excluded here. Whether €40 is useful depends on inquiry quality, close rate and margin.",
          "У прикладі 1 000 євро рекламних витрат дають 25 запитів. У середньому запит коштує 40 євро рекламного бюджету. Управління, продажі та інші витрати тут не враховано. Прийнятність 40 євро залежить від якості запитів, частки угод і маржі.",
          "В примере 1 000 евро рекламных расходов дают 25 заявок. В среднем заявка стоит 40 евро рекламного бюджета. Управление, продажи и другие расходы здесь не учтены. Приемлемость 40 евро зависит от качества заявок, доли сделок и маржи.",
        ),
      },
      {
        type: "heading",
        id: "cac",
        text: tr(
          lang,
          "CAC: Kosten eines neuen Kunden",
          "CAC: the cost of a new customer",
          "CAC: вартість нового клієнта",
          "CAC: стоимость нового клиента",
        ),
      },
      {
        type: "formula",
        text: "CAC = Total acquisition cost / New customers\n(€1.000 + €490) / 10 = €149",
      },
      {
        type: "paragraph",
        text: tr(
          lang,
          "Werden aus den 25 Anfragen zehn neue Kunden und kommen 490 Euro Managementkosten hinzu, ergibt sich in dieser vereinfachten Rechnung ein CAC von 149 Euro. Weitere Akquisitionskosten müssten ebenfalls berücksichtigt werden. Zeitraum, Kostenumfang und Definition eines neuen Kunden müssen konsistent sein.",
          "If those 25 inquiries become ten new customers and management adds €490, this simplified calculation produces a CAC of €149. Any other acquisition costs would also need to be included. The period, cost scope and definition of a new customer must be consistent.",
          "Якщо 25 запитів дають десять нових клієнтів, а управління додає 490 євро, спрощений CAC становить 149 євро. Інші витрати на залучення також треба врахувати. Період, склад витрат і визначення нового клієнта мають бути узгоджені.",
          "Если 25 заявок дают десять новых клиентов, а управление добавляет 490 евро, упрощённый CAC составляет 149 евро. Другие расходы на привлечение тоже нужно учесть. Период, состав расходов и определение нового клиента должны быть согласованы.",
        ),
      },
      {
        type: "table",
        headers: tr(
          lang,
          ["Kennzahl", "Zähler", "Nenner"],
          ["Metric", "Numerator", "Denominator"],
          ["Показник", "Чисельник", "Знаменник"],
          ["Показатель", "Числитель", "Знаменатель"],
        ),
        rows: [
          ["CPA", "€1.000", "25"],
          ["CAC", "€1.490", "10"],
        ],
      },
      {
        type: "quote",
        text: tr(
          lang,
          "Günstige Conversions sind nur dann wertvoll, wenn sie zum Geschäftsziel beitragen.",
          "Low-cost conversions are valuable when they contribute to the business objective.",
          "Дешеві конверсії цінні, коли вони допомагають досягти бізнес-мети.",
          "Дешёвые конверсии ценны, когда они помогают достичь бизнес-цели.",
        ),
      },
      {
        type: "heading",
        id: "decision",
        text: tr(
          lang,
          "Was daraus für die Entscheidung folgt",
          "What this means for the decision",
          "Що це означає для рішення",
          "Что это означает для решения",
        ),
      },
      {
        type: "list",
        items: tr(
          lang,
          [
            "Conversion und Neukunde getrennt definieren.",
            "Werbe- und CRM-Daten mit einem konsistenten Zeitraum verbinden.",
            "Alle relevanten Akquisitionskosten berücksichtigen.",
            "CAC mit Marge und Kundenwert vergleichen, bevor Budget skaliert wird.",
          ],
          [
            "Define a conversion and a new customer separately.",
            "Connect advertising and CRM data within a consistent time period.",
            "Include all relevant acquisition costs.",
            "Compare CAC with margin and customer value before scaling spend.",
          ],
          [
            "Окремо визначити конверсію та нового клієнта.",
            "Поєднати рекламні дані та CRM за узгоджений період.",
            "Врахувати всі відповідні витрати на залучення.",
            "Порівняти CAC із маржею та цінністю клієнта до масштабування.",
          ],
          [
            "Отдельно определить конверсию и нового клиента.",
            "Соединить рекламные данные и CRM за согласованный период.",
            "Учесть все соответствующие затраты на привлечение.",
            "Сравнить CAC с маржой и ценностью клиента до масштабирования.",
          ],
        ),
      },
      {
        type: "heading",
        id: "method",
        text: tr(
          lang,
          "Methodik & Quellen",
          "Method & sources",
          "Методика та джерела",
          "Методика и источники",
        ),
      },
      {
        type: "paragraph",
        text: tr(
          lang,
          "Dieses Rechenbeispiel verwendet die hier angegebenen Definitionen und enthält keine externen Daten. Für die Veröffentlichung eines echten Experiments werden Datenherkunft, Zeitraum, Attributionsmodell und Grenzen in diesem Abschnitt dokumentiert.",
          "This example uses the definitions shown here and contains no external data. For a real experiment, document data provenance, dates, attribution model and limitations in this section.",
          "Приклад використовує наведені визначення та не містить зовнішніх даних. Для справжнього експерименту тут документуються походження даних, період, модель атрибуції й обмеження.",
          "Пример использует приведённые определения и не содержит внешних данных. Для реального эксперимента здесь документируются происхождение данных, период, модель атрибуции и ограничения.",
        ),
      },
    ],
  };
}
// Only approved articles enter editorial feeds and XML sitemaps.
export const articleRegistry: Article[] = [];
export function publishedArticles(lang: Locale): Article[] {
  return articleRegistry.filter(
    (a) => a.locale === lang && a.status === "published",
  );
}
export function findArticle(lang: Locale, slug: string): Article | undefined {
  return publishedArticles(lang).find((a) => a.slug === slug);
}
export interface CaseStudy {
  slug: string;
  locale: Locale;
  status: "draft" | "published";
  context: string;
  problem: string;
  hypothesis: string;
  setup: string;
  acquisition: string;
  tracking: string;
  experiment: string;
  data: ArticleBlock[];
  result: string;
  learnings: string[];
  nextIteration: string;
}
export interface Experiment extends CaseStudy {
  experimentNumber: number;
  budget: number;
  startedAt: string;
  endedAt?: string;
}
