import { z } from "zod";
import { toValidationError } from "zod-validation-error";
import { ReviewDetails } from "../../../models";

export const schema = ReviewDetails.schema
  .extend({
    filename: z.string().trim().min(1).optional(),
    folder: z.string().trim().min(1).optional(),
    override: z.boolean().default(true),
  })
  .brand<"CLIOptions">();

export type CLIOptions = z.infer<typeof schema>;

export const parse = (args: unknown) => {
  try {
    return schema.parse(args);
  } catch (error) {
    throw toValidationError()(error);
  }
};
