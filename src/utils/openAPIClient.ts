import axios, { AxiosInstance } from "axios";
import http from "http";
import https from "https";
import { getPrompt } from "./prompt";
import { OpenAIClientError } from "../errors";

const BASE_URL = "https://api.openai.com/v1";
const CHAT_COMPLETION_ENDPOINT = "/chat/completions";
const GPT_MODEL = "gpt-3.5-turbo";

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

/**
 * Send the PR diff to ChatGPT for analysis.
 * @param diff - Pull request diff
 * @param openAIClient - OpenAI API key
 * @returns ChatGPT response as a string
 * @throws OpenAIClientError
 */
export async function fetchGPTResult(
  diff: string,
  openAIClient: AxiosInstance
): Promise<string> {
  try {
    const prompt = getPrompt(diff);

    const response = await openAIClient.post(CHAT_COMPLETION_ENDPOINT, {
      model: GPT_MODEL,
      messages: [{ role: "user", content: prompt }],
    });

    return response.data.choices[0].message.content;
  } catch (error: unknown) {
    throw new OpenAIClientError("Unable to analyze PR with ChatGPT", {
      cause: error,
    });
  }
}
