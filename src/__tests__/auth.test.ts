import request from 'supertest'
import { ROUTES } from '~/src/route'
import app from '~/src/app'
import { closeDB, collection, connectToDB } from '~/src/data/db'

const TEST_ACCOUNT = {
  username: 'lisa123',
  password: '12345678'
}

describe('Test register', () => {
  beforeAll(async () => {
    await connectToDB()
  })
  afterAll(async () => {
    await collection.deleteMany({})
    await closeDB()
  })

  test('It should response the POST method', async () => {
    const response = await request(app)
      .post(ROUTES.REGISTER)
      .send({ username: 'lisa123', password: '12345678' })
    expect(response.statusCode).toBe(200)
  })
})

export {}
