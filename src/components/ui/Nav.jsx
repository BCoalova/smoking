import AddIcon from '@mui/icons-material/Add'
import BarChartIcon from '@mui/icons-material/BarChart'
import HomeIcon from '@mui/icons-material/Home'
import LogoutIcon from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import SmokeFreeIcon from '@mui/icons-material/SmokeFree'
import { Menu, MenuItem } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
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
                <Typography variant='h6' fontWeight={900} color='secondary.main'>
                    Stop smoking
                </Typography>
                <Snackbar open={!!error} autoHideDuration={6000} onClose={closeError} message={error} />
                <Box sx={{ flexGrow: 1 }} />
                <IconButton size='large' edge='start' color='inherit' aria-label='menu' onClick={handleClick}>
                    <MenuIcon />
                </IconButton>
                <Menu
                    id='basic-menu'
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                bottom: -10,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                >
                    <MenuItem onClick={handleClose} component={NavLink} to='/' selected={pathname === '/' ? 'active' : ''}>
                        <HomeIcon />
                        <Typography ml={1}>Inicio</Typography>
                    </MenuItem>
                    <MenuItem
                        onClick={handleClose}
                        component={NavLink}
                        to='/week-summary'
                        selected={pathname === '/week-summary' ? 'active' : ''}
                    >
                        <BarChartIcon />
                        <Typography ml={1}>Semanal</Typography>
                    </MenuItem>
                    <MenuItem
                        onClick={handleClose}
                        component={NavLink}
                        to='/profile'
                        selected={pathname === '/profile' ? 'active' : ''}
                    >
                        <Avatar alt={currentUser.displayName} src={currentUser.photoURL} />
                        <Typography>Perfil</Typography>
                    </MenuItem>
                    <MenuItem color='inherit' onClick={logOutHandler}>
                        <LogoutIcon />
                        <Typography ml={1}>Salir</Typography>
                    </MenuItem>
                </Menu>

                {pathname !== '/profile' && (
                    <StyledFab color='primary' aria-label='add' onClick={() => addCigarette(viewing)}>
                        <AddIcon />
                    </StyledFab>
                )}
            </Toolbar>
        </AppBar>
    )
}
