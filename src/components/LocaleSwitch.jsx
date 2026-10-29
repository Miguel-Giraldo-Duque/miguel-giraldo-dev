"use client";

import { usePathname } from "next/navigation";

const LOCALES = ["es", "en"];

export function LocaleSwitch({ label }) {
  const pathname = usePathname() || "/es";
  const rest = pathname.replace(/^\/(es|en)(?=\/|$)/, "");

  return (
    <nav className="locale-switch" aria-label={label}>
      {LOCALES.map((locale) => {
        const active = pathname === `/${locale}` || pathname.startsWith(`/${locale}/`);
        return (
          <a
            key={locale}
            href={`/${locale}${rest}`}
            hrefLang={locale}
            lang={locale}
            aria-current={active ? "true" : undefined}
          >
            {locale.toUpperCase()}
          </a>
        );
      })}
    </nav>
  );
}
