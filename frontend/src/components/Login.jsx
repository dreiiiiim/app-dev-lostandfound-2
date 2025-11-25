import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login submission here
    console.log('Login submitted:', formData);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Left Section - Image Placeholder */}
        <div className="md:w-1/2 bg-amber-400 flex items-center justify-center p-8">
          <div className="text-center text-white">
            <div className="w-32 h-32 bg-blue-300 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">CampusFind</h2>
            <p className="text-lg">Discover. Connect. Reclaim.</p>
          </div>
        </div>
        
        {/* Right Section - Login Form */}
        <div className="md:w-1/2 p-8">
          {/* Header Section */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800">UST</h1>
            <h2 className="text-xl font-semibold text-gray-700">CampusFind</h2>
            <h3 className="text-lg text-gray-600 mt-2">DID YOU LOSE SOMETHING?</h3>
            <div className="w-16 h-1 bg-amber-400 mt-2 mx-auto"></div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h4 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login To CampusFind</h4>
              
              {/* Username Field */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="username">
                  Username
                </label>
                <input 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400bg-amber-400" 
                  id="username" 
                  name="username"
                  type="text" 
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              
              {/* Password Field */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                  Password
                </label>
                <input 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400bg-amber-400" 
                  id="password" 
                  name="password"
                  type="password" 
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              
              {/* Sign In Button */}
              <button 
                type="submit" 
                className="w-full bg-amber-400 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 transition duration-200 text-lg"
              >
                Sign In
              </button>
              
              {/* Additional Links */}
              <div className="mt-6 space-y-4">
                <div className="text-center">
                  <button 
                    type="button" 
                    className="text-blue-500 font-medium hover:underline"
                  >
                    Sign Up
                  </button>
                </div>
                
                <div className="text-center">
                  <a href="#" className="text-gray-600 hover:text-blue-500 text-sm">
                    Forgot Password ?
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default App
