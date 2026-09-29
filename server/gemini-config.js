// Server-only configuration. Support Google AI Studio's standard variable names
// as well as the project's original name; never use a VITE_ prefix for a key.
export function getGeminiConfig(env = process.env) {
  return {
    apiKey: [env.GOOGLE_GEMINI_API_KEY, env.GEMINI_API_KEY, env.GOOGLE_API_KEY]
      .find(value => value?.trim())?.trim() || '',
    model: env.GEMINI_MODEL?.trim() || 'gemini-3.5-flash-lite',
  }
}
