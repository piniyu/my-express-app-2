import { taskCollection } from '../data/db'
import { Handler } from '../routes/type'
import { Task } from '../types/db'
import { decodeJWT } from '../utils/jwt'

const handler: Handler<{}, Omit<Task, 'userId'> & { token: string }> = async (req, res) => {
  try {
    const { token, title, description } = req.body
    if (!token) {
      return res.send('Require userId').status(400)
    } else if (!title) {
      return res.send('Title is required').status(400)
    }
    const decode = decodeJWT(token)
    if (!decode) {
      return res.send('Invalid JWT token').status(400)
    }
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

const middleware = [handler]

export default middleware
