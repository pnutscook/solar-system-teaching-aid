import { createReadStream, existsSync } from 'node:fs'
import { stat } from 'node:fs/promises'
import http from 'node:http'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const publicRoot = existsSync(dist) ? dist : root
const port = Number(process.env.PORT || 4173)

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
}

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url || '/', `http://${request.headers.host}`)
    const pathname = decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname)
    const resolved = path.resolve(publicRoot, `.${pathname}`)

    if (!resolved.startsWith(publicRoot)) {
      response.writeHead(403)
      response.end('Forbidden')
      return
    }

    const info = await stat(resolved)
    if (!info.isFile()) throw new Error('Not a file')

    response.writeHead(200, {
      'Content-Type': mimeTypes[path.extname(resolved)] || 'application/octet-stream',
      'Cache-Control': 'no-store',
    })
    createReadStream(resolved).pipe(response)
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    response.end('Not found')
  }
})

server.listen(port, '127.0.0.1', () => {
  console.log(`Solar system teaching aid running at http://127.0.0.1:${port}/`)
  console.log(`Serving ${publicRoot}`)
})
