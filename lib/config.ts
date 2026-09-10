export const business = {
  brand: "AD4GROWTH",
  domain: "https://ad4growth.com",
  founder: {
    name: "Bohdan Starostenkov",
    role: "Founder · Product & Performance",
    portrait: null as string | null,
    linkedin: null as string | null,
  },
  editorial: {
    name: "AD4GROWTH Research",
    role: "Research & Measurement",
    type: "Organization" as const,
    portrait: null as string | null,
    linkedin: null as string | null,
  },
  contact: {
    email: null as string | null,
    whatsapp: null as string | null,
    telegram: null as string | null,
  },
  legal: { entity: null, address: null, taxId: null, vatStatus: null },
  languages: ["de", "en", "uk", "ru"] as const,
  launch: { active: true, clientLimit: 3 },
  pricing: {
    googleAds: {
      normalSetup: 750,
      launchSetup: 490,
      monthly: 490,
      mediaBudgetIncluded: false,
    },
    chatgptAds: {
      normalSetup: 990,
      launchSetup: 690,
      monthly: 590,
      mediaBudgetIncluded: false,
    },
  },
  services: [
    {
      id: "google_ads",
      key: "googleAds",
      slug: "google-ads",
      name: "Google Ads",
      number: "01",
    },
    {
      id: "chatgpt_ads",
      key: "chatgptAds",
      slug: "chatgpt-ads",
      name: "ChatGPT Ads",
      number: "02",
    },
  ] as const,
};
export type Locale = (typeof business.languages)[number];
export const isLocale = (value: string): value is Locale =>
  business.languages.includes(value as Locale);
export const euro = (value: number) => `€${value.toLocaleString("de-DE")}`;
export const setupPrice = (key: "googleAds" | "chatgptAds") =>
  business.launch.active
    ? business.pricing[key].launchSetup
    : business.pricing[key].normalSetup;
