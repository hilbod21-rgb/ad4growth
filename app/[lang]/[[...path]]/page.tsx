import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { business, isLocale, type Locale } from "@/lib/config";
import { copy, tr } from "@/lib/content/copy";
import { serviceCopy } from "@/lib/content/services";
import {
  demoArticle,
  demoSlug,
  publishedArticles,
  findArticle,
} from "@/lib/content/articles";
import { Header, PageEvents } from "@/components/site/navigation";
import { Hero } from "@/components/site/hero";
import {
  Services,
  Pricing,
  Fit,
  Footer,
  ContactIntro,
  Breadcrumb,
  BottomCTA,
} from "@/components/site/sections";
import { PerformanceLab } from "@/components/site/performance-lab";
import { ContactForm } from "@/components/site/contact-form";
import { FAQ } from "@/components/site/faq";
import { ArticlePage } from "@/components/site/article";
import { LegalPage } from "@/components/site/legal";
type Props = { params: Promise<{ lang: string; path?: string[] }> };
const routes = [
  "",
  "google-ads",
  "chatgpt-ads",
  "insights",
  `insights/${demoSlug}`,
  "about",
  "contact",
  "impressum",
  "datenschutz",
];
const validRoute = (lang: Locale, path: string) =>
  routes.includes(path) ||
  (path.startsWith("insights/") && !!findArticle(lang, path.slice(9)));
