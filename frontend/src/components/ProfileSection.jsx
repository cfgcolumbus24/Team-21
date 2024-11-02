import React, { useState, useRef } from 'react';

const ProfileSection = () => {
  // State to control dropdown visibility
  const [showInfo, setShowInfo] = useState(false);
  const contentRef = useRef(null); // Reference to the dropdown content

  // Function to toggle dropdown visibility
  const toggleInfo = () => setShowInfo(!showInfo);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 text-center w-full">
      <img
        src="https://cdn.inspireuplift.com/uploads/images/seller_products/30455/1702298090_GOOFYAHHnerdemoji.png"
        alt="Profile"
        className="rounded-full mx-auto mb-4"
      />
      <h2 className="text-xl font-bold">John Doe</h2>
      <p className="text-gray-500">Software Engineer</p>

      {/* Bio/User Info Dropdown Button */}
      <button
        onClick={toggleInfo}
        className="mt-4 mb-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
      >
        Bio / User Info
      </button>

      {/* Smooth Dropdown Content with Scrollable Area */}
      <div
        ref={contentRef}
        style={{
          height: showInfo ? contentRef.current.scrollHeight : 0,
          opacity: showInfo ? 1 : 0,
        }}
        className={`overflow-hidden transition-all duration-500 ease-in-out bg-gray-100 rounded-lg shadow-inner text-left mt-2 ${showInfo ? 'py-4 px-4' : 'p-0'}`}
      >
        <div className="max-h-32 overflow-y-auto">
          <p><strong>Company:</strong> Example Corp</p>
          <p><strong>Age:</strong> 29</p>
          <p><strong>Location:</strong> New York, USA</p>
          <p><strong>Email:</strong> johndoe@example.com</p>
          <p><strong>Additional Info:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet.</p>
          <p><strong>More Info:</strong> Curabitur convallis lacus eget tortor dictum, vel consectetur purus aliquam.</p>
        </div>
      </div>

      {/* Logout Button */}
      <button
        className="group flex items-center justify-start w-11 h-11 bg-red-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1 mt-4 mx-auto"
      >
        <div
          className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3"
        >
          <svg className="w-4 h-4" viewBox="0 0 512 512" fill="white">
            <path
              d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
            ></path>
          </svg>
        </div>
        <div
          className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
        >
          Logout
        </div>
      </button>
    </div>
  );
};

export default ProfileSection;
