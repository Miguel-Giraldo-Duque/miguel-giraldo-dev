import assert from "node:assert/strict";
import test from "node:test";
import { defaultLocale, localeFromPathname, negotiateLocale } from "./locale.js";

test("defaults to Spanish when the browser sends no language", () => {
  assert.equal(negotiateLocale(undefined), defaultLocale);
  assert.equal(negotiateLocale(""), "es");
  assert.equal(negotiateLocale("*"), "es");
});

test("uses English when it is the preferred browser language", () => {
  assert.equal(negotiateLocale("en-US,en;q=0.9"), "en");
  assert.equal(negotiateLocale("en-GB"), "en");
});

test("keeps Spanish when it outranks English", () => {
  assert.equal(negotiateLocale("es-AR,es;q=0.9,en;q=0.8"), "es");
  assert.equal(negotiateLocale("es"), "es");
});

test("falls back to Spanish for an unsupported language", () => {
  assert.equal(negotiateLocale("fr-FR,fr;q=0.9,de;q=0.8"), "es");
});

test("reads the locale prefix from a path", () => {
  assert.equal(localeFromPathname("/es"), "es");
  assert.equal(localeFromPathname("/en/privacidad"), "en");
  assert.equal(localeFromPathname("/privacidad"), undefined);
});
