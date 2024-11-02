import React from 'react';
import SearchBar from './components/SearchBar';
import ProfileSection from './components/ProfileSection';
import GraphSection from './components/GraphSection';
import Auth from './components/Auth';

const App = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50 p-8 grid grid-rows-[auto,1fr,auto] grid-cols-12 gap-4">
      {/* Header: Dashboard Title */}
      <h1 className="col-span-12 text-3xl font-bold text-center mb-6">Dashboard</h1>

      {/* Main Content Area for Profile and Graph */}
      <div className="col-span-12 grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Profile Section (On top on small screens, right-aligned on larger screens) */}
        <div className="order-1 md:order-2 col-span-1 md:col-span-4 flex justify-center md:justify-end">
          <div className="w-3/4 md:w-2/3 lg:w-1/2">
            <ProfileSection />
          </div>
        </div>

        {/* Graph Section (Below Profile on small screens, left-aligned on larger screens) */}
        <div className="order-2 md:order-1 col-span-1 md:col-span-8 flex justify-center">
          <GraphSection />
        </div>
      </div>

      {/* Bottom Area for Search Bar and Auth */}
      <div className="col-span-12 flex flex-col items-center mt-6 space-y-4">
        {/* Search Bar */}
        <SearchBar />
        {/* Auth Section (Below Search Bar) */}
        <Auth />
      </div>
    </div>
  );
};

export default App;
