import Link from "next/link";
import { Fragment } from "react";
import { scopeCopy } from "@/lib/content/scope";
import { business, euro, setupPrice, type Locale } from "@/lib/config";
import { copy, tr } from "@/lib/content/copy";
import { TrackedLink, Languages } from "./navigation";
export function Services({ lang }: { lang: Locale }) {
  const c = copy(lang);
  return (
    <section className="section wrap">
      <div className="section-heading">
        <p className="eyebrow">04 / TWO PRODUCTS</p>
        <h2>{c.servicesTitle}</h2>
      </div>
      <div className="services-grid">
        {business.services.map((s, i) => (
          <article key={s.id}>
            <div className="service-heading">
              <span className="eyebrow">{s.number} /</span>
              <h3>{s.name}</h3>
              <span aria-hidden="true">↗</span>
            </div>
            <p>{i ? c.chatShort : c.googleShort}</p>
            <TrackedLink
              event="service_select"
              parameters={{ service: s.id, locale: lang }}
              href={`/${lang}/${s.slug}`}
              className="text-link"
            >
              {c.explore} ↗
            </TrackedLink>
          </article>
        ))}
      </div>
    </section>
  );
}
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
        <p className="eyebrow">05 / THE INVESTMENT</p>
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
                {business.launch.active && (
                  <s>{euro(business.pricing[s.key].normalSetup)}</s>
                )}
                <strong>{euro(setupPrice(s.key))}</strong>
              </div>
              <div>
                <span className="label">MANAGEMENT</span>
                <strong>{euro(business.pricing[s.key].monthly)}</strong>
                <span className="price-unit">{c.month}</span>
              </div>
              <TrackedLink
                className="text-link"
                href={`/${lang}/contact?service=${s.id}`}
                event="pricing_cta_click"
                parameters={{ service: s.id, location: "pricing" }}
              >
                {c.serviceCta(s.name)} ↗
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
      <p className="pricing-note">
        {c.launchNote.replace("{n}", String(business.launch.clientLimit))}{" "}
        {c.taxNote}
      </p>
      {(!service || service === "chatgptAds") && (
        <p className="pricing-note">{c.availability}</p>
      )}
    </section>
  );
}
export function Fit({ lang }: { lang: Locale }) {
  const c = copy(lang);
  return (
    <section className="section wrap fit">
      <div>
        <p className="eyebrow">06 / THE RIGHT FIT</p>
        <h2 className="pre-line">{c.fitTitle}</h2>
      </div>
      <div>
        <h3>{c.goodFit}</h3>
        <ul>
          {c.fitYes.map((x) => (
            <li key={x}>
              <span>↗</span>
              {x}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>{c.notYet}</h3>
        <ul>
          {c.fitNo.map((x) => (
            <li key={x}>
              <span>—</span>
              {x}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
export function Founder({
  lang,
  full = false,
}: {
  lang: Locale;
  full?: boolean;
}) {
  const c = copy(lang);
  return (
    <section className={`section wrap founder ${full ? "full-founder" : ""}`}>
      <div>
        <p className="eyebrow">08 / THE OPERATOR</p>
        <h2 className="pre-line">{c.founderTitle}</h2>
      </div>
      <div className="founder-profile">
        {business.founder.portrait && (
          <img
            src={business.founder.portrait}
            width="160"
            height="200"
            alt={business.founder.name}
            loading="lazy"
          />
        )}
        <span className="founder-monogram" aria-hidden="true">
          BS<span>↗</span>
        </span>
        <div>
          <h3>{business.founder.name}</h3>
          <p className="eyebrow">{business.founder.role}</p>
        </div>
      </div>
      <div>
        <p>{c.founderBody}</p>
        {!full && (
          <Link className="text-link" href={`/${lang}/about`}>
            {c.aboutLink} ↗
          </Link>
        )}
      </div>
    </section>
  );
}
export function Footer({ lang, path }: { lang: Locale; path: string }) {
  const c = copy(lang);
  return (
    <footer className="footer wrap">
      <div className="footer-top">
        <div>
          <Link href={`/${lang}`} className="logo">
            AD<span>4</span>GROWTH
          </Link>
          <p>Advertising for Growth.</p>
        </div>
        <nav aria-label="Footer">
          {["google-ads", "chatgpt-ads", "insights", "about", "contact"].map(
            (s, i) => (
              <Link key={s} href={`/${lang}/${s}`}>
                {i < 4 ? c.nav[i] : c.contact}
              </Link>
            ),
          )}
        </nav>
        <div>
          {business.contact.email && (
            <TrackedLink
              event="email_click"
              href={`mailto:${business.contact.email}`}
            >
              E-Mail ↗
            </TrackedLink>
          )}
          {business.founder.linkedin && (
            <TrackedLink
              event="linkedin_click"
              href={business.founder.linkedin}
            >
              LinkedIn ↗
            </TrackedLink>
          )}
          <Languages lang={lang} path={path} />
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} AD4GROWTH</span>
        <span>PAID ACQUISITION / MEASUREMENT / OPTIMIZATION</span>
        <div>
          <Link href={`/${lang}/impressum`}>{c.imprint}</Link>
          <Link href={`/${lang}/datenschutz`}>{c.privacy}</Link>
        </div>
      </div>
    </footer>
  );
}
export function ContactIntro({ lang }: { lang: Locale }) {
  const c = copy(lang);
  return (
    <div className="contact-intro">
      <p className="eyebrow">07 / YOUR NEXT MOVE</p>
      <h2 className="pre-line">{c.contactTitle}</h2>
      <p>{c.contactBody}</p>
      <div className="contact-signature">
        <span className="mini-mark">4</span>
        <span>
          AD4GROWTH
          <br />
          <small>Paid Acquisition · Measurement · Optimization</small>
        </span>
      </div>
    </div>
  );
}
export function Breadcrumb({ lang, title }: { lang: Locale; title: string }) {
  return (
    <nav className="breadcrumb wrap" aria-label="Breadcrumb">
      <Link href={`/${lang}`}>{copy(lang).home}</Link>
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
          "Vom Plan zum nächsten Schritt.",
          "From a plan to the next step.",
          "Від плану до наступного кроку.",
          "От плана к следующему шагу.",
        )}
      </h2>
      <Link
        className="button"
        href={`/${lang}/contact${service ? `?service=${service}` : ""}`}
      >
        {c.cta}
        <span>↗</span>
      </Link>
    </section>
  );
}
