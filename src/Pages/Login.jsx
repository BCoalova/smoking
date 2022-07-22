import GoogleIcon from '@mui/icons-material/Google'
import { Button, Stack } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../context/GlobalContext'

export default function Login() {
    let navigate = useNavigate()

    const { login } = useGlobalContext()
    const [error, setError] = useState('')

    async function loginHandler() {
        setError('')
        try {
            await login()
        } catch (err) {
            console.log(err)
            setError('Ups hubo un problema, vuelve a intentarlo')
        } finally {
            navigate('/')
        }
    }

    return (
        <Stack justifyContent='center' alignItems='center' sx={{ minHeight: '100vh' }}>
            <Button variant='outlined' onClick={loginHandler} endIcon={<GoogleIcon />}>
                Login with
            </Button>
            {error && error}
        </Stack>
    )
}
