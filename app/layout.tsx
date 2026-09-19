import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
export const metadata: Metadata = {
  title: "AD4GROWTH — Performance Advertising",
  description:
    "Google Ads und ChatGPT Ads. Paid Acquisition, Measurement und Optimization.",
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION || undefined },
  metadataBase: new URL("https://ad4growth.com"),
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.svg?v=green-4", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lang = (await headers()).get("x-site-locale") || "de";
  return (
    <html lang={lang} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{__html:"try{document.documentElement.dataset.theme=localStorage.getItem('ad4growth-theme')==='dark'?'dark':'light'}catch(e){}"}} /></head>
      <body>{children}</body>
    </html>
  );
}
