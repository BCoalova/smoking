import { Paper } from '@mui/material'
import { useGlobalContext } from '../context/GlobalContext'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'

const options = {
    responsive: true,
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip)

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
                                backgroundColor: isLight ? 'hsl(216, 94%, 51%)' : 'hsl(216, 94%, 71%)',
                            },
                            {
                                label: 'Fumados',
                                data: [viewing.count] /* labels.map(() => faker.datatype.number({ min: 0, max: 1000 })) */,
                                backgroundColor: isLight ? 'hsl(29, 94%, 51%)' : 'hsl(29, 94%, 71%)',
                            },
                        ],
                    }}
                />
            </Paper>
        )
    )
}
