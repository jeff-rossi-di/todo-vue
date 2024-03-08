<script setup lang="ts">
import { apiBaseUrl, type ToDo } from '@/constants'
import type { UserSession } from '@/stores/user'
import { reactive, ref } from 'vue'
import { onMounted } from 'vue'
import ToDoItem from './ToDoItem.vue'
import NewToDo from './NewToDo.vue'

const props = defineProps<{ user: UserSession }>()
const todos = ref<ToDo[]>([])
const state = reactive({ todos })

const buildHeaders = (user: UserSession) => {
  const headers: Headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Accept', 'application/json')
  if (user.Token) {
    headers.append('Authorization', `Bearer ${user.Token}`)
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
    const todos = await result.json()
    console.log(todos)
    state.todos = todos
  } else {
    console.log(result)
  }
}

const getToDoById = (Id: number) => {
  return state.todos.find((t) => t.Id == Id)
}

const updateTask = (ev: { Id: number; Task: string }) => {
  const todo = getToDoById(ev.Id)
  if (!todo) return
  const { Completed } = todo
  const { Id, Task } = ev
  updateToDo(Id, Task, Completed)
}

const completedChanged = (ev: { Id: number; Completed: boolean }) => {
  const todo = getToDoById(ev.Id)
  if (!todo) return
  const { Id, Completed } = ev
  const { Task } = todo
  updateToDo(Id, Task, Completed)
}

const updateToDo = async (Id: number, Task: string, Completed: boolean) => {
  const { Token } = props.user
  if (!Token) return
  const result = await fetch(`${apiBaseUrl}/todo/${Id}`, {
    method: 'PATCH',
    body: JSON.stringify({ Task, Completed }),
    headers: buildHeaders(props.user)
  })
  if (result.ok) loadToDos()
}

const addToDo = async (ev: { Task: string; Completed: boolean }) => {
  const { Task, Completed } = ev
  if (!Task) return
  const result = await fetch(`${apiBaseUrl}/todo`, {
    method: 'POST',
    body: JSON.stringify({ Task, Completed }),
    headers: buildHeaders(props.user)
  })
  if (result.ok) loadToDos()
}

const deleteToDo = async (ev: { Id: number }) => {
  const { Id } = ev
  const result = await fetch(`${apiBaseUrl}/todo/${Id}`, {
    method: 'DELETE',
    headers: buildHeaders(props.user)
  })
  if (result.ok) loadToDos()
}

onMounted(async () => {
  await loadToDos()
})
</script>

<template>
  <div class="to-do-list" title="Double Click on ToDo text to edit">
    <NewToDo @add-to-do="addToDo" />
    <ToDoItem
      v-for="(todo, index) of todos"
      :todo="todo"
      :key="todo.Id"
      :index="index"
      @completed-changed="completedChanged"
      @update-task="updateTask"
      @delete-to-do="deleteToDo"
    />
  </div>
</template>
