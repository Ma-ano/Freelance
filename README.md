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

Wren uses a separate personality prompt in `server/conversation.js` and public company facts in `server/knowledge.js`. Only the last six chat messages (up to 800 characters each) are sent for follow-ups; history stays in browser memory and clears on reload. The UI retains up to 40 messages. Missing facts are not treated as confirmed business information, and sample concepts are explicitly distinguished from delivered client projects.

Public knowledge documents are synchronized to stable `wren:` IDs in MongoDB. Retrieval reads only those public records, never contact inquiries. The same public knowledge powers the non-AI fallback. Changing the approved knowledge file and deploying refreshes those records on the next AI request.

```bash
npm run build
```

The production output is generated in `dist` and is ready for Vercel.
