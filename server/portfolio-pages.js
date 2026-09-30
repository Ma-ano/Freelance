export const peterPortfolioEntry = '/PORTFOLIO/maanopetergil/index.html'

// Match the public URL without capturing Raynato, assets, or API requests.
export function portfolioEntryForPath(pathname) {
  return /^\/portfolio\/maanopetergil(?:\/|\/index\.html)?$/i.test(pathname)
    ? peterPortfolioEntry
    : null
}

export function portfolioPages() {
  const configure = (server) => {
    server.middlewares.use((req, _res, next) => {
      const url = new URL(req.url, 'http://localhost')
      const entry = portfolioEntryForPath(url.pathname)
      if (entry) req.url = entry + url.search
      next()
    })
  }
  return { name: 'portfolio-pages', configureServer: configure, configurePreviewServer: configure }
}
