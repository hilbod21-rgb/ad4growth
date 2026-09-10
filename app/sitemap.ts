import type { MetadataRoute } from "next";
import { business } from "@/lib/config";
import { publishedArticles } from "@/lib/content/articles";
export default function sitemap(): MetadataRoute.Sitemap {
  return business.languages.flatMap((lang) =>
    [
      "",
      "/google-ads",
      "/chatgpt-ads",
      "/insights",
      "/about",
      "/contact",
      ...publishedArticles(lang).map((a) => `/insights/${a.slug}`),
    ].map((path) => ({
      url: `${business.domain}/${lang}${path}`,
      alternates: {
        languages: Object.fromEntries(
          business.languages.map((l) => [l, `${business.domain}/${l}${path}`]),
        ),
      },
    })),
  );
}
