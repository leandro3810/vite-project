import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const isProd = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 5173
const base = process.env.BASE || '/vite-project/'

async function createServer() {
  const app = express()

  /** @type {import('vite').ViteDevServer | undefined} */
  let vite

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
  }

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl.replace(base, '')

      let template
      let render

      if (!isProd) {
        template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render
      } else {
        template = fs.readFileSync(
          path.resolve(__dirname, 'dist/client/index.html'),
          'utf-8',
        )
        const entryServer = await import('./dist/server/entry-server.js')
        render = entryServer.render
      }

      const { html: appHtml, head: appHead } = render(url)

      const fullHtml = template
        .replace('<!--app-head-->', appHead ?? '')
        .replace('<!--app-html-->', appHtml)

      res.status(200).set({ 'Content-Type': 'text/html' }).send(fullHtml)
    } catch (error) {
      if (vite) vite.ssrFixStacktrace(error)
      console.error(error.stack)
      res.status(500).end(error.stack)
    }
  })

  app.listen(port, () => {
    console.log(`Servidor SSR rodando em http://localhost:${port}`)
  })
}

createServer()
