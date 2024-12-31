import { useState } from 'react'
import { Link } from 'react-router-dom';

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './routes/AppRoutes'
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <>
        <div>
          <nav>
            <ul>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/matchdays">Matchdays</Link></li>
              <li><Link to="/matchdays/1">Matchday 1</Link></li>
            </ul>
          </nav>
        </div>
        {/* Main Content Area */}
        <div>
          <AppRoutes />
        </div>
    </>
  )
}

export default App
