import { business, euro, setupPrice, monthlyPrice, type Locale } from "@/lib/config";
import { copy, tr } from "@/lib/content/copy";
import { scopeCopy } from "@/lib/content/scope";
export function ServicePrice({ lang, chat }: { lang: Locale; chat: boolean }) {
  const key = chat ? "chatgptAds" : "googleAds",
    c = copy(lang);
  return (
    <div className="service-price-summary" id="pricing">
      <div className="service-price-values">
        <div>
          <span>{c.oneTime}</span>
          <strong><button type="button" className="price-reaction">{euro(setupPrice(key))}</button></strong><small className="net-price-label">netto</small>

        </div>
        <div>
          <span>
            {tr(lang, "BETREUUNG", "MANAGEMENT", "УПРАВЛІННЯ", "УПРАВЛЕНИЕ")}
          </span>
          <strong><button type="button" className="price-reaction">{euro(monthlyPrice(key))}</button></strong><small className="net-price-label">netto</small>
          <small>{c.month}</small>
        </div>
      </div>
      <p>
        {c.media}: {tr(lang, "ab", "from", "від", "от")}{" "}
        {euro(business.minimumMediaBudget)} {c.month}.
      </p>
      <p className="service-tax-note">{c.taxNote}</p>
      <p className="service-launch-note">
        {c.launchNote.replace("{n}", String(business.launch.clientLimit))}
      </p>
    </div>
  );
}
export function ServiceScope({ lang, chat }: { lang: Locale; chat: boolean }) {
  const s = scopeCopy(lang, chat);
  return (
    <section className="service-scope wrap" id="scope">
      <div className="chat-delivery-heading">
        <p className="kicker">
          {tr(
            lang,
            "LEISTUNGSUMFANG",
            "SCOPE OF WORK",
            "СКЛАД РОБІТ",
            "СОСТАВ РАБОТ",
          )}
        </p>
        <h2>
          {tr(
            lang,
            "Einmal einrichten. Laufend betreuen",
            "Set up once. Manage continuously",
            "Разове налаштування. Постійне управління",
            "Разовая настройка. Постоянное управление",
          )}
        </h2>
      </div>
      <div className="service-scope-columns">
        {[
          [s.setupTitle, s.setup],
          [s.ongoingTitle, s.ongoing],
        ].map(([title, items], i) => (
          <div key={i}>
            <h3>{title}</h3>
            <ul>
              {(items as string[]).map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
