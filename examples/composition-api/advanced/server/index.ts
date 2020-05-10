import express from 'express'
import consola from 'consola'
import { Nuxt, Builder } from 'nuxt-edge'
import config from '../nuxt.config'
const app = express()

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host } = nuxt.options.server

  const port = 3001
  await nuxt.ready()

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(3001, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
