# Verification — 2026-09-15

Verified against original working source and an independent copy in `/tmp/ad4growth-independent-check`, excluding node_modules, caches, local secrets and Sites runtime state.

- Clean `npm ci --include=dev`: PASS, 871 packages installed from the committed lockfile.
- Runtime actually used: Node 24.19.0 / npm 11.6.0.
- `npm run build` (`next build --webpack`): PASS in independent copy.
- Production Node process: PASS on 127.0.0.1:3001, ready in 118 ms. No Sites/Work credentials, Cloudflare runtime, database or external storage used.
- `scripts/verify-production.mjs`: 214 assertions PASS against independently built copy: all 28 existing public locale routes, one H1, language/canonicals, netto prices, Blog hidden, 404/noindex for empty/demo/unknown routes, internal paths/assets, sitemap and German root redirect, invalid/cross-origin/oversized form input and honest unconfigured delivery response.
- Browser: home at 390px and 1440px inspected; no horizontal overflow at 390px. Light and dark inspected. Language menu changed DE to EN and retained dark theme. CTA navigated to contact; validated local test values returned the expected not-delivered status without clearing the form. No real inquiry was delivered.
- Lint: zero errors, one existing raw article-image optimization warning.
- Build: existing middleware naming deprecation warning; no compile/type failures.
- Git diff whitespace check passed.

Not verified: real email acceptance/inbox receipt, actual Contabo OS/resources/proxy/SSL, DNS, authenticated GitHub push, legal correctness/completeness, consent/tag configuration or real analytics. Legal pages remain draft/noindex. Full load testing was not performed. This is a tested source handoff, NOT a declaration that the public business launch is complete.

The official Next.js self-hosting guidance supports Node + reverse proxy deployment: https://nextjs.org/docs/app/guides/self-hosting
Net fee wording is conditional (VAT only where applicable), without claiming the operator's tax status: https://www.gesetze-im-internet.de/ustg_1980/
