import { Suspense } from "react";
import MountainCanvas from "@/components/mountain-canvas";

export default function Page({ data }) {
  const contributions = [0];
  const user = "empowermint";

  return (
    <>
      <header className="flex justify-between items-center p-4 tracking-wider">
        <div className="">
          <h1 className="text-3xl font-bold">Git Mountains</h1>
        </div>
        <div className="flex space-x-2">
          <span className="text-xl">{user}</span>
          <button className="text-s tracking-widest px-2 py-0 rounded-lg border-x-2 border-violet-400 hover:shadow-md hover:bg-violet-300">
            Switch
          </button>
        </div>
      </header>

      <main>
        <Suspense fallback={"Loading..."}>
          <MountainCanvas data={contributions} />
        </Suspense>
      </main>
    </>
  );
}
