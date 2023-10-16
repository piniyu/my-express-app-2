import { CookieOptions } from 'express'
import jwt from 'jsonwebtoken'

const secret = process.env.SECRET || 'test secret'

export const encodeJWT = (payload: { username: string; userId: string }) => {
  return jwt.sign(payload, secret, { expiresIn: '2m' })
}

export const decodeJWT = (token: string) => {
  return jwt.verify(token, secret)
}

export const tokenCookieOption: CookieOptions = { httpOnly: true, maxAge: 1000 * 60 * 2 }
