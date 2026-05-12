import { readFile, stat } from 'node:fs/promises'

const requiredFiles = [
  'index.html',
  'favicon.svg',
  'styles.css',
  'src/solar-system.js',
  'vendor/three.module.js',
  'vendor/three.core.js',
  'vendor/OrbitControls.js',
]

for (const file of requiredFiles) {
  const info = await stat(new URL(`../${file}`, import.meta.url))
  if (!info.isFile()) throw new Error(`Missing required file: ${file}`)
}

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8')
const source = await readFile(new URL('../src/solar-system.js', import.meta.url), 'utf8')
const styles = await readFile(new URL('../styles.css', import.meta.url), 'utf8')

const forbiddenRemoteRefs = [/https?:\/\//, /cdn\./i]
for (const pattern of forbiddenRemoteRefs) {
  if (pattern.test(html) || pattern.test(source) || pattern.test(styles)) {
    throw new Error('The teaching aid must not depend on remote runtime assets.')
  }
}

const removedPrototypeTerms = ['Tripo', 'Hunyuan', 'image-to-3D', 'API Key', 'GLB 上传']
for (const term of removedPrototypeTerms) {
  if (source.includes(term) || html.includes(term)) {
    throw new Error(`Found removed prototype term: ${term}`)
  }
}

const stepCount = (source.match(/id: '/g) || []).filter(Boolean).length
if (stepCount < 15) {
  throw new Error('Expected the source to define lesson steps and solar-system bodies.')
}

for (const body of ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune']) {
  if (!source.includes(`id: '${body}'`)) {
    throw new Error(`Missing planet definition: ${body}`)
  }
}

for (const step of ['overview', 'order', 'rotation', 'seasons', 'moon']) {
  if (!source.includes(`id: '${step}'`)) {
    throw new Error(`Missing lesson step: ${step}`)
  }
}

console.log('Lint checks passed: static, offline, five lesson steps, eight planets.')
