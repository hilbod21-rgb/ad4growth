# Editorial and measurement

## Blog later

No CMS/admin exists. Existing article renderer, block types, categories, charts and demo source are preserved. Empty `/LANG/insights` and unpublished/demo URLs return 404 and are absent from sitemap/navigation. Nothing is rebuilt.

1. Add the real article to `articleRegistry` in `lib/content/articles.ts`, using the existing `Article` interface and blocks. Use a unique slug, locale, real dates, approved references and `status: "published"`.
2. Build and review. Navigation, homepage section and sitemap enable automatically for locales with published articles.
3. Add translations as entries with the same slug and their own locale. Publish only approved translations. Drafts never enter public feeds.
4. Commit, build and deploy. Demo source is a template, not published content.

## Pricing

`lib/config.ts` owns prices and `business.launch.active`. Current launch: Google 490 setup / 490 monthly; ChatGPT 690 / 590. Planned regular amounts are centrally configured: Google 640 / 640; ChatGPT 900 / 770 (~30% higher, rounded). Turn `launch.active` off after the third agreed launch project; the app does not know your sales count. There is no countdown or fabricated remaining-slot counter. Honor agreed terms for existing contracts. All displayed fees are net B2B, VAT where applicable; media >=500/month is separate.

## Analytics

No tracker is automatically loaded. `lib/analytics.ts` has a provider adapter and `enableDataLayerAnalytics()` for a consent-aware GTM integration. Call only once valid consent is available; call `configureAnalytics(null)` on revocation and handle already-loaded vendor scripts in your CMP. IDs alone do not make tracking live. Do not send form names/emails/messages as analytics parameters.

Events include page_view, language_change, cta_click, pricing_cta_click, hero_cta_click, service selection, metric_open, contact_form_start, contact_form_attempt, contact_form_submit (ONLY provider-accepted success), article_view, email_click and linkedin_click. Configure GA4 manual pageviews to avoid double counting with its automatic pageview. Google Ads lead conversion must trigger only on successful `contact_form_submit`, not click/attempt. GTM, GA4, Ads IDs and a consent implementation are still missing. No fake analytics/conversions are emitted.

Search Console: set GOOGLE_SITE_VERIFICATION before build, or use Google's actual DNS verification value. Submit https://ad4growth.com/sitemap.xml only after public launch.
