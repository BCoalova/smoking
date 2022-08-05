import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import { useGlobalContext } from '../../context/GlobalContext'
import BottomNav from './BottomNav'
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
            {currentUser && <BottomNav />}
        </Paper>
    )
}

export default Layout
