# Wren Labs

Responsive company portfolio website built with React, Vite, Tailwind CSS, Motion, MongoDB, Gmail, and Google Gemini.

## Development

```bash
npm ci
npm run dev
```

Copy `.env.example` to `.env.local` and configure server-only credentials. Never use `VITE_` for secrets. Restart the dev server after changing credentials. The Vite development server runs the same `/api/chat` and `/api/contact` handlers used by Vercel. `npm run preview` serves the static build only.

- `GOOGLE_GEMINI_API_KEY`: Google Gemini API key. `GEMINI_API_KEY` and `GOOGLE_API_KEY` are also accepted, in that precedence order after the project-specific name. Set only one to avoid ambiguity.
- `GEMINI_MODEL`: optional override; defaults to `gemini-3.5-flash-lite`.
- `MONGODB_URI`: MongoDB connection string. Required for production rate limits and inquiry storage.
- `MONGODB_DB`: defaults to `wrenlabs`.
- `GMAIL_USER` and `GMAIL_APP_PASSWORD`: sender and Google App Password for inquiry notifications.

## Wren Assistant

Wren is a warm bird-inspired company guide with occasional playful phrasing. Every Gemini request includes all approved facts from `server/knowledge.js`, the persona in `server/conversation.js`, and the last six messages (800 characters each). It must not invent prices, deadlines, clients, or team facts. Sample concepts remain distinct from shipped work.

The voice stays curious, encouraging, and lightly bird-inspired across follow-ups. Replies should use zero or one emoji from 🐦, 🪶, ✨, 💡, 🌱, vary recent expressions, and respect requests for less playfulness. Serious concerns remain direct; inquiry drafts remain professional and emoji-free. Scripted greetings, loading, fallback, and limit messages use the same voice. These are model instructions, not a guarantee of identical style on every generation.

For an optional live voice evaluation, run `node server/persona-eval.js`. This uses the configured Gemini key for two ten-message conversations (20 paid/quota-counted requests), checks emoji limits and final handoffs, and writes a transcript to the OS temporary directory. It does not submit inquiries. Review the transcript for natural tone, repetition, and factual grounding; the automatic checks alone do not assess those qualities.

Gemini uses structured JSON: `answer`, `offerInquiry`, and `inquirySummary`. The browser renders plain text, never generated HTML. A contextual Continue to inquiry action opens the existing form and adds an editable summary based only on visitor-stated requirements. Existing form content is preserved; if the combined message exceeds 3,000 characters, the existing message is retained with an explanation. Chat never submits the form or sends email. Selecting a sample concept prepares a question without spending an AI request.

The chat allows 10 attempts per tab session, one pending request, and a four-second cooldown after each attempt. Failed attempts also count. The attempt count and retry deadline are saved in sessionStorage before a request and after its response, so closing/reopening chat and reloading the page preserve the allowance and cooldown. Conversation text is not stored. A new tab session can have a fresh UI allowance; this is not an anti-abuse security boundary. If browser storage is blocked, the UI falls back to in-memory tracking. Server counters do not reset on refresh: one request per four-second bucket, 10 per minute per visitor IP, 100 per UTC day per IP, and 900 per UTC day globally. Daily caps count admitted attempts, not just successful model replies. Shared-IP visitors share server quotas.

Production requires MongoDB and fails closed when limits cannot be checked. Atomic capped counters use MongoDB's unique `_id` index and a TTL cleanup index. The Vercel trusted forwarding header identifies the visitor; other production hosting requires a trusted proxy configuration before exposing the API. Development uses socket IPs and falls back to process-local counters if MongoDB is missing or cannot connect. Local counters survive browser refreshes but reset when the server restarts or reloads the module. These local counters are not production storage.

Input is limited to 1,000 characters, request bodies to 16 KB, and model output to 1,000 tokens. No automatic provider retries. Rate-limit responses expose a retry countdown and contextual contact action. Provider failures show bundled website information. Conversation history lives only in browser memory, is sent to Gemini for replies, and clears on refresh.

