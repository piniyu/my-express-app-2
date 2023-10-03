import { Collection, Db, MongoClient } from 'mongodb'

const url = process.env.DB_URL || 'mongodb://127.0.0.1:27017'
const dbName = 'myExpress2'
let client: MongoClient

let db: Db
let collection: Collection<Document>

async function connectToDB() {
  if (!client) {
    client = new MongoClient(url)
    try {
      await client.connect()
      console.log('Connected successfully to server')
      db = client.db(dbName)
      collection = db.collection('document')
    } catch (err) {
      console.error(err)
    }
  }
}

async function closeDB() {
  if (client) {
    await client.close()
  }
}

export { db, collection, client, connectToDB, closeDB }
