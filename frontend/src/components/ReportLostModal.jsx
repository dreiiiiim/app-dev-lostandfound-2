import React, { useState } from "react";
import bg2 from "../image/bg2.png";
import logo from "../image/logo.png";

export default function ReportLostModal({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    itemName: "",
    location: "",
    dateLost: "",
    description: "",
    image: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      alert("Please upload an image of the lost item.");
      return;
    }

    try {
      const submitData = new FormData();
      submitData.append("item_name", formData.itemName);
      submitData.append("location_lost", formData.location);
      submitData.append("date_lost", formData.dateLost);
      submitData.append("description", formData.description);
      submitData.append("image", formData.image);

      const response = await fetch(
        "http://localhost:3001/api/lost-items/create",
        {
          method: "POST",
          body: submitData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to submit lost item.");
        return;
      }

      alert("Lost item reported successfully!");
      onSubmit && onSubmit(data);
      onClose();
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to connect to the server.");
    }
  };

  return (
    <div className="w-full min-h-screen font-sans bg-white">
      {/* ✅ HEADER */}
      <header className="w-full bg-yellow-400 shadow px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={onClose}
            className="transition-transform hover:scale-105 active:scale-95 bg-transparent border-none p-0"
          >
            <img src={logo} alt="CampusFind Logo" className="w-24 md:w-28" />
          </button>

          <h1 className="text-2xl font-bold text-gray-800">
            Report Lost Item
          </h1>

          <button
            onClick={onClose}
            className="flex items-center justify-center px-5 py-1.5 bg-white rounded-full shadow text-sm transition-all duration-300 hover:shadow-md hover:-translate-y-[1px] active:translate-y-[1px]"
          >
            Back to Home
          </button>
        </div>
      </header>

      {/* ✅ BACKGROUND */}
      <main className="relative w-full min-h-[calc(100vh-120px)]">
        <div
          className="absolute inset-0 brightness-20"
          style={{
            backgroundImage: `url(${bg2})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* ✅ FORM CONTAINER */}
        <div className="relative z-10 w-full h-full flex items-center justify-center px-4 py-4">
          <div className="w-full max-w-6xl bg-white backdrop-blur-sm rounded-2xl shadow-2xl p-8">
            <div className="mb-6 text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Report Lost Item
              </h2>
              <p className="text-gray-600">
                Fill out the form to help recover your lost item.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Item Name */}
              <div>
                <label className="block text-gray-700 text-lg font-medium mb-2">
                  Item Name *
                </label>
                <input
                  type="text"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 text-lg"
                  placeholder="e.g., iPhone, Student ID, Wallet"
                />
              </div>

              {/* Location & Date */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 text-lg font-medium mb-2">
                    Location Lost *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-yellow-400 focus:ring-2 text-lg"
                    placeholder="e.g., Library, Cafeteria"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-lg font-medium mb-2">
                    Date Lost *
                  </label>
                  <input
                    type="date"
                    name="dateLost"
                    value={formData.dateLost}
                    onChange={handleInputChange}
                    required
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-yellow-400 focus:ring-2 text-lg"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-700 text-lg font-medium mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-yellow-400 focus:ring-2 text-lg resize-none"
                  placeholder="Provide a detailed description..."
                ></textarea>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-gray-700 text-lg font-medium mb-2">
                  Upload Image *
                </label>

                <div className="border-4 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-yellow-400 flex flex-col items-center bg-white/80">
                  <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="imageUpload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16 text-gray-400 mb-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>

                    <p className="text-gray-700 text-lg font-medium">
                      {formData.image
                        ? formData.image.name
                        : "Click to upload image"}
                    </p>

                    <p className="px-6 py-2 bg-yellow-400 text-gray-800 rounded-full text-base font-medium mt-3 hover:bg-yellow-500">
                      Choose File
                    </p>
                  </label>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 pt-6 border-t border-gray-300">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-8 py-4 bg-gray-200 text-gray-800 rounded-xl text-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-8 py-4 bg-yellow-400 text-gray-800 rounded-xl text-lg font-bold hover:bg-yellow-500"
                >
                  Report Lost Item
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* ✅ FOOTER (unchanged, same as Found) */}
    {/* Footer */}
<footer className="w-full bg-yellow-400 py-6 px-5 grid grid-cols-2 md:grid-cols-5 gap-6 text-sm">
  <div className="col-span-2 md:col-span-1">
    <button onClick={onClose} className="inline-block transition-transform hover:scale-105 active:scale-95 bg-transparent border-none p-0">
      <img src={logo} alt="CampusFind Logo" className="w-32 md:w-max max-w-full" />
    </button>
  </div>

  <div>
    <h3 className="font-bold text-lg mb-3">Site</h3>
    <ul className="space-y-2">
      <li>
        <button onClick={onClose} className="block w-full text-left bg-transparent border-none p-0 transition-all duration-300 hover:text-gray-800 hover:translate-x-1">
          Lost
        </button>
      </li>
      <li>
        <button onClick={onClose} className="block w-full text-left bg-transparent border-none p-0 transition-all duration-300 hover:text-gray-800 hover:translate-x-1">
          Report Lost
        </button>
      </li>
      <li>
        <button onClick={onClose} className="block w-full text-left bg-transparent border-none p-0 transition-all duration-300 hover:text-gray-800 hover:translate-x-1">
          Found
        </button>
      </li>
      <li>
        <button onClick={onClose} className="block w-full text-left bg-transparent border-none p-0 transition-all duration-300 hover:text-gray-800 hover:translate-x-1">
          Report Found
        </button>
      </li>
    </ul>
  </div>

  <div>
    <h3 className="font-bold text-lg mb-3">Help</h3>
    <ul className="space-y-2">
      {["Customer Support", "Terms & Conditions", "Privacy Policy"].map((item) => (
        <li key={item}>
          <a href="#" className="block transition-all duration-300 hover:text-gray-800 hover:translate-x-1">{item}</a>
        </li>
      ))}
    </ul>
  </div>

  <div>
    <h3 className="font-bold text-lg mb-3">Links</h3>
    <ul className="space-y-2">
      {["LinkedIn", "Facebook", "YouTube"].map((item) => (
        <li key={item}>
          <a href="#" className="block transition-all duration-300 hover:text-gray-800 hover:translate-x-1">{item}</a>
        </li>
      ))}
      <li>
        <button
          onClick={() => window.location.href = "/about-us"} // Link to AboutUs.jsx page
          className="block w-full text-left bg-transparent border-none p-0 transition-all duration-300 hover:text-gray-800 hover:translate-x-1"
        >
          About Us
        </button>
      </li>
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
