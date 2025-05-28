import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import Landing from './Landing.jsx';
import Signup from './pages/Signup.jsx';
import Spaces from './pages/Spaces.jsx';
import Bookings from './pages/Bookings.jsx';
import Booked from './pages/Booked.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/spaces" element={<Spaces />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/booked" element={<Booked />} />
      </Routes>
    </BrowserRouter>
  )
}
