import { decodeJWT, encodeJWT } from '~/src/utils/jwt'
import { closeDB, userCollection, connectToDB } from '~/src/data/db'
import { User } from '../types/db'

describe('JWT token test', () => {
  const TEST_ACCOUNT: User = { username: 'lisa1234', password: '12345678' }
  let id: string
  let testPayload: { username: string; userId: string }
  let token: string

  beforeAll(async () => {
    await connectToDB()
    await userCollection.deleteMany({})
    const { insertedId } = await userCollection.insertOne(TEST_ACCOUNT)
    id = insertedId.toJSON()
    testPayload = { username: TEST_ACCOUNT.username, userId: id }
  })

  afterAll(async () => {
    await userCollection.deleteMany({})
    await closeDB()
  })

  test('It should return encode JWT token', () => {
    token = encodeJWT(testPayload)
    expect(token).toBeTruthy()
  })

  test('It should return decode JWT token', () => {
    const decode = decodeJWT(token)
    expect(decode).toBeTruthy()
  })
})
