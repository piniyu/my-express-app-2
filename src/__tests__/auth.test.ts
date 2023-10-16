import request from 'supertest'
import { ROUTES } from '~/src/routes/route'
import app from '~/src/app'
import { closeDB, userCollection, connectToDB } from '~/src/data/db'

const TEST_ACCOUNT = {
  username: 'lisa123',
  password: '12345678'
}
beforeAll(async () => {
  await connectToDB()
  await userCollection.deleteOne({ username: TEST_ACCOUNT.username })
})
afterAll(async () => {
  await userCollection.deleteMany({ username: TEST_ACCOUNT.username })
  await closeDB()
})

describe('Test register', () => {
  test('It should response the POST method', async () => {
    const response = await request(app).post(ROUTES.REGISTER).send(TEST_ACCOUNT)

    expect(response.body.token).toBeTruthy()
    expect(response.statusCode).toBe(200)
  })

  test('It should response status 400 and error message"', async () => {
    const response = await request(app).post(ROUTES.REGISTER).send(TEST_ACCOUNT)

    expect(response.statusCode).toBe(400)
    expect(response.body).toBeTruthy()
  })
})

describe('Test login', () => {
  beforeAll(async () => {
    const user = await userCollection.findOne({ username: TEST_ACCOUNT.username })
    if (!user) {
      await userCollection.insertOne(TEST_ACCOUNT)
    }
  })

  test('It should response the POST method', async () => {
    const response = await request(app).post(ROUTES.LOGIN).send(TEST_ACCOUNT)

    expect(response.body.token).toBeTruthy()
    expect(response.statusCode).toBe(200)
  })
})

export {}
