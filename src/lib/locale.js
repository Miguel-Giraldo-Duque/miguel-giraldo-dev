import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

export const locales = ["es", "en"];
export const defaultLocale = "es";
export const LOCALE_COOKIE = "locale";

export function negotiateLocale(acceptLanguage) {
  let languages = [];
  try {
    languages = new Negotiator({
      headers: { "accept-language": acceptLanguage || "" },
    }).languages();
  } catch {
    return defaultLocale;
  }

  const requested = languages.filter((language) => language && language !== "*");
  if (requested.length === 0) return defaultLocale;

  try {
    return match(requested, locales, defaultLocale);
  } catch {
    return defaultLocale;
  }
}

export function localeFromPathname(pathname) {
  return locales.find((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));
}
