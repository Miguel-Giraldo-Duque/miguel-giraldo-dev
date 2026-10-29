import nodemailer from "nodemailer";
import { requireEnv } from "./require-env";

export function createNodemailerSender() {
  const port = Number(process.env.SMTP_PORT || 587);
  const transport = nodemailer.createTransport({
    host: requireEnv("SMTP_HOST"),
    port,
    secure: port === 465,
    auth: {
      user: requireEnv("SMTP_USER"),
      pass: requireEnv("SMTP_PASS"),
    },
  });
  const from = requireEnv("EMAIL_FROM");
  const to = requireEnv("CONTACT_TO_EMAIL");

  return {
    async send(email) {
      const info = await transport.sendMail({
        from,
        to,
        replyTo: email.replyTo,
        subject: email.subject,
        text: email.text,
        html: email.html,
      });

      return { id: info.messageId || "nodemailer", delivered: true };
    },
  };
}
