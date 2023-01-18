import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

const myDarkTheme = {
  dark: true,
  colors: {
    primary: '#00E676',
    secondary: '#03DAC6'
  }
}

export default createVuetify({
  theme: {
    defaultTheme: 'myDarkTheme',
    themes: {
      myDarkTheme
    },
  }
})
