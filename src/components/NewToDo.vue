<script setup lang="ts">
import { reactive } from 'vue'
const todo = { Task: '', Completed: false }
const state = reactive({ editing: false, todo })
const emits = defineEmits(['addToDo'])

const toggleEditing = () => {
  state.editing = !state.editing
}

const addToDo = () => {
  const { Task, Completed } = state.todo
  emits('addToDo', { Task, Completed })
  toggleEditing()
}
</script>

<template>
  <div class="new-to-to">
    <div v-if="state.editing">
      <div>
        <v-textarea label="Task" v-model="state.todo.Task"></v-textarea>
      </div>
      <div>
        <v-checkbox v-model="state.todo.Completed" label="Completed"></v-checkbox>
      </div>
      <div class="new-todo-buttons">
        <button @click="toggleEditing">Cancel</button>
        <button @click="addToDo">Add ToDo</button>
      </div>
    </div>
    <div v-if="!state.editing">
      <button @click="toggleEditing">New ToDo</button>
    </div>
  </div>
</template>

<style>
.new-todo-buttons {
  display: flex;
  justify-content: space-between;
}
</style>
