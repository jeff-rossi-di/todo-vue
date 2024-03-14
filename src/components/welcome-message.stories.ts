import type { Meta, StoryObj } from '@storybook/vue3'
import WelcomeMessage from './WelcomeMessage.vue'

const meta: Meta<typeof WelcomeMessage> = {
  component: WelcomeMessage
}

export default meta

type Story = StoryObj<typeof WelcomeMessage>

export const Welcome: Story = {
  render: () => ({
    components: { WelcomeMessage },
    template: '<WelcomeMessage />'
  })
}
