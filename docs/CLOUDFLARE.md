# Independent Cloudflare deployment

Current target: Cloudflare Workers in the owner's account. Contabo setup is paused; old deployment files are reference only. Cloudflare DNS / Email Routing are reported active by the owner, not independently verified here.

The worker is a compiled version of the original application. `vite.cloudflare.config.ts` deliberately omits the Sites plugin and private auth proxy. It requires no Astra, ChatGPT, Work session, agent, scheduled AI execution, or Contabo process. Cloudflare runs HTTP requests; the browser runs animations locally. Future AI development is optional and only initiated by the owner. Hosting/provider limits and charges remain separate from AI usage.

```sh
npm ci --include=dev
npm run build:cloudflare
# Authenticate Wrangler locally in the owner's Cloudflare account first.
npm run deploy:cloudflare
```

Deploy initially to workers.dev for verification, then bind ad4growth.com as a Worker Custom Domain using the actual Cloudflare account/zone. Do not create guessed IP records. Configure www to redirect to HTTPS apex after verifying both names. The project does not contain an account ID/token or invented DNS configuration. `SITE_ORIGIN` must match the preview origin for preview form tests, and https://ad4growth.com in production.

Required outgoing mail setup: RESEND_API_KEY, INQUIRY_FROM (verified sender), INQUIRY_TO=contact@ad4growth.com. Keep secrets in Workers Secrets. Email Routing forwards received mail to the existing private destination; that destination must never enter source, rendered HTML or browser analytics. Do not assume inbound routing has configured an outgoing form service. No real inbox delivery has yet been verified.

Before public launch, configure per-IP abuse protection for /api/inquiry at Cloudflare. The Node proxy rate limiter is not a distributed Workers limiter; do not enable TRUST_PROXY for arbitrary client-supplied headers. Complete legal pages, verify real form delivery, inspect preview, then attach the domain. No deployment/DNS mutation has been performed in this session.

Official deployment reference: https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/
