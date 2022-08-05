import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useEffect } from 'react'
import { useGlobalContext } from '../context/GlobalContext'
import useInput from '../hooks/useInput'

export default function Objective() {
    const { viewing, userData, setDayObjective } = useGlobalContext()
    const [value, bind /* reset */, , setFN] = useInput(0)

    useEffect(() => {
        if (!viewing) return
        setFN(userData.data[viewing].dayObjective)
    }, [userData, viewing, setFN])

    return (
        <Stack gap={2} pt={2}>
            <Typography variant='h3'>
                Objetivo diario:{' '}
                <Box component='span' sx={{ fontWeight: 900 }}>
                    {viewing && userData.data[viewing].dayObjective}
                </Box>
            </Typography>
            <Stack direction='row' gap={0.5} sx={{ width: '100%' }}>
                <Box sx={{ flexGrow: 1 }}>
                    <TextField size='small' fullWidth {...bind} type='number' />
                </Box>

                <Button
                    sx={{ height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', py: 0, lineHeight: 1 }}
                    variant='contained'
                    onClick={() => setDayObjective(value, viewing)}
                >
                    modificar
                </Button>
            </Stack>
        </Stack>
    )
}
