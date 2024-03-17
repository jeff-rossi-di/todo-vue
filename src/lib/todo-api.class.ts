import { apiBaseUrl } from '@/constants'
import type { UserSession } from '@/stores/user'
import axios from 'axios'

export class ToDoApi {
  private _endPoint = apiBaseUrl
  private _client = axios

  constructor() {}

  buildHeaders = (user: UserSession): { [key: string]: string } => {
    const headers: { [key: string]: string } = {}
    headers['Content-Type'] = 'application/json'
    headers['Accept'] = 'application/json'
    if (user.Token) {
      headers['Authorization'] = `Bearer ${user.Token}`
    }
    return headers
  }

  login = async (UserName: string, PassWord: string) => {
    try {
      const res = await this._client.post(
        '/auth/login',
        { UserName, PassWord },
        { baseURL: this._endPoint }
      )
      return res.data
    } catch (e: any) {
      throw Error(e)
    }
  }

  register = async (UserName: string, PassWord: string, Email: string) => {
    try {
      const res = await this._client.post(
        '/auth/register',
        { UserName, PassWord, Email },
        { baseURL: this._endPoint }
      )
      return res.data
    } catch (e: any) {
      throw Error(e)
    }
  }

  userLoad = async () => {
    try {
      const res = await this._client.get('/user', { baseURL: this._endPoint })
      return res.data
    } catch (e: any) {
      throw Error(e)
    }
  }

  toDoLoad = async (user: UserSession) => {
    try {
      const res = await this._client.get('/todo', {
        baseURL: this._endPoint,
        headers: this.buildHeaders(user)
      })
      return res.data
    } catch (e: any) {
      throw Error(e)
    }
  }

  toDoCreate = async (Task: string, Completed: boolean, user: UserSession) => {
    try {
      const res = await this._client.post(
        '/todo',
        { Task, Completed },
        { baseURL: this._endPoint, headers: this.buildHeaders(user) }
      )
      return res.data
    } catch (e: any) {
      throw Error(e)
    }
  }

  toDoUpdate = async (Id: number, Task: string, Completed: boolean, user: UserSession) => {
    try {
      const res = await this._client.patch(
        `/todo/${Id}`,
        { Task, Completed },
        { baseURL: this._endPoint, headers: this.buildHeaders(user) }
      )
      return res.data
    } catch (e: any) {
      throw Error(e)
    }
  }

  toDoDelete = async (Id: number, user: UserSession) => {
    try {
      const res = await this._client.delete(`/todo/${Id}`, {
        baseURL: this._endPoint,
        headers: this.buildHeaders(user)
      })
      return res.status
    } catch (e: any) {
      throw Error(e)
    }
  }
}
