// import './output.css';
import React from 'react';
import SearchBar from './components/SearchBar';
import ProfileSection from './components/ProfileSection';
import GraphSection from './components/GraphSection';
import Auth from './components/Auth';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Dashboard</h1>
      <div className="mb-6">
        <SearchBar />
      </div>
      <div className="mb-6">
        <ProfileSection />
      </div>
      <div>
        <GraphSection />
      </div>

      <div>
        <Auth />
      </div>
    </div>
  );
};

export default App;