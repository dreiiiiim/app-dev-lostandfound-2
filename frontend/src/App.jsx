import { useState } from 'react'
import './App.css'

function App() {
   const [formData, setFormData] = useState({
    name: '',
    gender: '',
    studentId: '',
    faculty: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
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
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Left Section - Image */}
        <div className="md:w-1/2 bg-amber-400 flex items-center justify-center p-8">
          <div className="text-center text-white">
            <div className="w-full h-64  rounded-lg mx-auto mb-4 flex items-center justify-center overflow-hidden">
             
            </div>
            <p className="text-lg font-semibold">CampusFind</p>
            <p className="mt-2">Lost & Found Items Gallery</p>
          </div>
        </div>
        
        {/* Right Section - Registration Form */}
        <div className="md:w-1/2 p-8">
          {/* Centered Header Section */}
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold text-gray-800">UST</h1>
            <h2 className="text-xl font-semibold text-gray-700">CampusFind</h2>
            <h3 className="text-lg text-gray-600 mt-2">DID YOU LOSE SOMETHING?</h3>
            <div className="w-16 h-1 bg-amber-400 mt-2 mx-auto"></div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <h4 className="text-lg font-medium text-gray-700 mb-4 text-center">Register</h4>
              
              {/* Name Field */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
                  Name
                </label>
                <input 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  id="name" 
                  name="name"
                  type="text" 
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              {/* Gender Field */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Gender
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      className="form-radio text-blue-500" 
                      name="gender" 
                      value="male"
                      checked={formData.gender === 'male'}
                      onChange={handleChange}
                    />
                    <span className="ml-2">Male</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      className="form-radio text-blue-500" 
                      name="gender" 
                      value="female"
                      checked={formData.gender === 'female'}
                      onChange={handleChange}
                    />
                    <span className="ml-2">Female</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input 
                      type="radio" 
                      className="form-radio text-blue-500" 
                      name="gender" 
                      value="other"
                      checked={formData.gender === 'other'}
                      onChange={handleChange}
                    />
                    <span className="ml-2">Other</span>
                  </label>
                </div>
              </div>
              
              {/* Student ID Field */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="studentId">
                  Student ID
                </label>
                <input 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  id="studentId" 
                  name="studentId"
                  type="text" 
                  placeholder="Enter your student ID"
                  value={formData.studentId}
                  onChange={handleChange}
                  required
                />
              </div>
              
              {/* Faculty Field */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="faculty">
                  Faculty
                </label>
                <select 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  id="faculty"
                  name="faculty"
                  value={formData.faculty}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select your faculty</option>
                  <option value="AB">AB</option>
                  <option value="ENG">ENG</option>
                  <option value="PHARM">PHARM</option>
                  <option value="FMS">FMS</option>
                  <option value="EDUC">EDUC</option>
                  <option value="CIVIL LAW">CIVIL LAW</option>
                  <option value="CANON LAW">CANON LAW</option>
                  <option value="THEO">THEO</option>
                  <option value="PHILO">PHILO</option>
                  <option value="ARCHI">ARCHI</option>
                  <option value="CBA">CBA</option>
                  <option value="CFAD">CFAD</option>
                  <option value="CICS">CICS</option>
                  <option value="NURSING">NURSING</option>
                  <option value="CRS">CRS</option>
                  <option value="SCI">SCI</option>
                  <option value="CTHM">CTHM</option>
                  <option value="IPEA">IPEA</option>
                  <option value="IR">IR</option>
                  <option value="SHS">SHS</option>
                </select>
              </div>
              
              {/* Student Email Field */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                  Student Email
                </label>
                <input 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  id="email" 
                  name="email"
                  type="email" 
                  placeholder="Enter your student email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              {/* Username Field */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="username">
                  Username
                </label>
                <input 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  id="username" 
                  name="username"
                  type="text" 
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              
              {/* Password Field */}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                  Password
                </label>
                <input 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  id="password" 
                  name="password"
                  type="password" 
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              
              {/* Confirm Password Field */}
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  id="confirmPassword" 
                  name="confirmPassword"
                  type="password" 
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              
              {/* Sign Up Button */}
              <button 
                type="submit" 
                className="w-full bg-amber-400 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition duration-200"
              >
                Sign up
              </button>
              
              {/* Sign In Link */}
              <div className="mt-4 text-center">
                <p className="text-gray-600">
                  Already have an account? 
                  <a href="#" className="text-blue-500 font-medium hover:underline ml-1">Sign in</a>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default App
    