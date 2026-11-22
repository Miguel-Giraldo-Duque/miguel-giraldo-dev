import { z } from "zod";

export const askRequestSchema = z.object({
  message: z.string().trim().min(1, "empty").max(2000, "empty"),
});

export const agentResponseSchema = z.object({
  rationale: z.string().default(""),
  kind: z.enum(["profile", "scheduling"]).default("scheduling"),
  message: z.string(),
  proposed_starts: z.array(z.string()).default([]),
  booked_start: z.string().nullable().optional().default(null),
});

export const askResponseSchema = z.object({
  reply: agentResponseSchema,
});
