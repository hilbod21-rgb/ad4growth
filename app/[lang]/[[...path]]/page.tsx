import { GoogleService } from "@/components/site/google-service";
import { ChatGPTService } from "@/components/site/chatgpt-service";
import { operator } from "@/lib/content/operator";
import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { business, isLocale, type Locale } from "@/lib/config";
import { copy, tr } from "@/lib/content/copy";
import {
  publishedArticles,
  findArticle,
} from "@/lib/content/articles";
import { Header, PageEvents } from "@/components/site/navigation";
import { Home } from "@/components/site/home";
import { Footer, Breadcrumb, BottomCTA } from "@/components/site/sections";

import { ContactForm } from "@/components/site/contact-form";
import { ArticlePage } from "@/components/site/article";
import { LegalPage } from "@/components/site/legal";
type Props = { params: Promise<{ lang: string; path?: string[] }> };
const routes = [
  "",
  "google-ads",
  "chatgpt-ads",
  "insights",
  "about",
  "contact",
  "impressum",
  "datenschutz",
];
const validRoute = (lang: Locale, path: string) =>
  (routes.includes(path) && (path !== "insights" || publishedArticles(lang).length > 0)) ||
  (path.startsWith("insights/") && !!findArticle(lang, path.slice(9)));
function pageTitle(lang: Locale, path: string) {
  const c = copy(lang);
  return path === ""
    ? tr(
        lang,
        "Performance Marketing: Google Ads & ChatGPT Ads",
        "Performance Marketing: Google Ads & ChatGPT Ads",
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
                ? "Blog"
                : path === "google-ads"
                  ? tr(lang, "Google Ads Betreuung & SEA", "Google Ads management & paid search", "Управління Google Ads та пошукова реклама", "Управление Google Ads и поисковая реклама")
                  : tr(lang, "ChatGPT Ads: Strategie & Betreuung", "ChatGPT Ads strategy & management", "ChatGPT Ads: стратегія та управління", "ChatGPT Ads: стратегия и управление");
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
        ...business.languages.filter(l => !p.startsWith("insights/") || !!findArticle(l, p.slice(9))).map((l) => [
          l,
          business.domain + `/${l}` + suffix,
        ]),
        ...(!p.startsWith("insights/") || findArticle("de", p.slice(9)) ? [["x-default", business.domain + "/de" + suffix]] : []),
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
      member: { "@id": business.domain + "/#operator" },
    },
    { "@type": "WebPage", name: title, url, inLanguage: lang },
  ];
  structured.push({
    "@type": "Person",
    "@id": business.domain + "/#operator",
    name: operator.name,
    jobTitle: operator.role,
    homeLocation: { "@type": "Place", name: "Dresden" },
    url: business.domain + `/${lang}/#operator`,
    image: business.domain + operator.portrait,
    sameAs: [operator.linkedin],
    worksFor: { "@id": business.domain + "/#organization" },
  });
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
          url:
            business.domain +
            (a.author.type === "Person"
              ? `/${lang}/#operator`
              : `/${lang}/about`),
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
      <Header lang={lang} path={suffix} blogEnabled={publishedArticles(lang).length > 0} />
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
          <Home lang={lang} />
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
                  "AD4GROWTH steht für Suchmaschinenwerbung (SEA) und Paid Acquisition mit Google Ads und ChatGPT Ads. Die Zusammenarbeit erfolgt online, mit direktem Ansprechpartner in Dresden: vom Kampagnenaufbau bis zur laufenden Betreuung.",
                  "AD4GROWTH focuses on paid search (SEA) and paid acquisition through Google Ads and ChatGPT Ads. Work together online with a direct contact in Dresden, from campaign setup to ongoing management.",
                  "AD4GROWTH — це пошукова реклама (SEA) та платне залучення через Google Ads і ChatGPT Ads. Співпрацюємо онлайн, з прямим контактом у Дрездені: від налаштування кампаній до постійного управління.",
                  "AD4GROWTH — это поисковая реклама (SEA) и платное привлечение через Google Ads и ChatGPT Ads. Работаем онлайн, с прямым контактом в Дрездене: от настройки кампаний до постоянного управления.",
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
              <a className="text-link" href="mailto:contact@ad4growth.com">contact@ad4growth.com ↗</a>
              <div className="contact-signature">
                AD4GROWTH
                <br />
                Paid Acquisition · Measurement · Optimization
              </div>
            </div>
            <Suspense>
              <ContactForm lang={lang} deliveryConfigured={!!(process.env.RESEND_API_KEY && process.env.INQUIRY_FROM && process.env.INQUIRY_TO)} />
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
  return chat ? <ChatGPTService lang={lang} /> : <GoogleService lang={lang} />;
}
function Insights({ lang }: { lang: Locale }) {
  const articles = publishedArticles(lang);
  return (
    <>
      <section className="page-hero wrap insights-hero">
        <p className="eyebrow">SEA / GOOGLE ADS / CHATGPT ADS</p>
        <h1>Blog</h1>
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
      </section>
      <BottomCTA lang={lang} />
    </>
  );
}
