import request from 'supertest'
import { closeDB, connectToDB, userCollection, taskCollection } from '~/src/data/db'
import app from '../../app'
import { ROUTES } from '../../routes/route'
import { encodeJWT } from '~/src/utils/jwt'

const TEST_ACCOUNT = {
  username: 'taskuserCreate',
  password: '12345678'
}

const TASK_DATA = {
  title: 'title create',
  description: 'description 1234'
}

let token: string

beforeAll(async () => {
  await connectToDB()

  const user = await userCollection.insertOne(TEST_ACCOUNT)

  token = encodeJWT({ username: TEST_ACCOUNT.username, userId: user.insertedId.toString() })
})
afterAll(async () => {
  await Promise.all([
    taskCollection.deleteOne({ title: TASK_DATA.title }),
    userCollection.deleteOne({ username: TEST_ACCOUNT.username })
  ])

  await closeDB()
})

describe('Test create api', () => {
  test('Creating a task should response 200', async () => {
    const response = await request(app)
      .post(ROUTES.CREATE)
      .set('Authorization', `Bearer ${token}`)
      .send(TASK_DATA)

    expect(response.statusCode).toBe(200)
    expect(response.body.taskId).toBeTruthy()
  })
})
