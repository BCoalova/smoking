import AddCircleIcon from '@mui/icons-material/AddCircle'
import MoveDownIcon from '@mui/icons-material/MoveDown'
import MoveUpIcon from '@mui/icons-material/MoveUp'
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import StopCircleIcon from '@mui/icons-material/StopCircle'
import { Box, IconButton, Paper, Stack, TextField, Typography } from '@mui/material'
import { types } from '../constants/excersizeCons'
import useExcersizeTimers from '../hooks/useExcersizeTimers'
import SecMinAutocomplete from '../components/ui/SecMinAutocomplete'

export default function ExcersizeTimers() {
    const [data, handleChange, handleMoveUp, handleMoveDown /* start, stop, reset */] = useExcersizeTimers()

    return (
        <Stack component={Paper} alignItems='center' py={4} px={2} gap={2} my={10}>
            <Stack gap={2}>
                {data.map(el => (
                    <Stack key={el.id} gap={1}>
                        <Typography pl={6}>{el.label}.</Typography>
                        <Stack direction='row' alignItems='center' gap={1} order={el.order}>
                            {el.type === types.CUSTOM && el.order > 4 ? (
                                <IconButton onClick={() => handleMoveUp(el.id)}>
                                    <MoveUpIcon />
                                </IconButton>
                            ) : (
                                <Box sx={{ width: 40 }} />
                            )}
                            <SecMinAutocomplete
                                value={el.minutes}
                                onChange={(value, name) => handleChange(value, name, el.id)}
                                label='Min'
                                name='minutes'
                            />
                            :
                            <SecMinAutocomplete
                                value={el.seconds}
                                onChange={(value, name) => handleChange(value, name, el.id)}
                                label='Sec'
                                name='seconds'
                            />
                            {el.type === types.CUSTOM && el.order < data.length - 1 && (
                                <IconButton onClick={() => handleMoveDown(el.id)}>
                                    <MoveDownIcon />
                                </IconButton>
                            )}
                        </Stack>
                    </Stack>
                ))}
            </Stack>
            <Stack direction='row' gap={1}>
                <IconButton>
                    <AddCircleIcon />
                </IconButton>
                <IconButton>
                    <PlayCircleFilledWhiteIcon />
                </IconButton>
                <IconButton>
                    <StopCircleIcon />
                </IconButton>
                <IconButton>
                    <RestartAltIcon />
                </IconButton>
            </Stack>
        </Stack>
    )
}
