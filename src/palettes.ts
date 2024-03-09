export type PaletteType = {
  [key: string]: {
    light: string
    dark: string
    'alt-light': string
    'alt-dark': string
  }
}
// from https://www.canva.com/colors/color-palettes/

export const palettes: PaletteType = {
  'under-the-ferns': {
    light: '#A3EBB1',
    dark: '#116530',
    'alt-light': '#21B6A8',
    'alt-dark': '#18A558'
  },
  'gingerbread-ice-cream': {
    light: '#F9F6F0',
    dark: '#171515',
    'alt-light': '#C4AE78',
    'alt-dark': '#6F5B3E'
  },
  'bare-beauty': {
    light: '#EDF2F3',
    dark: '#1F3541',
    'alt-light': '#AFD8F2',
    'alt-dark': '#5289B5'
  },
  'fresh-blankets': {
    light: '#FBD2C9',
    dark: '#313E61',
    'alt-light': '#81ABBC',
    'alt-dark': '#774A62'
  },
  'dark-metal': {
    light: '#D6D6D6',
    dark: '#0B0909',
    'alt-light': '#8C8C8C',
    'alt-dark': '#44444C'
  }
  /*
  '': {
    light: '',
    dark: '',
    'alt-light': '',
    'alt-dark': ''
  }
  */
}

export const paletteNames = Object.keys(palettes)
