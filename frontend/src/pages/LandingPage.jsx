import React from 'react';
import SearchBar from '../components/SearchBar';
import ProfileSection from '../components/ProfileSection';
import GraphSection from '../components/GraphSection';

const LandingPage = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50 p-8 flex flex-col gap-6">
      {/* Header: Dashboard Title */}
      <h1 className="text-3xl font-bold text-center mb-6">Dashboard</h1>

      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row gap-4 items-start">
        {/* Profile Section (On top on all screen sizes, right-aligned on larger screens) */}
        <div className="order-1 md:order-2 flex justify-center md:justify-end w-full md:w-1/3">
          <div className="w-3/4 md:w-2/3 lg:w-1/2">
            <ProfileSection />
          </div>
        </div>

        {/* Graph Section (Below Profile on smaller screens, left-aligned on larger screens) */}
        <div className="order-2 md:order-1 flex justify-center w-full md:w-2/3">
          <GraphSection />
        </div>
      </div>

      {/* Bottom Area for Search Bar and Auth */}
      <div className="flex flex-col items-center gap-4 mt-6">
        {/* Search Bar */}
        <SearchBar />
      </div>
    </div>
  );
};

export default LandingPage;
