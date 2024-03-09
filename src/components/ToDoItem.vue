<script setup lang="ts">
import type { ToDo } from '@/constants'
import { reactive } from 'vue'

const props = defineProps<{ todo: ToDo; index: number }>()
const state = reactive({ todo: props.todo, editing: false })
const emits = defineEmits(['completedChanged', 'updateTask', 'deleteToDo'])

const toDoClass = () => {
  return props.index % 2 ? 'to-do-item' : 'to-do-item alternate'
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
  <div :class="toDoClass()" :id="`to-do-${props.todo.Id}`">
    <div class="mr-4">
      <v-checkbox
        v-model="state.todo.Completed"
        @change="completedChanged"
        label=""
        :id="`completed-${props.todo.Id}`"
      ></v-checkbox>
    </div>
    <div style="flex: 1">
      <div v-if="state.editing" class="editing-box">
        <v-textarea
          label="Task"
          v-model="state.todo.Task"
          :id="`task-${props.todo.Id}`"
        ></v-textarea>
        <div class="edit-v-btns">
          <v-btn @click="toggleEditing" :id="`cancel-to-do-${props.todo.Id}`">Cancel</v-btn>
          <v-btn @click="updateTask" :id="`update-to-do-${props.todo.Id}`">Update</v-btn>
        </div>
      </div>
      <div
        v-if="!state.editing"
        @dblclick="toggleEditing"
        style="cursor: pointer"
        title="Double click to edit"
        :id="`dbl-click-${props.todo.Id}`"
      >
        {{ props.todo.Task }}
      </div>
    </div>
    <div class="ml-4">
      <v-btn @click="deleteToDo" :id="`delete-to-do-${props.todo.Id}`">Delete</v-btn>
    </div>
  </div>
</template>
