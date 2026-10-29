import { Contact } from "@/components/Contact";
import { Presentation } from "@/components/Presentation";
import { Projects } from "@/components/Projects";
import { Reviews } from "@/components/Reviews";
import { SiteNav } from "@/components/SiteNav";

export default function Page() {
  return (
    <div id="root">
      <div className="container">
        <SiteNav />
        <Presentation />
        <div className="color__1" aria-hidden="true" />
        <div className="color__2" aria-hidden="true" />
        <Projects />
        <Reviews />
        <Contact />
      </div>
    </div>
  );
}
