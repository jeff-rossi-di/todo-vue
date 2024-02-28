<script setup lang="ts">
import type { ToDo } from '@/constants'
import { reactive } from 'vue'

const props = defineProps<{ todo: ToDo; index: number }>()
const state = reactive({ todo: props.todo, editing: false })

const toDoClass = () => {
  return props.index % 2 ? 'to-do-item alternate' : 'to-do-item'
}

const toggleEditing = () => {
  state.editing = !state.editing
}

const completedChanged = () => {}

const updateTask = () => {}
</script>

<template>
  <div :class="toDoClass">
    <div>
      <v-checkbox v-model="state.todo.Completed" @change="completedChanged"></v-checkbox>
    </div>
    <div>
      <div v-if="state.editing">
        <v-textarea label="Task" v-model="state.todo.Task"></v-textarea>
        <div>
          <button @click="toggleEditing">Cancel</button>
          <button @click="updateTask">Update</button>
        </div>
      </div>
      <div v-if="!state.editing" @dblclick="toggleEditing">
        {{ props.todo.Task }}
      </div>
    </div>
  </div>
</template>
