import { ObjectId } from 'mongodb'

export interface User {
  username: string
  password: string
}

export interface Task {
  userId: string
  title: string
  description?: string
}
