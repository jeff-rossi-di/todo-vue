import { describe, it, expect, beforeAll, vi, afterAll } from 'vitest'
import { mount } from '@vue/test-utils'
import ToDoList from '../ToDoList.vue'
import NewToDo from '../NewToDo.vue'
// import ToDoItem from '../ToDoItem.vue'
import {  type UserSession } from '@/stores/user'

const mockLoadTodosResponse = {
  ok: true,
  json: () =>
    new Promise((resolve) =>
      resolve([
        {
          Id: 456,
          Created: '2024-03-02 11:22:00',
          Updated: '2024-03-02 11:22:00',
          Task: 'Get this thing done',
          Completed: false,
          IsDeleted: false,
          Version: '1',
          UserId: 123
        }
      ])
    )
}

const sampleUser: UserSession = {
  UserName: 'SampleUser',
  Token: 'asdfghjkl',
  SignedIn: true
}

describe('ToDo List', () => {
  // no need to test the API
  let orginalFetch: any
  beforeAll(() => {
    orginalFetch = global.fetch
    global.fetch = vi.fn().mockReturnValue(mockLoadTodosResponse)
  })
  afterAll(() => {
    global.fetch = orginalFetch
  })
  it('Should contain a NewToDo component', () => {
    const wrapper = mount(ToDoList, { props: { user: sampleUser } })
    const newToDo = wrapper.findComponent(NewToDo)
    expect(newToDo.exists()).toBe(true)
  })
  // does not work
  /*
  it('Should render ToDoItem after loadToDos', () => {
    const wrapper = mount(ToDoList, { props: { user: sampleUser } })
    const item = wrapper.findComponent(ToDoItem)
    console.log(item)
  })
  */
})
