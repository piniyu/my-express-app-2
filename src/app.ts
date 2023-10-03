import express from 'express'
import { routes } from './route'

const app = express()

app.use(express.json())

routes.forEach(({ url, middleware, method }) => {
  app[method](url, ...middleware)
})

export default app
