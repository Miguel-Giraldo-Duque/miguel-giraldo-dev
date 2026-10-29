export function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing ${name}. See the email section of the README.`);
  }
  return value;
}
