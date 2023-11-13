import request from 'supertest'
import { closeDB, connectToDB, userCollection, taskCollection } from '~/src/data/db'
import app from '../app'
import { ROUTES } from '../routes/route'

const TEST_ACCOUNT = {
  username: 'lisa1234',
  password: '12345678'
}

const TASK_DATA = {
  title: 'title 1',
  description: 'description 1234'
}
const New_TASK_DATA = {
  title: 'title 2',
  description: 'description 7788'
}

let token: string
let taskId: string

beforeAll(async () => {
  await connectToDB()
  await taskCollection.deleteMany({})
  const user = await userCollection.findOne({ username: TEST_ACCOUNT.username })
  if (!user) {
    await userCollection.insertOne(TEST_ACCOUNT)
  }
  const res = await request(app).post(ROUTES.LOGIN).send(TEST_ACCOUNT)
  token = res.body.token
})
afterAll(async () => {
  // await taskCollection.deleteMany({})
  await closeDB()
})

describe('Test CRUD methods', () => {
  test('Creating a task should response 200', async () => {
    const response = await request(app)
      .post(ROUTES.CREATE)
      .set('Authorization', `Bearer ${token}`)
      .send(TASK_DATA)

    taskId = response.body.taskId
    console.log(taskId)
    expect(response.statusCode).toBe(200)
    expect(response.body.taskId).toBeTruthy()
  })

  test('Reading all tasks should response 200', async () => {
    const response = await request(app).get(ROUTES.READ).set('Authorization', `Bearer ${token}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.tasks).toHaveLength(1)
  })

  test('Reading a task by id should response 200', async () => {
    const response = await request(app)
      .get(ROUTES.READ)
      .query({ id: taskId })
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200)
    expect(response.body.task).toBeTruthy()
  })

  test('Updating a task by id should response 200', async () => {
    const response = await request(app)
      .put(ROUTES.UPDATE)
      .set('Authorization', `Bearer ${token}`)
      .send({ taskId, ...New_TASK_DATA })

    expect(response.statusCode).toBe(200)
    expect(response.body).toBeTruthy()
  })

  test('Delete a task by id', async () => {
    const response = await request(app)
      .delete(ROUTES.DELETE)
      .query({ taskId })
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200)
    expect(response.body).toBeTruthy()
  })
})
