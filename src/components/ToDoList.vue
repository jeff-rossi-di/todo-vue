<script setup lang="ts">
import { apiBaseUrl, type ToDo } from '@/constants'
import type { UserSession } from '@/stores/user'
import { reactive, ref } from 'vue'
import { onMounted } from 'vue'
import ToDoItem from './ToDoItem.vue'

const props = defineProps<{ user: UserSession }>()
const todos = ref<ToDo[]>([])
const state = reactive({ todos })

const buildHeaders = (user: UserSession) => {
  const headers: Headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Accept', 'application/json')
  if (user.Token) {
    headers.append('Authorization', `bearer ${user.Token}`)
  }
  return headers
}

const loadToDos = async () => {
  const { Token } = props.user
  if (!Token) return
  const result = await fetch(`${apiBaseUrl}/todo`, {
    method: 'GET',
    headers: buildHeaders(props.user)
  })
  if (result.ok) {
    state.todos = await result.json()
  } else {
    console.log(result)
  }
}

onMounted(async () => {
  await loadToDos()
})
</script>

<template>
  <div class="to-do-list">
    <p>Double Click on ToDo text to edit</p>
    <ToDoItem v-for="(todo, index) of todos" :todo="todo" :key="todo.Id" :index="index" />
  </div>
</template>
