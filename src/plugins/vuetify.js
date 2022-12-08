// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'
import colors from 'vuetify/lib/util/colors'

const myTheme = {
  dark: false,
  colors: {
    background: '#ffffff',
    surface: '#bdbdbd',
    main_color_white: '#fff',
    main_color_green: '#3c9e70',
    main_color_grey: '#73777a',
    text_color_grey: '#424242',
    text_color_orange: '#ef4602',
    marker_color_orange: '#fc743e',
    marker_color_grey: '#f0f0f0',
    marker_color_green: '#74cea4',
  }
}

export default createVuetify({
  theme: {
    defaultTheme: 'myTheme',
    themes: {
      myTheme,
    }
  }
})
