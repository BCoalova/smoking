import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import { Navigate } from 'react-router-dom'
import { useGlobalContext } from '../context/GlobalContext'

export default function PrivateRoute({ children }) {
    const { currentUser, loadingUser } = useGlobalContext()

    if (loadingUser)
        return (
            <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={loadingUser}>
                <CircularProgress color='inherit' />
            </Backdrop>
        )

    return currentUser ? children : <Navigate to='/login' replace={true} />
}
