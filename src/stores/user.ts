import { defineStore } from 'pinia'
import { ref } from 'vue'

export type UserSession = {
  UserName: string | undefined
  Token: string | undefined
  SignedIn: boolean
}

export const BlankUserSession: UserSession = {
  UserName: undefined,
  Token: undefined,
  SignedIn: false
}

export const testUser: UserSession = {
  UserName: 'TestUser',
  Token: 'asdfghjkl',
  SignedIn: true
}

export const useUserStore = defineStore('user', () => {
  const user = ref(BlankUserSession)
  const login = (newUser: UserSession) => {
    user.value = newUser
  }
  const logout = () => {
    user.value = BlankUserSession
  }
  return { user, login, logout }
})
