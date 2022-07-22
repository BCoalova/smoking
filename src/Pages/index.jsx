import { Paper, Stack } from '@mui/material'
import DateComp from '../components/Date'
import Graph from '../components/Graph'
import Objective from '../components/Objective'
import Smoked from '../components/Smoked'

export default function Main() {
    return (
        <Stack component={Paper} elevation={0} gap={6} sx={{ minHeight: '100vh', border: 'none', borderRadius: 0 }}>
            <Objective />
            <Stack direction='row' gap={1}>
                <DateComp />
                <Graph />
            </Stack>
            <Smoked />
        </Stack>
    )
}
