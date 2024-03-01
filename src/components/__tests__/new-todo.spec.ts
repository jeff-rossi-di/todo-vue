import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NewToDo from '../NewToDo.vue'

describe('New ToDo', () => {
  it('Should render with "New ToDo" button', () => {
    const wrapper = mount(NewToDo)
    expect(wrapper.text()).toContain('New ToDo')
  })
  it('Should should display textarea when "New ToDo" button is clicked', async () => {
    const wrapper = mount(NewToDo)
    await wrapper.find('#new-to-do').trigger('click')
    expect(wrapper.find('#new-to-do-task').exists()).toBe(true)
  })
  it('Should hide textarea after "Cancel" button is clicked', async () => {
    const wrapper = mount(NewToDo)
    await wrapper.find('#new-to-do').trigger('click')
    await wrapper.find('#cancel-new-to-do').trigger('click')
    expect(wrapper.text()).toContain('New ToDo')
  })
  it('Should emit a new ToDo when "Add ToDo" button is clicked', async () => {
    const wrapper = mount(NewToDo)
    await wrapper.find('#new-to-do').trigger('click')
    await wrapper.find('#add-to-do').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('addToDo')
  })
})
