import { business, euro, setupPrice, type Locale } from "@/lib/config";
import { copy } from "@/lib/content/copy";
import { TrackedLink } from "./navigation";
export function Hero({ lang = "de" }: { lang?: Locale }) {
  const c = copy(lang);
  return (
    <section className="hero wrap">
      <div className="hero-main">
        <p className="eyebrow">
          <span className="mini-mark">4</span> PERFORMANCE ADVERTISING / DACH
        </p>
        <h1>
          TURN INTENT
          <br />
          INTO{" "}
          <span className="growth-word">
            GROWTH
            <svg
              viewBox="0 0 430 16"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M0 12L428 2" />
            </svg>
          </span>
        </h1>
        <p className="hero-copy">{c.intro}</p>
        <TrackedLink
          href={`/${lang}/contact`}
          className="button"
          event="hero_cta_click"
          parameters={{ locale: lang }}
        >
          {c.cta}
          <span>↗</span>
        </TrackedLink>
        <div className="hero-foot">
          <span>PAID ACQUISITION</span>
          <span>MEASUREMENT</span>
          <span>OPTIMIZATION</span>
        </div>
      </div>
      <aside className="hero-prices" aria-label={c.nav[4]}>
        <div className="price-top">
          <span>YOUR NEXT GROWTH CHANNEL</span>
          <span>↓</span>
        </div>
        {business.services.map((s) => (
          <TrackedLink
            className={`hero-price-row ${s.key === "chatgptAds" ? "conversation-price" : "search-price"}`}
            key={s.id}
            href={`/${lang}/${s.slug}`}
            event={
              s.id === "google_ads" ? "google_ads_select" : "chatgpt_ads_select"
            }
            parameters={{ location: "hero" }}
          >
            <div className="service-title">
              <span className="eyebrow">{s.number} /</span>
              <h2>{s.name}</h2>
              <span>↗</span>
            </div>
            <p className="product-intent">
              {s.key === "googleAds"
                ? "SEARCH INTENT"
                : "CONVERSATIONAL INTENT"}
            </p>
            <div className="price-columns">
              <div>
                <span className="label">{c.oneTime}</span>
                <div className="price-number">
                  {business.launch.active && (
                    <s>{euro(business.pricing[s.key].normalSetup)}</s>
                  )}{" "}
                  {euro(setupPrice(s.key))}
                </div>
                {business.launch.active && (
                  <span className="launch-label">LAUNCH SETUP</span>
                )}
              </div>
              <div>
                <span className="label">MANAGEMENT</span>
                <div className="price-number">
                  {euro(business.pricing[s.key].monthly)}
                </div>
                <span className="price-unit">{c.month}</span>
              </div>
            </div>
            <span className="media-note">{c.media}</span>
          </TrackedLink>
        ))}
        <p className="fine">
          {c.launchNote.replace("{n}", String(business.launch.clientLimit))}
          <br />
          {c.availability}
        </p>
      </aside>
    </section>
  );
}
