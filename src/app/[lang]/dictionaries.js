import { lang } from "next/root-params";
import { notFound } from "next/navigation";

const dictionaries = {
  es: () => import("./es.json").then((module) => module.default),
  en: () => import("./en.json").then((module) => module.default),
};

export const hasLocale = (locale) => typeof locale === "string" && locale in dictionaries;

export async function getDictionary() {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  return dictionaries[locale]();
}
