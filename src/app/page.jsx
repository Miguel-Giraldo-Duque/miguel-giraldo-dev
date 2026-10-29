import { Experience } from "@/components/Experience";
import { Presentation } from "@/components/Presentation";

export default function Page() {
  return (
    <div id="root">
      <div className="container">
        <Presentation />
        <div className="color__1" aria-hidden="true" />
        <div className="color__2" aria-hidden="true" />
        <Experience />
      </div>
    </div>
  );
}
