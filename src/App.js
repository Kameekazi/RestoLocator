import React from "react"
import { ThemeProvider } from "@mui/material/styles"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import theme from "./theme"
import { Dashboard } from "./components/Dashboard"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider
        adapterLocale="ja"
        dateAdapter={AdapterDayjs}
        dateFormats={{ monthAndYear: "YYYY年MM月" }}
      >
        <Dashboard />
      </LocalizationProvider>
    </ThemeProvider>
  )
}

export default App