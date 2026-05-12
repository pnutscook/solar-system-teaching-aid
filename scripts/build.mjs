import { cp, mkdir, rm, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const entries = ['index.html', 'styles.css', 'favicon.svg', 'src', 'vendor']

await rm(dist, { recursive: true, force: true })
await mkdir(dist, { recursive: true })

for (const entry of entries) {
  const source = path.join(root, entry)
  const target = path.join(dist, entry)
  await cp(source, target, { recursive: true })
}

const distInfo = await stat(dist)
if (!distInfo.isDirectory()) throw new Error('Build failed: dist directory was not created.')

console.log(`Built static teaching aid at ${dist}`)
