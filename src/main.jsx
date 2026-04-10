import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'
import './index.css'
import { hydrateA11yFromStorage } from './lib/accessibility.js'

hydrateA11yFromStorage()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>,
)
