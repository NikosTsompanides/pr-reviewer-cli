import { trimDiff } from "../../utils";
import { AxiosInstance } from "axios";
import { Octokit } from "@octokit/rest";
import { fetchGPTResult } from "./fetchGPTResult";
import { fetchPRDiff } from "./fetchPRDiff";
import { ReviewDetails } from "../../../../models";

type GenerateReviewDeps = {
  openAIClient: AxiosInstance;
  githubClient: Octokit;
  logger: {
    log: (str: string) => void;
    debug: (str: string) => void;
    error: (str: string) => void;
  };
};

export async function generateReview(
  props: ReviewDetails.ReviewDetails,
  deps: GenerateReviewDeps
) {
  deps.logger.debug("[INFO] Fetching PR diff...");
  const diff = await fetchPRDiff(props, { client: deps.githubClient });
  const trimmedDiff = trimDiff(diff, 500);

  deps.logger.debug("[INFO] Fetching GPT Result...");
  const review = await fetchGPTResult(
    { diff: trimmedDiff },
    { client: deps.openAIClient }
  );

  return review;
}
