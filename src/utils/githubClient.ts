import { Octokit } from "@octokit/rest";
import { GithubClientError } from "../errors";

export const createGithubCLient = (authToken: string) =>
  new Octokit({ auth: authToken });

/**
 * Fetch the diff of a pull request from GitHub.
 * @param owner - Repository owner
 * @param repo - Repository name
 * @param prNumber - Pull request number
 * @param client - GitHub client
 * @returns PR diff as a string
 * @throws GithubClientError
 */
export async function fetchPRDiff(
  owner: string,
  repo: string,
  prNumber: number,
  client: Octokit
): Promise<string> {
  try {
    const { data: diff } = await client.request(
      `GET /repos/${owner}/${repo}/pulls/${prNumber}`,
      {
        headers: { accept: "application/vnd.github.v3.diff" },
      }
    );
    return diff;
  } catch (error: any) {
    throw new GithubClientError("Unable to fetch PR diff", { cause: error });
  }
}
