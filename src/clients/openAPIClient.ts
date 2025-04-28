import axios from "axios";
import http from "http";
import https from "https";

const BASE_URL = "https://api.openai.com/v1";

export const createOpenAIClient = (apiKey: string) => {
  const httpAgent = new http.Agent({ keepAlive: true });
  const httpsAgent = new https.Agent({ keepAlive: true });

  return axios.create({
    httpAgent,
    httpsAgent,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    baseURL: BASE_URL,
  });
};

export class OpenAIClientError extends Error {
  name = "OpenAIClientError" as const;
}
