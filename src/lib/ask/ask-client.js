import { askResponseSchema } from "./ask-schema";

const ASK_TIMEOUT_MS = 25_000;

/**
 * Calls the upstream Ask API. Secrets stay on the server.
 * @param {string} message
 * @returns {Promise<
 *   | { ok: true, reply: import("zod").infer<typeof askResponseSchema>["reply"] }
 *   | { ok: false, error: "unavailable" | "timeout" | "upstream" | "invalid_response" | "network" }
 * >}
 */
export async function callAskApi(message) {
  const baseUrl = process.env.ASK_API_URL?.trim();
  if (!baseUrl) {
    console.error("[ask] unavailable: ASK_API_URL is not set");
    return { ok: false, error: "unavailable" };
  }

  const url = `${baseUrl.replace(/\/$/, "")}/ask`;
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const apiKey = process.env.ASK_API_KEY?.trim();
  if (apiKey) {
    headers["X-API-Key"] = apiKey;
  }

  let response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ message }),
      signal: AbortSignal.timeout(ASK_TIMEOUT_MS),
      cache: "no-store",
    });
  } catch (error) {
    if (error?.name === "TimeoutError" || error?.name === "AbortError") {
      console.error("[ask] upstream timeout");
      return { ok: false, error: "timeout" };
    }
    console.error("[ask] network error", error?.message || error);
    return { ok: false, error: "network" };
  }

  let payload;
  try {
    payload = await response.json();
  } catch {
    console.error("[ask] non-JSON response", response.status);
    return { ok: false, error: "invalid_response" };
  }

  if (!response.ok) {
    console.error("[ask] upstream HTTP", response.status);
    return { ok: false, error: "upstream" };
  }

  const parsed = askResponseSchema.safeParse(payload);
  if (!parsed.success) {
    console.error("[ask] invalid response shape");
    return { ok: false, error: "invalid_response" };
  }

  return { ok: true, reply: parsed.data.reply };
}
