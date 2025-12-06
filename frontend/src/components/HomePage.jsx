import React, { useState } from "react";
import ReportLostModal from "./ReportLostModal";
import ReportFoundModal from "./ReportFoundModal";
import LostItemsModal from "./LostItemsModal";
import FoundItemsModal from "./FoundItemsModal"; // Add this import
import AboutUs from "./AboutUs";

import Profile from "./Profile";
import bg2 from "../image/bg2.png";
import logo from "../image/logo.png";


export default function HomePage({ onLogout }) {
  const [showProfile, setShowProfile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showReportLost, setShowReportLost] = useState(false);
  const [showReportFound, setShowReportFound] = useState(false);
  const [showLostItems, setShowLostItems] = useState(false);
  const [showFoundItems, setShowFoundItems] = useState(false); // Add this state
  const [showAboutUs, setShowAboutUs] = useState(false);

  const openAboutUs = () => setShowAboutUs(true);
const closeAboutUs = () => setShowAboutUs(false);


  
  // State to store all lost items
  const [lostItems, setLostItems] = useState([
    // Sample lost items can go here
  ]);

  // State to store all found items
  const [foundItems, setFoundItems] = useState([
    // Sample found items can go here
  ]);

  const handleAddLostItem = (newItem) => {
    setLostItems(prevItems => [newItem, ...prevItems]);
  };

  const handleAddFoundItem = (newItem) => {
    setFoundItems(prevItems => [newItem, ...prevItems]);
  };

  const openLostItems = () => {
    setShowLostItems(true);
  };

  const closeLostItems = () => {
    setShowLostItems(false);
  };

  const openFoundItems = () => {
    setShowFoundItems(true);
  };

  const closeFoundItems = () => {
    setShowFoundItems(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openReportLost = () => {
    setShowReportLost(true);
  };

  const closeReportLost = () => {
    setShowReportLost(false);
  };

  const openReportFound = () => {
    setShowReportFound(true);
  };

  const closeReportFound = () => {
    setShowReportFound(false);
  };

  // Function to go from LostItems to ReportLost
  const goToReportLostFromLostItems = () => {
    setShowLostItems(false);
    setShowReportLost(true);
  };

  // Function to go from FoundItems to ReportFound
  const goToReportFoundFromFoundItems = () => {
    setShowFoundItems(false);
    setShowReportFound(true);
  };

  

  // Render FoundItemsModal
  if (showFoundItems) {
    return (
      <FoundItemsModal 
        onClose={closeFoundItems} 
        foundItems={foundItems}
        onReportFound={goToReportFoundFromFoundItems}
      />
    );
  }


  if (showAboutUs) {
  return <AboutUs onBack={closeAboutUs} />;
}


  if (showLostItems) {
    return (
      <LostItemsModal 
        onClose={closeLostItems} 
        lostItems={lostItems}
        onReportLost={goToReportLostFromLostItems}
      />
    );
  }

  if (showReportFound) {
    return (
      <ReportFoundModal 
        onClose={closeReportFound} 
        onSubmit={handleAddFoundItem}  // Pass the callback function
      />
    );
  }

  if (showReportLost) {
    return (
      <ReportLostModal 
        onClose={closeReportLost} 
        onSubmit={handleAddLostItem}
      />
    );
  }

  if (showProfile) {
    return <Profile onBack={() => setShowProfile(false)} />;
  }
  

  // Otherwise, show the regular homepage
  return (
    <div className="w-full min-h-screen font-sans bg-white">
      {/* Navbar */}
      <header className="w-full bg-yellow-400 shadow px-4 py-3">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <button 
            onClick={(e) => {
              e.preventDefault();
              // Already on homepage, do nothing
            }}
            className="transition-transform hover:scale-105 active:scale-95 bg-transparent border-none p-0"
          >
            <img src="/src/image/logo.png" alt="CampusFind Logo" className="w-24 md:w-28" />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {/* Navigation Links */}
            <nav className="flex items-center gap-4 lg:gap-6 xl:gap-8 text-xl font-medium">
              <a 
                href="#" 
                className="relative transition-all duration-300 hover:text-gray-800 hover:translate-y-[-2px] active:translate-y-[1px] active:text-gray-900 after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-gray-800 after:transition-all after:duration-300 hover:after:w-full"
              >
                Home
              </a>
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  openLostItems();
                }}
                className="relative transition-all duration-300 hover:text-gray-800 hover:translate-y-[-2px] active:translate-y-[1px] active:text-gray-900 after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-gray-800 after:transition-all after:duration-300 hover:after:w-full"
              >
                Lost
              </a>
              {/* Report Lost Button */}
              <button 
                onClick={openReportLost}
                className="relative transition-all duration-300 hover:text-gray-800 hover:translate-y-[-2px] active:translate-y-[1px] active:text-gray-900 after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-gray-800 after:transition-all after:duration-300 hover:after:w-full bg-transparent border-none cursor-pointer text-xl font-medium"
              >
                Report Lost
              </button>
              {/* Found Link - UPDATED */}
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  openFoundItems();
                }}
                className="relative transition-all duration-300 hover:text-gray-800 hover:translate-y-[-2px] active:translate-y-[1px] active:text-gray-900 after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-gray-800 after:transition-all after:duration-300 hover:after:w-full"
              >
                Found
              </a>
              {/* Report Found Button */}
              <button 
                onClick={openReportFound}
                className="relative transition-all duration-300 hover:text-gray-800 hover:translate-y-[-2px] active:translate-y-[1px] active:text-gray-900 after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-gray-800 after:transition-all after:duration-300 hover:after:w-full bg-transparent border-none cursor-pointer text-xl font-medium"
              >
                Report Found
              </button>
            </nav>

           
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-3">         
           
            {/* User Profile Button */}
            <a 
  href="#" 
  onClick={(e) => { e.preventDefault(); setShowProfile(true); }}
  className="flex items-center justify-center p-2 bg-white rounded-full shadow text-sm transition-all duration-300 hover:shadow-md hover:scale-110 active:scale-95 active:shadow-sm active:bg-gray-50"
  title="Profile"
