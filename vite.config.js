import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'
import { devApi } from './server/dev-api.js'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  for (const key of ['MONGODB_URI', 'MONGODB_DB', 'GROQ_API_KEY', 'GROQ_MODEL', 'GROQ_BASE_URL', 'GMAIL_USER', 'GMAIL_APP_PASSWORD']) {
    if (!process.env[key] && env[key]) process.env[key] = env[key]
  }
  return { plugins: [react(), tailwindcss(), devApi()] }
})
