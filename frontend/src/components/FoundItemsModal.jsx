

import React, { useState, useEffect } from "react";
import axios from "axios";

// FIXED: Proper image imports (no more /image/ issues)
import bg2 from "../image/bg2.png";
import logo from "../image/logo.png";


export default function FoundItemsModal({ onClose, onReportFound }) {
  const [foundItems, setFoundItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchFoundItems = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/found-items");
        setFoundItems(res.data);
      } catch (err) {
        console.error("Error fetching found items:", err);
      }
    };

    fetchFoundItems();
  }, []);

  const handleItemClick = (item) => setSelectedItem(item);
  const handleCloseDetail = () => setSelectedItem(null);
  const handleReportFoundClick = () =>
    onReportFound ? onReportFound() : onClose();

  return (
    <div className="w-full min-h-screen font-sans bg-white flex flex-col">

      {/* Header */}
      <header className="w-full bg-yellow-400 shadow px-4 py-3">
        <div className="flex items-center justify-between">
          <button onClick={onClose}>
            <img src={logo} alt="CampusFind Logo" className="w-24 md:w-28" />
          </button>

          <h1 className="text-2xl font-bold text-gray-800">Found Items</h1>

          <button
            onClick={onClose}
            className="bg-amber-50 flex items-center px-5 py-1.5 rounded-full shadow hover:shadow-md"
          >
            <span className="mr-2">←</span> Back to Home
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-cover bg-center relative overflow-hidden">
        {/* FIXED Background */}
        <div
          className="absolute inset-0 brightness-20"
          style={{
            backgroundImage: `url(${bg2})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="relative z-10 flex flex-col lg:flex-row px-4 py-6 md:px-8">
          {/* Items List */}
          <div className="w-full lg:w-2/5 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-6 lg:mb-0 lg:mr-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Recently Found Items ({foundItems.length})
            </h2>

            <p className="text-gray-600 mb-3">
              Browse through items found around campus.
            </p>

            <input
              type="text"
              placeholder="Search found items..."
              className="w-full px-5 py-3 mb-4 rounded-xl border-2 border-gray-200 focus:border-yellow-400"
            />

            {/* Scroll List */}
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {foundItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedItem?.id === item.id
                      ? "border-yellow-400 bg-yellow-50"
                      : "border-gray-200 hover:border-yellow-300"
                  }`}
                >
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {item.item_name}
                      </h3>
                      <p className="text-gray-600">{item.location_found}</p>
                      <p className="text-sm text-gray-500">
                        Found on: {item.date_found}
                      </p>
                    </div>

                    <img
                      src={
                        item.image_url
                          ? `http://localhost:3001${item.image_url}`
                          : noimg
                      }
                      alt={item.item_name}
                      className="w-16 h-16 object-cover rounded-md border"
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleReportFoundClick}
              className="w-full mt-6 py-4 bg-yellow-400 rounded-xl font-bold text-lg hover:bg-yellow-500"
            >
              Report a Found Item
            </button>
          </div>

          {/* Item Details */}
          <div className="w-full lg:w-3/5 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6">
            {selectedItem ? (
              <>
                {/* Title */}
                <div className="flex justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800">
                      {selectedItem.item_name}
                    </h2>
                    <p className="text-gray-600">
                      {selectedItem.location_found} • {selectedItem.date_found}
                    </p>
                  </div>

                  <button onClick={handleCloseDetail} className="p-2">
                    ✕
                  </button>
                </div>

                {/* Image */}
                <div className="w-full h-64 bg-gray-200 rounded-xl mb-6 flex items-center justify-center">
                  <img
                    src={
                      selectedItem.image_url
                        ? `http://localhost:3001${selectedItem.image_url}`
                        : noimg
                    }
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>

                {/* Description */}
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Description
                </h3>
                <div className="bg-gray-50 p-5 rounded-xl mb-6">
                  <p className="text-gray-700 text-lg">
                    {selectedItem.description}
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                  <button className="flex-1 py-3 bg-green-500 text-white rounded-xl">
                    I Lost This Item
                  </button>
                  <button className="flex-1 py-3 bg-blue-500 text-white rounded-xl">
                    Claim Item
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center mt-20">
                <p className="text-gray-600 text-lg">
                  Select an item to view details.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* FIXED Footer */}
      {/* Footer */}
            <footer className="w-full bg-yellow-400 py-6 px-5 grid grid-cols-2 md:grid-cols-5 gap-6 text-sm">
      
              <div className="col-span-2 md:col-span-1">
                <button
                  onClick={onClose}
                  className="inline-block hover:scale-105"
                >
                  <img src={logo} alt="CampusFind Logo" className="w-32" />
                </button>
              </div>
      
              <div>
                <h3 className="font-bold text-lg mb-3">Site</h3>
                <ul className="space-y-2">
                  <li><a href="#">Lost</a></li>
                  <li><button onClick={onClose}>Report Lost</button></li>
                  <li><a href="#">Found</a></li>
                  <li><button onClick={onClose}>Report Found</button></li>
                </ul>
              </div>
      
              <div>
                <h3 className="font-bold text-lg mb-3">Help</h3>
                <ul className="space-y-2">
                  <li><a href="#">Customer Support</a></li>
                  <li><a href="#">Terms & Conditions</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                </ul>
              </div>
      
              <div>
                <h3 className="font-bold text-lg mb-3">Links</h3>
                <ul className="space-y-2">
                  <li><a href="#">LinkedIn</a></li>
                  <li><a href="#">Facebook</a></li>
                  <li><a href="#">YouTube</a></li>
                  <li><a href="#">About Us</a></li>
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
