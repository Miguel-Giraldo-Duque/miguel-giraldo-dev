import { Presentation } from "@/components/Presentation";
import { Projects } from "@/components/Projects";
import { Reviews } from "@/components/Reviews";

export default function Page() {
  return (
    <div id="root">
      <div className="container">
        <Presentation />
        <div className="color__1" aria-hidden="true" />
        <div className="color__2" aria-hidden="true" />
        <Projects />
        <Reviews />
      </div>
    </div>
  );
}
