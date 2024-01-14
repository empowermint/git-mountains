import { testData } from "../../test/sample-github-data";

const DAYS_TO_LOAD = 30;

const isTestSetting = process.env?.USE_TEST_DATA === "true" || false;
const gitHubApiToken = process.env?.GITHUB_API_TOKEN || false;

export default async function fetchGitHubData(user) {
  if (isTestSetting || !gitHubApiToken) {
    return cleanData(testData);
  }

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${gitHubApiToken}`,
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
    throw new Error("Data did not load: " + error);
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
