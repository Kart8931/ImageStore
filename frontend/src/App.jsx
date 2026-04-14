import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'; // Naya import

function App() {
  return (
    <Router>
      <Routes>
        {/* Agar user '/' par aaye toh Signup par bhejo */}
        <Route path="/" element={<Navigate to="/signup" />} />
        
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
        {/* Dashboard page jise humne functional banaya hai */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;