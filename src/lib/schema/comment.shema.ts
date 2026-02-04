import { z } from "zod";

export const CommentSchema = z.object({
  content: z.string().trim().optional(),
});

type CommentFields = z.infer<typeof CommentSchema>;

export type { CommentFields };
