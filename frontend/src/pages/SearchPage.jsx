import React from 'react';
import SearchBar from '../components/SearchBar';
import NavBar from '../components/NavBar';

const SearchPage = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50 p-8 flex flex-col gap-6">
      <div className="flex flex-col items-center gap-4 mt-6">
        {/* Search Bar */}
        <SearchBar />
      </div>
    </div>
  );
};

export default SearchPage;
