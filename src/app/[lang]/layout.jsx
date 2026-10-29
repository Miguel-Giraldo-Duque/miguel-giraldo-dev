import { Raleway } from "next/font/google";
import { notFound } from "next/navigation";
import { LocaleSwitch } from "@/components/LocaleSwitch";
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

export async function generateMetadata() {
  const dict = await getDictionary();
  return {
    title: dict.meta.title,
    description: dict.meta.description,
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
        <LocaleSwitch label={dict.locale.label} />
      </body>
    </html>
  );
}
