
// import React from "react";

// export default function AboutUs({ onClose }) {
//   return (
//     <div 
//       className="w-full min-h-screen font-sans bg-cover bg-center bg-no-repeat relative"
//       style={{ backgroundImage: `url('src/image/bg2.png')` }} // SAME BACKGROUND AS FOUND ITEMS
//     >

//       {/* White Blur Overlay for readability */}
//       <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>

//       {/* All UI content goes ABOVE overlay */}
//       <div className="relative z-10">

//         {/* Header */}
//         <header className="w-full bg-yellow-400 shadow px-4 py-3">
//           <div className="flex items-center justify-between">
//             <button 
//               onClick={onClose}
//               className="transition-transform hover:scale-105 active:scale-95 bg-transparent border-none p-0"
//             >
//               <img src="src/image/logo.png" alt="CampusFind Logo" className="w-24 md:w-28" />
//             </button>

//             <h1 className="text-2xl font-bold text-gray-800">About Us</h1>

//             <button
//               onClick={onClose}
//               className="flex items-center justify-center px-5 py-1.5 bg-white rounded-full shadow text-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-1px] active:translate-y-[1px] active:shadow-sm active:bg-gray-50"
//             >
//               <svg 
//                 xmlns="http://www.w3.org/2000/svg" 
//                 className="h-5 w-5 mr-2" 
//                 fill="none" 
//                 viewBox="0 0 24 24" 
//                 stroke="currentColor"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//               </svg>
//               Back to Home
//             </button>
//           </div>
//         </header>

//         {/* Main Content */}
//         <main className="w-full py-12 px-4 md:px-8 lg:px-16 bg-gray-50/40 rounded-lg">
//           <div className="max-w-6xl mx-auto">

//             {/* Page Header */}
//             <div className="text-center mb-12">
//               <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">About CampusFind</h1>
//               <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//                 Your digital solution for managing lost and found items within the school community
//               </p>
//               <div className="w-24 h-1 bg-yellow-400 mx-auto mt-6"></div>
//             </div>

//             {/* Project Overview */}
//             <section className="mb-16 bg-white rounded-2xl shadow-lg p-8 md:p-10">
//               <h2 className="text-3xl font-bold text-gray-800 mb-6">Project Overview</h2>
//               <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
//                 <p>
//                   The <strong>Online Lost and Found Management System</strong> is a web-based platform designed to help 
//                   students, teachers, and staff easily report and recover lost or found items within the school campus.
//                 </p>
//                 <p>
//                   It provides a centralized space where users can post items, upload photos, track reports, and 
//                   claim lost belongings — reducing time and confusion through digital reporting.
//                 </p>
//               </div>
//             </section>

//             {/* Dev Team */}
//             <section className="mb-16">
//               <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Development Team</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {[
//                   { name: "Mark Joseph Arambulo" },
//                   { name: "Nelson James Casambros" },
//                   { name: "Jian Rovic Reyes" },
//                   { name: "Andrei Montaniel" },
//                   { name: "Jherome Ocampo" },
//                   { name: "Jairus Valenton" },
//                 ].map((member, index) => (
//                   <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
//                     <div className="w-20 h-20 bg-yellow-100 rounded-full mx-auto mb-4 flex items-center justify-center">
//                       <span className="text-2xl font-bold text-yellow-600">
//                         {member.name.split(' ').map(n => n[0]).join('')}
//                       </span>
//                     </div>
//                     <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
//                   </div>
//                 ))}
//               </div>
//             </section>

//             {/* Mission */}
//             <section className="bg-yellow-400 rounded-2xl shadow-lg p-10 text-center">
//               <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
//               <p className="text-gray-800 text-xl italic max-w-3xl mx-auto">
//                 "To strengthen campus unity by making lost and found recovery fast, accessible, and organized."
//               </p>
//             </section>
//           </div>
//         </main>

//         {/* Footer */}
//         <footer className="w-full bg-yellow-400 py-6 px-5 grid grid-cols-2 md:grid-cols-5 gap-6 text-sm">
//           <div className="col-span-2 md:col-span-1">
//             <button onClick={onClose} className="transition-transform hover:scale-105">
//               <img src="src/image/logo.png" className="w-32" />
//             </button>
//           </div>

//           <div>
//             <h3 className="font-bold text-lg mb-3">Site</h3>
//             <ul className="space-y-2">
//               <li><a className="hover:text-gray-800">Lost</a></li>
//               <li><button onClick={onClose} className="hover:text-gray-800">Report Lost</button></li>
//               <li><a className="hover:text-gray-800">Found</a></li>
//               <li><button onClick={onClose} className="hover:text-gray-800">Report Found</button></li>
//             </ul>
//           </div>

