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
      <div class="new-todo-v-btns">
        <v-btn @click="toggleEditing">Cancel</v-btn>
        <v-btn @click="addToDo">Add ToDo</v-btn>
      </div>
    </div>
    <div v-if="!state.editing">
      <v-btn @click="toggleEditing">New ToDo</v-btn>
    </div>
  </div>
</template>

<style>
.new-todo-v-btns {
  display: flex;
  justify-content: space-between;
}
</style>
