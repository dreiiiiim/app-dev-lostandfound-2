import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import RegisterPage from './components/Register';
import HomePage from './components/HomePage';


const leftBg = new URL('./image/bg1.png', import.meta.url).href;
const image5 = new URL('./image/image 5.png', import.meta.url).href;
const logoImage = new URL('./image/logo.png', import.meta.url).href;

function LoginPage({ onSignUpClick, onSignInSuccess }) {
  const [showPassword, setShowPassword] = useState(false);
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!studentId || !password) {
      alert("Please enter your Student ID and password");
      return;
    }

    try {
      console.log("Login attempt:", studentId, password);
      const res = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ student_id: studentId, password })
      });

      const data = await res.json();
      console.log("Login response:", data);

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        onSignInSuccess();
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Check console.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 bg-yellow-400 flex flex-col items-center justify-center p-6 relative order-2 lg:order-1">
        <img src={leftBg} alt="left" className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none" />
        <div className="relative z-10 w-full max-w-xs sm:max-w-sm md:max-w-md text-center">
          <div className="flex flex-col items-center mb-6">
            <img src={logoImage} alt="CampusFind Logo" className="w-24 h-24 object-contain" />
            <div className="text-3xl font-extrabold text-gray-800">CampusFind</div>
            <div className="text-xs text-gray-700">Discover. Connect. Reclaim.</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="font-bold text-black text-xl mb-4 text-center">Login To CampusFind</h3>
            <form onSubmit={submit} className="space-y-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Student ID</label>
                <input
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg bg-gray-200 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-yellow-400"
                  placeholder="YYYYXXXXXX (e.g., 2024123456)"
                  pattern="[0-9]{10}"
                  title="Format: YYYYXXXXXX (e.g., 2024123456)"
                  required
                />
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Password</label>
                <div className="relative">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? 'text' : 'password'}
                    className="w-full px-3 py-2 text-sm rounded-lg bg-gray-200 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-yellow-400"
                    placeholder="Password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button type="submit" className="w-full sm:flex-1 bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-700 hover:scale-105 transition-transform">
                  Sign In
                </button>
                <button type="button" onClick={onSignUpClick} className="w-full sm:flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 hover:scale-105 transition-transform">
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 relative h-64 sm:h-80 md:h-96 lg:h-auto order-1 lg:order-2">
        <div className="absolute inset-0 bg-center bg-cover z-0" style={{ backgroundImage: `url(${image5})` }} />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-8 py-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-yellow-400">
            UST<br className="hidden sm:block" />CampusFind
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mt-4">
            DID YOU LOSE SOMETHING?
          </h2>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('login'); // 'login', 'register', 'homepage'

  const handleSignInSuccess = () => setCurrentPage('homepage');
  const handleSignUpSuccess = (token, user) => setCurrentPage('homepage');

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentPage('login');
  };

  return (
    <>
      {currentPage === 'login' && (
        <LoginPage
          onSignUpClick={() => setCurrentPage('register')}
          onSignInSuccess={handleSignInSuccess}
        />
      )}
      {currentPage === 'register' && (
        <RegisterPage
          onBackToLogin={() => setCurrentPage('login')}
          onSignUpSuccess={handleSignUpSuccess}
        />
      )}
      {currentPage === 'homepage' && <HomePage onLogout={handleLogout} />}
    </>
  );
}
