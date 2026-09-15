"use client";
import { useEffect, useSyncExternalStore } from "react";
import { InteractiveWordmark } from "./interactive-wordmark";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { usePathname } from "next/navigation";
import { business, type Locale } from "@/lib/config";
import { copy } from "@/lib/content/copy";
import { track, type AnalyticsEvent } from "@/lib/analytics";
export function TrackedLink({
  event,
  parameters = {},
  children,
  ...props
}: {
  event: AnalyticsEvent;
  parameters?: Record<string, string | number | boolean>;
  children: React.ReactNode;
  href: string;
  className?: string;
}) {
  return (
    <a {...props} onClick={() => track(event, parameters)}>
      {children}
    </a>
  );
}
export function PageEvents({ lang, path }: { lang: Locale; path: string }) {
  useEffect(() => {
    document.documentElement.lang = lang;
    track("page_view", { locale: lang, path });
    const onContact = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>('a');
      if (!link) return;
      if (link.href.includes('linkedin.com/')) track('linkedin_click', {locale:lang});
      else if (link.protocol === 'mailto:') track('email_click', {locale:lang});
      else if (new URL(link.href).pathname.endsWith('/contact')) track('cta_click', {locale:lang,path});
    };
    document.addEventListener('click', onContact);
    if (path.includes("/insights/"))
      track("article_view", { locale: lang, path });
    return () => document.removeEventListener("click", onContact);
  }, [lang, path]);
  return null;
}
export function Languages({ lang, path }: { lang: Locale; path: string }) {
  return (
    <details className="language-menu">
      <summary className="language-trigger" aria-label="Choose language">
        {lang.toUpperCase()} <span aria-hidden="true">⌄</span>
      </summary>
      <nav className="language-dropdown" aria-label="Languages">
        {business.languages.map((l) => (
          <a key={l} href={`/${l}${path}`} hrefLang={l} lang={l}
            aria-current={l === lang ? "page" : undefined}
            onClick={() => track("language_change", { from: lang, to: l, path })}>
            {{ de: "Deutsch", en: "English", uk: "Українська", ru: "Русский" }[l]} {l === lang ? "✓" : ""}
          </a>
        ))}
      </nav>
    </details>
  );
}

const subscribeTheme = (notify: () => void) => {
  window.addEventListener("ad4growth-theme-change", notify);
  return () => window.removeEventListener("ad4growth-theme-change", notify);
};
const themeSnapshot = () => document.documentElement.dataset.theme === "dark";
const serverTheme = () => false;
function ThemeToggle({ lang }: { lang: Locale }) {
  const dark = useSyncExternalStore(subscribeTheme, themeSnapshot, serverTheme);
  const label = {
    de: "Dunkles Design",
    en: "Dark theme",
    uk: "Темна тема",
    ru: "Тёмная тема",
  }[lang];
  return (
    <Button
      variant="ghost"
      size="icon"
      className="theme-toggle"
      aria-label={label}
      aria-pressed={dark}
      title={label}
      onClick={() => {
        const next = document.documentElement.dataset.theme !== "dark";
        document.documentElement.dataset.theme = next ? "dark" : "light";
        window.dispatchEvent(new Event("ad4growth-theme-change"));
        try {
          localStorage.setItem("ad4growth-theme", next ? "dark" : "light");
        } catch {}
      }}
    >
      {dark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
    </Button>
  );
}

export function Header({ lang, path, blogEnabled = false }: { lang: Locale; path: string; blogEnabled?: boolean }) {
  const c = copy(lang);
  const links = ["google-ads", "chatgpt-ads", "insights", "about"];
  return (
    <>
      <a className="skip" href="#main">
        {c.skip}
      </a>
      <header className="header wrap">
        <InteractiveWordmark lang={lang} />
        <nav className="desktop-nav" aria-label="Main">
          {links.map((s, i) => s === "insights" && !blogEnabled ? null : (
            <a
              key={s}
              href={`/${lang}/${s}`}
              aria-current={path === `/${s}` ? "page" : undefined}
            >
              {i === 2
                ? {
                    de: "Blog",
                    en: "Blog",
                    uk: "Blog",
                    ru: "Blog",
                  }[lang]
                : c.nav[i]}
            </a>
          ))}
          <a href={`/${lang}#approach`}>
            {
              {
                de: "Betreuung",
                en: "Management",
                uk: "Управління",
                ru: "Управление",
              }[lang]
            }
          </a>
        </nav>
        <a className="header-cta" href={`/${lang}/contact`}>
          {c.cta} ↗
        </a>
        <ThemeToggle lang={lang} />
        <Languages lang={lang} path={path} />
        <details className="mobile-menu" key={usePathname()}>
          <summary aria-label="Menu">☰</summary>
          <nav>
            {links.map((s, i) => s === "insights" && !blogEnabled ? null : (
              <a key={s} href={`/${lang}/${s}`}>
                {i === 2
                  ? {
                      de: "Blog",
                      en: "Blog",
                      uk: "Blog",
                      ru: "Blog",
                    }[lang]
                  : c.nav[i]}
              </a>
            ))}
            <a href={`/${lang}#approach`}>
              {
                {
                  de: "Betreuung",
                  en: "Management",
                  uk: "Управління",
                  ru: "Управление",
                }[lang]
              }
            </a>
          </nav>
        </details>
      </header>
    </>
  );
}