>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-7 w-7 text-gray-700" 
    viewBox="0 0 20 20" 
    fill="currentColor"
  >
    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
  </svg>
</a>


            {/* Sign Out Button - Desktop Only */}
            
            <button 
              onClick={onLogout} 
              className="hidden md:flex items-center justify-center px-5 py-1.5 bg-white rounded-full shadow text-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-1px] active:translate-y-[1px] active:shadow-sm active:bg-gray-50"
            >
              Sign Out
            </button>

            {/* Hamburger Menu Button - Mobile Only */}
            <button 
              onClick={toggleMenu}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full bg-white shadow hover:shadow-md transition-shadow"
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-gray-700 mt-1.5 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`block w-6 h-0.5 bg-gray-700 mt-1.5 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu - Dropdown */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
          <div className="bg-white rounded-lg shadow-lg p-4">
            {/* Mobile Navigation Links - UPDATED */}
            <nav className="flex flex-col space-y-4">
              <a 
                href="#" 
                className="text-gray-800 text-lg font-medium py-2 px-3 rounded-lg hover:bg-yellow-100 transition-all duration-300 active:bg-yellow-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a 
                href="#" 
                className="text-gray-800 text-lg font-medium py-2 px-3 rounded-lg hover:bg-yellow-100 transition-all duration-300 active:bg-yellow-200"
                onClick={() => {
                  openLostItems();
                  setIsMenuOpen(false);
                }}
              >
                Lost
              </a>
              {/* Mobile Report Lost Button */}
              <button 
                onClick={() => {
                  openReportLost();
                  setIsMenuOpen(false);
                }}
                className="text-gray-800 text-lg font-medium py-2 px-3 rounded-lg hover:bg-yellow-100 transition-all duration-300 active:bg-yellow-200 bg-transparent border-none text-left"
              >
                Report Lost
              </button>
              {/* Mobile Found Link - UPDATED */}
              <a 
                href="#" 
                className="text-gray-800 text-lg font-medium py-2 px-3 rounded-lg hover:bg-yellow-100 transition-all duration-300 active:bg-yellow-200"
                onClick={() => {
                  openFoundItems();
                  setIsMenuOpen(false);
                }}
              >
                Found
              </a>
              {/* Mobile Report Found Button */}
              <button 
                onClick={() => {
                  openReportFound();
                  setIsMenuOpen(false);
                }}
                className="text-gray-800 text-lg font-medium py-2 px-3 rounded-lg hover:bg-yellow-100 transition-all duration-300 active:bg-yellow-200 bg-transparent border-none text-left"
              >
                Report Found
              </button>
            </nav>

            {/* Mobile Search Input */}
            <div className="mt-4">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
              />
            </div>

            {/* Mobile Sign Out Button */}
            <button 
              className="w-full mt-4 px-5 py-2.5 bg-yellow-400 rounded-full shadow text-sm font-medium transition-all duration-300 hover:bg-yellow-500 active:bg-yellow-600"
              onClick={() => {
              onLogout();       // log out
              setIsMenuOpen(false); // close menu
            }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full h-[70vh] bg-cover bg-center relative overflow-hidden">
        <div className="absolute inset-0 brightness-30" style={{
  backgroundImage: `url(${bg2})`,
  backgroundSize: "cover",
  backgroundPosition: "center"
}}
></div>
        <div className="relative z-10 flex flex-col justify-center h-full px-4 md:px-24">
          <div className="space-y-2">
            <h1 className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight drop-shadow-lg transform transition-all duration-1000 delay-300 opacity-0 animate-slideInLeft">
              Find &
            </h1>
            <h1 className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight drop-shadow-lg transform transition-all duration-1000 delay-500 opacity-0 animate-slideInRight">
              Recover
            </h1>
            <div className="transform transition-all duration-1000 delay-700 opacity-0 animate-fadeInUp">
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold mt-2">
                <span className="text-yellow-300 animate-colorPulse">With</span>{" "}
                <span className="text-yellow-200 animate-colorPulse delay-200">Ease</span>
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - UPDATED Found link */}
      <footer className="w-full bg-yellow-400 py-6 px-5 grid grid-cols-2 md:grid-cols-5 gap-6 text-sm">
        {/* Logo - spans both columns on xs */}
        <div className="col-span-2 md:col-span-1">
          <button 
            onClick={(e) => {
              e.preventDefault();
              // Already on homepage, do nothing
            }}
            className="inline-block transition-transform hover:scale-105 active:scale-95 bg-transparent border-none p-0"
          >
            <img src="/src/image/logo.png" alt="CampusFind Logo" className="w-32 md:w-max max-w-full" />
          </button>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3">Site</h3>
          <ul className="space-y-2">
            <li>
              <button 
                onClick={openLostItems}
                className="block transition-all duration-300 hover:text-gray-800 hover:translate-x-1 bg-transparent border-none p-0 text-left w-full text-start"
              >
                Lost
              </button>
            </li>
            <li>
              <button 
                onClick={openReportLost} 
                className="block transition-all duration-300 hover:text-gray-800 hover:translate-x-1 bg-transparent border-none p-0 text-left w-full text-start"
              >
                Report Lost
              </button>
            </li>
            <li>
              <button 
                onClick={openFoundItems}
                className="block transition-all duration-300 hover:text-gray-800 hover:translate-x-1 bg-transparent border-none p-0 text-left w-full text-start"
              >
                Found
              </button>
            </li>
            <li>
              <button 
                onClick={openReportFound} 
                className="block transition-all duration-300 hover:text-gray-800 hover:translate-x-1 bg-transparent border-none p-0 text-left w-full text-start"
              >
                Report Found
              </button>
            </li>
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

        {/* <div>
          <h3 className="font-bold text-lg mb-3">Links</h3>
          <ul className="space-y-2">
            {['LinkedIn', 'Facebook', 'YouTube', 'About Us'].map((item) => (
              <li key={item}><a href="#" className="block transition-all duration-300 hover:text-gray-800 hover:translate-x-1">{item}</a></li>
            ))}
          </ul>
        </div> */}

        <div>
  <h3 className="font-bold text-lg mb-3">Links</h3>
  <ul className="space-y-2">
    {["LinkedIn", "Facebook", "YouTube", "About Us"].map((item) => (
      <li key={item}>
       {item === "About Us" ? (
  <button
    onClick={openAboutUs}
    className="block w-full text-left transition-all duration-300 hover:text-gray-800 hover:translate-x-1"
  >
    {item}
  </button>
) : (

          <a
            href="#"
            className="block transition-all duration-300 hover:text-gray-800 hover:translate-x-1"
          >
            {item}
          </a>
        )}
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