# AD4GROWTH: production handoff

Original application source, not reconstructed. Production runs Next.js 16.2.6 / React 19.2.6; TypeScript 5.9.3, Tailwind 4.2.1. Existing Vinext 1.0.0-beta.5/Vite 8.0.13 preview path is retained as an optional legacy workflow. No Sites API, account or authentication is required for `npm ci`, `npm run build`, `npm start`.

## Local / clean clone

Use Node 24.19.0 (tested) and npm 11.6.0 (tested). Install dev dependencies for the build:

```sh
npm ci --include=dev
cp .env.example .env.local
npm run build
npm start
```

Open http://127.0.0.1:3000/de. `/` redirects to `/de`. This is a persistent Node server, NOT a static export: request locale and the inquiry API require runtime execution. Standard `next start` serves the verified `.next` output.

## Server setup (Linux VPS, adapt to installed distro)

No SSH access was supplied; nothing has been changed on Contabo. Check `/usr/bin/node --version`, `npm --version`, existing proxy and ports before installing anything. Do not replace another site's proxy configuration. Suggested starting capacity: 1–2 vCPU, 2 GB RAM for serving; allow 4 GB or build elsewhere for compilation. These are estimates, not a load-test result.

Create a dedicated `ad4growth` account and `/srv/ad4growth`, owned by it. Put the repository there. Run the install and build commands above as that account. Install `deployment/ad4growth.service` into `/etc/systemd/system/`. Ensure `/usr/bin/node` is the actual Node 24 binary or edit ExecStart. Store production settings in `/etc/ad4growth.env` (root-owned, 0600; systemd reads it). Do not put `.env.local` or credentials in Git.

```sh
sudo systemctl daemon-reload
sudo systemctl enable --now ad4growth
curl -I http://127.0.0.1:3000/de
sudo journalctl -u ad4growth -n 50 --no-pager
```

Node listens only on loopback port 3000. Public ingress: 80/443 at nginx. The sample nginx file overwrites the IP header used by the single-process inquiry rate limit (5 validated attempts per 10 minutes per IP). Keep Node private. No Redis, app database, CMS, uploads, cron or object storage is required. `.next/cache` may be writable. Rate-limit counters are memory-only and reset at restart; run one process with this implementation. No lead database exists.

## Email (required before commercial launch)

The former stub is replaced by an optional Resend HTTPS adapter. Set `RESEND_API_KEY`, `INQUIRY_FROM` (verified sending domain/address), and `INQUIRY_TO` (your inbox). `SITE_ORIGIN=https://ad4growth.com`; `TRUST_PROXY=1` only behind the supplied proxy. Resend accepts the message before success is shown; acceptance is not proof of inbox delivery. Missing config returns 503, never a fake success. No message body or secret is logged. Outbound HTTPS/443 to api.resend.com is required. Configure the provider's exact domain verification records only from its dashboard, then send one real inquiry and verify receipt and reply-to. This has NOT been verified with real credentials. Record the provider, processing terms and retention in privacy information before launch. Alternative providers can implement `InquiryAdapter` in `lib/inquiry-delivery.ts`.

## Domain and TLS

Canonical origin is https://ad4growth.com, four language paths. No DNS record has been changed. Obtain the actual VPS public IP first. Point the apex at that verified IP and configure www to reach the same server; use IPv6 only if verified. Preserve existing mail records. Obtain a certificate covering both names with the server's existing ACME tool. The provided nginx config expects Let's Encrypt paths and redirects HTTP + www to HTTPS apex. For first certificate issuance, first enable only its HTTP server with the challenge location; then obtain the certificate, enable TLS blocks, `sudo nginx -t`, and reload. Do not enable references to nonexistent certificate files. Verify certificate renewal using your ACME client's dry-run. No DNS values or certificate success are assumed.

## Launch gate

Complete legal entity/address/contact and final privacy text in `lib/config.ts` and `components/site/legal.tsx`; currently legal drafts intentionally remain noindex. Obtain real email receipt. Confirm ChatGPT Ads access/market eligibility before accepting launch commitments. Verify production hostname, language switch, inquiry, themes and mobile layout on actual VPS before opening indexing. Do not advertise this checkout as commercially launch-ready while these gaps remain.

## Updates

Commit reviewed changes; pull the exact release, `npm ci --include=dev`, `npm run build`, then `sudo systemctl restart ad4growth`. Keep a previous source/build release for rollback. Do not run install/build in the active working directory during busy traffic; for later releases use separate release directories and switch after health checks.

Reference: https://nextjs.org/docs/app/guides/self-hosting
