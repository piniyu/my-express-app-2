import { ObjectId } from 'mongodb'
import { taskCollection } from '../data/db'
import { Handler } from '../routes/type'
import { decodeJWT } from '../utils/jwt'

const handler: Handler<{ id?: string }, { token: string }> = async (req, res) => {
  try {
    const params = req.params
    const { token } = req.body
    const decode = decodeJWT(token)
    if (!decode) {
      return res.send('Invalid JWT token').status(400)
    }

    if (params.id) {
      console.log(params)
      const objectId = new ObjectId(params.id)
      const task = await taskCollection.findOne({ _id: objectId })
      return res.send({ task }).status(200)
    }

    const tasks = await taskCollection.find({ userId: decode.userId }).toArray()
    res.send({ tasks }).status(200)
  } catch (err) {
    console.error(err)
  }
}

const middleware = [handler]

export default middleware
