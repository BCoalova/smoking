import AddIcon from '@mui/icons-material/Add'
import { styled } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Toolbar from '@mui/material/Toolbar'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useCallback, useEffect } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../../context/GlobalContext'
import { links } from '../constant/linkList'

const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -40,
    left: 0,
    right: 0,
    margin: '0 auto',
})
const StyledTab = styled(Tab)({
    indicator: {
        top: 0,
    },
})

export default function BottomNav() {
    let { pathname } = useLocation()
    const { addCigarette, userData, viewing, currentUser } = useGlobalContext()
    const matches = useMediaQuery('(min-width:700px)')

    let navigate = useNavigate()

    const goToPage = useCallback(
        e => {
            let targetKey = e.key.toLowerCase()

            switch (targetKey) {
                case 'i':
                    if (pathname === '/') return
                    navigate('/')
                    break
                case 's':
                    if (pathname === '/week-summary') return
                    navigate('/week-summary')
                    break
                case 'h':
                    if (pathname === '/history') return
                    navigate('/history')
                    break
                case 'p':
                    if (pathname === '/profile') return
                    navigate('/profile')
                    break

                default:
                    break
            }
        },
        [navigate, pathname],
    )

    useEffect(() => {
        // eslint-disable-next-line no-undef
        window.addEventListener('keydown', goToPage)

        // eslint-disable-next-line no-undef
        return () => window.removeEventListener('keydown', goToPage)
    }, [goToPage])

    return (
        <AppBar color='text' position='fixed' sx={{ top: 'auto', bottom: 0 }}>
            <Toolbar sx={{ alignItems: 'center' }} p={0}>
                {pathname === '/' && (
                    <StyledFab color='primary' aria-label='add' onClick={() => addCigarette(userData.data[viewing])}>
                        <AddIcon />
                    </StyledFab>
                )}

                <Box sx={{ width: '100%' }}>
                    <Tabs
                        aria-label='basic tabs example'
                        variant={/* matches ?  */ 'fullWidth' /*  : 'scrollable' */}
                        scrollButtons='auto'
                        centered={/* matches ?  */ true /*  : false */}
                        value={links.find(el => pathname === el.path)?.id /*  || 999 */}
                        TabIndicatorProps={{ sx: { top: 0 } }}
                    >
                        {links.map(
                            el =>
                                el.path && (
                                    <StyledTab
                                        component={NavLink}
                                        key={el.id}
                                        label={matches ? el.title : ''}
                                        id={el.id}
                                        to={el.path}
                                        icon={el.Icon(currentUser)}
                                    />
                                ),
                        )}
                    </Tabs>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
