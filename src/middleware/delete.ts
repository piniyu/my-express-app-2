import { ObjectId } from 'mongodb'
import { taskCollection } from '../data/db'
import { Handler } from '../routes/type'
import { verifyJwt } from './jwt-validate'

const handler: Handler<{}, {}, { taskId?: string }> = async (req, res) => {
  try {
    const { taskId } = req.query
    if (!taskId) {
      return res.send('Required taskId').status(400)
    }

    const objectId = new ObjectId(taskId)
    // console.log('objectId:', objectId)
    const result = await taskCollection.deleteOne({ _id: objectId })
    res.status(200).send('Delete success')
  } catch (err) {
    console.error(err)
  }
}

const middleware = [verifyJwt, handler]

export default middleware
