import { lang } from "next/root-params";
import { Contact } from "@/components/Contact";
import { Presentation } from "@/components/Presentation";
import { Projects } from "@/components/Projects";
import { Reviews } from "@/components/Reviews";
import { SiteNav } from "@/components/SiteNav";
import { getDictionary } from "./dictionaries";

export default async function Page() {
  const dict = await getDictionary();
  const locale = await lang();

  return (
    <div id="root">
      <div className="container">
        <SiteNav dict={dict.nav} />
        <Presentation dict={dict.hero} />
        <div className="color__1" aria-hidden="true" />
        <div className="color__2" aria-hidden="true" />
        <Projects dict={dict.projects} locale={locale} />
        <Reviews dict={dict.reviews} />
        <Contact dict={dict.contact} lang={locale} />
      </div>
    </div>
  );
}
