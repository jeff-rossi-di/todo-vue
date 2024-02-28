export const apiBaseUrl = 'https://todo-api.jeff-rossi.com'

export const randUserPW = 'T0pS3cret!'

export type ToDo = {
  Id: number
  Created: string
  Updated: string
  Version: string
  IsDeleted: boolean
  Task: string
  Completed: boolean
  UserId: number
}
