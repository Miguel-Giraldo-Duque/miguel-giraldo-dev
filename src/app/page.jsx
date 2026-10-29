import { Experience } from "@/components/Experience";
import { Presentation } from "@/components/Presentation";
import { Reviews } from "@/components/Reviews";

export default function Page() {
  return (
    <div id="root">
      <div className="container">
        <Presentation />
        <div className="color__1" aria-hidden="true" />
        <div className="color__2" aria-hidden="true" />
        <Experience />
        <Reviews />
      </div>
    </div>
  );
}
