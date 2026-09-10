# Wren Labs

Responsive company portfolio website for Wren Labs, built with React, Tailwind CSS, Motion, MongoDB, and the OpenAI Responses API.

## Stack

- React 19 and Vite 8
- Tailwind CSS 4
- Motion
- MongoDB Atlas
- OpenAI Responses API

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
- `OPENAI_API_KEY` — OpenAI project API key
- `OPENAI_MODEL` — optional model override (defaults to `gpt-5.6-luna`)

Never add real credentials to Git. Add the same variables in Vercel Project Settings for Production, Preview, and Development as needed.

## Server endpoints

- `POST /api/contact` validates contact-form submissions and stores them in the MongoDB `inquiries` collection.
- `POST /api/chat` retrieves Wren Labs knowledge from MongoDB and sends that context to the OpenAI Responses API. If the API route is unavailable, the browser assistant uses bundled Wren Labs answers.

## Production

```bash
npm run build
```

The production output is generated in `dist` and is ready for Vercel.
