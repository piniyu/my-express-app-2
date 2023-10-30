import { CookieOptions } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

type Payload = { username: string; userId: string }
type CustomJwtPayload = JwtPayload & Payload

const secret = process.env.SECRET || 'test secret'

export const encodeJWT = (payload: Payload) => {
  return jwt.sign(payload, secret, { expiresIn: '2m' })
}

export const decodeJWT = (token: string) => {
  try {
    return jwt.verify(token, secret) as CustomJwtPayload
  } catch (err) {
    console.error(err)
  }
}

export const tokenCookieOption: CookieOptions = { httpOnly: true, maxAge: 1000 * 60 * 2 }
