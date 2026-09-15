import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
export const metadata: Metadata = {
  title: "AD4GROWTH — Performance Advertising",
  description:
    "Google Ads und ChatGPT Ads. Paid Acquisition, Measurement und Optimization.",
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION || undefined },
  icons: { icon: "/favicon.svg?v=olive-orange" },
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
