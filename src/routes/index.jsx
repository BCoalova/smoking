import { ThemeProvider } from '@mui/material'
import Layout from '../components/ui/Layout'
import { useGlobalContext } from '../context/GlobalContext'
import Main from '../Pages'
import { themeDark, themeLight } from '../styles/theme'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from '../Pages/Login'
import PrivateRoute from './utils'
import WeekSummary from '../Pages/WeekSummary'
import Profile from '../Pages/Profile'

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
                        <Route path='/login' element={<Login />} />
                    </Routes>
                </Layout>
            </Router>
        </ThemeProvider>
    )
}
