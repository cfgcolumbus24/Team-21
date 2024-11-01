// src/components/SearchBar.jsx
import React from 'react';

const SearchBar = () => {
  return (
    <div className="flex items-center bg-gray-100 rounded-full p-2 shadow-md max-w-md mx-auto">
      <input
        type="text"
        placeholder="Search..."
        className="bg-gray-100 outline-none w-full px-4 py-2 rounded-full text-gray-700"
      />
      <button className="text-gray-500 p-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 4a4 4 0 000 8 4 4 0 100-8zm0 8v5a5 5 0 0010 0v-5m-5 5v2m0-2a7 7 0 00-5-6.28" />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
