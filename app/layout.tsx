import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
export const metadata: Metadata = {
  title: "AD4GROWTH — Performance Advertising",
  description:
    "Google Ads und ChatGPT Ads. Paid Acquisition, Measurement und Optimization.",
  icons: { icon: "/favicon.svg" },
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lang = (await headers()).get("x-site-locale") || "de";
  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  );
}
