import React from 'react';
import GraphSection from '../components/GraphSection';
import NavBar from '../components/NavBar';
import { useAuth } from '../supabaseContext';
import { Navigate } from 'react-router-dom';
// bar 
// line
// scatter 
// pie chart
const LandingPage = () => {
  const { session } = useAuth();

  if (!session) {
    return <Navigate to="/Auth" replace />;
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 p-8 flex flex-col">
        <div className="justify-center w-full">
          <GraphSection />
        </div>
    </div>
  );
};

export default LandingPage;
