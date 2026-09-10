import { business } from "./config";
export type Scenario = { budget: number; googleShare: number };
export type MetricId =
  | "spend"
  | "impressions"
  | "clicks"
  | "conversions"
  | "customers"
  | "revenue"
  | "CTR"
  | "CPC"
  | "CVR"
  | "CPA"
  | "CAC"
  | "ROAS";
export const initialScenario: Scenario = { budget: 5000, googleShare: 60 };
// Teaching assumptions only. These are not measured channel benchmarks.
export const demoAssumptions = {
  google: {
    cpc: 1.8,
    cvr: 0.06,
    closeRate: 0.3,
    customerRevenue: 750,
    ctr: 0.032,
  },
  chatgpt: {
    cpc: 2.4,
    cvr: 0.048,
    closeRate: 0.35,
    customerRevenue: 850,
    ctr: 0.024,
  },
};
export function calculateChannel(
  spend: number,
  a: typeof demoAssumptions.google,
) {
  const clicks = Math.round(spend / a.cpc);
  const impressions = Math.round(clicks / a.ctr);
  const conversions = Math.round(clicks * a.cvr);
  const customers = Math.round(conversions * a.closeRate);
  const revenue = customers * a.customerRevenue;
  return {
    spend,
    clicks,
    impressions,
    conversions,
    customers,
    revenue,
    CPA: conversions ? spend / conversions : 0,
    CVR: clicks ? (100 * conversions) / clicks : 0,
  };
}
export function calculateScenario(s: Scenario) {
  const google = calculateChannel(
    (s.budget * s.googleShare) / 100,
    demoAssumptions.google,
  );
  const chatgpt = calculateChannel(
    s.budget - google.spend,
    demoAssumptions.chatgpt,
  );
  const clicks = google.clicks + chatgpt.clicks,
    impressions = google.impressions + chatgpt.impressions,
    conversions = google.conversions + chatgpt.conversions,
    customers = google.customers + chatgpt.customers,
    revenue = google.revenue + chatgpt.revenue;
  const management =
    business.pricing.googleAds.monthly + business.pricing.chatgptAds.monthly;
  return {
    google,
    chatgpt,
    spend: s.budget,
    management,
    totalCost: s.budget + management,
    clicks,
    impressions,
    conversions,
    customers,
    revenue,
    CTR: impressions ? (clicks / impressions) * 100 : 0,
    CPC: clicks ? s.budget / clicks : 0,
    CVR: clicks ? (conversions / clicks) * 100 : 0,
    CPA: conversions ? s.budget / conversions : 0,
    CAC: customers ? (s.budget + management) / customers : 0,
    ROAS: s.budget ? revenue / s.budget : 0,
  };
}
