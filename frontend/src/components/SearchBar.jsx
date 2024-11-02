// src/components/SearchBar.jsx
import React, { useRef, useState } from 'react';
import TextResult from './subComponents/TextResult';
import TableResult from './subComponents/TableResult';
import html2pdf from 'html2pdf.js';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('');
  const [resultsHistory, setResultsHistory] = useState([]);
  const resultsRef = useRef(null); // Ref for exportable section

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setSelectedFormat(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim() === '') return;

    const newEntry = { format: selectedFormat, data: null, query };
    setResultsHistory((prevResults) => [newEntry, ...prevResults]);

    try {
      const response = await fetch('http://127.0.0.1:8000/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_query: query, format: selectedFormat }),
      });
      const data = await response.json();
      setResultsHistory((prevResults) => {
        const updatedResults = [...prevResults];
        updatedResults[0] = { ...updatedResults[0], data };
        return updatedResults;
      });
    } catch (error) {
      console.error('Error sending search query:', error);
    }
    setQuery('');
    setSelectedFormat('');
  };

  // Export to PDF with html2pdf.js
  const exportToPDF = () => {
    const element = resultsRef.current;
    html2pdf()
      .from(element)
      .set({
        margin: 1,
        filename: 'session_history.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait' },
      })
      .save();
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-100 text-gray-700 p-6">
      <div className="flex-1 overflow-auto p-8" ref={resultsRef}>
        <h2 className="text-2xl font-semibold mb-4 text-center">Database Search Interface</h2>

        <div className="bg-gray-100 rounded-lg p-6 max-w-full mx-auto text-gray-800 space-y-4 overflow-y-auto h-[75vh]">
          {resultsHistory.length === 0 && (
            <p className="text-center italic text-gray-400">Your search results will appear here...</p>
          )}
          
          {resultsHistory.map((result, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg mb-4">
              <div className="bg-gray-200 px-4 py-2 w-full rounded-t-lg text-gray-500 italic">
                User Query: "{result.query}"
              </div>
              <div className="p-4 pt-6">
                {result.data ? (
                  <>
                    {result.format === 'text' && <TextResult data={result.data} />}
                    {result.format === 'table' && <TableResult data={result.data} />}
                  </>
                ) : (
                  <p className="text-gray-400 italic">Loading result...</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls and Export Button */}
      <form onSubmit={handleSearch} className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-3xl bg-gray-100 rounded-t-lg p-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            {['text', 'table', 'graph'].map((format) => (
              <label key={format} className="flex items-center">
                <input
                  type="radio"
                  name="format"
                  value={format}
                  checked={selectedFormat === format}
                  onChange={handleCheckboxChange}
                  className="sr-only peer"
                />
                <span
                  className={`px-4 py-2 rounded-full text-sm ${
                    selectedFormat === format ? 'bg-gray-500 text-white' : 'bg-gray-300 text-gray-600'
                  } hover:bg-gray-400 transition`}
                >
                  {format.charAt(0).toUpperCase() + format.slice(1)}
                </span>
              </label>
            ))}
          </div>

          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Enter your query..."
            className="flex-grow bg-white text-gray-800 rounded-lg py-2 px-4 shadow-none transition focus:outline-none focus:ring focus:ring-gray-200"
          />

          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md" disabled={!selectedFormat}>
            Search
          </button>

          <button type="button" onClick={exportToPDF} className="bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition duration-200 shadow-md">
            Export PDF
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
