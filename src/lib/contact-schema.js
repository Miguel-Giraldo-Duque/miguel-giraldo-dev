import { z } from "zod";

export const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Ingresá tu nombre completo.")
    .max(120, "El nombre es demasiado largo."),
  company: z.string().trim().max(120, "La compañía no puede superar los 120 caracteres."),
  email: z
    .string()
    .trim()
    .min(1, "Ingresá un email.")
    .email("Ingresá un email válido.")
    .max(200, "El email es demasiado largo."),
  message: z
    .string()
    .trim()
    .min(10, "Contame un poco más, al menos 10 caracteres.")
    .max(4000, "El mensaje es demasiado largo."),
  privacyAccepted: z.boolean().refine((value) => value === true, {
    message: "Tenés que aceptar la política de privacidad.",
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
