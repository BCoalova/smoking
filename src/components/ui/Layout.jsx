import { Container, Paper } from '@mui/material'
import Nav from './Nav'

const layoutStyles = {
    minHeight: '100vh',
    borderRadius: 0,
    display: 'flex',
    flexDirection: 'column',
}

function Layout({ children }) {
    return (
        <Paper elevation={0} sx={layoutStyles}>
            <Nav />
            <Container maxWidth='sm'>{children}</Container>
        </Paper>
    )
}

export default Layout
