import { testData } from "../../test/sample-github-data";

const DAYS_TO_LOAD = 30;

export default async function fetchGitHubData(user) {

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

    const data = await result.json();

    return cleanData(data);
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

function cleanData(data) {
  const unwrappedData =
    data.data.user.contributionsCollection.contributionCalendar.weeks;
  let cleanData = [];
  unwrappedData.forEach((week) => {
    week.contributionDays.forEach((day) => {
      cleanData.push(day);
    });
  });

  return cleanData;
}