### Connection troubleshooting

Vercel environment variables are **not** automatically available to `npm run dev`. If the key is configured only on Vercel, local chat intentionally displays “Website guide · Offline mode” and uses bundled company facts. Add a server-only Gemini key to `.env.local` and restart Vite to test AI locally, or test the deployed site. Never paste a key into the browser or commit it.

On Vercel, check that the key and `MONGODB_URI` apply to the deployment environment (Production or Preview), then redeploy after changing them. A missing key returns `AI_NOT_CONFIGURED`, database/rate-limit failures return `AI_STORAGE_UNAVAILABLE`, and other service failures return `AI_UNAVAILABLE`. Function logs identify whether failure occurred at rate-limit storage or Gemini, including the provider HTTP status when available, without logging secrets or visitor messages. Check MongoDB connectivity/permissions for storage failures; check the key, model access, and Google quota for Gemini failures. The chat only says “Connected to Gemini” after a successful reply.

## Interactive Wren model

The hero uses `src/assets/Bird-Wren-v2.glb` with a separately loaded Three.js viewer and a transparent background. There is no visible frame, label, or control bar. Drag with a mouse or swipe horizontally on touchscreens to rotate it. Vertical touch swipes still scroll the page. Arrow keys work on the focused viewer and Home restores the starting angle; instructions remain available to screen readers.

Wren rotates slowly by default. After eight seconds without manual interaction, it eases back to its original angle over 1.2 seconds and resumes rotation. Automatic animation pauses offscreen or in a hidden tab, and is disabled for reduced-motion preferences. Rendering is capped at 30 fps and pixel density at 1.75; the bird stays framed at every angle and GPU resources are released on unmount. `src/assets/wren-bird-poster.png` is the static loading and WebGL-failure fallback. The original 2D logo remains in navigation and assistant controls.

## Inquiries

`POST /api/contact` validates and independently attempts MongoDB storage and Gmail notification. Notifications go to `wrenlabsph@gmail.com` with the visitor email as Reply-To. Partial-success messages distinguish storage from notification. SMTP acceptance does not guarantee inbox placement. No historical inquiries are sent automatically.

## Checks and production

```bash
npm test
npm run lint
npm run build
```

Deploy with Vercel's Vite preset and set server credentials in project settings. The frontend build is in `dist`; the `/api` functions must also be deployed. Never expose the frontend API key. Production chat intentionally remains unavailable if persistent rate-limit storage is unhealthy.

## Team portfolios on one domain

These profile routes are prepared for the portfolio migration:

- Peter: `/PORTFOLIO/maanopetergil`
- Raynato: `/PORTFOLIO/raynatopedrajeta`

On the current production domain, prefix each path with `https://wrenlabs-dusky-seven.vercel.app`. Links within the site are relative, so both profiles also work under a future custom domain without changing the paths. `vercel.json` rewrites portfolio requests to the React entry page, allowing direct visits and refreshes while leaving `/api/*` and assets untouched. See [Vercel rewrites](https://vercel.com/docs/routing/rewrites).

For now, each profile clearly says its full portfolio is coming and links to the existing external portfolio. The old sites have not been transferred or proxied. Team names, roles, profile paths, and current portfolio links live in `src/data/team.js`, shared by the website and assistant knowledge. To complete the transfer later, bring in each portfolio's source and assets and replace its temporary content in `src/PortfolioPage.jsx`, preserving the public paths. Check asset paths and any API routes before retiring the old deployments.

## Assistant knowledge

`server/knowledge.js` covers the studio, name and logo, wren bird, developers, sample concepts, services, project agenda, initial brief, contact, and the limits of published pricing/support terms. Bird facts are sourced from the [Cornell Lab's Northern House Wren guide](https://www.allaboutbirds.org/guide/House_Wren/overview); they are kept separate from the company's brand symbolism and do not claim a specific species for the logo.
