import React from 'react'
import { createRoot } from 'react-dom/client'
import { PrimeReactProvider } from 'primereact/api'

import App from './components/app/App.js'

const root = createRoot(document.getElementById('root'))
root.render(
    <PrimeReactProvider>
        <App />
    </PrimeReactProvider>
)