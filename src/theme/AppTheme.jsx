import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import { colorTheme } from "./colorTheme"

export const AppTheme = ({children}) => {
  return (
    <ThemeProvider theme={ colorTheme }>
        <CssBaseline/>
        {children}
    </ThemeProvider>
  )
}
