// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './assets/style/main.css'
import './assets/style/main.scss'

import './i18n' 

import {RootCmp} from './RootCmp.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <RootCmp />
  // {/* </StrictMode>, */}f
)
