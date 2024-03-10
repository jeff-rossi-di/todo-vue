import { createThemes } from 'tw-colors'
import { palettes } from './src/palettes'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [createThemes(palettes)]
}
