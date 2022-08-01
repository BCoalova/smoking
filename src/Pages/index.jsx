import { Paper, Stack, useMediaQuery } from '@mui/material'
import DateComp from '../components/Date'
import Graph from '../components/Graph'
import Objective from '../components/Objective'
import Smoked from '../components/Smoked'

export default function Main() {
    const matches = useMediaQuery('(min-width:600px)')

    return (
        <Stack component={Paper} elevation={0} gap={6} sx={{ border: 'none', borderRadius: 0 }}>
            <Objective />
            <Stack direction={matches ? 'row' : 'column'} alignItems='strech' gap={1}>
                <DateComp />
                <Graph />
            </Stack>
            <Smoked />
        </Stack>
    )
}
