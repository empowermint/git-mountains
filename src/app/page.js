import { Suspense } from "react";
import MountainCanvas from "@/components/mountain-canvas";

export default function Page() {
  return (
    <main>
      <Suspense fallback={"Loading..."}>
        <MountainCanvas />
      </Suspense>
    </main>
  );
}
