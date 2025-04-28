import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { zodToJsonSchema } from "zod-to-json-schema";
import { z } from "zod";
import { toValidationError } from "zod-validation-error";
import { ReviewDetails } from "../../../models";

export const name = "pull_request_review";

const description =
  "This endpoint fetches GitHub PR diffs, analyzes them with OpenAI, and generates a Markdown code review to streamline the review process";

export const schema = ReviewDetails.schema.brand<"ReviewTool">();

export type PRReviewer = z.infer<typeof schema>;

export const parse = (args: unknown) => {
  try {
    return schema.parse(args);
  } catch (error) {
    throw toValidationError()(error);
  }
};

export const definition: Tool = {
  name: name,
  description: description,
  inputSchema: zodToJsonSchema(schema) as any,
};
