import { describe, it, expect, beforeAll, vi, afterAll } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import ToDoList from '../ToDoList.vue'
import NewToDo from '../NewToDo.vue'
import ToDoItem from '../ToDoItem.vue'
import { BlankUserSession, type UserSession } from '@/stores/user'

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
    const wrapper = mount(ToDoList, { props: { user: BlankUserSession } })
    const newToDo = wrapper.findComponent(NewToDo)
    expect(newToDo.exists()).toBe(true)
  })
  it('Should render ToDoItem after loadToDos', async () => {
    const wrapper = mount(ToDoList, { props: { user: sampleUser } })
    await flushPromises()
    await wrapper.vm.$nextTick()
    const item = wrapper.findComponent(ToDoItem)
    expect(item.exists()).toBe(true)
  })
})
