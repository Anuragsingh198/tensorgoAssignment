import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ContexProveder from '../Context/ContextProvider.jsx'
import { BrowserRouter  } from 'react-router-dom'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ContexProveder>
    <App />
    </ContexProveder>
    </BrowserRouter>
  </StrictMode>,
)
