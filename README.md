# AD4GROWTH

Multilingual performance advertising website. React 19, TypeScript, Next.js App Router conventions, built with Vinext for Cloudflare Workers and Sites. German is the default; English, Ukrainian and Russian are complete content variants.

## Local development

Use Node 22.13+ and npm. Run `npm ci`, `npm run dev`, `npm run build`. Run `npx tsc --noEmit` for type validation. The lockfile is committed. Framework-specific scripts and deployment adapter are retained from Sites.

## Commercial configuration

`lib/config.ts` is the only source of service pricing: Google Ads €750 normal setup / €490 launch / €490 monthly; ChatGPT Ads €990 / €690 / €590. Advertising budgets are separate. The launch offer applies to setup for the first three clients. There is no bundle product or discount. Turn `business.launch.active` off after launch. Contact, founder, legal and editorial identity are also configured here.

## Routes

`/` redirects to `/de`. Each of `/de`, `/en`, `/uk`, `/ru` has a homepage, `/google-ads`, `/chatgpt-ads`, `/insights`, `/insights/cpa-vs-cac`, `/about`, `/contact`, `/impressum`, and `/datenschutz`. Unknown routes return 404. `app/[lang]/[[...path]]/page.tsx` composes page components and metadata.

## Analytical interface

`components/site/performance-lab.tsx` replaces the old isolated KPI block and generic process section. Budget and allocation sliders share one scenario. The model in `lib/performance.ts` calculates channel spend, impressions, clicks, conversions, customers, revenue, CTR, CPC, CVR, CPA, CAC and ROAS. Inputs are explicitly illustrative, not platform benchmarks or client results. CAC includes recurring management for both managed channels, excludes setup and assumes zero other acquisition costs. Every intermediate count is rounded to whole actions. Deltas compare the changed scenario with the initial scenario, never an invented prior period.

The monthly operating cycle shows illustrative weekly work and outputs. A feature-detected WebMCP tool `configure_acquisition_demo` exposes the same visible scenario state without contacting any advertising account.

## Content

Copy is centralized under `lib/content/`. Articles use a typed local block model, no database. Blocks support headings, paragraphs, lists, formulas, quotes, tables, code, figures, captions, callouts and charts. `Article` includes authorship, publication/update dates, category, tags, references, related content and SEO fields. Add reviewed translations to `articleRegistry`; only `published` entries enter public editorial feeds and the sitemap. An absent localized article deliberately returns 404; never silently substitute another language. The demo article is clearly labeled, has no fictional campaign results and is noindex. It is attributed to AD4GROWTH Research as a template awaiting editorial approval. The homepage is brand-first and has no founder portrait or personal identity section. Case study and experiment types are ready for real future data.

## SEO

Page-specific titles/descriptions, canonical URLs, hreflang, server-rendered locale on `<html>`, Open Graph/X text metadata, sitemap, robots, semantic headings, breadcrumbs, Organization/WebSite/WebPage/Service schema; Article schema for real published articles. Canonical origin is the requested `https://ad4growth.com`. Change `business.domain` only if the intended production domain changes. Do not publicly index the private review deployment. Demo/legal placeholder pages are noindex.

## Contact delivery

The form supports independent Google Ads / ChatGPT Ads checkboxes, contextual preselection, required name/email/message, optional project details, preferred language/communication, and local text download. Values remain in the form after failure; no browser storage is used. API `POST /api/inquiry` validates with Zod, rejects cross-origin submissions and oversized/malformed payloads. The unconfigured adapter responds 503, never fake success, and does not log or store form contents. Replace `inquiryAdapter` in `lib/inquiry.ts` with an authenticated server-side delivery provider. Before activating delivery add rate limiting/bot verification, provider credentials, and the completed privacy notice. Success requires a delivery reference returned by the adapter.

## Analytics

`lib/analytics.ts` defines typed provider-neutral events. No analytics provider or external tracker runs by default. Configure an adapter only after the selected provider's consent requirements are met. Do not send form contents or personal data as analytics parameters.

## Launch prerequisites

- Legal provider identity, serviceable address, email, VAT treatment, applicable registration details.
- Complete privacy notice for actual hosting, request handling, logs, retention, processors and rights.
- Delivery provider and credentials, spam protection; remove the preview-only delivery notice once active.
- Confirm current ChatGPT Ads access, market eligibility, available formats and measurement before promising a launch.
- Confirm contractual terms, launch availability and public domain configuration.
- Optional portrait/social links only if the operator wants them published.
- Editorial approval before publishing real articles; no fabricated cases or proof.
