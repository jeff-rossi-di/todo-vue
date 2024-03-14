import type { Meta, StoryObj } from '@storybook/vue3'
import NewToDo from './NewToDo.vue'

const meta: Meta<typeof NewToDo> = {
  component: NewToDo
}

export default meta

type Story = StoryObj<typeof NewToDo>

export const NewTodo: Story = {
  render: () => ({
    components: { NewToDo },
    template: '<NewToDo />'
  })
}
