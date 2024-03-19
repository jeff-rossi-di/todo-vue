import type { UserSession } from '@/stores/user'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ToDoApi } from './todo-api.class'
import axios from 'axios'
import type { ToDo } from '@/constants'

describe('ToDoApi', () => {
  let response, expected
  const session: UserSession = {
    UserName: 'TestUser',
    Token: 'asdfghjklqwertyuiop',
    SignedIn: true
  }
  const api = new ToDoApi()
  const UserName = 'TestUser'
  const PassWord = 'S3cr3t!!'
  const todo: ToDo = {
    Id: 18,
    Created: '2024-01-05T21:16:54.000Z',
    Updated: '2024-01-05T21:16:54.000Z',
    Version: '1',
    IsDeleted: false,
    Task: 'Tantillus curo ciminatio acervus addo cruentus basium aetas tui aeternus. Asporto surculus super viriliter tantum volutabrum solus voluptate.',
    Completed: false,
    UserId: 2
  }
  const errorMessage = 'some error message'

  afterEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
  })

  describe('buildHeaders', () => {
    it('should return the expected headers', () => {
      expected = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${session.Token}`
      }
      response = api.buildHeaders(session)
      expect(response).toEqual(expected)
    })
  })

  describe('login', () => {
    it('should return a token after sending credentials', async () => {
      const spy = vi.spyOn(axios, 'post')
      expected = {
        UserName,
        Token: session.Token
      }
      spy.mockResolvedValueOnce({
        data: {
          UserName,
          Token: session.Token
        }
      })
      response = await api.login(UserName, PassWord)
      expect(response).toEqual(expected)
    })
    it('should reject an error', async () => {
      const spy = vi.spyOn(axios, 'post')
      spy.mockRejectedValueOnce(errorMessage)
      try {
        response = await api.login(UserName, PassWord)
      } catch (error) {
        expect(error).toEqual(errorMessage)
      }
    })
  })

  describe('register', () => {
    const Email = 'test.user@example.com'
    it('should return a user after sending credentials', async () => {
      const spy = vi.spyOn(axios, 'post')
      expected = {
        Id: 1234,
        Created: '2024-02-28T14:18:39.000Z',
        Updated: '2024-02-28T14:18:39.000Z',
        Version: 1,
        IsDeleted: false,
        UserName: 'TestUser',
        Email: 'test.user@example.com',
        Random: false
      }
      spy.mockResolvedValueOnce({ data: expected })
      response = await api.register(UserName, PassWord, Email)
      expect(response).toEqual(expected)
    })
    it('should reject an error', async () => {
      const spy = vi.spyOn(axios, 'post')
      spy.mockRejectedValueOnce(errorMessage)
      try {
        response = await api.register(UserName, PassWord, Email)
      } catch (error) {
        expect(error).toEqual(errorMessage)
      }
    })
  })

  describe('userLoad', () => {
    it('should return a list of users', async () => {
      const spy = vi.spyOn(axios, 'get')
      expected = [
        {
          Id: 1234,
          Created: '2024-02-28T14:18:39.000Z',
          Updated: '2024-02-28T14:18:39.000Z',
          Version: 1,
          IsDeleted: false,
          UserName: 'TestUser',
          Email: 'test.user@example.com',
          Random: false
        }
      ]
      spy.mockResolvedValueOnce({ data: expected })
      response = await api.userLoad()
      expect(response).toEqual(expected)
    })
    it('should reject an error', async () => {
      const spy = vi.spyOn(axios, 'get')
      spy.mockRejectedValueOnce(errorMessage)
      try {
        response = await api.userLoad()
      } catch (error) {
        expect(error).toEqual(errorMessage)
      }
    })
  })

  describe('toDoLoad', () => {
    it('should return a list of todos', async () => {
      const spy = vi.spyOn(axios, 'get')
      expected = [todo]
      spy.mockResolvedValueOnce({ data: expected })
      response = await api.toDoLoad(session)
      expect(response).toEqual(expected)
    })
    it('should reject an error', async () => {
      const spy = vi.spyOn(axios, 'get')
      spy.mockRejectedValueOnce(errorMessage)
      try {
        response = await api.toDoLoad(session)
      } catch (error) {
        expect(error).toEqual(errorMessage)
      }
    })
  })

  describe('toDoCreate', () => {
    const Task = todo.Task
    const Completed = todo.Completed
    it('should return a new todo after sending parameters', async () => {
      const spy = vi.spyOn(axios, 'post')
      expected = todo
      spy.mockResolvedValueOnce({ data: expected })
      response = await api.toDoCreate(Task, Completed, session)
      expect(response).toEqual(expected)
    })
    it('should reject an error', async () => {
      const spy = vi.spyOn(axios, 'post')
      spy.mockRejectedValueOnce(errorMessage)
      try {
        response = await api.toDoCreate(Task, Completed, session)
      } catch (error) {
        expect(error).toEqual(errorMessage)
      }
    })
  })

  describe('toDoUpdate', () => {
    const { Id } = todo
    const Task = 'Updated Task'
    const Completed = true
    it('should update a todo after sending parameters', async () => {
      const spy = vi.spyOn(axios, 'patch')
      expected = {
        ...todo,
        Task,
        Completed
      }
      spy.mockResolvedValueOnce({ data: expected })
      response = await api.toDoUpdate(Id, Task, Completed, session)
      expect(response).toEqual(expected)
    })
    it('should reject an error', async () => {
      const spy = vi.spyOn(axios, 'patch')
      spy.mockRejectedValueOnce(errorMessage)
      try {
        response = await api.toDoUpdate(Id, Task, Completed, session)
      } catch (error) {
        expect(error).toEqual(errorMessage)
      }
    })
  })

  describe('toDoDelete', () => {
    const { Id } = todo
    it('should delete a todo by Id', async () => {
      const spy = vi.spyOn(axios, 'delete')
      expected = 204
      spy.mockResolvedValueOnce({ status: 204 })
      response = await api.toDoDelete(Id, session)
      expect(response).toEqual(expected)
    })
    it('should reject an error', async () => {
      const spy = vi.spyOn(axios, 'delete')
      spy.mockRejectedValueOnce(errorMessage)
      try {
        response = await api.toDoDelete(Id, session)
      } catch (error) {
        expect(error).toEqual(errorMessage)
      }
    })
  })
})
