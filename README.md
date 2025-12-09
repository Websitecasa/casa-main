<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1DBmzERwKM2TIrGrcYb_vt9WuPuQ3RDHD

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Contact form (receive enquiries by email)

This project supports sending contact form submissions to an endpoint defined by the environment variable `VITE_CONTACT_ENDPOINT`.

Fast setup using Formspree (recommended for quick hosting):

1. Create a free account at https://formspree.io and create a new form. Verify `praveenjb24@gmail.com` when prompted.
2. Formspree will provide an endpoint URL like `https://formspree.io/f/yourFormId`.
3. Locally, run the dev server with the endpoint set (PowerShell):

```powershell
$env:VITE_CONTACT_ENDPOINT='https://formspree.io/f/yourFormId'; npm run dev
Start-Process 'http://localhost:3000/'
```

4. In production (Vercel/Netlify) set an environment variable named `VITE_CONTACT_ENDPOINT` with the Formspree URL.

Behavior:
- If `VITE_CONTACT_ENDPOINT` is set, the contact form will POST JSON to that endpoint and the UI will show sending/sent/error status.
- If the env var is not set, the app falls back to opening the user's mail client via `mailto:praveenjb24@gmail.com`.

If you prefer a serverless function (SendGrid) instead, I can scaffold an `/api/contact` endpoint that sends mail directly (requires a SendGrid API key).

SendGrid serverless option (server-side sending)

1. Create a SendGrid account and generate an API key (Full Access or Mail Send permission).
2. Verify a sender identity (the `FROM_EMAIL`) inside SendGrid (sender verification or domain verification).
3. Deploy this repo to Vercel (or Netlify). The scaffolded serverless function is available at `/api/contact`.
4. In your hosting dashboard set the following environment variables:
   - `SENDGRID_API_KEY` = your SendGrid API key
   - `FROM_EMAIL` = the verified sender email (e.g. `no-reply@yourdomain.com`)
   - `TO_EMAIL` = `praveenjb24@gmail.com` (optional, defaults to this)
   - `VITE_CONTACT_ENDPOINT` = `https://<your-deployed-site>/api/contact`

5. The client will POST to `VITE_CONTACT_ENDPOINT`; the function will send email to `TO_EMAIL` using SendGrid.

Local testing notes
- To test the serverless function locally you can use the Vercel CLI (`vercel dev`) which emulates serverless endpoints locally, or deploy to Vercel and test there.

Security notes
- Keep `SENDGRID_API_KEY` secret and only set it in the hosting environment variables; do not commit it to the repo.
