import { Handler } from '~/src/route'
import { validateRegister } from '~/src/validation'
import { db, collection, client, connectToDB, closeDB } from '~/src/data/db'

const handler: Handler = async (req, res) => {
  console.log(req.body)
  try {
    const insertRes = await collection.insertOne(req.body)
    console.log('Result:', insertRes)
  } catch (err) {
    console.error(err)
  }
  res.status(200)
  res.send('User created')
}

const middleware = [validateRegister, handler]

export default middleware
