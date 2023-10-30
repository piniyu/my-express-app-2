import express from 'express'
import { decodeJWT } from '../utils/jwt'

export const verifyJwt = (token: string, res: express.Response) => {
  const decode = decodeJWT(token)
  if (!decode) {
    return res.send('Invalid JWT token').status(400)
  }
  return decode
}
