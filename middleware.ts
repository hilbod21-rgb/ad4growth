import { NextResponse, type NextRequest } from "next/server";
export function middleware(request: NextRequest) {
  const locale = request.nextUrl.pathname.split("/")[1];
  const headers = new Headers(request.headers);
  headers.set(
    "x-site-locale",
    ["de", "en", "uk", "ru"].includes(locale) ? locale : "de",
  );
  return NextResponse.next({ request: { headers } });
}
export const config = { matcher: ["/((?!api|_next|assets|favicon.svg).*)"] };
