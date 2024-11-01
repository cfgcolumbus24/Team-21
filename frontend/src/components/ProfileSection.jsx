// src/components/ProfileSection.jsx
import React from 'react';

const ProfileSection = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 text-center max-w-sm mx-auto">
      <img
        src="https://via.placeholder.com/100"
        alt="Profile"
        className="rounded-full mx-auto mb-4"
      />
      <h2 className="text-xl font-bold">John Doe</h2>
      <p className="text-gray-500">Software Engineer</p>
    </div>
  );
};

export default ProfileSection;
