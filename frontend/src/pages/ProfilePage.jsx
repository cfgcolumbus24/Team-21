import React from 'react';
import ProfileSection from '../components/ProfileSection';
import NavBar from '../components/NavBar';

const LandingPage = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50 p-8 flex flex-col gap-6">
        <NavBar />
      {/* Header: Dashboard Title */}
     
        <div className="order-1 md:order-2 flex justify-center md:justify-end w-full md:w-1/3">
          <div className="w-3/4 md:w-2/3 lg:w-1/2">
            <ProfileSection />
          </div>
        </div>

        
      </div>
    
  );
};

export default LandingPage;
