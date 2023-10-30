import bcrypt from 'bcrypt'
import { userCollection } from '~/src/data/db'
import { Handler } from '~/src/routes/type'
import { User } from '~/src/types/db'
import { encodeJWT } from '~/src/utils/jwt'
import { validateAuthInput } from '../validation'

const handler: Handler<{}, User> = async (req, res) => {
  try {
    const user = await userCollection.findOne({ username: req.body.username })
    if (!user) {
      return res.status(400).send('User not found')
    }

    // compare password
    const isPasswordCorrect = bcrypt.compare(req.body.password, user.password)
    if (!isPasswordCorrect) {
      return res.status(400).send('Username or Password is incorrect')
    }

    const token = encodeJWT({ username: req.body.username, userId: user._id.toString() })
    console.log(token, req.body.username, user._id.toString())
    res.status(200).send({ token })
  } catch (err) {
    console.error(err)
    res.status(400)
  }
}

const middleware = [validateAuthInput, handler]

export default middleware
