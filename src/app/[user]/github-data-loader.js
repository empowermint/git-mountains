"use server";

import { Suspense } from "react";
import MountainCanvas from "../../components/mountain-canvas";

const DAYS_TO_LOAD = 30;

export default async function GitHubDataLoader({ user }) {
  const gitHubData = await fetchGitHubData(user);

  return (
    <Suspense fallback="Loading...">
      <MountainCanvas gitHubData={gitHubData} />
    </Suspense>
  );
}

async function fetchGitHubData(user) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
    },
    body: JSON.stringify({
      query: constructGraphQuery(user),
    }),
  };

  try {
    const result = await fetch(
      "https://api.github.com/graphql",
      requestOptions
    );
    console.log("API fetch result: " + result);

    return await result.json();
  } catch (error) {
    console.log(await error.json(), result);

    throw new Error("Data did not load");
  }
}

function constructGraphQuery(user) {
  const toDate = new Date();

  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - DAYS_TO_LOAD);
  fromDate.setHours(0, 0, 0, 0);

  return `query Contributions {
      user(login: "${user}") {
        contributionsCollection(
          from: "${fromDate.toISOString()}"
          to: "${toDate.toISOString()}"
        ) {
          contributionCalendar {
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }`;
}
