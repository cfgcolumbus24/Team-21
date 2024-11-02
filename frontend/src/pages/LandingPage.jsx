import React from 'react';
import SearchBar from '../components/SearchBar';
import ProfileSection from '../components/ProfileSection';
import GraphSection from '../components/GraphSection';
import NavBar from '../components/NavBar';

const LandingPage = () => {
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
      <div style={{ flex: 3, margin: '10px', minWidth: '400px' }}> {/* Larger minimum width for graph */}
            <GraphSection />
        </div>
        <div style={{ flex: 1, margin: '10px', minWidth: '200px' }}> {/* Ensure minimum width */}
            <ProfileSection />
        </div>
    </div>

    <div style={{ margin: '20px 0' }}> {/* Additional margin for search bar */}
      <SearchBar />
    </div>
    </div>
    

    
  );
};

export default LandingPage;
