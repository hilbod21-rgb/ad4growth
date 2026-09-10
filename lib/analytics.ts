export type AnalyticsEvent =
  | "page_view"
  | "language_change"
  | "hero_cta_click"
  | "service_select"
  | "google_ads_select"
  | "chatgpt_ads_select"
  | "pricing_cta_click"
  | "metric_open"
  | "contact_form_start"
  | "contact_form_submit"
  | "article_view"
  | "article_cta_click"
  | "email_click"
  | "whatsapp_click"
  | "telegram_click"
  | "linkedin_click";
export type AnalyticsAdapter = (
  event: AnalyticsEvent,
  parameters: Record<string, string | number | boolean>,
) => void;
let adapter: AnalyticsAdapter | null = null;
// Configure only after the chosen provider's consent requirements are satisfied.
export function configureAnalytics(next: AnalyticsAdapter | null) {
  adapter = next;
}
export function track(
  event: AnalyticsEvent,
  parameters: Record<string, string | number | boolean> = {},
) {
  adapter?.(event, parameters);
}
