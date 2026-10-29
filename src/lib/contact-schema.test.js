import assert from "node:assert/strict";
import test from "node:test";
import { contactSchema } from "./contact-schema.js";

const valid = {
  fullName: "Ana Pérez",
  company: "Estudio Norte",
  email: "ana@example.com",
  message: "Quiero una landing para el bar.",
  privacyAccepted: true,
  hp: "",
};

test("accepts a complete message", () => {
  assert.equal(contactSchema.safeParse(valid).success, true);
});

test("requires the privacy checkbox", () => {
  const result = contactSchema.safeParse({ ...valid, privacyAccepted: false });
  assert.equal(result.success, false);
  if (!result.success) {
    assert.equal(result.error.flatten().fieldErrors.privacyAccepted[0], "privacy_required");
  }
});

test("rejects a short message and a bad email", () => {
  const result = contactSchema.safeParse({ ...valid, email: "nope", message: "hola" });
  assert.equal(result.success, false);
  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    assert.equal(errors.email[0], "email_invalid");
    assert.equal(errors.message[0], "message_short");
  }
});

test("allows an empty company and still parses a filled honeypot", () => {
  const result = contactSchema.safeParse({ ...valid, company: "  ", hp: "https://spam.example" });
  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.company, "");
    assert.equal(result.data.hp, "https://spam.example");
  }
});
