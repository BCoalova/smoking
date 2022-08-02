import { Backdrop, CircularProgress, Paper, Stack, useMediaQuery } from '@mui/material'
import DateComp from '../components/Date'
import Graph from '../components/Graph'
import Objective from '../components/Objective'
import Smoked from '../components/Smoked'
import { useGlobalContext } from '../context/GlobalContext'

export default function Main() {
    const matches = useMediaQuery('(min-width:600px)')
    const { userData, viewing } = useGlobalContext()

    if (!userData && !viewing)
        return (
            <Backdrop open={!userData && !viewing}>
                <CircularProgress color='inherit' />
            </Backdrop>
        )

    return (
        userData &&
        userData?.createdTime &&
        userData.data[viewing] && (
            <Stack component={Paper} elevation={0} gap={6} sx={{ border: 'none', borderRadius: 0 }}>
                <Objective />
                <Stack direction={matches ? 'row' : 'column'} alignItems='strech' gap={1}>
                    <DateComp />
                    <Graph />
                </Stack>
                <Smoked />
            </Stack>
        )
    )
}
