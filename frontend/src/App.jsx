import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import Landing from './Landing.jsx';

export default function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/landing" element={<Landing />} />
      </Routes>
    )
}
