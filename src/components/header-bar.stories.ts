import type { Meta, StoryObj } from '@storybook/vue3'
import HeaderBar from './HeaderBar.vue'
import { testUser, useUserStore } from '@/stores/user'

const meta: Meta<typeof HeaderBar> = {
  component: HeaderBar
}

export default meta

type Story = StoryObj<typeof HeaderBar>

export const SignedIn: Story = {
  render: () => ({
    components: { HeaderBar },
    created() {
      const session = useUserStore()
      session.login(testUser)
    },
    template: '<HeaderBar />'
  })
}

export const SignedOut: Story = {
  render: () => ({
    components: { HeaderBar },
    created() {
      const session = useUserStore()
      session.logout()
    },
    template: '<HeaderBar />'
  })
}
