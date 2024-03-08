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
    const failure = await router.push('/') // no idea why this < 100%
    if (failure) console.log(failure)
  } else {
    alert('Unable to sign in')
  }
}
</script>
<template>
  <div class="login">
    <h2>Sign In</h2>
  </div>
  <form onsubmit="return false">
    <div>
      <v-text-field
        label="User Name"
        placeholder="Enter User Name"
        v-model="state.UserName"
        data-cy="user-name-input"
      ></v-text-field>
    </div>
    <div>
      <v-text-field
        label="PassWord"
        type="password"
        placeholder="Enter PassWord"
        v-model="state.PassWord"
        data-cy="pass-word-input"
      ></v-text-field>
    </div>

    <div>
      <v-btn @click="signIn" data-cy="sign-in-button">Sign In</v-btn>
    </div>
  </form>
</template>

<style></style>
