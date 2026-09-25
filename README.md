# Wren Labs

Responsive company portfolio website for Wren Labs, built with React, Tailwind CSS, Motion, MongoDB, and Groq.

## Stack

- React 19 and Vite 8
- Tailwind CSS 4
- Motion
- MongoDB Atlas
- Groq using GPT-OSS 20B

## Development

```bash
npm install
npm run dev
```

The Vite development server runs the same chat and contact handlers as Vercel and loads server credentials from `.env.local`. Restart `npm run dev` after changing credentials. Vercel deployments still require the variables in Vercel Project Settings.

## Environment variables

Copy `.env.example` to `.env.local` and add these server-only values:

- `MONGODB_URI` — MongoDB Atlas connection string
- `MONGODB_DB` — database name (defaults to `wrenlabs`)
- `GROQ_API_KEY` — Groq API key
- `GROQ_MODEL` — optional model override (defaults to `openai/gpt-oss-20b`)
- `GROQ_BASE_URL` — optional Groq OpenAI-compatible endpoint

Never add real credentials to Git. Add the same variables in Vercel Project Settings for Production, Preview, and Development as needed.

## Server endpoints

- `POST /api/contact` validates contact-form submissions and stores them in the MongoDB `inquiries` collection.
- `POST /api/chat` applies MongoDB-backed visitor and global rate limits, retrieves Wren Labs knowledge from MongoDB, and sends that context to Groq. If the API route is unavailable, the browser assistant uses bundled Wren Labs answers.

## Production

### Gmail inquiry notifications

Set `GMAIL_USER` to the Gmail sender (normally `wrenlabsph@gmail.com`) and `GMAIL_APP_PASSWORD` to a Google App Password for that account. Use an App Password, not your normal Google password. Set these in `.env.local` and in Vercel's environment variables, then restart locally or redeploy. See https://support.google.com/accounts/answer/185833 for account eligibility and setup.

Notifications always go to `wrenlabsph@gmail.com`. The visitor email is the Reply-To address. Email and MongoDB storage are attempted independently: email can succeed during a database outage. The form reports partial success accurately; a database save does not imply an email was sent. SMTP acceptance does not guarantee inbox placement, so check spam too. No historical inquiries are emailed automatically.

Wren uses a separate personality prompt in `server/conversation.js` and public company facts in `server/knowledge.js`. Only the last six chat messages (up to 800 characters each) are sent for follow-ups; history stays in browser memory and clears on reload. The UI retains up to 40 messages. Missing facts are not treated as confirmed business information, and sample concepts are explicitly distinguished from delivered client projects.

Public knowledge documents are synchronized to stable `wren:` IDs in MongoDB. Retrieval reads only those public records, never contact inquiries. The same public knowledge powers the non-AI fallback. Changing the approved knowledge file and deploying refreshes those records on the next AI request.

```bash
npm run build
```

The production output is generated in `dist` and is ready for Vercel.

## Team portfolios on one domain

These profile routes are prepared for the portfolio migration:

- Peter: `/PORTFOLIO/maanopetergil`
- Raynato: `/PORTFOLIO/raynatopedrajeta`

On the current production domain, prefix each path with `https://freelance-dusky-seven.vercel.app`. Links within the site are relative, so both profiles also work under a future custom domain without changing the paths. `vercel.json` rewrites portfolio requests to the React entry page, allowing direct visits and refreshes while leaving `/api/*` and assets untouched. See [Vercel rewrites](https://vercel.com/docs/routing/rewrites).

For now, each profile clearly says its full portfolio is coming and links to the existing external portfolio. The old sites have not been transferred or proxied. Team names, roles, profile paths, and current portfolio links live in `src/data/team.js`, shared by the website and assistant knowledge. To complete the transfer later, bring in each portfolio's source and assets and replace its temporary content in `src/PortfolioPage.jsx`, preserving the public paths. Check asset paths and any API routes before retiring the old deployments.

## Assistant knowledge

`server/knowledge.js` covers the studio, name and logo, wren bird, developers, sample concepts, services, project agenda, initial brief, contact, and the limits of published pricing/support terms. Bird facts are sourced from the [Cornell Lab's Northern House Wren guide](https://www.allaboutbirds.org/guide/House_Wren/overview); they are kept separate from the company's brand symbolism and do not claim a specific species for the logo.
