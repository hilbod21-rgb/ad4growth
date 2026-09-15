"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
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
    <Link {...props} onClick={() => track(event, parameters)}>
      {children}
    </Link>
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
    <DropdownMenu>
      <DropdownMenuTrigger
        className="language-trigger"
        aria-label="Choose language"
      >
        {lang.toUpperCase()} <span>⌄</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="language-dropdown">
        {business.languages.map((l) => (
          <DropdownMenuItem asChild key={l}>
            <Link
              href={`/${l}${path}`}
              aria-current={l === lang ? "page" : undefined}
              onClick={() =>
                track("language_change", { from: lang, to: l, path })
              }
            >
              {
                {
                  de: "Deutsch",
                  en: "English",
                  uk: "Українська",
                  ru: "Русский",
                }[l]
              }{" "}
              {l === lang ? "✓" : ""}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
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
            <Link
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
            </Link>
          ))}
          <Link href={`/${lang}#approach`}>
            {
              {
                de: "Betreuung",
                en: "Management",
                uk: "Управління",
                ru: "Управление",
              }[lang]
            }
          </Link>
        </nav>
        <Link className="header-cta" href={`/${lang}/contact`}>
          {c.cta} ↗
        </Link>
        <ThemeToggle lang={lang} />
        <Languages lang={lang} path={path} />
        <details className="mobile-menu" key={usePathname()}>
          <summary aria-label="Menu">☰</summary>
          <nav>
            {links.map((s, i) => s === "insights" && !blogEnabled ? null : (
              <Link key={s} href={`/${lang}/${s}`}>
                {i === 2
                  ? {
                      de: "Blog",
                      en: "Blog",
                      uk: "Blog",
                      ru: "Blog",
                    }[lang]
                  : c.nav[i]}
              </Link>
            ))}
            <Link href={`/${lang}#approach`}>
              {
                {
                  de: "Betreuung",
                  en: "Management",
                  uk: "Управління",
                  ru: "Управление",
                }[lang]
              }
            </Link>
          </nav>
        </details>
      </header>
    </>
  );
}
