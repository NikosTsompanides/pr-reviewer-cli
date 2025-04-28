import yargs from "yargs";
import { hideBin } from "yargs/helpers";

export const getCLIOptions = () =>
  yargs(hideBin(process.argv))
    .option("owner", {
      describe: "GitHub repository owner",
      type: "string",
      demandOption: true,
    })
    .option("repo", {
      describe: "GitHub repository name",
      type: "string",
      demandOption: true,
    })
    .option("pr", {
      describe: "Pull request number",
      type: "number",
      demandOption: true,
    })
    .option("filename", {
      describe: "File name to save the review",
      type: "string",
    })
    .option("folder", {
      describe: "Folder name to save the reviews",
      type: "string",
    })
    .option("override", {
      describe: "Override an existing review",
      type: "boolean",
    })
    .help().argv as Record<string, unknown>;
