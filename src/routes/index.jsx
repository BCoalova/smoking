import { ThemeProvider } from '@mui/material'
import Layout from '../components/ui/Layout'
import { useGlobalContext } from '../context/GlobalContext'
import Main from '../Pages'
import { themeDark, themeLight } from '../styles/theme'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from '../Pages/Login'
import PrivateRoute from './utils'

export default function App() {
    const { isLight } = useGlobalContext()

    return (
        <ThemeProvider theme={isLight ? themeLight : themeDark}>
            <Layout>
                <Router basename='/smoking'>
                    <Routes>
                        <Route
                            path='/'
                            element={
                                <PrivateRoute>
                                    <Main />
                                </PrivateRoute>
                            }
                        />
                        <Route path='/login' element={<Login />} />
                    </Routes>
                </Router>
            </Layout>
        </ThemeProvider>
    )
}
