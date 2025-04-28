import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";
import { getCLIOptions } from "./utils/cli";
import { createFolderIfNotExists, getFilenames } from "./utils/fileSystem";
import { CLIOptions } from "./models";
import { createGithubClient, createOpenAIClient } from "../../clients";
import { generateReview } from "../../modules/pr-reviewer";
import { EnvVariables } from "../../models";

dotenv.config({ path: path.join(__dirname, "../../.env") });

const DEFAULT_REVIEWS_FOLDER = "./reviews";

async function main() {
  try {
    const { GITHUB_TOKEN, OPENAI_API_KEY } = EnvVariables.parse(process.env);

    const options = getCLIOptions();
    const {
      owner,
      repo,
      pr,
      filename = `PR_${pr}_Review`,
      folder = DEFAULT_REVIEWS_FOLDER,
      override = false,
    } = CLIOptions.parse(options);

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

    const openAIClient = createOpenAIClient(OPENAI_API_KEY);
    const githubClient = createGithubClient(GITHUB_TOKEN);

    const review = generateReview(
      { pr, owner, repo },
      { openAIClient, githubClient, logger: console }
    );

    const filePath = path.join(process.cwd(), folder, `${filename}.md`);
    console.info(`[INFO] Writing review to ${filePath}...`);

    await fs.writeFile(filePath, `# PR Review for #${pr}\n\n${review}`);
    console.info(`[INFO] Review file generated successfully`);
  } catch (error) {
    console.error(error);
  }
}

main();
