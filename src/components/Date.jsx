import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import format from 'date-fns/format'
import React from 'react'
import { useGlobalContext } from '../context/GlobalContext'
import convertTimeStampToDate from '../helpers/timeStampToDate'

export default function DateComp() {
    const { userData, viewing, addAndChangeViewingDay, removeAndChangeViewingDay } = useGlobalContext()
    const matches = useMediaQuery('(min-width:600px)')

    return (
        <Stack gap={1} alignItems={matches ? 'flex-start' : 'stretch'} sx={{ position: 'relative' }}>
            <Paper sx={{ py: 4, px: 6, position: 'relative', display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ position: 'absolute', top: '50%', left: 2, transform: 'translateY(-50%)' }}>
                    <Button
                        size='small'
                        sx={{ cursor: 'pointer', minWidth: 12 }}
                        disabled={viewing === format(convertTimeStampToDate(userData?.createdTime), 'dd-MM-yyyy')}
                        onClick={() => removeAndChangeViewingDay(viewing)}
                    >
                        <ChevronLeftIcon />
                    </Button>
                </Box>
                <Box sx={{ position: 'absolute', top: '50%', right: 2, transform: 'translateY(-50%)' }}>
                    <Button size='small' sx={{ cursor: 'pointer', minWidth: 12 }} onClick={() => addAndChangeViewingDay(viewing)}>
                        <ChevronRightIcon />
                    </Button>
                </Box>
                <Stack alignItems='center' gap={1} direction={matches ? 'column' : 'row'}>
                    {viewing?.split('-').map((field, index, array) => (
                        <React.Fragment key={`${field}-${index}`}>
                            <Typography variant='h4'>{field}</Typography>
                            {array.length - 1 !== index && <Divider flexItem orientation={matches ? 'horizontal' : 'vertical'} />}
                        </React.Fragment>
                    ))}
                </Stack>
            </Paper>
        </Stack>
    )
}
