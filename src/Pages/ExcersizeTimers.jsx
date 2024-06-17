import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import StopCircleIcon from '@mui/icons-material/StopCircle'
import { AppBar, Box, IconButton, Paper, Stack, Tab, Tabs, Typography } from '@mui/material'
import SecMinSelect from '../components/ui/SecMinSelect'
import useExcersizeTimers from '../hooks/useExcersizeTimers'
import { useState } from 'react'
import { status } from '../constants/excersizeCons'
import PauseCircleIcon from '@mui/icons-material/PauseCircle'

export default function ExcersizeTimers() {
    const [value, setValue] = useState(0)
    const [data, handleChange /* handleMoveUp */ /* handleMoveDown */, , , start, stop, reset, countDown, countDownData] =
        useExcersizeTimers()

    const handleChangeTab = (_, newValue) => {
        setValue(newValue)
    }

    return (
        <Stack component={Paper} alignItems='center' /* py={4} px={2} */ gap={2} my={10}>
            <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
                <AppBar position='static'>
                    <Tabs
                        // centered
                        value={value}
                        onChange={handleChangeTab}
                        indicatorColor='secondary'
                        textColor='inherit'
                        variant='fullWidth'
                        aria-label='full width tabs example'
                    >
                        <Tab label='config' />
                        <Tab label='clock' />
                    </Tabs>
                </AppBar>
            </Box>
            <Stack gap={2} sx={{ pb: 4 }}>
                {value === 0 &&
                    data.map(el => (
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
                {value === 1 && (
                    <Stack style={{ pb: 2 }} gap={3}>
                        <Stack direction='row' gap={1}>
                            {countDownData.status === status.RUNNING ? (
                                <IconButton size='large'>
                                    <PauseCircleIcon sx={{ fontSize: 50 }} />
                                </IconButton>
                            ) : (
                                <IconButton size='large' onClick={() => start(data)}>
                                    <PlayCircleFilledWhiteIcon sx={{ fontSize: 50 }} />
                                </IconButton>
                            )}
                            <IconButton size='large' onClick={stop}>
                                <StopCircleIcon sx={{ fontSize: 50 }} />
                            </IconButton>
                            <IconButton size='large' onClick={reset}>
                                <RestartAltIcon sx={{ fontSize: 50 }} />
                            </IconButton>
                        </Stack>
                        <Typography variant='h4' textAlign='center'>
                            {data[countDownData.currentStep].label} {countDown}
                        </Typography>
                    </Stack>
                )}
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
