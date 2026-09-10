// Runs the same Vercel handlers during `npm run dev`. Never imported by React.
export function devApi() {
  return {
    name: 'wren-local-api',
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const path = request.url?.split('?')[0]
        if (!['/api/chat', '/api/contact'].includes(path)) return next()
        response.setHeader('Content-Type', 'application/json')
        response.status = (code) => { response.statusCode = code; return response }
        response.json = (body) => response.end(JSON.stringify(body))
        try {
          let body = ''
          for await (const chunk of request) {
            body += chunk.toString()
            if (Buffer.byteLength(body) > 16000) return response.status(413).json({ error: 'Request is too large.' })
          }
          try { request.body = body ? JSON.parse(body) : {} } catch {
            return response.status(400).json({ error: 'Invalid JSON.' })
          }
          const { default: handler } = await server.ssrLoadModule(`${path}.js`)
          await handler(request, response)
        } catch (error) {
          console.error('Local API failed:', error?.name || 'UnknownError')
          if (!response.writableEnded) response.status(500).json({ error: 'Service temporarily unavailable.' })
        }
      })
    },
  }
}
