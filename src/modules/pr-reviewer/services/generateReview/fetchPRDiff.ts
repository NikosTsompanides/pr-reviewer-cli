import { Octokit } from "@octokit/rest";
import { GithubClientError } from "../../../../clients/githubClient";
import type { ReviewDetails } from "../../../../models";

type FetchPRDiffProps = ReviewDetails.ReviewDetails;
type FetchPRDiffDeps = { client: Octokit };

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
  props: FetchPRDiffProps,
  deps: FetchPRDiffDeps
): Promise<string> {
  try {
    const { owner, repo, pr } = props;
    const { client } = deps;

    const { data: diff } = await client.request(
      `GET /repos/${owner}/${repo}/pulls/${pr}`,
      {
        headers: { accept: "application/vnd.github.v3.diff" },
      }
    );
    return diff;
  } catch (error: any) {
    throw new GithubClientError("Unable to fetch PR diff", { cause: error });
  }
}
