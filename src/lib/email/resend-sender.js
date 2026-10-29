import { Resend } from "resend";
import { requireEnv } from "./require-env";

export function createResendSender() {
  const resend = new Resend(requireEnv("RESEND_API_KEY"));
  const from = requireEnv("EMAIL_FROM");
  const to = requireEnv("CONTACT_TO_EMAIL");

  return {
    async send(email) {
      const { data, error } = await resend.emails.send({
        from,
        to,
        replyTo: email.replyTo,
        subject: email.subject,
        react: email.react,
        text: email.text,
      });

      if (error) {
        throw new Error(error.message || "Resend rejected the message.");
      }

      return { id: data?.id || "resend", delivered: true };
    },
  };
}
