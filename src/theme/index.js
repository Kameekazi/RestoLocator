import { createTheme } from "@mui/material"

const theme = createTheme({
  width: '100%',
  height: '100%',
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1280,
      xl: 1920,
    },
  },
})

export default theme
