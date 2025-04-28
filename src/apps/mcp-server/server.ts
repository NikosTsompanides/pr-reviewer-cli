import { Server } from "@modelcontextprotocol/sdk/server/index.js";

export const server = new Server(
  {
    name: "pr-reviewer-mcp-server",
    version: "0.0.1",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);
