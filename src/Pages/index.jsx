import { Paper, Stack, useMediaQuery } from '@mui/material'
import DateComp from '../components/Date'
import Graph from '../components/Graph'
import Objective from '../components/Objective'
import Smoked from '../components/Smoked'
import { useGlobalContext } from '../context/GlobalContext'

export default function Main() {
    const matches = useMediaQuery('(min-width:600px)')
    const { userData, viewing } = useGlobalContext()

    return (
        <Stack component={Paper} elevation={0} gap={6} sx={{ border: 'none', borderRadius: 0 }}>
            <Objective />
            {userData && userData?.createdTime && viewing && (
                <>
                    <Stack direction={matches ? 'row' : 'column'} alignItems='strech' gap={1}>
                        <DateComp />
                        <Graph />
                    </Stack>
                    <Smoked />
                </>
            )}
        </Stack>
    )
}
