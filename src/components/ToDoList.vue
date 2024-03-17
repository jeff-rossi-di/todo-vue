<script setup lang="ts">
import { type ToDo } from '@/constants'
import type { UserSession } from '@/stores/user'
import { reactive, ref } from 'vue'
import { onMounted } from 'vue'
import ToDoItem from './ToDoItem.vue'
import NewToDo from './NewToDo.vue'
import { ToDoApi } from '@/lib/todo-api.class'

const props = defineProps<{ user: UserSession }>()
const todos = ref<ToDo[]>([])
const state = reactive({ todos })
const api = new ToDoApi()

const loadToDos = async () => {
  const { Token } = props.user
  if (!Token) return
  try {
    state.todos = await api.toDoLoad(props.user)
  } catch (error) {
    alert('Unable to load todos')
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
  try {
    await api.toDoUpdate(Id, Task, Completed, props.user)
    loadToDos()
  } catch (error) {
    alert('unable to update todo')
  }
}

const addToDo = async (ev: { Task: string; Completed: boolean }) => {
  const { Task, Completed } = ev
  if (!Task) return
  try {
    await api.toDoCreate(Task, Completed, props.user)
    loadToDos()
  } catch (error) {
    alert('unable to create todo')
  }
}

const deleteToDo = async (ev: { Id: number }) => {
  const { Id } = ev
  if (!Id) return
  try {
    await api.toDoDelete(Id, props.user)
    loadToDos()
  } catch (error) {
    alert('unable to delete todo')
  }
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
