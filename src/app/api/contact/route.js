import { buildContactEmail } from "@/lib/email/build-contact-email";
import { getEmailSender } from "@/lib/email/get-email-sender";
import { contactSchema, fieldErrorsFrom } from "@/lib/contact-schema";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, message: "No pude leer el mensaje." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { ok: false, errors: fieldErrorsFrom(parsed.error) },
      { status: 400 },
    );
  }

  if (parsed.data.hp) {
    console.info("[contact] honeypot filled, dropping message");
    return Response.json({ ok: true });
  }

  try {
    const email = await buildContactEmail(parsed.data);
    const sender = await getEmailSender();
    await sender.send(email);
    return Response.json({ ok: true });
  } catch (error) {
    console.error("[contact] send failed", error);
    return Response.json(
      {
        ok: false,
        message: "No pude enviar el mensaje. Intentá de nuevo en unos minutos.",
      },
      { status: 500 },
    );
  }
}
