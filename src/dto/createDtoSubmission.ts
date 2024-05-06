import { z } from "zod";

export const createSubmissionDto = z
  .object({
    userId: z.string(),
    problemId: z.string(),
    code: z.string(),
    language: z.string(),
  })
  .strict();

export type createSubmissionDtoType = z.infer<typeof createSubmissionDto>;
