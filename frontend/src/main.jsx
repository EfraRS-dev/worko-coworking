import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import Landing from './Landing.jsx'
import Bookings from './pages/Bookings.jsx'
import Spaces from './pages/Spaces.jsx'
// import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Bookings />
  </BrowserRouter>
)
