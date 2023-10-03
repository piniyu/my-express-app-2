import express from 'express'
import registerMiddleware from '~/src/middleware/auth/register'

export const ROUTES = {
  ROOT: '/',
  REGISTER: '/register'
}

export type Handler = (req: express.Request, res: express.Response) => any

export type Route = {
  method: 'get' | 'post' | 'put' | 'delete' | 'patch'
  url: string
  middleware: ((req: express.Request, res: express.Response, next: express.NextFunction) => void)[]
}

export const routes: Route[] = [
  {
    url: ROUTES.ROOT,
    method: 'get',
    middleware: [
      (req, res) => {
        res.status(200)
        res.send('Express')
      }
    ]
  },
  {
    url: ROUTES.REGISTER,
    method: 'post',
    middleware: registerMiddleware
  }
]
