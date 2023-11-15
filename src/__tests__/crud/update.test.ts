import request from 'supertest'
import { closeDB, connectToDB, userCollection, taskCollection } from '~/src/data/db'
import app from '../../app'
import { ROUTES } from '../../routes/route'
import { encodeJWT } from '~/src/utils/jwt'

const TEST_ACCOUNT = {
  username: 'taskuserUpdate',
  password: '12345678'
}

const TASK_DATA = {
  title: 'title update',
  description: 'description 1234'
}

let token: string
let taskId: string

beforeAll(async () => {
  await connectToDB()

  const user = await userCollection.insertOne(TEST_ACCOUNT)
  const task = await taskCollection.insertOne({
    ...TASK_DATA,
    userId: user.insertedId.toString()
  })

  taskId = task.insertedId.toString()
  token = encodeJWT({ username: TEST_ACCOUNT.username, userId: user.insertedId.toString() })
})

afterAll(async () => {
  await Promise.all([
    taskCollection.deleteOne({ title: TASK_DATA.title }),
    userCollection.deleteOne({ username: TEST_ACCOUNT.username })
  ])

  await closeDB()
})

describe('Test update api', () => {
  test('Updating a task by id should response 200', async () => {
    const response = await request(app)
      .put(ROUTES.UPDATE)
      .set('Authorization', `Bearer ${token}`)
      .send({ taskId, ...TASK_DATA })

    expect(response.statusCode).toBe(200)
    expect(response.body).toBeTruthy()
  })
})
