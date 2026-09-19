import { ArrowUpRight } from "lucide-react";
export default function NotFound() {
  return (
    <main className="not-found wrap">
      <p className="eyebrow">AD4GROWTH / 404</p>
      <h1>Page not found</h1>
      <p>Diese Seite ist nicht verfügbar.</p>
      <a className="button" href="/de">
        Zur Startseite <ArrowUpRight className="ui-icon" aria-hidden="true" strokeWidth={1.5} />
      </a>
    </main>
  );
}
