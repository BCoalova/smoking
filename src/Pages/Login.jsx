import GoogleIcon from '@mui/icons-material/Google'
import Backdrop from '@mui/material/Backdrop'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Snackbar from '@mui/material/Snackbar'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../context/GlobalContext'

export default function Login() {
    let navigate = useNavigate()
    const matches = useMediaQuery('(min-width:600px)')

    const { login, currentUser, loadingUser } = useGlobalContext()
    const [error, setError] = useState('')
    function closeError() {
        setError('')
    }

    useEffect(() => {
        if (!currentUser) return
        navigate('/', { replace: true })
    }, [currentUser, navigate])

    async function loginHandler() {
        setError('')
        try {
            await login()
        } catch (err) {
            // eslint-disable-next-line no-undef
            console.log(err)
            setError('Ups hubo un problema, vuelve a intentarlo')
        } finally {
            navigate('/', { replace: true })
        }
    }

    if (loadingUser)
        return (
            <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={loadingUser}>
                <CircularProgress color='inherit' />
            </Backdrop>
        )

    return (
        <Stack justifyContent='center' alignItems='center' sx={{ minHeight: '100vh' }}>
            <Stack direction={matches ? 'row' : 'column'} minWidth='100%' alignItems='stretch'>
                <Stack
                    alignItems='center'
                    justifyContent='center'
                    gap={1}
                    flex='65vh'
                    sx={{ bgcolor: 'secondary.main' }}
                    minHeight={matches ? '100vh' : '65vh'}
                    width='100%'
                    p={2}
                >
                    <Typography textAlign='center' variant='h1' fontWeight={900}>
                        No Smoking
                    </Typography>
                    <Stack alignItems='center'>
                        <Typography variant='h4' textAlign='center'>
                            Contador de cigarrillos diarios
                        </Typography>
                        <Typography variant='h4' textAlign='center'>
                            con objetivos
                        </Typography>
                    </Stack>
                </Stack>
                <Stack
                    flex='35vh'
                    minHeight={matches ? '100vh' : '35vh'}
                    width='100%'
                    alignItems='center'
                    justifyContent='center'
                >
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
