/**
 * EmailSender: { send(email) => Promise<{ id: string, delivered: boolean }> }
 * `email` is the object returned by buildContactEmail.
 *
 * EMAIL_PROVIDER selects the implementation:
 * - stub (default): logs the message and does not deliver it
 * - resend: HTTP API, React Email template
 * - nodemailer: SMTP
 */
export async function getEmailSender() {
  const provider = (process.env.EMAIL_PROVIDER || "stub").toLowerCase();

  if (provider === "resend") {
    const { createResendSender } = await import("./resend-sender");
    return createResendSender();
  }

  if (provider === "nodemailer") {
    const { createNodemailerSender } = await import("./nodemailer-sender");
    return createNodemailerSender();
  }

  if (provider === "stub") {
    const { createStubSender } = await import("./stub-sender");
    return createStubSender();
  }

  throw new Error(`Unknown EMAIL_PROVIDER "${provider}". Use stub, resend, or nodemailer.`);
}
