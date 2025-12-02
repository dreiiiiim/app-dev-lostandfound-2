import React, { useState, useEffect } from "react";
import logoImg from "../image/logo.png";
import bgImg from "../image/bg2.png";

export default function LostItemsModal({ onClose, onReportLost }) {
  const [lostItems, setLostItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    // Fetch lost items from backend
    fetch("http://localhost:3001/api/lost-items")
      .then(res => res.json())
      .then(data => setLostItems(data))
      .catch(err => console.error("Failed to fetch lost items:", err));
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseDetail = () => {
    setSelectedItem(null);
  };

  const handleReportLostClick = () => {
    if (onReportLost) {
      onReportLost();
    } else {
      onClose();
    }
  };

  return (
    <div className="w-full min-h-screen font-sans bg-white">
      {/* Header */}
      <header className="w-full bg-yellow-400 shadow px-4 py-3">
        <div className="flex items-center justify-between">
          <button 
            onClick={onClose}
            className="transition-transform hover:scale-105 active:scale-95 bg-transparent border-none p-0"
          >
            <img src={logoImg} alt="CampusFind Logo" className="w-24 md:w-28" />
          </button>

          <h1 className="text-2xl font-bold text-gray-800">Lost Items</h1>

          <button
            onClick={onClose}
            className="flex items-center justify-center px-5 py-1.5 bg-white rounded-full shadow text-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-1px] active:translate-y-[1px] active:shadow-sm active:bg-gray-50"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 mr-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full min-h-[calc(100vh-180px)] bg-cover bg-center relative overflow-hidden">
        <div className="absolute inset-0 brightness-20" 
          style={{
            backgroundImage: `url(${bgImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="relative z-10 w-full h-full flex flex-col lg:flex-row px-4 py-6 md:px-8 md:py-8">
          {/* Items List */}
          <div className="w-full lg:w-2/5 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-6 lg:mb-0 lg:mr-6">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Recently Lost Items ({lostItems.length})
              </h2>
              <p className="text-gray-600 mb-4">Browse through items reported as lost in the campus.</p>

              <input
                type="text"
                placeholder="Search lost items..."
                className="w-full px-5 py-3 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 transition-all duration-300 text-lg"
              />
            </div>

            {/* List */}
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {lostItems.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-md ${
                    selectedItem?.id === item.id 
                      ? 'border-yellow-400 bg-yellow-50' 
                      : 'border-gray-200 hover:border-yellow-300'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{item.name}</h3>
                      <p className="text-gray-600 mb-2">{item.location}</p>
                      <p className="text-sm text-gray-500">Lost on: {item.dateLost || item.date}</p>
                    </div>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-6 w-6 transition-transform duration-300 ${
                        selectedItem?.id === item.id ? 'rotate-90 text-yellow-500' : 'text-gray-400'
                      }`}
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            {/* Report Lost Button */}
            <button
              onClick={handleReportLostClick}
              className="w-full mt-6 px-6 py-4 bg-yellow-400 text-gray-800 rounded-xl font-bold text-lg transition-all duration-300 hover:bg-yellow-500 hover:shadow-lg hover:translate-y-[-2px] active:translate-y-[1px]"
            >
              Report a Lost Item
            </button>
          </div>

          {/* Item Details */}
          <div className="w-full lg:w-3/5 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6">
            {selectedItem ? (
              <>
                {/* ...item details JSX stays the same... */}
              </>
            ) : (
              <div className="text-center mt-20">
                <p className="text-gray-600 text-lg">Select an item to view details.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-yellow-400 py-6 px-5 grid grid-cols-2 md:grid-cols-5 gap-6 text-sm">
        {/* Logo */}
        <div className="col-span-2 md:col-span-1">
          <button 
            onClick={onClose}
            className="inline-block transition-transform hover:scale-105 active:scale-95 bg-transparent border-none p-0"
          >
            <img src={logoImg} alt="CampusFind Logo" className="w-32 md:w-max max-w-full" />
          </button>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3">Site</h3>
          <ul className="space-y-2">
            <li><button onClick={onClose} className="block transition-all duration-300 hover:text-gray-800 hover:translate-x-1 bg-transparent border-none p-0 text-left w-full text-start">Lost</button></li>
            <li><button onClick={handleReportLostClick} className="block transition-all duration-300 hover:text-gray-800 hover:translate-x-1 bg-transparent border-none p-0 text-left w-full text-start">Report Lost</button></li>
            <li><button onClick={onClose} className="block transition-all duration-300 hover:text-gray-800 hover:translate-x-1 bg-transparent border-none p-0 text-left w-full text-start">Found</button></li>
            <li><button onClick={onReportLost} className="block transition-all duration-300 hover:text-gray-800 hover:translate-x-1 bg-transparent border-none p-0 text-left w-full text-start">Report Found</button></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3">Help</h3>
          <ul className="space-y-2">
            {['Customer Support', 'Terms & Conditions', 'Privacy Policy'].map((item) => (
              <li key={item}><a href="#" className="block transition-all duration-300 hover:text-gray-800 hover:translate-x-1">{item}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3">Links</h3>
          <ul className="space-y-2">
            {['LinkedIn', 'Facebook', 'YouTube', 'About Us'].map((item) => (
              <li key={item}><a href="#" className="block transition-all duration-300 hover:text-gray-800 hover:translate-x-1">{item}</a></li>
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
