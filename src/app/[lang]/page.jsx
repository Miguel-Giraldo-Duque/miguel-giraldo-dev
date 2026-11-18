import { lang } from "next/root-params";
import { Contact } from "@/components/Contact";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { Presentation } from "@/components/Presentation";
import { Projects } from "@/components/Projects";
import { Reviews } from "@/components/Reviews";
import { SiteNav } from "@/components/SiteNav";
import { buildHomeJsonLd } from "@/lib/structured-data";
import { getDictionary } from "./dictionaries";

export default async function Page() {
  const dict = await getDictionary();
  const locale = await lang();
  const jsonLd = buildHomeJsonLd({
    locale,
    description: dict.meta.description,
    faqItems: dict.faq.items,
  });

  return (
    <div id="root">
      <JsonLd data={jsonLd} />
      <div className="container">
        <SiteNav dict={dict.nav} />
        <Presentation dict={dict.hero} />
        <div className="color__1" aria-hidden="true" />
        <div className="color__2" aria-hidden="true" />
        <Projects dict={dict.projects} locale={locale} />
        <Reviews dict={dict.reviews} />
        <Faq dict={dict.faq} />
        <Contact dict={dict.contact} lang={locale} />
      </div>
    </div>
  );
}
