import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const colorTheme = createTheme({
    palette: {
        primary: {
            main: '#485ca3'
        },
        secondary: {
            main: '#548834'
        },
        tertiary: {
            main: "#f3e5f5"
        },
        error: {
            main: red.A400
        }
    }
})

