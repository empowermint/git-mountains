import { Suspense } from "react";
import MountainCanvas from "@/components/mountain-canvas";
import fetchGitHubData from "./github-data-loader";

export default async function DisplayPage({ params }) {
  const user = params.user;
  const gitHubData = await fetchGitHubData(params.user);

  return (
    <>
      <Suspense fallback={"Loading..."}>
        <MountainCanvas gitHubData={gitHubData} />
      </Suspense>
    </>
  );
}
