<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from './stores/user'
const session = useUserStore()

const signOut = () => {
  session.logout()
}
</script>

<template>
  <header>
    <h1>Todo App</h1>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/register" v-if="!session.user.SignedIn">Register</RouterLink>
      <RouterLink to="/login" v-if="!session.user.SignedIn">Login</RouterLink>
      <RouterLink to="/random" v-if="!session.user.SignedIn">Random</RouterLink>
      <div v-if="session.user.SignedIn">
        <strong class="mr-2">{{ session.user.UserName }}</strong>
        <v-btn @click="signOut">Sign Out</v-btn>
      </div>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header,
main {
  width: 80%;
  margin: 1em auto;
}

nav {
  display: flex;
  justify-content: space-between;
}
</style>
