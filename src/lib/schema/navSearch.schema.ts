import { z } from "zod"

export const SearchSchema = z.object({
  search: z.string().min(2).max(50),
})