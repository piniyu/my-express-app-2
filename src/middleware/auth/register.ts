import bcrypt from 'bcrypt'
import { validateAuthInput } from '~/src/middleware/validation'
import { userCollection } from '~/src/data/db'
import { Handler } from '~/src/routes/type'
import { User } from '~/src/types/db'
import { encodeJWT, tokenCookieOption } from '~/src/utils/jwt'

const handler: Handler<User> = async (req, res) => {
  try {
    const existingUser = await userCollection.findOne({ username: req.body.username })
    if (existingUser) {
      return res.status(400).send('User already exist')
    }

    // username must be unique
    await userCollection.createIndex({ username: 1 }, { unique: true })

    // hash password
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)

    const { insertedId } = await userCollection.insertOne({
      username: req.body.username,
      password: hashedPassword
    })

    const token = encodeJWT({ username: req.body.username, userId: insertedId.toString() })

    res.send({ token })
    res.status(200)
  } catch (err) {
    console.error(err)
    res.status(400)
  }
}

const middleware = [validateAuthInput, handler]

export default middleware
