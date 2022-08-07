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
    chartOpt: {
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: 'hsl(0, 0%, 20%)',
                    },
                },
            },
            scales: {
                yAxis: {
                    min: 0,
                    ticks: { color: 'hsl(0, 0%, 20%)' },
                },
                xAxis: {
                    min: 0,
                    ticks: { color: 'hsl(0, 0%, 20%)' },
                },
            },
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
            paper: 'hsl(216, 20%, 12%)',
        },
        text: {
            basic: 'hsl(0, 0%, 90%)',
        },
        divider: 'hsl(216, 13%, 62%)',
    },
    chartOpt: {
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: 'hsl(0, 0%, 90%)',
                        padding: 20,
                        // margin: 40,
                    },
                },
            },
            scales: {
                yAxis: {
                    min: 0,
                    ticks: { color: 'hsl(0, 0%, 90%)' },
                },
                xAxis: {
                    min: 0,
                    ticks: { color: 'hsl(0, 0%, 90%)' },
                },
            },
        },
    },
})

export { themeLight, themeDark }
