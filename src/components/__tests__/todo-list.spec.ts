import { describe, it, expect, beforeAll, vi, afterAll } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import ToDoList from '../ToDoList.vue'
import NewToDo from '../NewToDo.vue'
import ToDoItem from '../ToDoItem.vue'
import { BlankUserSession, type UserSession } from '@/stores/user'
import axios from 'axios'

const sampleUser: UserSession = {
  UserName: 'SampleUser',
  Token: 'asdfghjkl',
  SignedIn: true
}

describe('ToDo List', () => {
  it('Should contain a NewToDo component', () => {
    const wrapper = mount(ToDoList, { props: { user: BlankUserSession } })
    const newToDo = wrapper.findComponent(NewToDo)
    expect(newToDo.exists()).toBe(true)
  })
  it('Should render ToDoItem after loadToDos', async () => {
    const spy = vi.spyOn(axios, 'get')
    spy.mockResolvedValueOnce({
      data: [
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
      ]
    })
    const wrapper = mount(ToDoList, { props: { user: sampleUser } })
    await flushPromises()
    await wrapper.vm.$nextTick()
    const item = wrapper.findComponent(ToDoItem)
    expect(item.exists()).toBe(true)
  })
})
