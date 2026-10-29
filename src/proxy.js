import { NextResponse } from "next/server";
import { LOCALE_COOKIE, localeFromPathname, locales, negotiateLocale } from "./lib/locale";

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const pathnameLocale = localeFromPathname(pathname);

  if (pathnameLocale) {
    const response = NextResponse.next();
    response.cookies.set(LOCALE_COOKIE, pathnameLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return response;
  }

  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale = locales.includes(cookieLocale)
    ? cookieLocale
    : negotiateLocale(request.headers.get("accept-language"));

  const suffix = pathname === "/" ? "" : pathname;
  request.nextUrl.pathname = `/${locale}${suffix}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
