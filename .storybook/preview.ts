import { type Preview, setup } from '@storybook/vue3'
import { type App } from 'vue'

import { createPinia } from 'pinia'

import router from '../src/router'

// Vuetify
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives
})

const pinia = createPinia()

setup((app: App) => {
  app.use(pinia)
  app.use(vuetify)
  app.use(router)
})


import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import '../src/assets/main.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}

export default preview
