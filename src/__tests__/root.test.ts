import app from '~/src/app'
import { ROUTES } from '~/src/route'
import request from 'supertest'

describe('Test root', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get(ROUTES.ROOT)
    expect(response.statusCode).toBe(200)
  })
})
