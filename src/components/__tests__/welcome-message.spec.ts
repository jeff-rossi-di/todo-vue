import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WelcomeMessage from '../WelcomeMessage.vue'

describe('Weclome Message', () => {
  it('Should contain welcome text', () => {
    const wrapper = mount(WelcomeMessage)
    expect(wrapper.text()).toContain('Welcome')
  })
})
