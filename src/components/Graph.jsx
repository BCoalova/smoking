import { Paper } from '@mui/material'
import { BarElement, CategoryScale, Chart as ChartJS, LinearScale, Tooltip } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { useGlobalContext } from '../context/GlobalContext'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip)

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: false,
            text: 'Diario',
        },
    },
}

export default function Graph() {
    const { viewing, isLight } = useGlobalContext()

    return (
        viewing && (
            <Paper sx={{ flexGrow: 1, p: 2 }}>
                <Bar
                    options={options}
                    data={{
                        labels: [viewing.day],
                        datasets: [
                            {
                                label: 'Objetivo',
                                data: [viewing.dayObjective] /* labels.map(() => faker.datatype.number({ min: 0, max: 1000 })) */,
                                backgroundColor: isLight ? 'hsl(29, 94%, 51%)' : 'hsl(29, 94%, 71%)',
                            },
                            {
                                label: 'Fumados',
                                data: [viewing.count] /* labels.map(() => faker.datatype.number({ min: 0, max: 1000 })) */,
                                backgroundColor: isLight ? 'hsl(216, 94%, 51%)' : 'hsl(216, 94%, 71%)',
                            },
                        ],
                    }}
                />
            </Paper>
        )
    )
}
