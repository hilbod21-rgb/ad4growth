import Link from "next/link";
import {
  type Article,
  type ArticleBlock,
  publishedArticles,
} from "@/lib/content/articles";
import { copy, tr } from "@/lib/content/copy";
import { TrackedLink } from "./navigation";
export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "heading":
            return b.level === 3 ? (
              <h3 key={i} id={b.id}>
                {b.text}
              </h3>
            ) : (
              <h2 key={i} id={b.id}>
                {b.text}
              </h2>
            );
          case "paragraph":
            return <p key={i}>{b.text}</p>;
          case "list":
            return (
              <ul key={i}>
                {b.items.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            );
          case "quote":
            return <blockquote key={i}>{b.text}</blockquote>;
          case "formula":
            return (
              <pre key={i} className="article-formula">
                {b.text}
              </pre>
            );
          case "code":
            return (
              <pre key={i}>
                <code>{b.text}</code>
              </pre>
            );
          case "callout":
            return (
              <aside className="article-callout" key={i}>
                {b.text}
              </aside>
            );
          case "table":
            return (
              <div className="table-scroll" key={i}>
                <table>
                  <thead>
                    <tr>
                      {b.headers.map((h) => (
                        <th key={h}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((row, j) => (
                      <tr key={j}>
                        {row.map((s, k) => (
                          <td key={k}>{s}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "image":
            return (
              <figure key={i}>
                <img
                  src={b.src}
                  alt={b.alt}
                  width={b.width}
                  height={b.height}
                  loading="lazy"
                />
                <figcaption>{b.caption}</figcaption>
              </figure>
            );
          case "chart":
            return (
              <figure key={i} className="article-chart">
                {b.data.map((d) => (
                  <div key={d.label}>
                    <span>
                      {d.label}: {d.value}
                    </span>
                    <div
                      style={{
                        width: `${(d.value / Math.max(...b.data.map((x) => x.value))) * 100}%`,
                      }}
                    />
                  </div>
                ))}
                <figcaption>{b.caption}</figcaption>
              </figure>
            );
        }
      })}
    </>
  );
}
export function ArticlePage({ article: a }: { article: Article }) {
  const lang = a.locale,
    c = copy(lang);
  const related = publishedArticles(lang).filter((x) =>
    a.relatedSlugs.includes(x.slug),
  );
  return (
    <>
      <section className="article-hero wrap">
        <p className="eyebrow">
          BLOG / {a.category.toUpperCase()} / {a.status.toUpperCase()}
        </p>
        <h1>{a.title}</h1>
        <p>{a.description}</p>
        <div className="article-meta">
          <Link
            href={
              a.author.type === "Person"
                ? `/${lang}/#operator`
                : `/${lang}/about`
            }
          >
            {a.author.name}
          </Link>
          <span>{a.readingMinutes} min</span>
          <span>
            {tr(lang, "Stand", "Updated", "Оновлено", "Обновлено")}{" "}
            {new Date(a.updatedAt).toLocaleDateString(lang)}
          </span>
        </div>
      </section>
      <div className="article-layout wrap">
        <aside className="toc">
          <p className="eyebrow">
            {tr(lang, "INHALT", "CONTENTS", "ЗМІСТ", "СОДЕРЖАНИЕ")}
          </p>
          <nav>
            {a.body
              .filter(
                (b): b is Extract<ArticleBlock, { type: "heading" }> =>
                  b.type === "heading",
              )
              .map((b) => (
                <a href={`#${b.id}`} key={b.id}>
                  {b.text}
                </a>
              ))}
          </nav>
        </aside>
        <article className="article-body">
          <ArticleBody blocks={a.body} />
          {a.references.length > 0 && (
            <section>
              <h2>
                {tr(lang, "Quellen", "References", "Джерела", "Источники")}
              </h2>
              <ul>
                {a.references.map((r) => (
                  <li key={r.url}>
                    <a href={r.url}>{r.title} ↗</a>
                  </li>
                ))}
              </ul>
            </section>
          )}
          <div className="author-note">
            <span className="eyebrow">
              {a.status === "demo"
                ? tr(
                    lang,
                    "VORLAGE ZUR REDAKTIONELLEN FREIGABE",
                    "TEMPLATE AWAITING EDITORIAL APPROVAL",
                    "ШАБЛОН ДЛЯ РЕДАКЦІЙНОГО СХВАЛЕННЯ",
                    "ШАБЛОН ДЛЯ РЕДАКЦИОННОГО ОДОБРЕНИЯ",
                  )
                : tr(lang, "AUTOR", "AUTHOR", "АВТОР", "АВТОР")}
            </span>
            <h3>
              <Link
                href={
                  a.author.type === "Person"
                    ? `/${lang}/#operator`
                    : `/${lang}/about`
                }
              >
                {a.author.name}
              </Link>
            </h3>
            <p>{a.author.role}</p>
          </div>
          <div className="article-cta">
            <h2>
              {tr(
                lang,
                "Welche Conversion zählt für Ihr Geschäft?",
                "Which conversion matters to your business?",
                "Яка конверсія важлива для вашого бізнесу?",
                "Какая конверсия важна для вашего бизнеса?",
              )}
            </h2>
            <TrackedLink
              className="button"
              href={`/${lang}/contact?service=google_ads`}
              event="article_cta_click"
              parameters={{ slug: a.slug, service: "google_ads" }}
            >
              {c.cta}
              <span>↗</span>
            </TrackedLink>
          </div>
          {related.length > 0 && (
            <nav>
              {related.map((r) => (
                <Link key={r.slug} href={`/${lang}/insights/${r.slug}`}>
                  {r.title}
                </Link>
              ))}
            </nav>
          )}
        </article>
      </div>
    </>
  );
}
