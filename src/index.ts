import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";
import { createOpenAIClient, fetchGPTResult } from "./utils/openAPIClient";
import { createGithubCLient, fetchPRDiff } from "./utils/githubClient";
import { getCLIOptions } from "./utils/cli";
import { createFolderIfNotExists, getFilenames } from "./utils/fileSystem";
import { trimDiff } from "./utils/trimDiff";

dotenv.config();

const DEFAULT_REVIEWS_FOLDER = "./reviews";

async function main() {
  try {
    const {
      owner,
      repo,
      pr,
      filename = `PR_${pr}_Review`,
      folder = DEFAULT_REVIEWS_FOLDER,
      override = false,
    } = getCLIOptions();

    const githubToken = process.env.GITHUB_TOKEN as string;
    const openaiApiKey = process.env.OPENAI_API_KEY as string;

    if (!githubToken) {
      console.error(
        '[ERROR] Undefined "GITHUB_TOKEN" env variable. Please provide one in the .env file'
      );
    }

    if (!openaiApiKey) {
      console.error(
        '[ERROR] Undefined "OPENAI_API_KEY" env variable. Please provide one in the .env file'
      );
    }

    // Create the folder to store the reviews if not exists.
    const folderPath = path.join(process.cwd(), folder);
    await createFolderIfNotExists(folderPath);

    // Check if the review already exists and return early.
    const filenames = await getFilenames(folderPath);
    const fileExists = filenames.some(
      (existingFilename) => existingFilename === `${filename}.md`
    );

    if (fileExists && !override) {
      console.info("[INFO] Review already exists. Skipping...");
      return;
    }

    const openAIClient = createOpenAIClient(openaiApiKey);
    const githubClient = createGithubCLient(githubToken);

    console.info("[INFO] Fetching PR diff...");
    const diff = await fetchPRDiff(owner, repo, pr, githubClient);
    const trimmedDiff = trimDiff(diff, 500);

    console.info("[INFO] Fetching GPT Result...");
    const review = await fetchGPTResult(trimmedDiff, openAIClient);

    const filePath = path.join(process.cwd(), folder, `${filename}.md`);
    console.info(`[INFO] Writing review to ${filePath}...`);

    await fs.writeFile(filePath, `# PR Review for #${pr}\n\n${review}`);
    console.info(`[INFO] Review file generated successfully`);
  } catch (error) {
    console.error(error);
  }
}

main();
