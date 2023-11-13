import express from 'express'

export type Handler<Params = {}, ReqBody = { [key: string]: string }, ReqQuery = {}> = (
  req: express.Request<Params, {}, ReqBody, ReqQuery>,
  res: express.Response,
  next: express.NextFunction
) => any

export type Route = {
  method: 'get' | 'post' | 'put' | 'delete' | 'patch'
  url: string
  middleware: ((req: express.Request, res: express.Response, next: express.NextFunction) => void)[]
}
