import AddIcon from '@mui/icons-material/Add'
import LogoutIcon from '@mui/icons-material/Logout'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import { useGlobalContext } from '../../context/GlobalContext'
import { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
})

export default function Nav() {
    const { currentUser, logOut, addCigarette, viewing } = useGlobalContext()
    const [error, setError] = useState('')

    async function logOutHandler() {
        try {
            logOut()
        } catch (err) {
            setError('Ups.. hubo un problema al intentar cerrar la sesión, vuelve a intentarlo más tarde')
        }
    }

    function handleClose() {
        setError('')
    }

    return (
        currentUser && (
            <AppBar position='fixed' color='primary' sx={{ top: 'auto', bottom: 0 }}>
                <Toolbar>
                    <Tooltip
                        title={
                            <Stack>
                                <Typography variant='caption'>{currentUser.displayName}</Typography>
                                <Typography variant='caption'>{currentUser.email}</Typography>
                            </Stack>
                        }
                        arrow
                    >
                        <Avatar alt='Remy Sharp' src={currentUser.photoURL} />
                    </Tooltip>
                    <StyledFab color='secondary' aria-label='add' onClick={() => addCigarette(viewing)}>
                        <AddIcon />
                    </StyledFab>
                    <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose} message={error} />
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton color='inherit' onClick={logOutHandler}>
                        <LogoutIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        )
    )
}
