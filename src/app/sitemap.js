import {
  SITE_URL,
  absoluteUrl,
  localeHomePath,
  localePrivacyPath,
} from "@/lib/site";
import { locales } from "@/lib/locale";

function languageAlternates(pathBuilder) {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, absoluteUrl(pathBuilder(locale))]),
  );
  languages["x-default"] = absoluteUrl(pathBuilder("es"));
  return languages;
}

export default function sitemap() {
  const lastModified = new Date();

  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: languageAlternates(localeHomePath) },
    },
    ...locales.map((locale) => ({
      url: absoluteUrl(localeHomePath(locale)),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: languageAlternates(localeHomePath) },
    })),
    ...locales.map((locale) => ({
      url: absoluteUrl(localePrivacyPath(locale)),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: { languages: languageAlternates(localePrivacyPath) },
    })),
  ];
}
