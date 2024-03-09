<script setup lang="ts">
import { apiBaseUrl } from '@/constants'
import router from '@/router'
import { reactive } from 'vue'

const state = reactive({ UserName: '', PassWord: '', Email: ' ' })

const register = async () => {
  const { UserName, PassWord, Email } = state
  if (!UserName || !PassWord) return
  const result = await fetch(`${apiBaseUrl}/auth/register`, {
    method: 'POST',
    body: JSON.stringify({ UserName, PassWord, Email }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (result.ok) {
    const failure = await router.push('/login')
    if (failure) console.log(failure)
  } else {
    alert('Unable to register')
  }
}
</script>

<template>
  <div class="register">
    <h2>Register</h2>
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
        <v-text-field
          label="Email"
          type="email"
          placeholder="Enter Email"
          v-model="state.Email"
          data-cy="email-input"
        ></v-text-field>
      </div>
      <div>
        <v-btn @click="register" data-cy="register-button">Register</v-btn>
      </div>
    </form>
  </div>
</template>
