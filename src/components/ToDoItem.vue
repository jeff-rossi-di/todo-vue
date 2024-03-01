<script setup lang="ts">
import type { ToDo } from '@/constants'
import { reactive } from 'vue'

const props = defineProps<{ todo: ToDo; index: number }>()
const state = reactive({ todo: props.todo, editing: false })
const emits = defineEmits(['completedChanged', 'updateTask', 'deleteToDo'])

const toDoClass = () => {
  return props.index % 2 ? 'to-do-item alternate' : 'to-do-item'
}

const toggleEditing = () => {
  state.editing = !state.editing
}

const completedChanged = () => {
  const { Id } = props.todo
  const { Completed } = state.todo
  emits('completedChanged', { Id, Completed })
}

const updateTask = () => {
  const { Id } = props.todo
  const { Task } = state.todo
  emits('updateTask', { Id, Task })
  toggleEditing()
}

const deleteToDo = () => {
  const { Id } = props.todo
  emits('deleteToDo', { Id })
}
</script>

<template>
  <div :class="toDoClass()">
    <div class="mr-4">
      <v-checkbox v-model="state.todo.Completed" @change="completedChanged" label=""></v-checkbox>
    </div>
    <div style="flex: 1">
      <div v-if="state.editing">
        <v-textarea label="Task" v-model="state.todo.Task"></v-textarea>
        <div class="edit-buttons">
          <button @click="toggleEditing">Cancel</button>
          <button @click="updateTask">Update</button>
        </div>
      </div>
      <div
        v-if="!state.editing"
        @dblclick="toggleEditing"
        style="cursor: pointer"
        title="Double click to edit"
      >
        {{ props.todo.Task }}
      </div>
    </div>
    <div class="ml-4">
      <button @click="deleteToDo">Delete</button>
    </div>
  </div>
</template>

<style>
.to-do-item {
  display: flex;
  padding: 0.5em;
}
.alternate {
  background-color: silver;
}
.edit-buttons {
  display: flex;
  justify-content: space-between;
}
</style>
