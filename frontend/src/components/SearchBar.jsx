import React, { useState } from 'react';
import TextResult from './subComponents/TextResult';
import TableResult from './subComponents/TableResult';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('');
  const [results, setResults] = useState([]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setSelectedFormat(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim() === '' || selectedFormat === '') return; // Ensure both are filled

    try {
      const response = await fetch('http://127.0.0.1:8000/query', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_query: query, format: selectedFormat }),
      });

      const data = await response.json();
      setResults(data); // Adjust based on your backend response structure
    } catch (error) {
      console.error('Error sending search query:', error);
    }

    setQuery('');
    // Note: Do not reset `setSelectedFormat('');` after a successful search
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-100 text-gray-700 p-6">
      <div className="flex-1 overflow-auto p-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Database Search Interface</h2>
        <div className="bg-gray-100 rounded-lg p-6 max-w-3xl mx-auto text-gray-800">
          {(selectedFormat === 'text' || selectedFormat ==='graph') && <TextResult data={results} />}
          {selectedFormat === 'table' && <TableResult data={results} />}
          {results.length === 0 && (
            <p className="text-center italic text-gray-400">Your search results will appear here...</p>
          )}
        </div>
      </div>

      {/* Search Input and Format Selection Area, Fixed at Bottom */}
      <form
        onSubmit={handleSearch}
        className="w-full max-w-3xl bg-gray-100 rounded-t-lg p-6 fixed bottom-0 left-1/2 transform -translate-x-1/2 flex items-center gap-4"
      >
        {/* Search Bar */}
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Enter your query..."
          className="flex-grow bg-white text-gray-800 rounded-lg py-2 px-4 shadow-none transition focus:outline-none focus:ring focus:ring-gray-200"
        />
        
        {/* Format Selection */}
        <div className="flex justify-center gap-2">
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
              <span className={`px-4 py-2 rounded-full text-sm ${selectedFormat === format ? 'bg-gray-500 text-white' : 'bg-gray-300 text-gray-600'} hover:bg-gray-400 transition`}>
                {format.charAt(0).toUpperCase() + format.slice(1)}
              </span>
            </label>
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
