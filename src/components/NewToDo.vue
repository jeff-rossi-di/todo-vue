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
  <div class="new-to-do">
    <div v-if="state.editing" class="editing-box">
      <div>
        <v-textarea label="Task" id="new-to-do-task" v-model="state.todo.Task"></v-textarea>
      </div>
      <div>
        <v-checkbox
          v-model="state.todo.Completed"
          id="new-to-do-completed"
          label="Completed"
        ></v-checkbox>
      </div>
      <div class="new-todo-v-btns">
        <v-btn @click="toggleEditing" id="cancel-new-to-do">Cancel</v-btn>
        <v-btn @click="addToDo" id="add-to-do">Add ToDo</v-btn>
      </div>
    </div>
    <div v-if="!state.editing">
      <v-btn @click="toggleEditing" id="new-to-do">New ToDo</v-btn>
    </div>
  </div>
</template>
