import app from './app'
import { db, userCollection, client, connectToDB, closeDB } from '~/src/data/db'
const PORT = process.env.PORT || 3000

connectToDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error)
    process.exit(1) // Exit the application if MongoDB connection fails
  })

process.on('SIGINT', async () => {
  await client.close()
  console.log('MongoDB client closed')
  process.exit(0)
})
