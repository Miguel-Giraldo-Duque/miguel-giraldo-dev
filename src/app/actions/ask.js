"use server";

import { callAskApi } from "@/lib/ask/ask-client";
import { askRequestSchema } from "@/lib/ask/ask-schema";

/**
 * One user message in → AgentResponse out (no session on this side).
 * Always resolves a discriminated result; never throws to the client.
 *
 * @param {string} message
 * @returns {Promise<
 *   | { ok: true, reply: {
 *       rationale: string,
 *       kind: "profile" | "scheduling",
 *       message: string,
 *       proposed_starts: string[],
 *       booked_start: string | null,
 *     } }
 *   | { ok: false, error: "empty" | "unavailable" | "timeout" | "upstream" | "invalid_response" | "network" }
 * >}
 */
export async function askAgent(message) {
  try {
    const parsed = askRequestSchema.safeParse({ message });
    if (!parsed.success) {
      return { ok: false, error: "empty" };
    }

    return await callAskApi(parsed.data.message);
  } catch (error) {
    console.error("[ask] unexpected", error?.message || error);
    return { ok: false, error: "upstream" };
  }
}