function pageTitle(lang: Locale, path: string) {
  const c = copy(lang);
  return path === ""
    ? tr(
        lang,
        "Google Ads & ChatGPT Ads für messbares Wachstum",
        "Google Ads & ChatGPT Ads for measurable growth",
        "Google Ads та ChatGPT Ads для вимірюваного зростання",
        "Google Ads и ChatGPT Ads для измеримого роста",
      )
    : path.startsWith("insights/")
      ? findArticle(lang, path.slice(9))!.title
      : path === "about"
        ? c.nav[3]
        : path === "contact"
          ? c.cta
          : path === "impressum"
            ? c.imprint
            : path === "datenschutz"
              ? c.privacy
              : path === "insights"
                ? "Insights"
                : path === "google-ads"
                  ? "Google Ads"
                  : "ChatGPT Ads";
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, path = [] } = await params;
  if (!isLocale(lang) || !validRoute(lang, path.join("/")))
    return {
      title: "404 — AD4GROWTH",
      robots: { index: false, follow: false },
    };
  const p = path.join("/"),
    suffix = p ? "/" + p : "";
  const c = copy(lang);
  const title = `${pageTitle(lang, p)} — AD4GROWTH`;
  const description = p.startsWith("insights/")
    ? findArticle(lang, p.slice(9))!.description
    : p === "google-ads"
      ? c.googleShort
      : p === "chatgpt-ads"
        ? c.chatShort
        : p === "contact"
          ? c.contactBody
          : p === "about"
            ? tr(
                lang,
                "Produktdenken für messbare Akquisition. Der Ansatz von AD4GROWTH.",
                "Product thinking for measurable acquisition. The AD4GROWTH approach.",
                "Продуктовий підхід до вимірюваного залучення. Метод AD4GROWTH.",
                "Продуктовый подход к измеримому привлечению. Метод AD4GROWTH.",
              )
            : c.intro.replace("\n", " ");
  const url = business.domain + `/${lang}` + suffix;
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: Object.fromEntries([
        ...business.languages.map((l) => [
          l,
          business.domain + `/${l}` + suffix,
        ]),
        ["x-default", business.domain + "/de" + suffix],
      ]),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: business.brand,
      locale: { de: "de_DE", en: "en_GB", uk: "uk_UA", ru: "ru_RU" }[lang],
      type: p.startsWith("insights/") ? "article" : "website",
    },
    twitter: { card: "summary", title, description },
    robots:
      (p.startsWith("insights/") &&
        findArticle(lang, p.slice(9))?.status !== "published") ||
      p === "impressum" ||
      p === "datenschutz"
        ? { index: false, follow: true }
        : { index: true, follow: true },
  };
}
export default async function Page({ params }: Props) {
  const { lang: raw, path = [] } = await params;
  const slug = path.join("/");
  if (!isLocale(raw) || !validRoute(raw, slug)) notFound();
  const lang = raw as Locale;
  const c = copy(lang),
    suffix = slug ? "/" + slug : "",
    title = pageTitle(lang, slug);
  const url = business.domain + `/${lang}` + suffix;
  const structured: Record<string, unknown>[] = [
    {
      "@type": "WebSite",
      "@id": business.domain + "/#website",
      name: business.brand,
      url: business.domain,
      inLanguage: business.languages,
    },
    {
      "@type": "Organization",
      "@id": business.domain + "/#organization",
      name: business.brand,
      url: business.domain,
      description: "Paid acquisition, measurement and optimization",
    },
    { "@type": "WebPage", name: title, url, inLanguage: lang },
  ];
  if (slug === "google-ads" || slug === "chatgpt-ads")
    structured.push({
      "@type": "Service",
      name: slug === "google-ads" ? "Google Ads" : "ChatGPT Ads",
      provider: { "@id": business.domain + "/#organization" },
      areaServed: "DACH",
      url,
    });
  if (slug.startsWith("insights/")) {
    const a = findArticle(lang, slug.slice(9));
    if (a?.status === "published")
      structured.push({
        "@type": "Article",
        headline: a.title,
        description: a.description,
        datePublished: a.publishedAt,
        dateModified: a.updatedAt,
        author: {
          "@type": a.author.type,
          name: a.author.name,
          url: business.domain + `/${lang}/about`,
        },
        mainEntityOfPage: url,
      });
  }
  if (slug)
    structured.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: c.home,
          item: business.domain + `/${lang}`,
        },
        { "@type": "ListItem", position: 2, name: title, item: url },
      ],
    });
  return (
    <>
      <PageEvents lang={lang} path={suffix} />
      <Header lang={lang} path={suffix} />
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": structured,
            }).replace(/</g, "\\u003c"),
          }}
        />
        {slug && <Breadcrumb lang={lang} title={title} />}
        {slug === "" ? (
          <>
            <Hero lang={lang} />
            <PerformanceLab lang={lang} />
            <Services lang={lang} />
            <Pricing lang={lang} />
            <Fit lang={lang} />
            <section className="section wrap contact-section" id="contact">
              <ContactIntro lang={lang} />
              <Suspense>
                <ContactForm lang={lang} />
              </Suspense>
            </section>
            <FAQ lang={lang} />
          </>
        ) : slug === "google-ads" || slug === "chatgpt-ads" ? (
          <ServicePage lang={lang} chat={slug === "chatgpt-ads"} />
        ) : slug === "about" ? (
          <>
            <section className="page-hero wrap">
              <p className="eyebrow">ABOUT / AD4GROWTH</p>
              <h1>
                {tr(
                  lang,
                  <>
                    Werbung braucht
                    <br />
                    Produktdenken.
                  </>,
                  <>
                    Advertising needs
                    <br />
                    product thinking.
                  </>,
                  <>
                    Рекламі потрібне
                    <br />
                    продуктове мислення.
                  </>,
                  <>
                    Рекламе нужно
                    <br />
                    продуктовое мышление.
                  </>,
                )}
              </h1>
              <p>
                {tr(
                  lang,
                  "AD4GROWTH verbindet bezahlte Akquisition mit einer einfachen Disziplin: erst verstehen, dann testen, dann anhand der Daten entscheiden.",
                  "AD4GROWTH connects paid acquisition with a simple discipline: understand first, then test, then decide using the evidence.",
                  "AD4GROWTH поєднує платне залучення з простою дисципліною: спочатку зрозуміти, потім перевірити, потім вирішувати за даними.",
                  "AD4GROWTH соединяет платное привлечение с простой дисциплиной: сначала понять, затем проверить, затем решать по данным.",
                )}
              </p>
            </section>
            <section className="section wrap about-principles">
              <p className="eyebrow">THE OPERATING PRINCIPLES</p>
              {tr(
                lang,
                [
                  [
                    "Das Geschäftsmodell zuerst",
                    "Ein guter Klick allein bezahlt keine Rechnung. Angebot, Marge, Abschlussquote und Kundenwert geben den Rahmen vor.",
                  ],
                  [
                    "Hypothesen statt Gewissheiten",
                    "Wir definieren, was wir testen, woran wir Erfolg erkennen und wann wir eine Annahme verwerfen.",
                  ],
                  [
                    "Transparenz statt Inszenierung",
                    "Keine erfundenen Referenzen oder Garantien. Leistung, Kosten und Grenzen der Messung bleiben nachvollziehbar.",
                  ],
                ],
                [
                  [
                    "The business model comes first",
                    "A good click alone does not pay the bills. Offer, margin, close rate and customer value set the frame.",
                  ],
                  [
                    "Hypotheses, not certainty",
                    "We define what we test, how we recognize success and when to reject an assumption.",
                  ],
                  [
                    "Transparency over appearance",
                    "No invented references or guarantees. Work, costs and measurement limits remain clear.",
                  ],
                ],
                [
                  [
                    "Спочатку бізнес-модель",
                    "Хороший клік сам по собі не оплачує рахунки. Пропозиція, маржа, частка угод і цінність клієнта задають рамки.",
                  ],
                  [
                    "Гіпотези замість упевненості",
                    "Визначаємо, що перевіряємо, як розпізнаємо успіх і коли відхиляємо припущення.",
                  ],
                  [
                    "Прозорість замість декорацій",
                    "Без вигаданих рекомендацій і гарантій. Робота, витрати та межі вимірювання залишаються зрозумілими.",
                  ],
                ],
                [
                  [
                    "Сначала бизнес-модель",
                    "Хороший клик сам по себе не оплачивает счета. Предложение, маржа, доля сделок и ценность клиента задают рамки.",
                  ],
                  [
                    "Гипотезы вместо уверенности",
                    "Определяем, что проверяем, как распознаём успех и когда отвергаем предположение.",
                  ],
                  [
                    "Прозрачность вместо декораций",
                    "Без выдуманных рекомендаций и гарантий. Работа, расходы и ограничения измерения остаются понятными.",
                  ],
                ],
              ).map(([h, p], i) => (
                <div key={h}>
                  <span className="eyebrow">0{i + 1}</span>
                  <h2>{h}</h2>
                  <p>{p}</p>
                </div>
              ))}
            </section>
            <BottomCTA lang={lang} />
          </>
        ) : slug === "contact" ? (
          <section className="section wrap contact-section standalone-contact">
            <div>
              <p className="eyebrow">LET’S TALK BUSINESS</p>
              <h1 className="pre-line">{c.contactTitle}</h1>
              <p>{c.contactBody}</p>
              <div className="contact-signature">
                AD4GROWTH
                <br />
                Paid Acquisition · Measurement · Optimization
              </div>
            </div>
            <Suspense>
              <ContactForm lang={lang} />
            </Suspense>
          </section>
        ) : slug === "insights" ? (
          <Insights lang={lang} />
        ) : slug.startsWith("insights/") ? (
          <ArticlePage article={findArticle(lang, slug.slice(9))!} />
        ) : (
          <LegalPage lang={lang} privacy={slug === "datenschutz"} />
        )}
      </main>
      <Footer lang={lang} path={suffix} />
    </>
  );
}
function ServicePage({ lang, chat }: { lang: Locale; chat: boolean }) {
  const c = copy(lang),
    s = serviceCopy(lang, chat),
    name = chat ? "ChatGPT Ads" : "Google Ads",
    id = chat ? "chatgpt_ads" : "google_ads";
  return (
    <>
      <section className="page-hero wrap">
        <p className="eyebrow">
          {chat ? "02" : "01"} / {name.toUpperCase()}
        </p>
        <h1 className="pre-line">{s.title}</h1>
        <p>{s.intro}</p>
        <Link href={`/${lang}/contact?service=${id}`} className="button">
          {c.serviceCta(name)}
          <span>↗</span>
        </Link>
      </section>
      <div className="service-sequence wrap">
        {s.steps.map((x, i) => (
          <span key={x}>
            {x}
            {i < s.steps.length - 1 && <b>→</b>}
          </span>
        ))}
      </div>
      {chat && (
        <aside className="availability-note wrap">
          <span className="eyebrow">ACCESS FIRST</span>
          <p>
            {c.availability}{" "}
            {tr(
              lang,
              "Anfrage bedeutet keine Zusage eines sofortigen Starts. Umfang und Umsetzung werden vor Beauftragung bestätigt.",
              "An inquiry does not imply an immediate launch. Scope and execution are confirmed before commissioning.",
              "Запит не означає негайного запуску. Обсяг і реалізацію підтверджуємо до замовлення.",
              "Запрос не означает немедленного запуска. Объём и реализацию подтверждаем до заказа.",
            )}
          </p>
        </aside>
      )}
      <section className="section wrap service-detail">
        <div>
          <p className="eyebrow">THE APPROACH</p>
          <h2>{s.section}</h2>
          <p>{s.body}</p>
        </div>
        <div className="work-list">
          {s.work.map(([title, body], i) => (
            <article key={title}>
              <span className="eyebrow">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
      <Pricing lang={lang} service={chat ? "chatgptAds" : "googleAds"} />
      <BottomCTA lang={lang} service={id} />
    </>
  );
}
function Insights({ lang }: { lang: Locale }) {
  const demo = demoArticle(lang),
    articles = publishedArticles(lang);
  return (
    <>
      <section className="page-hero wrap insights-hero">
        <p className="eyebrow">THE PERFORMANCE JOURNAL</p>
        <h1>Insights</h1>
        <p>
          {tr(
            lang,
            "Gedanken, Methoden und künftig echte Experimente. Über Nachfrage, Messung und bessere Entscheidungen.",
            "Ideas, methods and, in time, real experiments. On demand, measurement and better decisions.",
            "Думки, методи та згодом справжні експерименти. Про попит, вимірювання й обґрунтовані рішення.",
            "Мысли, методы и со временем реальные эксперименты. О спросе, измерении и обоснованных решениях.",
          )}
        </p>
      </section>
      <section className="section wrap insights-list">
        {articles.length === 0 && (
          <p className="editorial-empty">
            {tr(
              lang,
              "Noch keine redaktionell freigegebenen Artikel. Die folgende Vorlage zeigt das Format für kommende Beiträge.",
              "No editorially approved articles yet. The template below demonstrates the format for future pieces.",
              "Редакційно схвалених статей поки немає. Шаблон нижче показує формат майбутніх матеріалів.",
              "Редакционно одобренных статей пока нет. Шаблон ниже показывает формат будущих материалов.",
            )}
          </p>
        )}
        {articles.map((a) => (
          <Link
            className="article-list-item"
            key={a.slug}
            href={`/${lang}/insights/${a.slug}`}
          >
            <span className="eyebrow">{a.category}</span>
            <h2>{a.title}</h2>
            <span className="article-read">{a.readingMinutes} min ↗</span>
          </Link>
        ))}
        <Link
          className="article-list-item"
          href={`/${lang}/insights/${demo.slug}`}
        >
          <span className="eyebrow">DEMO / MEASUREMENT</span>
          <h2>{demo.title}</h2>
          <span className="article-read">
            {demo.readingMinutes} min <b>↗</b>
          </span>
        </Link>
        <p className="subtle">
          {tr(
            lang,
            "Lehrbeispiel, kein Kundenfall. Nicht für Suchmaschinen indexiert.",
            "Educational example, not a client case. Excluded from search indexing.",
            "Навчальний приклад, не кейс клієнта. Виключено з пошукової індексації.",
            "Учебный пример, не кейс клиента. Исключено из поисковой индексации.",
          )}
        </p>
      </section>
      <BottomCTA lang={lang} />
    </>
  );
}
