import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { agentResponseSchema, askRequestSchema, askResponseSchema } from "./ask-schema.js";

describe("askRequestSchema", () => {
  it("accepts a non-empty message", () => {
    const parsed = askRequestSchema.safeParse({ message: "  Hola  " });
    assert.equal(parsed.success, true);
    assert.equal(parsed.data.message, "Hola");
  });

  it("rejects empty message", () => {
    const parsed = askRequestSchema.safeParse({ message: "   " });
    assert.equal(parsed.success, false);
  });
});

describe("askResponseSchema", () => {
  it("parses a scheduling reply with slots", () => {
    const parsed = askResponseSchema.safeParse({
      reply: {
        rationale: "free slots",
        kind: "scheduling",
        message: "Pick a time",
        proposed_starts: ["2026-11-22T15:00:00Z"],
        booked_start: null,
      },
    });
    assert.equal(parsed.success, true);
    assert.equal(parsed.data.reply.proposed_starts.length, 1);
  });

  it("defaults optional fields on AgentResponse", () => {
    const parsed = agentResponseSchema.safeParse({
      message: "Profile summary",
      kind: "profile",
    });
    assert.equal(parsed.success, true);
    assert.equal(parsed.data.rationale, "");
    assert.deepEqual(parsed.data.proposed_starts, []);
    assert.equal(parsed.data.booked_start, null);
  });
});
