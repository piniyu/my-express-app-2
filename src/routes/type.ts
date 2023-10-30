import express from 'express'

export type Handler<Params = {}, ReqBody = { [key: string]: string }> = (
  req: express.Request<Params, {}, ReqBody>,
  res: express.Response
) => any

export type Route = {
  method: 'get' | 'post' | 'put' | 'delete' | 'patch'
  url: string
  middleware: ((req: express.Request, res: express.Response, next: express.NextFunction) => void)[]
}
