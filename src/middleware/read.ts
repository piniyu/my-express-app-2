import { ObjectId } from 'mongodb'
import { taskCollection } from '../data/db'
import { Handler } from '../routes/type'
import { decodeJWT } from '../utils/jwt'
import { verifyJwt } from './jwt-validate'

const handler: Handler<{}, {}, { id?: string }> = async (req, res) => {
  try {
    const query = req.query
    const token = req.headers.authorization?.split(' ')[1]!

    const decode = decodeJWT(token)!

    if (query.id) {
      const objectId = new ObjectId(query.id)
      const task = await taskCollection.findOne({ _id: objectId })
      return res.send({ task }).status(200)
    }

    const tasks = await taskCollection.find({ userId: decode.userId }).toArray()
    res.send({ tasks }).status(200)
  } catch (err) {
    console.error(err)
  }
}

const middleware = [verifyJwt, handler]

export default middleware
