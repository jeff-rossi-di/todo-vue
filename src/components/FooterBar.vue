<script setup lang="ts">
import { reactive } from 'vue'
import { paletteNames } from '../palettes'

const state = reactive({ palette: paletteNames[0], dark: false })

const paletteChanged = () => {
  console.log(state)
  const body = document.body
  if (body) {
    body.setAttribute('data-theme', state.palette)
  }
}

const darkChanged = () => {
  console.log(state)
  const body = document.body
  if (body) {
    if (state.dark) {
      body.classList.add('dark')
    } else {
      body.classList.remove('dark')
    }
  }
}
</script>

<template>
  <footer>
    <div class="flex justify-between">
      <v-select
        :items="paletteNames"
        v-model="state.palette"
        label="Palette"
        @update:model-value="paletteChanged"
      ></v-select>
      <v-checkbox label="Dark" v-model="state.dark" @change="darkChanged"></v-checkbox>
    </div>
    <div class="attribution">
      Color palettes selected from
      <a
        href="https://www.canva.com/colors/color-palettes/"
        target="_blank"
        rel="noopener noreferrer"
        >Canva</a
      >
    </div>
  </footer>
</template>
