import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useGlobalContext } from '../context/GlobalContext'
import useInput from '../hooks/useInput'

export default function Objective() {
    const { viewing, setDayObjective } = useGlobalContext()
    const [value, bind /* reset */, , setFN] = useInput(0)

    useEffect(() => {
        if (!viewing) return
        setFN(viewing.dayObjective)
    }, [viewing, setFN])

    return (
        <Stack gap={2} pt={2}>
            <Typography variant='h3'>
                Objetivo diario:{' '}
                <Box component='span' sx={{ fontWeight: 900 }}>
                    {viewing && viewing.dayObjective}
                </Box>
            </Typography>
            <Stack direction='row' gap={0.5} sx={{ width: '100%' }}>
                <Box sx={{ flexGrow: 1 }}>
                    <TextField size='small' fullWidth {...bind} type='number' />
                </Box>

                <Button
                    sx={{ height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', py: 0, lineHeight: 1 }}
                    variant='contained'
                    onClick={() => setDayObjective(value, viewing.day)}
                >
                    modificar
                </Button>
            </Stack>
        </Stack>
    )
}
