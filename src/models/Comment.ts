import { User } from './User'

export type Comment = {
  id: string
  body: string
  dateCreated: string
  isEdited: boolean
  author: Partial<User>
}
