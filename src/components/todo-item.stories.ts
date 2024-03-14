import type { Meta, StoryObj } from '@storybook/vue3'
import ToDoItem from './ToDoItem.vue'

const meta: Meta<typeof ToDoItem> = {
  component: ToDoItem
}

export default meta

type Story = StoryObj<typeof ToDoItem>

export const Item: Story = {
  render: (args) => ({
    components: { ToDoItem },
    setup() {
      return { args }
    },
    template: '<ToDoItem v-bind="args" />'
  }),
  args: {
    index: 1,
    todo: {
      Id: 18,
      Created: '2024-01-05T21:16:54.000Z',
      Updated: '2024-01-05T21:16:54.000Z',
      Version: '1',
      IsDeleted: false,
      Task: 'Tantillus curo ciminatio acervus addo cruentus basium aetas tui aeternus. Asporto surculus super viriliter tantum volutabrum solus voluptate.',
      Completed: false,
      UserId: 2
    }
  }
}
