import React, { useEffect, useState } from "react";
import bg2 from "../image/bg2.png";
import logo from "../image/logo.png";

export default function Profile({ onBack }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const userData = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");
      if (!userData || !token) return;

      try {
        const res = await fetch(`http://localhost:3001/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  if (!user)
    return <div className="text-center mt-20 text-gray-300">Loading profile...</div>;

  return (
    <div className="w-full min-h-screen font-sans bg-white relative overflow-hidden flex flex-col">
      {/* Darkened Background */}
      <div
        className="absolute inset-0 brightness-30"
        style={{
          backgroundImage: `url(${bg2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 flex-1">
        {/* Header */}
        <header className="w-full bg-yellow-400 shadow px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="transition-transform hover:scale-105 active:scale-95 bg-transparent border-none p-0"
            >
              <img src={logo} alt="CampusFind Logo" className="w-24 md:w-28" />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
            <button
              onClick={onBack}
              className="flex items-center justify-center px-5 py-1.5 bg-white rounded-full shadow text-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-1px] active:translate-y-[1px] active:shadow-sm active:bg-gray-50"
            >
              Back
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="w-full flex-1 flex flex-col justify-center items-center px-4 py-6 md:px-8 md:py-8">
          <div className="w-full md:w-2/5 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">User Profile</h2>
            <div className="space-y-3 text-gray-700 text-lg">
              <div><strong className="text-gray-500">Name:</strong> {user.name}</div>
              <div><strong className="text-gray-500">Student ID:</strong> {user.student_id}</div>
              <div><strong className="text-gray-500">Email:</strong> {user.email}</div>
              <div><strong className="text-gray-500">Faculty:</strong> {user.faculty}</div>
              <div><strong className="text-gray-500">Gender:</strong> {user.gender}</div>
              <div><strong className="text-gray-500">Role:</strong> {user.role}</div>
            </div>
            <button
              onClick={onBack}
              className="w-full mt-4 px-6 py-3 bg-yellow-400 text-gray-800 rounded-xl font-bold text-lg transition-all duration-300 hover:bg-yellow-500 hover:shadow-lg"
            >
              Back
            </button>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="w-full bg-yellow-400 py-6 px-5 grid grid-cols-2 md:grid-cols-5 gap-6 text-sm">
        <div className="col-span-2 md:col-span-1">
          <button
            onClick={onBack}
            className="inline-block transition-transform hover:scale-105 active:scale-95 bg-transparent border-none p-0"
          >
            <img src={logo} alt="CampusFind Logo" className="w-32 md:w-max max-w-full" />
          </button>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3">Site</h3>
          <ul className="space-y-2">
            <li>
              <button
                onClick={onBack}
                className="block transition-all duration-300 hover:text-gray-800 hover:translate-x-1 bg-transparent border-none p-0 text-left w-full text-start"
              >
                Home
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3">Help</h3>
          <ul className="space-y-2">
            {["Customer Support", "Terms & Conditions", "Privacy Policy"].map((item) => (
              <li key={item}>
                <a href="#" className="block transition-all duration-300 hover:text-gray-800 hover:translate-x-1">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3">Links</h3>
          <ul className="space-y-2">
            {["LinkedIn", "Facebook", "YouTube", "About Us"].map((item) => (
              <li key={item}>
                <a href="#" className="block transition-all duration-300 hover:text-gray-800 hover:translate-x-1">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3">Contact</h3>
          <p>Tel: +63 9171842885</p>
          <p>Email: 1611campusfind@gmail.com</p>
        </div>
      </footer>
    </div>
  );
}
