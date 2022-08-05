import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Snackbar from '@mui/material/Snackbar'
import Toolbar from '@mui/material/Toolbar'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useGlobalContext } from '../../context/GlobalContext'
import useMuiMenu from '../../hooks/useMuiMenu'
import { links } from '../constant/linkList'
import NavBrand from './NavBrand'
import NavSwipe from './NavSwipe'

export default function Nav() {
    let { pathname } = useLocation()
    const { currentUser, logOut } = useGlobalContext()
    const [error, setError] = useState('')
    const [, /* anchorEl */ open, handleClick, handleClose] = useMuiMenu()

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
        <AppBar position='fixed' color='primary' /* sx={{ top: 'auto', bottom: 0 }} */ enableColorOnDark>
            <Toolbar sx={{ gap: 1, alignItems: 'center' }}>
                <NavBrand />
                <Snackbar open={!!error} autoHideDuration={6000} onClose={closeError} message={error} />
                <Box sx={{ flexGrow: 1 }} />
                <IconButton size='large' edge='start' color='inherit' aria-label='menu' onClick={handleClick}>
                    <MenuIcon />
                </IconButton>
                <NavSwipe
                    currentUser={currentUser}
                    links={links}
                    pathname={pathname}
                    handleClose={handleClose}
                    open={open}
                    handleClick={handleClick}
                    logOutHandler={logOutHandler}
                />
            </Toolbar>
        </AppBar>
    )
}
