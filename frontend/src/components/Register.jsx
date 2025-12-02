
                   

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const image5 = new URL('../image/image 5.png', import.meta.url).href;
const logoImage = new URL('../image/logo.png', import.meta.url).href;

export default function RegisterPage({ onBackToLogin, onSignUpSuccess }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    gender: "Other",
    student_id: "",
    faculty: "Other",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const studentIdRegex = /^\d{4}\d{6}$/; // 4 digits year + 6 digits
  if (!studentIdRegex.test(formData.student_id)) {
    alert("Student ID must be in the format YYYYXXXXXX");
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const res = await fetch("http://localhost:3001/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    console.log("Response:", data);

    alert(data.message);
    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      onSignUpSuccess(data.token, data.user);
    }
  } catch (err) {
    console.error(err);
    alert("Registration failed. Check console for details.");
  }
};


  return (
    <div className="min-h-screen flex flex-col lg:flex-row">

      {/* LEFT SIDE - FORM */}
      <div className="w-full lg:w-1/2 bg-yellow-400 flex flex-col items-center justify-center p-6 relative order-2 lg:order-1">
        <div className="relative z-10 w-full max-w-xs sm:max-w-sm md:max-w-md text-center">
          <div className="flex flex-col items-center mb-4 sm:mb-6">
            <div className="">
              <img src={logoImage} alt="CampusFind Logo" className="w-full h-full object-contain" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-gray-800">CampusFind</div>
            <div className="text-xs sm:text-sm text-gray-700">Discover. Connect. Reclaim.</div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md">
            <h3 className="font-bold text-black text-lg sm:text-xl mb-3 sm:mb-4 text-center">Register to CampusFind</h3>
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              {/* Name & Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1">Name</label>
                  <input 
                    name="name"
                    onChange={handleChange}
                    type="text"
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg bg-gray-200 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium mb-1">Gender</label>
                  <select
                    name="gender"
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg bg-gray-200 focus:bg-white focus:ring-2 focus:ring-yellow-400"
                  >
                    <option value="Other">Other</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Rather Not Say">Rather Not Say</option>
                  </select>
                </div>
              </div>

              {/* Student ID */}
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1">Student ID</label>
                <input
                  name="student_id"
                  onChange={handleChange}
                  type="text"
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg bg-gray-200 focus:bg-white focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              {/* Faculty */}
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1">Faculty</label>
                <select
                  name="faculty"
                  value={formData.faculty}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg bg-gray-200 focus:bg-white focus:ring-2 focus:ring-yellow-400"
                >
                  <option value="Other">Other</option>
                  <option value="AMV - College Of Accountancy">AMV - College Of Accountancy</option>
                  <option value="College of Architecture">College of Architecture</option>
                  <option value="Faculty of Arts and Letters">Faculty of Arts and Letters</option>
                  <option value="Faculty of Civil Law">Faculty of Civil Law</option>
                  <option value="College of Commerce and Business Administration">College of Commerce and Business Administration</option>
                  <option value="College of Education">College of Education</option>
                  <option value="Faculty of Engineering">Faculty of Engineering</option>
                  <option value="College of Fine Arts and Design">College of Fine Arts and Design</option>
                  <option value="Graduate School">Graduate School</option>
                  <option value="Graduate School of Law">Graduate School of Law</option>
                  <option value="College of Information and Computing Sciences">College of Information and Computing Sciences</option>
                  <option value="Faculty of Medicine and Surgery">Faculty of Medicine and Surgery</option>
                  <option value="Conservatory of Music">Conservatory of Music</option>
                  <option value="College of Nursing">College of Nursing</option>
                  <option value="Faculty of Pharmacy">Faculty of Pharmacy</option>
                  <option value="Institute of Physical Education and Athletics">Institute of Physical Education and Athletics</option>
                  <option value="College of Rehabilitation Sciences">College of Rehabilitation Sciences</option>
                  <option value="College of Science">College of Science</option>
                  <option value="College of Tourism and Hospitality Management">College of Tourism and Hospitality Management</option>
                  <option value="Faculty of Canon Law">Faculty of Canon Law</option>
                  <option value="Faculty of Philosophy">Faculty of Philosophy</option>
                  <option value="Faculty of Sacred Theology">Faculty of Sacred Theology</option>
                  <option value="Senior High School">Senior High School</option>
                  <option value="Junior High School">Junior High School</option>
                  <option value="Education High School">Education High School</option>
                </select>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs sm:text-sm font-medium mb-1">Email</label>
                <input
                  name="email"
                  onChange={handleChange}
                  type="email"
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg bg-gray-200 focus:bg-white focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              {/* Password & Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative">
                  <label className="block text-xs sm:text-sm font-medium mb-1">Password</label>
                  <input
                    name="password"
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg bg-gray-200 focus:bg-white focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                <div className="relative">
                  <label className="block text-xs sm:text-sm font-medium mb-1">Confirm Password</label>
                  <input
                    name="confirmPassword"
                    onChange={handleChange}
                    type={showConfirmPassword ? "text" : "password"}
                    className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg bg-gray-200 focus:bg-white focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
              </div>

              <button type="submit" className="w-full bg-gray-900 text-white py-2 text-sm sm:text-base rounded-lg hover:bg-gray-700 hover:scale-105 transition-transform duration-200 ease-in-out">
                Sign Up
              </button>

              <div className="text-center text-xs sm:text-sm mt-2">
                <span className="text-gray-700">Already have an account? </span>
                <button type="button" onClick={onBackToLogin} className="text-gray-900 font-semibold hover:underline">
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - HERO IMAGE */}
      <div className="w-full lg:w-1/2 relative h-64 sm:h-80 md:h-96 lg:h-auto order-1 lg:order-2">
        <div
          className="absolute inset-0 bg-center bg-cover z-0"
          style={{ backgroundImage: `url(${image5})` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 lg:px-12 py-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-yellow-400">
            UST<br className="hidden sm:block" />CampusFind
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mt-4 sm:mt-6">
            DID YOU LOSE SOMETHING?
          </h2>
        </div>
      </div>
    </div>
  );
}
