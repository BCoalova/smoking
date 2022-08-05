/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import AddCircleIcon from '@mui/icons-material/AddCircle'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import AppBar from '@mui/material/AppBar'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js'
import React, { useEffect, useState } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import { useGlobalContext } from '../context/GlobalContext'
import chartjsConverter from '../helpers/chartjsConverter'
import { userDataToArrUntilToday } from '../helpers/userDataToArr'

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

function TabPanel(props) {
    const { children, value, index, ...other } = props

    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

export default function WeekSummary() {
    //eslint-disable-next-line no-unused-vars
    const { userData, isLight, viewing } = useGlobalContext()
    const [value, setValue] = useState(0)
    const [dayCount, setDayCount] = useState(7)
    const [data, setData] = useState(null)

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    useEffect(() => {
        if (!userData) return
        if (!viewing) return
        let dataConverted = chartjsConverter(userDataToArrUntilToday(userData.data), isLight, dayCount)
        setData(dataConverted)
    }, [userData, isLight, viewing, dayCount])

    const addOneDay = () => {
        let { labels } = chartjsConverter(userDataToArrUntilToday(userData.data), isLight)
        setDayCount(current => (labels.length <= current ? current : current + 1))
    }

    const subOneDay = () => setDayCount(current => (current === 1 ? current : current - 1))

    if (!userData && !viewing)
        return (
            <Backdrop open={!userData && !viewing}>
                <CircularProgress color='inherit' />
            </Backdrop>
        )

    return (
        data && (
            <>
                <Paper component={Stack} my={10} gap={4}>
                    <AppBar sx={{ position: 'relative', borderBottom: 1, borderColor: 'primary.main' }} elevation={1}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label='basic tabs example'
                            variant='fullWidth'
                            centered
                            // variant='scrollable'
                            scrollButtons='auto'
                        >
                            <Tab label='Lineas' {...a11yProps(0)} />
                            <Tab label='Barras' {...a11yProps(1)} />
                        </Tabs>
                    </AppBar>

                    <TabPanel value={value} index={0}>
                        <Line options={options} data={data} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Bar options={options} data={data} />
                    </TabPanel>

                    <Stack direction='row' flexWrap='wrap' gap={1} py={2} px={4}>
                        <Typography variant='h4' component='span'>
                            Últimos
                        </Typography>
                        <Stack direction='row' gap={1} component='span'>
                            <IconButton color='secondary' onClick={subOneDay} disabled={dayCount === 1}>
                                <RemoveCircleIcon />
                            </IconButton>
                            <Typography variant='h4' component='span' fontWeight={900}>
                                {dayCount}
                            </Typography>
                            <IconButton
                                color='secondary'
                                onClick={addOneDay}
                                disabled={
                                    chartjsConverter(userDataToArrUntilToday(userData.data), isLight).labels.length === dayCount
                                }
                            >
                                <AddCircleIcon />
                            </IconButton>
                        </Stack>
                        <Typography variant='h4' component='span'>
                            días de
                        </Typography>
                        <Typography variant='h4' component='span' fontWeight={900}>
                            {userDataToArrUntilToday(userData.data).length}
                        </Typography>
                    </Stack>
                </Paper>
                {/* <Smoked /> */}
            </>
        )
    )
}
