<script setup lang="ts">
import WelcomeMessage from '@/components/WelcomeMessage.vue'
import ToDoList from '@/components/ToDoList.vue'
import { useUserStore } from '@/stores/user'
const session = useUserStore()
</script>

<template>
  <div class="home">
    <WelcomeMessage v-if="!session.user.SignedIn" />
    <ToDoList v-if="session.user.SignedIn" :user="session.user" />
  </div>
</template>
