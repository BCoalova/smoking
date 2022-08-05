import LogoutIcon from '@mui/icons-material/Logout'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Snackbar from '@mui/material/Snackbar'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { useGlobalContext } from '../context/GlobalContext'

export default function Profile() {
    const { currentUser, logOut } = useGlobalContext()

    const [error, setError] = useState('')

    async function logOutHandler() {
        try {
            logOut()
        } catch (err) {
            setError('Ups.. hubo un problema al intentar cerrar la sesión, vuelve a intentarlo más tarde')
        }
    }

    function closeError() {
        setError('')
    }

    return (
        <Paper component={Stack} my={10} py={2} px={4} gap={2} elevation={2}>
            <Typography variant='h4' fontWeight={900}>
                Perfil
            </Typography>
            <Stack direction='row' gap={2}>
                <Box component='img' src={currentUser.photoURL} sx={{ minWidth: 96, width: 96, borderRadius: 2 }} />
                <Stack>
                    <Typography>
                        Nombre:{' '}
                        <Typography fontWeight={600} component='span'>
                            {currentUser.displayName}
                        </Typography>
                    </Typography>
                    <Typography>
                        Correo:{' '}
                        <Typography fontWeight={600} component='span'>
                            {currentUser.email}
                        </Typography>
                    </Typography>
                </Stack>
            </Stack>
            <Button
                variant='outlined'
                color='secondary'
                startIcon={<LogoutIcon />}
                onClick={logOutHandler}
                sx={{ alignSelf: 'flex-end' }}
            >
                Salir
            </Button>

            <Snackbar open={!!error} autoHideDuration={6000} onClose={closeError} message={error} />
        </Paper>
    )
}