//           <div>
//             <h3 className="font-bold text-lg mb-3">Help</h3>
//             <ul className="space-y-2">
//               {["Customer Support", "Terms & Conditions", "Privacy Policy"].map((t) => (
//                 <li key={t}><a className="hover:text-gray-800">{t}</a></li>
//               ))}
//             </ul>
//           </div>

//           <div>
//             <h3 className="font-bold text-lg mb-3">Links</h3>
//             <ul className="space-y-2">
//               {["LinkedIn", "Facebook", "YouTube", "About Us"].map((l) => (
//                 <li key={l}><a className="hover:text-gray-800">{l}</a></li>
//               ))}
//             </ul>
//           </div>

//           <div>
//             <h3 className="font-bold text-lg mb-3">Contact</h3>
//             <p>Tel: +63 9171842885</p>
//             <p>Email: 1611campusfind@gmail.com</p>
//           </div>
//         </footer>

//       </div>
//     </div>
//   );
// }


import React from "react";
import bg2 from "../image/bg2.png"; // SAME IMPORT STYLE AS HOMEPAGE

export default function AboutUs({ onBack }) {
  return (
    <div 
      className="w-full min-h-screen font-sans relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bg2})` }}  // SAME BACKGROUND AS HOMEPAGE
    >

      {/* SAME OVERLAY EFFECT AS HOME */}
      <div className="absolute inset-0 brightness-30 backdrop-blur-sm"></div>

      <div className="relative z-10">

        {/* ================= HEADER ================= */}
        <header className="w-full bg-yellow-400 shadow px-4 py-3">
          <div className="flex items-center justify-between">

            {/* Logo Back to Home */}
            <button 
              onClick={onBack}
              className="transition-transform hover:scale-105 active:scale-95 bg-transparent border-none p-0"
            >
              <img src="/src/image/logo.png" alt="CampusFind Logo" className="w-24 md:w-28" />
            </button>

            <h1 className="text-2xl font-bold text-gray-800">About Us</h1>

            <button
              onClick={onBack}
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

        {/* ================= MAIN CONTENT ================= */}
        <main className="w-full py-12 px-4 md:px-8 lg:px-16 bg-gray-50/40 rounded-lg">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-black-800 mb-4">About CampusFind</h1>
              <p className="text-lg text-black-600 max-w-3xl mx-auto">
                Your digital solution for managing lost and found items within the school community
              </p>
              <div className="w-24 h-1 bg-yellow-400 mx-auto mt-6"></div>
            </div>

            <section className="mb-16 bg-white rounded-2xl shadow-lg p-8 md:p-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Project Overview</h2>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p>The <strong>Online Lost and Found Management System</strong> helps students recover missing items faster.</p>
                <p>Users can post reports, attach evidence, track status & claim belongings easily.</p>
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Development Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  "Mark Joseph Arambulo",
                  "Nelson James Casambros",
                  "Jian Rovic Reyes",
                  "Andrei Montaniel",
                  "Jherome Ocampo",
                  "Jairus Valenton",
                ].map((name,i)=>(
                  <div key={i} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
                    <div className="w-20 h-20 bg-yellow-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl font-bold text-yellow-600">
                        {name.split(' ').map(n=>n[0]).join('')}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-yellow-400 rounded-2xl shadow-lg p-10 text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
              <p className="text-gray-800 text-xl italic max-w-3xl mx-auto">
                "To reunite people with their belongings — faster, easier, smarter."
              </p>
            </section>

          </div>
        </main>

        {/* ================= FOOTER ================= */}
        <footer className="w-full bg-yellow-400 py-6 px-5 grid grid-cols-2 md:grid-cols-5 gap-6 text-sm">
          <div className="col-span-2 md:col-span-1">
            <button onClick={onBack} className="transition-transform hover:scale-105">
              <img src="/src/image/logo.png" className="w-32" />
            </button>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-3">Site</h3>
            <ul className="space-y-2">
              <li><a>Lost</a></li>
              <li><button onClick={onBack}>Report Lost</button></li>
              <li><a>Found</a></li>
              <li><button onClick={onBack}>Report Found</button></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-3">Help</h3>
            <ul className="space-y-2">
              {["Customer Support","Terms & Conditions","Privacy Policy"].map(t=>(
                <li key={t}><a>{t}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-3">Links</h3>
            <ul className="space-y-2">
              {["LinkedIn","Facebook","YouTube","About Us"].map(l=>(
                <li key={l}><a>{l}</a></li>
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
    </div>
  );
}
