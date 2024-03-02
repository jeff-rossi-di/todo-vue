import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ToDoItem from '../ToDoItem.vue'
import type { ToDo } from '@/constants'

describe('ToDo Item', () => {
  const todo: ToDo = {
    Id: 456,
    Created: '2024-03-02 11:22:00',
    Updated: '2024-03-02 11:22:00',
    Task: 'Get this thing done',
    Completed: false,
    IsDeleted: false,
    Version: '1',
    UserId: 123
  }
  it('Should have class "alternate" when index is odd', () => {
    const wrapper = mount(ToDoItem, { props: { todo: todo, index: 1 } })
    expect(wrapper.classes()).toContain('alternate')
  })
  it('Should show textarea when task text div is double clicked', async () => {
    const wrapper = mount(ToDoItem, { props: { todo: todo, index: 1 } })
    await wrapper.find('#dbl-click-456').trigger('dblclick')
    expect(wrapper.find('#task-456').exists()).toBe(true)
  })
  it('Should hide textarea when "Cancel" button is clicked', async () => {
    const wrapper = mount(ToDoItem, { props: { todo: todo, index: 1 } })
    await wrapper.find('#dbl-click-456').trigger('dblclick')
    await wrapper.find('#cancel-to-do-456').trigger('click')
    expect(wrapper.find('#task-456').exists()).toBe(false)
  })
  it('Should emit event "completedChanged" when checkbox is changed', async () => {
    const wrapper = mount(ToDoItem, { props: { todo: todo, index: 1 } })
    await wrapper.find('#completed-456').trigger('change')
    expect(wrapper.emitted()).toHaveProperty('completedChanged')
  })
  it('Should emit event "deleteToDo" when "Delete" button is clicked', async () => {
    const wrapper = mount(ToDoItem, { props: { todo: todo, index: 1 } })
    await wrapper.find('#delete-to-do-456').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('deleteToDo')
  })
  it('Should emit event "updateTask" when "Update" button is clicked', async () => {
    const wrapper = mount(ToDoItem, { props: { todo: todo, index: 1 } })
    await wrapper.find('#dbl-click-456').trigger('dblclick')
    await wrapper.find('#update-to-do-456').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('updateTask')
  })
})
