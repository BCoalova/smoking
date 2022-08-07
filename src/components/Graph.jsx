import Paper from '@mui/material/Paper'
import { BarElement, CategoryScale, Chart as ChartJS, LinearScale, Tooltip } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { useGlobalContext } from '../context/GlobalContext'
import { themeDark, themeLight } from '../styles/theme'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip)

export default function Graph() {
    const { viewing, userData, isLight } = useGlobalContext()

    return (
        <Paper sx={{ flexGrow: 1, p: 2 }}>
            <Bar
                options={isLight ? themeLight.chartOpt.options : themeDark.chartOpt.options}
                data={{
                    labels: [viewing],
                    datasets: [
                        {
                            label: 'Objetivo',
                            data: [
                                userData.data[viewing].dayObjective,
                            ] /* labels.map(() => faker.datatype.number({ min: 0, max: 1000 })) */,
                            backgroundColor: isLight ? 'hsl(29, 94%, 51%)' : 'hsl(29, 94%, 71%)',
                        },
                        {
                            label: 'Fumados',
                            data: [
                                userData.data[viewing].count,
                            ] /* labels.map(() => faker.datatype.number({ min: 0, max: 1000 })) */,
                            backgroundColor: isLight ? 'hsl(216, 94%, 51%)' : 'hsl(216, 94%, 71%)',
                        },
                    ],
                }}
            />
        </Paper>
    )
}
