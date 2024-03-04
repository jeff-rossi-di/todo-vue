import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'
import { useUserStore } from './user'
import { createApp } from 'vue'

describe('User Store', () => {
  beforeEach(() => {
    const app = createApp({})
    const pinia = createPinia()
    app.use(pinia)
    setActivePinia(pinia)
  })

  it('Should start with user not SignedIn', () => {
    const session = useUserStore()
    expect(session.user.SignedIn).toBe(false)
  })

  it('Should be able to sign in a user', () => {
    const session = useUserStore()
    session.login({ UserName: 'foo', Token: 'aasddfghjkl', SignedIn: true })
    expect(session.user.SignedIn).toBe(true)
  })

  it('Should be able to sign out a user', () => {
    const session = useUserStore()
    session.login({ UserName: 'foo', Token: 'aasddfghjkl', SignedIn: true })
    session.logout()
    expect(session.user.SignedIn).toBe(false)
  })
})
