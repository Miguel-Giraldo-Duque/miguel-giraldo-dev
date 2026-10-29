# Miguel Giraldo — portfolio

Personal site for Miguel Angel Giraldo Duque. Next.js App Router, with the existing dark palette, Raleway, and yellow accent.

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm test
npm run lint
npm run build
```

## Contact form

The form posts to `POST /api/contact`. The browser and the route share `src/lib/contact-schema.js` (Zod). A hidden `hp` field is a honeypot: if it has any text, the route answers with success and does not send.

Email delivery is behind `getEmailSender()` in `src/lib/email/get-email-sender.js`. The default provider is `stub`, which prints the message on the server and does not deliver it. No API keys are required to run the site.

The form still shows the success state after a stub send. That means the request was accepted. It does not mean the message reached an inbox. Do not leave `EMAIL_PROVIDER=stub` on a public deploy if you do not want leads written to the host logs.

### Which provider to use

Use **Resend with the React Email template** already wired in `src/emails/ContactEmail.jsx`. The call is a normal HTTP request, which fits a short-lived Vercel function. Nodemailer over SMTP also works and is in the repo, but a Gmail app password plus a fresh SMTP connection is a worse fit on serverless: connections time out, Google limits daily sends, and the password is a long-lived secret.

Switching provider is an environment change. Copy `.env.example` to `.env.local` for local work, or set the same names in the Vercel project. Do not commit real values.

`@react-email/components@1.0.12` is the `latest` tag and is what Resend renders, but npm currently marks that package deprecated. The only import is `src/emails/ContactEmail.jsx`, so a future package swap stays in that file and in `src/lib/email/resend-sender.js`.

### Plug in Resend

1. Create a Resend account and verify the domain you will send from (for example `miguelgd.com`).
2. Create an API key.
3. Set:

```bash
EMAIL_PROVIDER=resend
RESEND_API_KEY=re_...
EMAIL_FROM="Miguel Giraldo <hola@miguelgd.com>"
CONTACT_TO_EMAIL=you@miguelgd.com
```

4. Redeploy, or restart `npm run dev`.

The Resend sender passes the React Email component as `react` and the same content as plain text. `replyTo` is the address the visitor typed, so you can answer from your inbox.

### Plug in Nodemailer

1. Set:

```bash
EMAIL_PROVIDER=nodemailer
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=you@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM="Miguel Giraldo <you@gmail.com>"
CONTACT_TO_EMAIL=you@gmail.com
```

2. For Gmail, create an [app password](https://myaccount.google.com/apppasswords). The normal account password will not work once 2-step verification is on.
3. Restart the server or redeploy.

Port `465` turns on implicit TLS (`secure: true`). Any other port, including `587`, uses STARTTLS via Nodemailer's defaults.

The Nodemailer sender sends the HTML rendered from the same React Email component plus the plain-text version. It does not call Resend.

## Notes

A separate note on using ConvertFlow for a first popup or quiz is in [docs/funnel-evaluation.md](docs/funnel-evaluation.md). It is research only. The script is not installed.
