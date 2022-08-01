import { Container, Paper } from '@mui/material'
import { useGlobalContext } from '../../context/GlobalContext'
import Nav from './Nav'

const layoutStyles = {
    minHeight: '100vh',
    borderRadius: 0,
    display: 'flex',
    flexDirection: 'column',
}

function Layout({ children }) {
    const { currentUser } = useGlobalContext()

    return (
        <Paper elevation={0} sx={layoutStyles}>
            {currentUser && <Nav />}
            <Container maxWidth={currentUser ? 'sm' : ''} disableGutters={!currentUser}>
                {children}
            </Container>
        </Paper>
    )
}

export default Layout
