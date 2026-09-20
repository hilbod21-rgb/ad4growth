import { ArrowUpRight } from "lucide-react";
import { AnalyticsConsent } from "./analytics-consent";
import { publishedArticles } from "@/lib/content/articles";
import { InteractiveWordmark } from "./interactive-wordmark";
import { Fragment } from "react";
import { scopeCopy } from "@/lib/content/scope";
import { business, euro, setupPrice, monthlyPrice, type Locale } from "@/lib/config";
import { copy, tr } from "@/lib/content/copy";
import { TrackedLink, Languages } from "./navigation";
export function Pricing({
  lang,
  service,
}: {
  lang: Locale;
  service?: "googleAds" | "chatgptAds";
}) {
  const c = copy(lang);
  const services = business.services.filter(
    (s) => !service || service === s.key,
  );
  return (
    <section className="section wrap pricing" id="pricing">
      <div className="section-heading">
        <p className="eyebrow">PRICING / LEISTUNGEN</p>
        <h2 className="pre-line">{c.pricingTitle}</h2>
        <p>{c.pricingBody}</p>
      </div>
      <div className="pricing-table">
        {services.map((s) => (
          <Fragment key={s.id}>
            <div className="pricing-line">
              <div>
                <span className="eyebrow">{s.number} /</span>
                <h3>{s.name}</h3>
              </div>
              <div>
                <span className="label">{c.oneTime}</span>
                <strong><button type="button" className="price-reaction">{euro(setupPrice(s.key))}</button></strong><small className="net-price-label">netto</small>
              </div>
              <div>
                <span className="label">MANAGEMENT</span>
                <strong><button type="button" className="price-reaction">{euro(monthlyPrice(s.key))}</button></strong><small className="net-price-label">netto</small>
                <span className="price-unit">{c.month}</span>
              </div>
              <TrackedLink
                className="text-link"
                href={`/${lang}/contact?service=${s.id}`}
                event="pricing_cta_click"
                parameters={{ service: s.id, location: "pricing" }}
              >
                {c.serviceCta(s.name)} <ArrowUpRight className="ui-icon" aria-hidden="true" strokeWidth={1.5} />
              </TrackedLink>
            </div>
            <div className="scope-row">
              <div>
                <p className="eyebrow">
                  {s.key === "googleAds"
                    ? "SEARCH INTENT"
                    : "CONVERSATIONAL INTENT"}
                </p>
                <p>{c.media}</p>
              </div>
              <div>
                <h4>{scopeCopy(lang, s.key === "chatgptAds").setupTitle}</h4>
                <ul>
                  {scopeCopy(lang, s.key === "chatgptAds").setup.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>{scopeCopy(lang, s.key === "chatgptAds").ongoingTitle}</h4>
                <ul>
                  {scopeCopy(lang, s.key === "chatgptAds").ongoing.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Fragment>
        ))}
      </div>
      <p className="pricing-note pricing-footnote"><strong className="pricing-footnote-label">{c.pricesLabel}</strong>{c.taxNote}</p>
      {c.launchNote && <p className="pricing-note pricing-footnote"><strong className="pricing-footnote-label launch-label">{c.launchLabel.replace("{n}", String(business.launch.clientLimit))}</strong>{c.launchNote}</p>}
      {(!service || service === "chatgptAds") && (
        <p className="pricing-note">{c.availability}</p>
      )}
    </section>
  );
}
export function Footer({ lang, path }: { lang: Locale; path: string }) {
  const c = copy(lang);
  return (
    <footer className="footer wrap">
      <div className="footer-top">
        <div>
          <InteractiveWordmark lang={lang} />
          <p>Advertising for Growth</p>
        </div>
        <nav aria-label="Footer">
          {["google-ads", "chatgpt-ads", "insights", "about", "contact"].map(
            (s, i) => s === "insights" && !publishedArticles(lang).length ? null : (
              <a key={s} href={`/${lang}/${s}`}>
                {i < 4 ? c.nav[i] : c.contact}
              </a>
            ),
          )}
        </nav>
        <div>
          {business.founder.linkedin && (
            <TrackedLink
              event="linkedin_click"
              href={business.founder.linkedin}
            >
              LinkedIn <ArrowUpRight className="ui-icon" aria-hidden="true" strokeWidth={1.5} />
            </TrackedLink>
          )}
          <Languages lang={lang} path={path} />
        </div>
      </div>
      <div className="footer-bottom">
        <AnalyticsConsent lang={lang} />
        <span>© {new Date().getFullYear()} AD4GROWTH</span>
        <span>PAID ACQUISITION / MEASUREMENT / OPTIMIZATION</span>
        <div>
          <a href={`/${lang}/impressum`}>{c.imprint}</a>
          <a href={`/${lang}/datenschutz`}>{c.privacy}</a>
        </div>
      </div>
    </footer>
  );
}
export function Breadcrumb({ lang, title }: { lang: Locale; title: string }) {
  return (
    <nav className="breadcrumb wrap" aria-label="Breadcrumb">
      <a href={`/${lang}`}>{copy(lang).home}</a>
      <span>/</span>
      <span>{title}</span>
    </nav>
  );
}
export function BottomCTA({
  lang,
  service,
}: {
  lang: Locale;
  service?: string;
}) {
  const c = copy(lang);
  return (
    <section className="bottom-cta wrap">
      <h2>
        {tr(
          lang,
          "Vom Plan zum nächsten Schritt",
          "From a plan to the next step",
          "Від плану до наступного кроку",
          "От плана к следующему шагу",
        )}
      </h2>
      <a
        className="button"
        href={`/${lang}/contact${service ? `?service=${service}` : ""}`}
      >
        {c.cta}
        <span><ArrowUpRight className="ui-icon" aria-hidden="true" strokeWidth={1.5} /></span>
      </a>
    </section>
  );
}
