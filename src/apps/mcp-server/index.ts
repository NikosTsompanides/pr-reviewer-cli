import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { PRReviewer } from "./tools";
import { server } from "./server";
import { EnvVariables, ReviewDetails } from "../../models";
import { createGithubClient, createOpenAIClient } from "../../clients";
import { generateReview } from "../../modules/pr-reviewer";

// Tool handlers
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [PRReviewer.definition],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    const { name, arguments: args } = request.params;

    switch (name) {
      case PRReviewer.name: {
        const { pr, owner, repo } = ReviewDetails.parse(args);
        const { GITHUB_TOKEN, OPENAI_API_KEY } = EnvVariables.parse(
          process.env
        );

        const openAIClient = createOpenAIClient(OPENAI_API_KEY);
        const githubClient = createGithubClient(GITHUB_TOKEN);

        const review = await generateReview(
          { pr, owner, repo },
          { openAIClient, githubClient, logger: console }
        );

        return {
          content: [{ type: "text", text: review }],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      content: [{ type: "text", text: errorMessage }],
      isError: true,
    };
  }
});

// Start server
async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Secure MCP Server running on stdio");
}

runServer().catch((error) => {
  console.error("Fatal error running server:", error);
  process.exit(1);
});
