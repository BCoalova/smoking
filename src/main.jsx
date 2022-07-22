import React from 'react'
import ReactDOM from 'react-dom/client'
import GlobalProvider from './context/GlobalContext'
import App from './routes'
import './styles/styles.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <GlobalProvider>
            <App />
        </GlobalProvider>
    </React.StrictMode>,
)
