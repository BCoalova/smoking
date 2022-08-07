import PauseCircleIcon from '@mui/icons-material/PauseCircle'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import StopCircleIcon from '@mui/icons-material/StopCircle'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import useStopWatch from '../hooks/useStopWatch'

export default function LastSmoked() {
    const [time, handleStart, handlePauseResume, handleReset, isActive, isPaused] = useStopWatch()

    return (
        <Stack component={Paper} alignItems='center' py={4} px={2} gap={4} my={10}>
            hola
            <IconButton onClick={handleStart}>handleStart</IconButton>
            <IconButton onClick={handleReset}>handleReset</IconButton>
            {
                // eslint-disable-next-line no-undef
                console.log('time => ', time)
            }
            {/* <Typography variant='h4' fontWeight={800}>
                {time.timeNow
                    ? `${time.hours} : ${time.minutes} : ${time.seconds}.${time.hundredthsOfASeconds}`
                    : '00 : 00 : 00.00'}
            </Typography>
            <Stack direction='row'>
                {isPaused && (
                    <IconButton onClick={handleStart}>
                        <PlayCircleIcon />
                    </IconButton>
                )}
                {isActive && !isPaused && (
                    <IconButton onClick={handlePauseResume}>
                        <PauseCircleIcon />
                    </IconButton>
                )}
                <IconButton onClick={handleReset}>
                    <StopCircleIcon />
                </IconButton>
            </Stack>
            {isActive && !isPaused && <Alert severity='warning'>Si salís de está sección el cronometro se reseteará.</Alert>} */}
        </Stack>
    )
}
