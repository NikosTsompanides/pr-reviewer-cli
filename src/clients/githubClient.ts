import { Octokit } from "@octokit/rest";

export const createGithubClient = (authToken: string) =>
  new Octokit({ auth: authToken });

export class GithubClientError extends Error {
  name = "GithubClientError" as const;
}
