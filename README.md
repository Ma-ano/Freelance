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

The Vite development server renders the site and uses the assistant's local knowledge fallback. To run the Vercel API routes locally, link the project and use `vercel dev`.

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

```bash
npm run build
```

The production output is generated in `dist` and is ready for Vercel.
