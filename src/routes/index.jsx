import { ThemeProvider } from '@mui/material'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from '../components/ui/Layout'
import { useGlobalContext } from '../context/GlobalContext'
import Main from '../Pages'
import AllInfo from '../Pages/AllInfo'
import LastSmoked from '../Pages/LastSmoked'
import Login from '../Pages/Login'
import Profile from '../Pages/Profile'
import WeekSummary from '../Pages/WeekSummary'
import { themeDark, themeLight } from '../styles/theme'
import PrivateRoute from './utils'
import ExcersizeTimers from '../Pages/ExcersizeTimers'

export default function App() {
    const { isLight } = useGlobalContext()

    return (
        <ThemeProvider theme={isLight ? themeLight : themeDark}>
            <Router basename='/smoking'>
                <Layout>
                    <Routes>
                        <Route
                            path='/'
                            element={
                                <PrivateRoute>
                                    <Main />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path='/profile'
                            element={
                                <PrivateRoute>
                                    <Profile />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path='/week-summary'
                            element={
                                <PrivateRoute>
                                    <WeekSummary />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path='/history'
                            element={
                                <PrivateRoute>
                                    <AllInfo />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path='/last-smoked'
                            element={
                                <PrivateRoute>
                                    <LastSmoked />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path='/exercise-timers'
                            element={
                                <PrivateRoute>
                                    <ExcersizeTimers />
                                </PrivateRoute>
                            }
                        />
                        <Route path='/login' element={<Login />} />
                    </Routes>
                </Layout>
            </Router>
        </ThemeProvider>
    )
}
