import { decodeJWT } from '../utils/jwt'
import { Handler } from '../routes/type'

export const verifyJwt: Handler = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.status(401).send('Required JWT token')
  }
  const decode = decodeJWT(token)
  if (!decode) {
    return res.status(403).send('Invalid JWT token')
  }
  // return decode
  return next()
}
