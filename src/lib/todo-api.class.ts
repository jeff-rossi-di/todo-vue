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
    const res = await this._client
      .post('/auth/login', { UserName, PassWord }, { baseURL: this._endPoint })
      .catch((e) => Promise.reject(e))
    return res.data
  }

  register = async (UserName: string, PassWord: string, Email: string) => {
    const res = await this._client
      .post('/auth/register', { UserName, PassWord, Email }, { baseURL: this._endPoint })
      .catch((e) => Promise.reject(e))
    return res.data
  }

  userLoad = async () => {
    const res = await this._client
      .get('/user', { baseURL: this._endPoint })
      .catch((e) => Promise.reject(e))
    return res.data
  }

  toDoLoad = async (user: UserSession) => {
    const res = await this._client
      .get('/todo', {
        baseURL: this._endPoint,
        headers: this.buildHeaders(user)
      })
      .catch((e) => Promise.reject(e))
    return res.data
  }

  toDoCreate = async (Task: string, Completed: boolean, user: UserSession) => {
    const res = await this._client
      .post(
        '/todo',
        { Task, Completed },
        { baseURL: this._endPoint, headers: this.buildHeaders(user) }
      )
      .catch((e) => Promise.reject(e))
    return res.data
  }

  toDoUpdate = async (Id: number, Task: string, Completed: boolean, user: UserSession) => {
    const res = await this._client
      .patch(
        `/todo/${Id}`,
        { Task, Completed },
        { baseURL: this._endPoint, headers: this.buildHeaders(user) }
      )
      .catch((e) => Promise.reject(e))
    return res.data
  }

  toDoDelete = async (Id: number, user: UserSession) => {
    const res = await this._client
      .delete(`/todo/${Id}`, {
        baseURL: this._endPoint,
        headers: this.buildHeaders(user)
      })
      .catch((e) => Promise.reject(e))
    return res.status
  }
}
