import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import useMediaQuery from '@mui/material/useMediaQuery'
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
            <Stack component={Paper} elevation={0} gap={6} mt={10} sx={{ border: 'none', borderRadius: 0 }}>
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
