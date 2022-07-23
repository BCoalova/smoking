import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Box, IconButton, useMediaQuery } from '@mui/material'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import format from 'date-fns/format'
import React from 'react'
import { useGlobalContext } from '../context/GlobalContext'
import convertTimeStampToDate from '../helpers/timeStampToDate'

export default function DateComp() {
    const { userData, viewing, addAndChangeViewingDay, removeAndChangeViewingDay } = useGlobalContext()
    const matches = useMediaQuery('(min-width:600px)')

    return (
        viewing && (
            <Stack gap={1} alignItems={matches ? 'flex-start' : 'stretch'} sx={{ position: 'relative' }}>
                <Paper sx={{ py: 4, px: 6, position: 'relative', display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ position: 'absolute', top: '50%', left: 2, transform: 'translateY(-50%)' }}>
                        <IconButton
                            sx={{ cursor: 'pointer' }}
                            disabled={viewing.day === format(convertTimeStampToDate(userData?.createdTime), 'dd-MM-yyyy')}
                            onClick={() => removeAndChangeViewingDay(viewing.day)}
                            onTouchStart={() => removeAndChangeViewingDay(viewing.day)}
                        >
                            <ChevronLeftIcon />
                        </IconButton>
                    </Box>
                    <Box sx={{ position: 'absolute', top: '50%', right: 2, transform: 'translateY(-50%)' }}>
                        <IconButton
                            sx={{ cursor: 'pointer' }}
                            onClick={() => addAndChangeViewingDay(viewing.day)}
                            onTouchStart={() => addAndChangeViewingDay(viewing.day)}
                        >
                            <ChevronRightIcon />
                        </IconButton>
                    </Box>
                    <Stack alignItems='center' gap={1} direction={matches ? 'column' : 'row'}>
                        {viewing?.day?.split('-').map((field, index, array) => (
                            <React.Fragment key={`${field}-${index}`}>
                                <Typography variant='h4'>{field}</Typography>
                                {array.length - 1 !== index && (
                                    <Divider flexItem orientation={matches ? 'horizontal' : 'vertical'} />
                                )}
                            </React.Fragment>
                        ))}
                    </Stack>
                </Paper>
            </Stack>
        )
    )
}
