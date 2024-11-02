import React from 'react';
import SearchBar from '../components/SearchBar';
import NavBar from '../components/NavBar';
import { useAuth } from '../supabaseContext';
import { Navigate } from 'react-router-dom';

const SearchPage = () => {
  const { session } = useAuth();

  if (!session) {
    return <Navigate to="/Auth" replace />;
  }

  return (
    <div className="min-h-screen w-full bg-gray-100 p-8 flex flex-col gap-6">
            <div className="flex flex-col items-center gap-4 mt-6">
        {/* Search Bar */}
        <SearchBar />
      </div>
    </div>
  );
};

export default SearchPage;
