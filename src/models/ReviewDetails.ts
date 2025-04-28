import { z } from "zod";
import { toValidationError } from "zod-validation-error";

export const schema = z.object({
  owner: z.string().trim().min(1),
  repo: z.string().trim().min(1),
  pr: z.number().int().nonnegative(),
});

export type ReviewDetails = z.infer<typeof schema>;

export const parse = (args: unknown) => {
  try {
    return schema.parse(args);
  } catch (error) {
    throw toValidationError()(error);
  }
};
