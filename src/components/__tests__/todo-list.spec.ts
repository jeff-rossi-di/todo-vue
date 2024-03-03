import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ToDoList from '../ToDoList.vue'
import NewToDo from '../NewToDo.vue'
import { BlankUserSession } from '@/stores/user'

describe('ToDo List', () => {
  // no need to test the API
  it('Should contain a NewToDo component', () => {
    const wrapper = mount(ToDoList, { props: { user: BlankUserSession } })
    const newToDo = wrapper.findComponent(NewToDo)
    expect(newToDo.exists()).toBe(true)
  })
  // need to mock loadToDos in order to see ToDoITem(s)
})
