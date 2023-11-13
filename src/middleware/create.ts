import { taskCollection } from '../data/db'
import { Handler } from '../routes/type'
import { Task } from '../types/db'
import { decodeJWT } from '../utils/jwt'
import { verifyJwt } from './jwt-validate'

const handler: Handler<{}, Omit<Task, 'userId'>> = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]!
    const { title, description } = req.body

    if (!title) {
      return res.send('Title is required').status(400)
    }

    const decode = decodeJWT(token)!

    const { insertedId } = await taskCollection.insertOne({
      userId: decode.userId,
      title,
      description
    })
    res.status(200)
    res.send({ taskId: insertedId.toString() })
  } catch (err) {
    console.error(err)
  }
}

const middleware = [verifyJwt, handler]

export default middleware
