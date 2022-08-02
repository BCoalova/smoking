/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Paper, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { Line } from 'react-chartjs-2'
import { Bar } from 'react-chartjs-2'
import { useGlobalContext } from '../context/GlobalContext'
import descSortDatesFn from '../helpers/descSortDatesFn'
import Smoked from '../components/Smoked'
import { format } from 'date-fns'

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: false,
            text: 'Últimos días',
        },
    },
    scales: {
        yAxis: {
            min: 0,
        },
    },
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function WeekSummary() {
    //eslint-disable-next-line no-unused-vars
    const { userData, isLight } = useGlobalContext()

    const [data, setData] = useState(null)

    useEffect(() => {
        if (!userData) return
        let userDataArr = Object.entries(userData.data).reduce((acc, el) => {
            return [...acc, { date: el[0], count: el[1].count, dayObjective: el[1].dayObjective }]
        }, [])

        let today = format(new Date(), 'dd-MM-yyyy')

        let orderUserDataArr = descSortDatesFn(userDataArr, 'date')

        let todayIndex = orderUserDataArr.findIndex(el => el.date === today)
        // eslint-disable-next-line no-undef
        orderUserDataArr.length = todayIndex + 1
        let lastSevenDays = orderUserDataArr
        if (orderUserDataArr.length > 7) {
            lastSevenDays = orderUserDataArr.slice(orderUserDataArr.length - 7)
        }
        let labels = lastSevenDays.map(el => el.date)
        let [count, dayObjective] = lastSevenDays.reduce(
            (acc, el) => {
                return [
                    [...acc[0], el.count],
                    [...acc[1], el.dayObjective],
                ]
            },
            [[], []],
        )
        let datasets = [
            {
                label: 'Objetivo',
                data: dayObjective,
                backgroundColor: isLight ? 'hsl(29, 94%, 51%)' : 'hsl(29, 94%, 71%)',
                borderColor: isLight ? 'hsl(29, 94%, 51%)' : 'hsl(29, 94%, 71%)',
            },
            {
                label: 'Fumados',
                data: count,
                backgroundColor: isLight ? 'hsl(216, 94%, 51%)' : 'hsl(216, 94%, 71%)',
                borderColor: isLight ? 'hsl(216, 94%, 51%)' : 'hsl(216, 94%, 71%)',
            },
        ]

        setData({ labels, datasets })
    }, [userData, isLight])

    return (
        <>
            <Paper component={Stack} my={4} py={2} px={4} gap={4}>
                <Typography variant='h4' fontWeight={900}>
                    Últimos 7 días
                </Typography>
                <Stack>
                    {/* eslint-disable-next-line no-undef */}
                    {data && <Line options={options} data={data} />}
                </Stack>
            </Paper>
            {userData && userData?.createdTime && viewing && <Smoked />}
        </>
    )
}
