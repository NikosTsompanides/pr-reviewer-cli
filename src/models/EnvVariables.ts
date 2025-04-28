import { z } from "zod";
import { toValidationError } from "zod-validation-error";

export const schema = z
  .object({
    GITHUB_TOKEN: z
      .string()
      .trim()
      .min(
        1,
        'Undefined "GITHUB_TOKEN" env variable. Please provide one in the .env file'
      ),
    OPENAI_API_KEY: z
      .string()
      .trim()
      .min(
        1,
        'Undefined "OPENAI_API_KEY" env variable. Please provide one in the .env file'
      ),
  })
  .passthrough();

export type EnvVariables = z.infer<typeof schema>;

export const parse = (args: unknown) => {
  try {
    return schema.parse(args);
  } catch (error) {
    throw toValidationError()(error);
  }
};
