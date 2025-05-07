import { z } from "zod"

export const ensSchema = z.object({
    ensName: z.string().min(2).max(50).regex(/^[a-zA-Z0-9\p{L}\p{N}\p{Emoji}\p{Emoji_Component}-]+(?:\.[a-zA-Z0-9\p{L}\p{N}-]+)+$/u).trim(),
})