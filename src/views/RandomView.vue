<script setup lang="ts">
import { apiBaseUrl, randUserPW } from '@/constants'
import router from '@/router'
import { useUserStore } from '@/stores/user'
import { reactive, ref } from 'vue'
import { onMounted } from 'vue'

const userNames = ref<string[]>([])
const state = reactive({ userNames, UserName: '' })
const session = useUserStore()

const loadUsers = async () => {
  const result = await fetch(`${apiBaseUrl}/user`)
  if (result.ok) {
    const users = await result.json()
    console.log(users)
    const un: string[] = []
    for (const user of users) {
      if (user.Random) un.push(user.UserName)
    }
    state.userNames = un.sort()
  }
}

const signIn = async () => {
  const { UserName } = state
  const PassWord = randUserPW
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
    console.log(json)
    const { Token } = json
    session.login({ UserName, Token, SignedIn: true })
    const failure = await router.push('/') // no idea why this < 100%
    if (failure) console.log(failure)
  } else {
    alert('Unable to Sign in')
  }
}

const rules = {
  userName: (v: string) => {
    return !!v || 'User Name is required'
  }
}

onMounted(async () => {
  await loadUsers()
})
</script>

<template>
  <div class="random">
    <h2>Random Sign In</h2>
    <p>
      A series of users was randomly generated along with random ToDos for each. You may sign in as
      one of those random users with the form below.
    </p>
    <v-form @submit.prevent>
      <div>
        <v-select
          data-cy="user-select"
          label="UserName"
          :items="state.userNames"
          v-model="state.UserName"
          :rules="[rules.userName]"
        ></v-select>
      </div>
      <div>
        <v-btn data-cy="sign-in-button" @click="signIn">Sign In</v-btn>
      </div>
    </v-form>
  </div>
</template>
