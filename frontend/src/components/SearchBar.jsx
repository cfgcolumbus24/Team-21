// src/components/SearchBar.jsx
import React, { useState } from 'react';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setSelectedFormat(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim() === '') return;

    try {
      const response = await fetch('http://your-backend-url/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, format: selectedFormat }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error sending search query:', error);
    }

    setQuery('');
    setSelectedFormat('');
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-100 text-gray-700 p-6">
      {/* Main Content Area */}
      <div className="flex-1 overflow-auto p-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Database Search Interface</h2>
        {/* Placeholder for Results */}
        <div className="bg-white shadow-inner rounded-lg p-6 max-w-3xl mx-auto text-gray-800">
          {/* Imagine search results or chat history here */}
          <p className="text-center italic text-gray-400">Your search results will appear here...</p>
        </div>
      </div>

      {/* Search Input Area, Fixed at Bottom */}
      <form
        onSubmit={handleSearch}
        className="w-full max-w-3xl bg-gray-50 rounded-t-lg shadow-lg p-6 border-t border-gray-300 fixed bottom-0 left-1/2 transform -translate-x-1/2"
      >
        {/* Search Bar */}
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Enter your query..."
          className="w-full bg-white text-gray-800 rounded-lg py-2 px-4 mb-4 shadow-inner border border-gray-300 focus:border-gray-400 focus:ring focus:ring-gray-200 transition"
        />

        {/* Format Selection */}
        <div className="flex justify-center gap-4 mb-4">
          {['text', 'table', 'graph'].map((format) => (
            <label key={format} className="flex flex-col items-center">
              <input
                type="radio"
                name="format"
                value={format}
                checked={selectedFormat === format}
                onChange={handleCheckboxChange}
                className="sr-only peer"
              />
              <span
                className={`px-4 py-2 rounded-full text-sm ${selectedFormat === format ? 'bg-gray-500 text-white' : 'bg-gray-300 text-gray-600'} hover:bg-gray-400 transition`}
              >
                {format.charAt(0).toUpperCase() + format.slice(1)}
              </span>
            </label>
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
