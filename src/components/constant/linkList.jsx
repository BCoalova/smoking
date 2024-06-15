// import AvTimerIcon from '@mui/icons-material/AvTimer'
import BarChartIcon from '@mui/icons-material/BarChart'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import HistoryIcon from '@mui/icons-material/History'
import HomeIcon from '@mui/icons-material/Home'
import LogoutIcon from '@mui/icons-material/Logout'
import { Box } from '@mui/material'

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
        title: 'CountDown',
        Icon: () => <FitnessCenterIcon />,
        path: '/exercise-timers',
    },
    /* {
        comp: 'NavLink',
        onClick: fn => fn(),
        title: 'Último fumado',
        Icon: () => <AvTimerIcon />,
        path: '/last-smoked',
    }, */
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
].map((el, idx) => ({ ...el, id: idx }))
