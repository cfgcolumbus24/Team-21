import React from 'react';
import GraphSection from '../components/GraphSection';
import NavBar from '../components/NavBar';
// bar 
// line
// scatter 
// pie chart
const LandingPage = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50 p-8 flex flex-col">
      <NavBar />
        <div className="justify-center w-full">
          <GraphSection />
        </div>
    </div>
  );
};

export default LandingPage;
