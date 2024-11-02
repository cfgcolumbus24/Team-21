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
      const response = await fetch('http://your-backend-url/api/search', { // Replace with your backend URL
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
    <form onSubmit={handleSearch} className="flex flex-col items-center bg-gray-100 rounded-lg shadow-md max-w-md mx-auto p-6 border border-gray-300">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Search Database</h2>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Enter your query..."
        className="bg-gray-200 outline-none w-full px-4 py-2 rounded-md text-gray-700 mb-4 border border-gray-300 focus:border-gray-500 focus:ring focus:ring-gray-300 transition duration-200"
      />
      <div className="flex justify-evenly mb-4 w-full">
        <label className="flex items-center text-gray-900">
          <input
            type="radio"
            name="format"
            value="text"
            checked={selectedFormat === 'text'}
            onChange={handleCheckboxChange}
            className="sr-only peer"
          />
          <span className={`border border-gray-300 rounded-full p-1 ${selectedFormat === 'text' ? 'bg-gray-500' : 'bg-gray-200'} hover:bg-gray-400 transition duration-150`}>
            Text
          </span>
        </label>
        <label className="flex items-center text-gray-900">
          <input
            type="radio"
            name="format"
            value="table"
            checked={selectedFormat === 'table'}
            onChange={handleCheckboxChange}
            className="sr-only peer"
          />
          <span className={`border border-gray-300 rounded-full p-1 ${selectedFormat === 'table' ? 'bg-gray-500' : 'bg-gray-200'} hover:bg-gray-400 transition duration-150`}>
            Table
          </span>
        </label>
        <label className="flex items-center text-gray-900">
          <input
            type="radio"
            name="format"
            value="graph"
            checked={selectedFormat === 'graph'}
            onChange={handleCheckboxChange}
            className="sr-only peer"
          />
          <span className={`border border-gray-300 rounded-full p-1 ${selectedFormat === 'graph' ? 'bg-gray-500' : 'bg-gray-200'} hover:bg-gray-400 transition duration-150`}>
            Graph
          </span>
        </label>
      </div>
      <button type="submit" className="w-full bg-gray-500 text-white font-semibold py-2 rounded-md hover:bg-gray-600 transition duration-200">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
