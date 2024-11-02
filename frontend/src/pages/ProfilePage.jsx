import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';


const ProfileSection = () => {
  const navigate = useNavigate();
  const contentRef = useRef(null);
  const [showLogoutPrompt, setShowLogoutPrompt] = useState(false);


  // Logout function to sign out of Supabase
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
    } else {
      console.log('Signed out successfully');
      navigate('/auth', { replace: true });
    }
  };


  // Function to handle change password action
  const handleChangePassword = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user && user.email) {
      const { error } = await supabase.auth.resetPasswordForEmail(user.email);
      if (error) {
        console.error('Error sending password reset email:', error.message);
        alert("Error sending password reset email. Please try again.");
      } else {
        alert("Password reset email sent! Please check your inbox.");
      }
    } else {
      alert("No user is logged in.");
    }
  };


  return (
    <div
      style={{
        backgroundImage: "url('https://media.gettyimages.com/id/1160979757/video/blur-background-of-patient-waiting-for-see-doctor-at-hospital-abstract-background.jpg?s=640x640&k=20&c=ZNeSVvwYyZvDNv8Ib4KRu2IzNwgf5la1C_n1aK8NlU0=')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px'
      }}
    >
      <div className="bg-white shadow-md rounded-lg p-6 text-center w-full max-w-md">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRijoR4acjFJu2qgEn9wonCzleuQMzZHrsXzQ&s"
          alt="Profile"
          className="rounded-full mx-auto mb-4"
        />
        <h2 className="text-xl font-bold">John Doe</h2>
        <p className="text-gray-500">Software Engineer</p>


        {/* Change Password Button */}
        <button
          onClick={handleChangePassword}
          className="flex items-center justify-center w-32 h-11 bg-blue-500 rounded-lg cursor-pointer transition-all duration-200 shadow-lg hover:bg-blue-700 mt-4 mx-auto px-2 py-1"
        >
          <span className="text-white text-sm font-semibold">Change Password</span>
        </button>


        {/* Logout Button */}
        <button
          onClick={() => setShowLogoutPrompt(true)}
          className="flex items-center justify-center w-32 h-11 bg-blue-500 rounded-lg cursor-pointer transition-all duration-200 shadow-lg hover:bg-blue-700 mt-4 mx-auto"
        >
          <svg className="w-4 h-4 mr-2" viewBox="0 0 512 512" fill="white">
            <path
              d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
            />
          </svg>
          <span className="text-white text-sm font-semibold">Logout</span>
        </button>


        {/* Logout Confirmation Prompt */}
        {showLogoutPrompt && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <p className="mb-4 text-lg font-semibold">Are you sure you want to log out?</p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Yes
                </button>
                <button
                  onClick={() => setShowLogoutPrompt(false)}
                  className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


export default ProfileSection;
