import { createTheme } from '@mui/material'
import { grey } from '@mui/material/colors'

const themeLight = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: 'hsl(216, 94%, 51%)',
        },
        secondary: {
            main: 'hsl(29, 94%, 51%)',
        },
    },
})

const themeDark = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: 'hsl(216, 94%, 71%)',
        },
        secondary: {
            main: 'hsl(29, 94%, 71%)',
        },
        lightFont: {
            main: grey[200],
        },
        background: {
            paper: '#2f2f2f',
        },
    },
})

export { themeLight, themeDark }