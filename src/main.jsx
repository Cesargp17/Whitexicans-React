import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { WhitexicansBlog } from './WhitexicansBlog'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <WhitexicansBlog/>
  </BrowserRouter>
)
