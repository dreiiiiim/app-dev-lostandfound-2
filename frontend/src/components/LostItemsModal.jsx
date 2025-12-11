
import React, { useState, useEffect } from "react";
import logoImg from "../image/logo.png";
import bgImg from "../image/bg2.png";

export default function LostItemsModal({ onClose, onReportLost }) {
  const [lostItems, setLostItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [foundPopup, setFoundPopup] = useState(false);
  const [claimPopup, setClaimPopup] = useState(false);

  // Fetch lost items from backend
  useEffect(() => {
    fetch("http://localhost:3001/api/lost-items")
      .then((res) => res.json())
      .then((data) => setLostItems(data))
      .catch((err) => console.error("Failed to fetch lost items:", err));
  }, []);

  const handleItemClick = (item) => setSelectedItem(item);
  const handleCloseDetail = () => setSelectedItem(null);
  const handleReportLostClick = () => (onReportLost ? onReportLost() : onClose());

  return (
    <div className="w-full min-h-screen font-sans bg-white">
      {/* Header */}
      <header className="w-full bg-yellow-400 shadow px-4 py-3">
        <div className="flex items-center justify-between">
          <button onClick={onClose}>
            <img src={logoImg} alt="CampusFind Logo" className="w-24 md:w-28" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Lost Items</h1>
          <button onClick={onClose} className="px-5 py-1.5 bg-white rounded-full shadow text-sm">
            Back to Home
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full min-h-[calc(100vh-180px)] bg-cover bg-center relative overflow-hidden">
        <div
          className="absolute inset-0 brightness-20"
          style={{ backgroundImage: `url(${bgImg})`, backgroundSize: "cover", backgroundPosition: "center" }}
        ></div>

        <div className="relative z-10 w-full h-full flex flex-col lg:flex-row px-4 py-6 md:px-8 md:py-8">
          {/* Sidebar */}
          <div className="w-full lg:w-2/5 bg-white/95 rounded-2xl shadow-xl p-6 mb-6 lg:mb-0 lg:mr-6">
            <h2 className="text-3xl font-bold mb-2">Recently Lost Items ({lostItems.length})</h2>
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 mt-6">
              {lostItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`flex justify-between items-center p-3 rounded-xl border-2 cursor-pointer transition-all hover:bg-yellow-50 hover:border-yellow-400 ${
                    selectedItem?.id === item.id ? "border-yellow-400 bg-yellow-50" : "border-gray-200"
                  }`}
                >
                  <div className="flex flex-col flex-1 pr-4">
                    <h3 className="text-lg font-bold">{item.item_name}</h3>
                    <p className="text-gray-600 text-sm">{item.location_lost}</p>
                    <p className="text-gray-500 text-xs">Lost on: {item.date_lost}</p>
                  </div>
                  {item.image_url ? (
                    <img
                      src={`http://localhost:3001${item.image_url}`}
                      alt={item.item_name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                      No Image
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={handleReportLostClick}
              className="w-full mt-6 px-6 py-4 bg-yellow-400 rounded-xl font-bold hover:bg-yellow-500 transition-colors"
            >
              Report a Lost Item
            </button>
          </div>

          {/* Detail View */}
          <div className="w-full lg:w-3/5 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6">
            {selectedItem ? (
              <>
                <div className="flex justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800">{selectedItem.item_name}</h2>
                    <p className="text-gray-600">
                      {selectedItem.location_lost} • {selectedItem.date_lost}
                    </p>
                  </div>
                  <button onClick={handleCloseDetail} className="p-2">✕</button>
                </div>

                <div className="w-full h-64 bg-gray-200 rounded-xl mb-6 flex items-center justify-center">
                  <img
                    src={selectedItem.image_url ? `http://localhost:3001${selectedItem.image_url}` : "https://via.placeholder.com/150"}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3">Description</h3>
                <div className="bg-gray-50 p-5 rounded-xl mb-6">
                  <p className="text-gray-700 text-lg">{selectedItem.description}</p>
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                  <button
                    className="flex-1 py-3 bg-green-500 text-white rounded-xl"
                    onClick={() => setFoundPopup(true)}
                  >
                    I Found This Item
                  </button>

                  <button
                    className="flex-1 py-3 bg-blue-500 text-white rounded-xl"
                    onClick={() => setClaimPopup(true)}
                  >
                    Claim Item
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center mt-20">
                <p className="text-gray-600 text-lg">Select an item to view details.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* I Found Popup */}
      {foundPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Instructions</h2>
            <p className="mb-4">
              Please bring the item to <strong>UST Main Building Admin Office</strong> for handling.
            </p>
            <button
              onClick={() => setFoundPopup(false)}
              className="px-6 py-2 bg-yellow-400 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Claim Item Popup */}
      {claimPopup && selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Claim Instructions</h2>
            <p className="mb-2">
              To claim your item, go to <strong>UST Main Building Admin Office</strong>.
            </p>
            <p className="mb-2">Opening Hours: 8:00 AM - 5:00 PM, Monday - Friday</p>
            <button
              onClick={async () => {
                try {
                  await fetch(`http://localhost:3001/api/lost-items/${selectedItem.id}`, {
                    method: "DELETE",
                  });
                  setLostItems((prev) => prev.filter((i) => i.id !== selectedItem.id));
                  setSelectedItem(null);
                  setClaimPopup(false);
                } catch (err) {
                  console.error(err);
                  alert("Failed to claim item.");
                }
              }}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg mt-4"
            >
              Confirm Claim & Remove
            </button>
            <button
              onClick={() => setClaimPopup(false)}
              className="px-6 py-2 bg-gray-200 rounded-lg mt-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full bg-yellow-400 py-6 px-5 grid grid-cols-2 md:grid-cols-5 gap-6 text-sm">
        <div className="col-span-2 md:col-span-1">
          <button onClick={onClose} className="inline-block transition-transform hover:scale-105 active:scale-95 bg-transparent border-none p-0">
            <img src={logoImg} alt="CampusFind Logo" className="w-32 md:w-max max-w-full" />
          </button>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-3">Site</h3>
          <ul className="space-y-2">
            <li><button onClick={onClose} className="block w-full text-left bg-transparent border-none p-0 transition-all duration-300 hover:text-gray-800 hover:translate-x-1">Lost</button></li>
            <li><button onClick={handleReportLostClick} className="block w-full text-left bg-transparent border-none p-0 transition-all duration-300 hover:text-gray-800 hover:translate-x-1">Report Lost</button></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-3">Help</h3>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-3">Links</h3>
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
