import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import StopCircleIcon from '@mui/icons-material/StopCircle'
import { IconButton, Paper, Stack, Typography } from '@mui/material'
import SecMinSelect from '../components/ui/SecMinSelect'
import useExcersizeTimers from '../hooks/useExcersizeTimers'

export default function ExcersizeTimers() {
    const [data, handleChange /* handleMoveUp */ /* handleMoveDown */, , , start /* stop */ /* reset */, ,] = useExcersizeTimers()

    return (
        <Stack component={Paper} alignItems='center' py={4} px={2} gap={2} my={10}>
            <Stack gap={2}>
                {data.map(el => (
                    <Stack key={el.id} gap={1}>
                        <Typography pl={6}>{el.label}.</Typography>
                        <Stack direction='row' alignItems='center' gap={1} order={el.order}>
                            <SecMinSelect
                                label='Min'
                                name='minutes'
                                value={el.minutes}
                                onChange={value => handleChange(value, 'minutes', el.id)}
                                type={el.label}
                            />
                            :
                            <SecMinSelect
                                label='Sec'
                                name='seconds'
                                value={el.seconds}
                                onChange={value => handleChange(value, 'seconds', el.id)}
                                type={el.label}
                            />
                        </Stack>
                    </Stack>
                ))}
            </Stack>
            <Stack direction='row' gap={1}>
                {/* <IconButton>
                    <AddCircleIcon />
                </IconButton> */}
                <IconButton
                    onClick={() => {
                        // eslint-disable-next-line no-undef
                        console.log('data => ', data)
                        start(data)
                    }}
                >
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

/* 
{el.type === types.CUSTOM && el.order < data.length - 1 && (
                                <IconButton onClick={() => handleMoveDown(el.id)}>
                                    <MoveDownIcon />
                                </IconButton>
                            )}
{el.type === types.CUSTOM && el.order > 4 ? (
                                <IconButton onClick={() => handleMoveUp(el.id)}>
                                    <MoveUpIcon />
                                </IconButton>
                            ) : (
                                <Box sx={{ width: 40 }} />
                            )}
*/
