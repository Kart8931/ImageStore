import { useState } from 'react';
import API from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-10">
        <h2 className="text-3xl font-extrabold text-center text-slate-800 mb-6">Welcome Back</h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input type="email" className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" 
              onChange={(e) => setFormData({...formData, email: e.target.value})} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none" 
              onChange={(e) => setFormData({...formData, password: e.target.value})} required />
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white py-2.5 rounded-md font-medium hover:bg-indigo-700 transition">
            Login
          </button>
        </form>
        <div className="mt-6 text-center">
          <span className="text-gray-500">New here? </span>
          <Link to="/signup" className="text-indigo-600 font-semibold hover:text-indigo-500">Create an account</Link>
        </div>
      </div>
    </div>
  );
};
export default Login;