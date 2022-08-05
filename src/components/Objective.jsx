import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useEffect, useRef } from 'react'
import { useGlobalContext } from '../context/GlobalContext'
import useInput from '../hooks/useInput'
import EditIcon from '@mui/icons-material/Edit'
import useBoolean from '../hooks/useBoolean'
import EditOffIcon from '@mui/icons-material/EditOff'

export default function Objective() {
    const { viewing, userData, setDayObjective } = useGlobalContext()
    const [value, bind /* reset */, , setFN] = useInput(0)
    const [showEditObjective, makeFalse, makeTrue] = useBoolean(true)
    const matches = useMediaQuery('(min-width:600px)')
    const editObjeciveRef = useRef()

    useEffect(() => {
        if (!viewing) return
        setFN(userData.data[viewing].dayObjective)
    }, [userData, viewing, setFN])

    const handleEditBtn = async () => {
        if (showEditObjective) return makeFalse()

        await makeTrue()
        editObjeciveRef.current.focus()
    }

    return (
        <Stack gap={matches ? 2 : 1} pt={2}>
            <Stack justifyContent='space-between' alignItems='center' direction='row' flexWrap='wrap' gap={4}>
                <Typography variant='h4'>Objetivo diario: </Typography>
                <Stack direction='row' gap={0.5} alignItems='center' justifyContent='center'>
                    <Chip
                        sx={{ fontWeight: 700, fontSize: 24, py: 2 }}
                        color='primary'
                        variant='contained'
                        label={viewing && userData.data[viewing].dayObjective}
                        elevation={3}
                    />
                    <IconButton onClick={handleEditBtn} color='primary' title={showEditObjective ? 'edit offf' : 'edit on'}>
                        {showEditObjective ? <EditOffIcon /> : <EditIcon />}
                    </IconButton>
                </Stack>
            </Stack>

            <Stack display={showEditObjective ? 'flex' : 'none'} direction='row' gap={0.5} sx={{ width: '100%' }}>
                <Box sx={{ flexGrow: 1 }}>
                    <TextField size='small' fullWidth {...bind} type='number' inputProps={{ ref: editObjeciveRef }} />
                </Box>

                <Button
                    sx={{
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        py: 0,
                        lineHeight: 1,
                    }}
                    variant='contained'
                    onClick={() => setDayObjective(value, viewing)}
                >
                    modificar
                </Button>
            </Stack>
        </Stack>
    )
}
