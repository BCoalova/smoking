import GoogleIcon from '@mui/icons-material/Google'
import { Button, Snackbar, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../context/GlobalContext'

export default function Login() {
    let navigate = useNavigate()

    const { login } = useGlobalContext()
    const [error, setError] = useState('')
    function closeError() {
        setError('')
    }

    async function loginHandler() {
        setError('')
        try {
            await login()
        } catch (err) {
            // eslint-disable-next-line no-undef
            console.log(err)
            setError('Ups hubo un problema, vuelve a intentarlo')
        } finally {
            navigate('/')
        }
    }

    return (
        <Stack justifyContent='center' alignItems='center' sx={{ minHeight: '100vh' }}>
            <Stack direction='row' width='100%' gap={1} alignItems='stretch'>
                <Stack
                    alignItems='center'
                    justifyContent='center'
                    gap={1}
                    flex='50%'
                    sx={{ bgcolor: 'secondary.main' }}
                    minHeight='100vh'
                    width='100%'
                >
                    <Typography variant='h1' fontWeight={900}>
                        No Smoking
                    </Typography>
                    <Stack alignItems='center'>
                        <Typography variant='h4'>Contador de cigarrillos diarios</Typography>
                        <Typography variant='h4'>con objetivos</Typography>
                    </Stack>
                </Stack>
                <Stack flex='50%' minHeight='100vh' width='100%' alignItems='center' justifyContent='center'>
                    <Stack>
                        <Button variant='outlined' onClick={loginHandler} endIcon={<GoogleIcon />}>
                            Login with
                        </Button>
                    </Stack>
                </Stack>
                <Snackbar open={!!error} autoHideDuration={6000} onClose={closeError} message={error} />
            </Stack>
        </Stack>
    )
}