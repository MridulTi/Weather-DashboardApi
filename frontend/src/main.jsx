import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from "@material-tailwind/react";
import { AuthProvider } from './Context/Context.jsx';
import { ErrorProvider } from './Context/ErrorContext.jsx';
createRoot(document.getElementById('root')).render(
    <ThemeProvider>
        <AuthProvider>
            <ErrorProvider>
            <App />
            </ErrorProvider>
        </AuthProvider>
    </ThemeProvider>
)
