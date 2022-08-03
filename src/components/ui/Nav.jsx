import AddIcon from '@mui/icons-material/Add'
import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import IconButton from '@mui/material/IconButton'
import Snackbar from '@mui/material/Snackbar'
import { styled } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useGlobalContext } from '../../context/GlobalContext'
import useMuiMenu from '../../hooks/useMuiMenu'
import NavBrand from './NavBrand'
import NavSwipe from './NavSwipe'
import BarChartIcon from '@mui/icons-material/BarChart'
import HistoryIcon from '@mui/icons-material/History'
import HomeIcon from '@mui/icons-material/Home'
import LogoutIcon from '@mui/icons-material/Logout'
const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
})

export const links = [
    {
        comp: 'NavLink',
        onClick: fn => fn(),
        title: 'Inicio',
        Icon: () => <HomeIcon />,
        path: '/',
    },
    {
        comp: 'NavLink',
        onClick: fn => fn(),
        title: 'Semanal',
        Icon: () => <BarChartIcon />,
        path: '/week-summary',
    },
    {
        comp: 'NavLink',
        onClick: fn => fn(),
        title: 'Histórico',
        Icon: () => <HistoryIcon />,
        path: '/history',
    },
    {
        comp: 'NavLink',
        onClick: fn => fn(),
        title: 'Perfil',
        Icon: currentUser => (
            <Box
                component='img'
                width={24}
                sx={{ borderRadius: '50%' }}
                alt={currentUser.displayName}
                src={currentUser.photoURL}
            />
        ),
        path: '/profile',
    },
    {
        comp: undefined,
        onClick: fn => fn(),
        title: 'Salir',
        Icon: () => <LogoutIcon />,
        path: undefined,
    },
]

export default function Nav() {
    let { pathname } = useLocation()
    const { userData, currentUser, logOut, addCigarette, viewing } = useGlobalContext()
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
        <AppBar position='fixed' color='primary' sx={{ top: 'auto', bottom: 0 }} enableColorOnDark>
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

                {pathname === '/' && (
                    <StyledFab color='primary' aria-label='add' onClick={() => addCigarette(userData.data[viewing])}>
                        <AddIcon />
                    </StyledFab>
                )}
            </Toolbar>
        </AppBar>
    )
}
