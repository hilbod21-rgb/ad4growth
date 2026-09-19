import { NextResponse, type NextRequest } from "next/server";
export function middleware(request: NextRequest) {
  const host = request.nextUrl.hostname;
  if (host === "www.ad4growth.com" || host.endsWith(".workers.dev")) {
    const canonical = new URL(request.nextUrl.pathname + request.nextUrl.search, "https://ad4growth.com");
    return NextResponse.redirect(canonical, 308);
  }
  const locale = request.nextUrl.pathname.split("/")[1];
  const headers = new Headers(request.headers);
  headers.set(
    "x-site-locale",
    ["de", "en", "uk", "ru"].includes(locale) ? locale : "de",
  );
  return NextResponse.next({ request: { headers } });
}
export const config = { matcher: ["/((?!api|_next|assets|favicon.svg).*)"] };
