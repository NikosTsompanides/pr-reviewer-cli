import { AxiosInstance } from "axios";
import { getPrompt } from "../../utils";
import { OpenAIClientError } from "../../../../clients/openAPIClient";

const CHAT_COMPLETION_ENDPOINT = "/chat/completions";
const GPT_MODEL = "gpt-4o";

type FetchGPTResultProps = { diff: string };
type FetchGPTResultDeps = { client: AxiosInstance };

/**
 * Send the PR diff to ChatGPT for analysis.
 * @param diff - Pull request diff
 * @param openAIClient - OpenAI API key
 * @returns ChatGPT response as a string
 * @throws OpenAIClientError
 */
export async function fetchGPTResult(
  props: FetchGPTResultProps,
  deps: FetchGPTResultDeps
): Promise<string> {
  try {
    const prompt = getPrompt(props.diff);
    const response = await deps.client.post(CHAT_COMPLETION_ENDPOINT, {
      model: GPT_MODEL,
      messages: [{ role: "developer", content: prompt }],
    });

    return response.data.choices[0].message.content;
  } catch (error: unknown) {
    throw new OpenAIClientError("Unable to analyze PR with ChatGPT", {
      cause: error,
    });
  }
}
