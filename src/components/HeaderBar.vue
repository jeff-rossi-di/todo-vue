<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useUserStore } from '../stores/user'
const session = useUserStore()

const signOut = () => {
  session.logout()
}
</script>

<template>
  <header>
    <div class="flex justify-between">
      <h1 class="mr-4">Todo App</h1>
      <nav class="flex-grow">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/register" v-if="!session.user.SignedIn">Register</RouterLink>
        <RouterLink to="/login" v-if="!session.user.SignedIn">Login</RouterLink>
        <RouterLink to="/random" v-if="!session.user.SignedIn">Random</RouterLink>
        <div v-if="session.user.SignedIn">
          <strong class="mr-2">{{ session.user.UserName }}</strong>
          <v-btn @click="signOut" data-cy="sign-out-button">Sign Out</v-btn>
        </div>
      </nav>
    </div>
  </header>
</template>
