import type { Meta, StoryObj } from '@storybook/vue3'
import FooterBar from './FooterBar.vue'

const meta: Meta<typeof FooterBar> = {
  component: FooterBar
}

export default meta

type Story = StoryObj<typeof FooterBar>

export const Footer: Story = {
  render: () => ({
    components: { FooterBar },
    template: '<FooterBar />'
  })
}
