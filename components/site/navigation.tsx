"use client";
import { useEffect } from "react";
import Link from "next/link";
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
    if (path.includes("/insights/"))
      track("article_view", { locale: lang, path });
  }, [lang, path]);
  return null;
}
export function Languages({ lang, path }: { lang: Locale; path: string }) {
  return (
    <nav className="languages" aria-label="Language">
      {business.languages.map((l) => (
        <Link
          key={l}
          href={`/${l}${path}`}
          aria-current={l === lang ? "page" : undefined}
          onClick={() => track("language_change", { from: lang, to: l, path })}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </nav>
  );
}
export function Header({ lang, path }: { lang: Locale; path: string }) {
  const c = copy(lang);
  const links = ["google-ads", "chatgpt-ads", "insights", "about"];
  return (
    <>
      <a className="skip" href="#main">
        {c.skip}
      </a>
      <header className="header wrap">
        <Link className="logo" href={`/${lang}`}>
          AD<span>4</span>GROWTH
        </Link>
        <nav className="desktop-nav" aria-label="Main">
          {links.map((s, i) => (
            <Link
              key={s}
              href={`/${lang}/${s}`}
              aria-current={path === `/${s}` ? "page" : undefined}
            >
              {c.nav[i]}
            </Link>
          ))}
          <Link href={`/${lang}#pricing`}>{c.nav[4]}</Link>
        </nav>
        <Link className="header-cta" href={`/${lang}/contact`}>
          {c.cta} ↗
        </Link>
        <Languages lang={lang} path={path} />
        <details className="mobile-menu" key={usePathname()}>
          <summary aria-label="Menu">☰</summary>
          <nav>
            {links.map((s, i) => (
              <Link key={s} href={`/${lang}/${s}`}>
                {c.nav[i]}
              </Link>
            ))}
            <Link href={`/${lang}#pricing`}>{c.nav[4]}</Link>
            <Languages lang={lang} path={path} />
          </nav>
        </details>
      </header>
    </>
  );
}
