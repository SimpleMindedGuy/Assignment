import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Provider } from 'react-redux'
import {store} from "./State/Store.js"

import Home from './Pages/Home.jsx'
import Profile from './Pages/Profile.jsx'
import Settings from './Pages/Settings.jsx'
import { BrowserRouter, Routes ,Route } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store} >
      <BrowserRouter>
        <App></App>
        <Routes>
            
            <Route path="/" element={<Home></Home>} />
            <Route path="/home" element={<Home></Home>} />
            <Route path="/profile" element={<Profile></Profile>} />
            <Route path="/settings" element={<Settings></Settings>} />
        </Routes>
      </BrowserRouter>

    </Provider>
  </React.StrictMode>,
)
