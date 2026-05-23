import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import { rateLimit } from 'express-rate-limit'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const isProd = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 5173
const base = process.env.BASE || '/vite-project/'

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
})

async function createServer() {
  const app = express()

  app.use(limiter)

  /** @type {import('vite').ViteDevServer | undefined} */
  let vite
  /** @type {((url: string) => { html: string; head: string }) | undefined} */
  let render
  /** @type {string | undefined} */
  let prodTemplate

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite')
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
      base,
    })
    app.use(vite.middlewares)
  } else {
    const compression = (await import('compression')).default
    const sirv = (await import('sirv')).default
    app.use(compression())
    app.use(base, sirv(path.resolve(__dirname, 'dist/client'), { extensions: [] }))
    prodTemplate = fs.readFileSync(
      path.resolve(__dirname, 'dist/client/index.html'),
      'utf-8',
    )
    render = (await import('./dist/server/entry-server.js')).render
  }

  app.use('*', async (req, res) => {
    try {
      let url = req.originalUrl
      if (url.startsWith(base)) {
        url = url.slice(base.length)
      }

      let template
      let resolvedRender

      if (!isProd) {
        template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        resolvedRender = (await vite.ssrLoadModule('/src/entry-server.jsx')).render
      } else {
        template = prodTemplate
        resolvedRender = render
      }

      const { html: appHtml, head: appHead } = resolvedRender(url)

      const fullHtml = template
        .replace('<!--app-head-->', appHead ?? '')
        .replace('<!--app-html-->', appHtml)

      res.status(200).set({ 'Content-Type': 'text/html' }).send(fullHtml)
    } catch (error) {
      if (vite) vite.ssrFixStacktrace(error)
      console.error(error.stack)
      res.status(500).set({ 'Content-Type': 'text/plain' }).end('Internal Server Error')
    }
  })

  app.listen(port, () => {
    console.log(`SSR server running at http://localhost:${port}`)
  })
}

createServer()
