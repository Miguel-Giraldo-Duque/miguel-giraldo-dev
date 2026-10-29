"use client";

import Link from "next/link";
import { useState } from "react";
import { contactSchema, fieldErrorsFrom } from "@/lib/contact-schema";

const EMPTY = {
  fullName: "",
  company: "",
  email: "",
  message: "",
  privacyAccepted: false,
  hp: "",
};

const FIELD_ORDER = ["fullName", "company", "email", "message", "privacyAccepted"];

function focusFirst(errors) {
  const key = FIELD_ORDER.find((field) => errors[field]);
  if (!key) return;
  document.getElementById(key)?.focus();
}

export function Contact() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [status, setStatus] = useState("idle");

  function update(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError("");

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const nextErrors = fieldErrorsFrom(parsed.error);
      setErrors(nextErrors);
      focusFirst(nextErrors);
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (payload.errors && Object.keys(payload.errors).length > 0) {
          setErrors(payload.errors);
          focusFirst(payload.errors);
        } else {
          setFormError(
            payload.message || "No pude enviar el mensaje. Intentá de nuevo en unos minutos.",
          );
        }
        setStatus("idle");
        return;
      }

      setStatus("success");
    } catch {
      setFormError("No pude enviar el mensaje. Revisá tu conexión e intentá de nuevo.");
      setStatus("idle");
    }
  }

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="contact__layout">
        <div className="contact__intro">
          <p className="section-kicker">Contacto</p>
          <h2 id="contact-title" className="section-title">
            ¿Querés hablar de un proyecto?
          </h2>
          <p className="contact__lead">
            Armo landing pages para negocios locales: rápidas, con un precio claro, y listas para
            que te encuentren las personas y los buscadores con IA (GEO/AEO).
          </p>
        </div>

        {status === "success" ? (
          <div className="form-status" role="status">
            <h3>Listo.</h3>
            <p>Recibí tu mensaje y te respondo a la brevedad.</p>
            <button
              type="button"
              className="contact__submit"
              onClick={() => {
                setValues(EMPTY);
                setErrors({});
                setFormError("");
                setStatus("idle");
              }}
            >
              Enviar otro mensaje
            </button>
          </div>
        ) : (
          <form className="contact__form" noValidate onSubmit={handleSubmit} aria-busy={status === "submitting"}>
            <div className="hp" aria-hidden="true">
              <label htmlFor="hp">Company website</label>
              <input
                id="hp"
                name="hp"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={values.hp}
                onChange={(event) => update("hp", event.target.value)}
              />
            </div>

            <Field
              id="fullName"
              index="01"
              label="Nombre completo"
              required
              error={errors.fullName}
            >
              <input
                id="fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                required
                aria-required="true"
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={errors.fullName ? "fullName-error" : undefined}
                value={values.fullName}
                onChange={(event) => update("fullName", event.target.value)}
              />
            </Field>

            <Field id="company" index="02" label="Compañía" error={errors.company}>
              <input
                id="company"
                name="company"
                type="text"
                autoComplete="organization"
                aria-invalid={Boolean(errors.company)}
                aria-describedby={errors.company ? "company-error" : undefined}
                value={values.company}
                onChange={(event) => update("company", event.target.value)}
              />
            </Field>

            <Field id="email" index="03" label="Email" required error={errors.email}>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                required
                aria-required="true"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                value={values.email}
                onChange={(event) => update("email", event.target.value)}
              />
            </Field>

            <Field id="message" index="04" label="Mensaje" required error={errors.message}>
              <textarea
                id="message"
                name="message"
                required
                aria-required="true"
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
                value={values.message}
                onChange={(event) => update("message", event.target.value)}
              />
            </Field>

            <div className="consent">
              <input
                id="privacyAccepted"
                name="privacyAccepted"
                type="checkbox"
                required
                aria-required="true"
                aria-invalid={Boolean(errors.privacyAccepted)}
                aria-describedby={errors.privacyAccepted ? "privacyAccepted-error" : undefined}
                checked={values.privacyAccepted}
                onChange={(event) => update("privacyAccepted", event.target.checked)}
              />
              <label htmlFor="privacyAccepted">
                Acepto la <Link href="/privacidad">política de privacidad</Link> y el uso de estos
                datos para responder mi consulta.
                <span aria-hidden="true"> *</span>
              </label>
            </div>
            {errors.privacyAccepted ? (
              <p id="privacyAccepted-error" className="form-error">
                {errors.privacyAccepted}
              </p>
            ) : null}

            {formError ? (
              <p className="form-error" role="alert">
                {formError}
              </p>
            ) : null}

            <button className="contact__submit" type="submit" disabled={status === "submitting"}>
              {status === "submitting" ? "Enviando…" : "Enviar mensaje"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function Field({ id, index, label, required = false, error, children }) {
  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>
        <span className="field__index">{index}</span>
        <span>{label}</span>
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="form-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
