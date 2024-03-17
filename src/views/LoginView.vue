<script setup lang="ts">
import { ToDoApi } from '@/lib/todo-api.class'
import router from '@/router'
import { useUserStore } from '@/stores/user'
import { reactive } from 'vue'

const state = reactive({ UserName: '', PassWord: '' })
const session = useUserStore()
const api = new ToDoApi()

const signIn = async () => {
  const { UserName, PassWord } = state
  if (!UserName || !PassWord) return
  try {
    const result = await api.login(UserName, PassWord)
    const { Token } = result
    session.login({ UserName, Token, SignedIn: true })
    const failure = await router.push('/') // no idea why this < 100%
    if (failure) console.log(failure)
  } catch (error) {
    alert('Unable to sign in')
  }
}

const rules = {
  userName: (v: string) => {
    return !!v || 'User Name is required'
  },
  passWord: (v: string) => {
    return !!v || 'PassWord is required'
  }
}
</script>
<template>
  <div class="login">
    <h2>Sign In</h2>
  </div>
  <v-form @submit.prevent>
    <div>
      <v-text-field
        label="User Name"
        placeholder="Enter User Name"
        v-model="state.UserName"
        :rules="[rules.userName]"
        data-cy="user-name-input"
      ></v-text-field>
    </div>
    <div>
      <v-text-field
        label="PassWord"
        type="password"
        placeholder="Enter PassWord"
        v-model="state.PassWord"
        :rules="[rules.passWord]"
        data-cy="pass-word-input"
      ></v-text-field>
    </div>
    <div>
      <v-btn @click="signIn" data-cy="sign-in-button">Sign In</v-btn>
    </div>
  </v-form>
</template>
