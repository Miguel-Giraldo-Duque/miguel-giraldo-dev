import { z } from "zod";

export const contactSchema = z.object({
  fullName: z.string().trim().min(2, "name_short").max(120, "name_long"),
  company: z.string().trim().max(120, "company_long"),
  email: z.string().trim().min(1, "email_required").email("email_invalid").max(200, "email_long"),
  message: z.string().trim().min(10, "message_short").max(4000, "message_long"),
  privacyAccepted: z.boolean().refine((value) => value === true, {
    message: "privacy_required",
  }),
  hp: z.string().max(200).optional().default(""),
});

export function fieldErrorsFrom(error) {
  const flat = error.flatten().fieldErrors;
  return Object.fromEntries(
    Object.entries(flat)
      .filter(([, messages]) => Array.isArray(messages) && messages.length > 0)
      .map(([key, messages]) => [key, messages[0]]),
  );
}
