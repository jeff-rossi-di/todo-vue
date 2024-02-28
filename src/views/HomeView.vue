<script setup lang="ts">
import WelcomeMessage from '@/components/WelcomeMessage.vue'
import ToDoList from '@/components/ToDoList.vue'
import { useUserStore } from '@/stores/user'
const session = useUserStore()
</script>

<template>
  <div class="home">
    <h1>This is a home page</h1>
    <WelcomeMessage v-if="!session.user.SignedIn" />
    <ToDoList v-if="session.user.SignedIn" :user="session.user" />
  </div>
</template>

<style></style>
