import AddIcon from '@mui/icons-material/Add'
import BarChartIcon from '@mui/icons-material/BarChart'
import HomeIcon from '@mui/icons-material/Home'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import SmokeFreeIcon from '@mui/icons-material/SmokeFree'
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer, useMediaQuery } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import IconButton from '@mui/material/IconButton'
import Snackbar from '@mui/material/Snackbar'
import { styled } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useGlobalContext } from '../../context/GlobalContext'
import useMuiMenu from '../../hooks/useMuiMenu'

const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
})

export default function Nav() {
    let { pathname } = useLocation()
    const { currentUser, logOut, addCigarette, viewing } = useGlobalContext()
    const [error, setError] = useState('')
    const [anchorEl, open, handleClick, handleClose] = useMuiMenu()
    const matches = useMediaQuery('(min-width:600px)')

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
        <AppBar position='fixed' color='primary' sx={{ top: 'auto', bottom: 0 }}>
            <Toolbar sx={{ gap: 1, alignItems: 'center' }}>
                <IconButton color='secondary' component={Link} to='/'>
                    <SmokeFreeIcon />
                </IconButton>
                {matches && (
                    <Typography variant='h6' fontWeight={900} color='secondary.main'>
                        Stop smoking
                    </Typography>
                )}
                <Snackbar open={!!error} autoHideDuration={6000} onClose={closeError} message={error} />
                <Box sx={{ flexGrow: 1 }} />
                <IconButton size='large' edge='start' color='inherit' aria-label='menu' onClick={handleClick}>
                    <MenuIcon />
                </IconButton>
                <SwipeableDrawer anchor='right' open={open} onClose={handleClose} onOpen={handleClick}>
                    <List
                        sx={{
                            width: '300px',
                            flexDirection: 'column',
                            display: 'flex',
                            alignItems: 'flex-end',
                            justifyContent: 'flex-end',
                        }}
                        disablePadding
                    >
                        <ListItem disablePadding>
                            <ListItemButton onClick={handleClose} component={NavLink} to='/' selected={pathname === '/'}>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary={<Typography color='basic'>Inicio</Typography>} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={handleClose}
                                component={NavLink}
                                to='/week-summary'
                                selected={pathname === '/week-summary'}
                            >
                                <ListItemIcon>
                                    <BarChartIcon />
                                </ListItemIcon>
                                <ListItemText primary='Semanal' />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={handleClose}
                                component={NavLink}
                                to='/profile'
                                selected={pathname === '/profile'}
                            >
                                <ListItemIcon>
                                    <Box
                                        component='img'
                                        width={24}
                                        sx={{ borderRadius: '50%' }}
                                        alt={currentUser.displayName}
                                        src={currentUser.photoURL}
                                    />
                                </ListItemIcon>
                                <ListItemText primary='Perfil' />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={logOutHandler}>
                                <ListItemIcon>
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText primary='Salir' />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </SwipeableDrawer>

                {pathname !== '/profile' && (
                    <StyledFab color='primary' aria-label='add' onClick={() => addCigarette(viewing)}>
                        <AddIcon />
                    </StyledFab>
                )}
            </Toolbar>
        </AppBar>
    )
}
