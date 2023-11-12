"use client";

export default function MountainCanvas({ gitHubData }) {
  console.log(gitHubData);
  const data = JSON.stringify(gitHubData);

  return <code className="w-screen h-screen">{data}</code>;
}
