"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import MountainCanvas from "@/components/mountain-canvas";
import UserSelector from "@/components/user-selector";

const DEFAULT_USER = "empowermint";

export default function Page({ data }) {
  const searchParams = useSearchParams();
  const user = searchParams.get("user") || DEFAULT_USER;
  const contributions = [0];

  return (
    <>
      <header className="flex justify-between items-center p-4 tracking-wider">
        <h1 className="text-3xl font-bold">Git Mountains</h1>
        <UserSelector user={user} />
      </header>

      <main>
        <Suspense fallback={"Loading..."}>
          <MountainCanvas data={contributions} />
        </Suspense>
      </main>
    </>
  );
}
