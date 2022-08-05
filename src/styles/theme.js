import { createTheme } from '@mui/material'
import { grey } from '@mui/material/colors'

const themeLight = createTheme({
    palette: {
        mode: 'light',
        background: {
            paper: 'hsl(29, 70%, 96%)',
        },
        primary: {
            main: 'hsl(216, 94%, 51%)',
        },
        secondary: {
            main: 'hsl(29, 94%, 51%)',
        },
        text: {
            basic: 'hsl(0, 0%, 20%)',
        },
        divider: 'hsl(220, 11%, 16%)',
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
            paper: 'hsl(216, 20%, 12%)',
        },
        text: {
            basic: 'hsl(0, 0%, 90%)',
        },
        divider: 'hsl(216, 13%, 62%)',
    },
})

export { themeLight, themeDark }
