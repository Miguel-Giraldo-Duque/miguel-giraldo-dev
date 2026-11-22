import { Raleway } from "next/font/google";
import { notFound } from "next/navigation";
import { AskAssistant } from "@/components/AskAssistant";
import { LocaleSwitch } from "@/components/LocaleSwitch";
import { absoluteUrl, localeHomePath, SITE_URL } from "@/lib/site";
import { locales } from "@/lib/locale";
import { getDictionary, hasLocale } from "./dictionaries";
import "../globals.css";

const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-raleway",
});

export function generateStaticParams() {
  return [{ lang: "es" }, { lang: "en" }];
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary();
  const path = localeHomePath(lang);
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, absoluteUrl(localeHomePath(locale))]),
  );
  languages["x-default"] = absoluteUrl(localeHomePath("es"));

  const title = dict.meta.title;
  const description = dict.meta.description;
  const ogTitle = dict.meta.ogTitle || title;
  const ogDescription = dict.meta.ogDescription || description;
  const ogImage = absoluteUrl("/FotoPerfil2.webp");

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: path,
      languages,
    },
    openGraph: {
      type: "profile",
      locale: lang === "es" ? "es_AR" : "en_US",
      alternateLocale: lang === "es" ? ["en_US"] : ["es_AR"],
      url: path,
      siteName: "miguelgd.com",
      title: ogTitle,
      description: ogDescription,
      images: [
        {
          url: ogImage,
          width: 800,
          height: 800,
          alt: "Miguel Angel Giraldo Duque",
        },
      ],
    },
    twitter: {
      card: "summary",
      title: ogTitle,
      description: ogDescription,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary();

  return (
    <html lang={lang} className={raleway.variable}>
      <body>
        {children}
        <AskAssistant dict={dict.ask} locale={lang} />
        <LocaleSwitch label={dict.locale.label} />
      </body>
    </html>
  );
}
