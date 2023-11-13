import { ObjectId } from 'mongodb'
import { taskCollection } from '../data/db'
import { Handler } from '../routes/type'
import { Task } from '../types/db'
import { verifyJwt } from './jwt-validate'

const handler: Handler<{}, { taskId?: string } & Omit<Task, 'userId'>, {}> = async (req, res) => {
  try {
    // const token = req.headers.authorization?.split(' ')[1]!
    // const decode = decodeJWT(token)!
    const { title, description, taskId } = req.body

    if (!taskId) {
      return res.send('Required taskId').status(400)
    }

    const objectId = new ObjectId(taskId)
    const tasks = await taskCollection.updateOne(
      { _id: objectId },
      { $set: { title, description } }
    )
    res.send({ tasks }).status(200)
  } catch (err) {
    console.error(err)
  }
}

const middleware = [verifyJwt, handler]

export default middleware
