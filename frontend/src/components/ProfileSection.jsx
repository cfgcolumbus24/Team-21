import React, { useRef } from 'react';
// Import Supabase client
import { supabase } from '../supabaseClient';

const ProfileSection = () => {
  const contentRef = useRef(null);

  // Logout function to sign out of Supabase
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
    } else {
      console.log('Signed out successfully');
    }
  };

  // Function to handle change password action
  const handleChangePassword = async () => {
    // Get the current user's email
    const { data: { user } } = await supabase.auth.getUser();
    if (user && user.email) {
      // Send password reset email
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
    <div className="bg-white shadow-md rounded-lg p-4 text-center w-full">
      <img
        src="https://cdn.inspireuplift.com/uploads/images/seller_products/30455/1702298090_GOOFYAHHnerdemoji.png"
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
        onClick={handleLogout}
        className="flex items-center justify-center w-32 h-11 bg-blue-500 rounded-lg cursor-pointer transition-all duration-200 shadow-lg hover:bg-blue-700 mt-4 mx-auto"
      >
        <svg className="w-4 h-4 mr-2" viewBox="0 0 512 512" fill="white">
          <path
            d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
          />
        </svg>
        <span className="text-white text-sm font-semibold">Logout</span>
      </button>
    </div>
  );
};

export default ProfileSection;
