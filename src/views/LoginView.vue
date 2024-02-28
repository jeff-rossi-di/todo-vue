<script setup lang="ts">
import { apiBaseUrl } from '@/constants'
import router from '@/router'
import { useUserStore } from '@/stores/user'
import { reactive } from 'vue'

const state = reactive({ UserName: '', PassWord: '' })
const session = useUserStore()

const signIn = async () => {
  const { UserName, PassWord } = state
  if (!UserName || !PassWord) return
  const result = await fetch(`${apiBaseUrl}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ UserName, PassWord }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (result.ok) {
    const json = await result.json()
    const { Token } = json
    session.login({ UserName, Token, SignedIn: true })
    router.push('/')
  }
}
</script>
<template>
  <div class="login">
    <h1>This is an login page</h1>
  </div>
  <form onsubmit="return false">
    <div>
      <v-text-field
        label="User Name"
        placeholder="Enter User Name"
        v-model="state.UserName"
      ></v-text-field>
    </div>
    <div>
      <v-text-field
        label="PassWord"
        type="password"
        placeholder="Enter PassWord"
        v-model="state.PassWord"
      ></v-text-field>
    </div>

    <div>
      <button @click="signIn">Sign In</button>
    </div>
  </form>
</template>

<style></style>
