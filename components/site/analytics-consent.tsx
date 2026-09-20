"use client";

import { useEffect, useState } from "react";
import { configureAnalytics } from "@/lib/analytics";
import type { Locale } from "@/lib/config";

const ID = "G-Y7MJDDGWE8";
const KEY = "ad4growth-analytics-consent";
type AnalyticsWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
let started = false;
function enable() {
  if (started) return;
  started = true;
  const w = window as AnalyticsWindow;
  w.dataLayer ||= [];
  w.gtag = function () { w.dataLayer!.push(arguments); };
  w.gtag("consent", "default", { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
  w.gtag("js", new Date());
  w.gtag("config", ID, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false });
  // Native links load a new document. Send exactly one view, without query parameters.
  const location = window.location.origin + window.location.pathname;
  w.gtag("event", "page_view", { page_location: location, page_title: document.title, page_referrer: document.referrer ? new URL(document.referrer).origin : "" });
  configureAnalytics((event, parameters) => {
    if (event !== "page_view") w.gtag?.("event", event, { ...parameters, page_location: location });
  });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${ID}`;
  script.id = "google-analytics";
  document.head.appendChild(script);
}
const labels = {
  de: ["Analyse-Einstellungen", "Dürfen wir die Nutzung mit Google Analytics messen? Optional; ohne Zustimmung bleibt die Analyse ausgeschaltet.", "Zustimmen", "Ablehnen", "Datenschutz"],
  en: ["Analytics settings", "May we measure usage with Google Analytics? Optional; analytics stays off without your consent.", "Accept", "Decline", "Privacy"],
  uk: ["Налаштування аналітики", "Дозволити аналіз відвідувань через Google Analytics? Це необов’язково; без згоди аналітика вимкнена.", "Дозволити", "Відхилити", "Конфіденційність"],
  ru: ["Настройки аналитики", "Разрешить анализ посещений через Google Analytics? Это необязательно; без согласия аналитика выключена.", "Разрешить", "Отклонить", "Конфиденциальность"],
};
export function AnalyticsConsent({ lang }: { lang: Locale }) {
  const [open, setOpen] = useState(false);
  const t = labels[lang];
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "null");
      if (saved && Date.now() - saved.at < 180 * 86400000) {
        if (saved.accepted) enable();
      } else setOpen(true);
    } catch { setOpen(true); }
  }, []);
  function choose(accepted: boolean) {
    try { localStorage.setItem(KEY, JSON.stringify({ accepted, at: Date.now() })); } catch {}
    setOpen(false);
    if (accepted) enable();
    else if (started) {
      configureAnalytics(null);
      // Reload into the denied state, stopping tags already loaded in this document.
      for (const cookie of document.cookie.split(";")) {
        const name = cookie.split("=")[0].trim();
        if (name === "_ga" || name.startsWith("_ga_")) {
          for (const domain of ["", `;domain=${window.location.hostname}`, ";domain=.ad4growth.com"])
            document.cookie = `${name}=;Max-Age=0;path=/${domain}`;
        }
      }
      window.location.reload();
    }
  }
  return <>
    <button className="analytics-settings" onClick={() => setOpen(true)}>{t[0]}</button>
    {open && <section className="analytics-consent" role="region" aria-label={t[0]}>
      <p>{t[1]} <a href={`/${lang}/datenschutz`}>{t[4]}</a></p>
      <div><button onClick={() => choose(false)}>{t[3]}</button><button className="consent-accept" onClick={() => choose(true)}>{t[2]}</button></div>
    </section>}
  </>;
}
