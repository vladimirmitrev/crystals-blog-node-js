// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';

ReactDOM.createRoot(document.getElementById('root')).render(
    <ErrorBoundary>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ErrorBoundary>
)
