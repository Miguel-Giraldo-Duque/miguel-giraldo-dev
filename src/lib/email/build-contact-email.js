import { createElement } from "react";
import { render } from "@react-email/render";
import { ContactEmail } from "../../emails/ContactEmail.jsx";

export async function buildContactEmail(input) {
  const react = createElement(ContactEmail, {
    fullName: input.fullName,
    company: input.company,
    email: input.email,
    message: input.message,
  });

  const text = [
    "Nuevo mensaje desde miguelgd.com",
    "",
    `Nombre: ${input.fullName}`,
    `Compañía: ${input.company || "—"}`,
    `Email: ${input.email}`,
    "",
    input.message,
  ].join("\n");

  return {
    replyTo: input.email,
    subject: `Contacto: ${input.fullName}`,
    text,
    html: await render(react),
    react,
  };
}
