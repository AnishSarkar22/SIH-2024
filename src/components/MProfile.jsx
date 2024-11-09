import React, { useState, useRef } from 'react';
import MSidebar from './MSidebar';
import MHeader from './MHeader';
import MNavbar from './MNavbar';

function MProfile() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode === "enabled";
  });

  const [sidebarShrink, setSidebarShrink] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "Jane",
    lastName: "Doe",
    email: "abc2024@gmail.com",
    location: "India",
    profession: "Software Developer",
    hobbies: "games,music,dance",
    linkedIn: "https://linkedin.com/username",
    twitter: "https://x.com/username",
    github: "https://github.com/username"
  });
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null); // Ref for the file input

  const toggleSidebar = () => {
    setSidebarShrink(!sidebarShrink);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode ? "enabled" : "disabled");
  };

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input dialog
  const handleProfilePictureClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input dialog
    }
  };

  return (
    <div className={`flex h-screen bg-white dark:bg-gray-900 ${darkMode ? "dark" : ""}`}>
      <MSidebar
        sidebarShrink={sidebarShrink}
        isDarkMode={darkMode}
        toggleSidebar={toggleSidebar}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <MHeader
          toggleSidebar={toggleSidebar}
          sidebarShrink={sidebarShrink}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <MNavbar />
        <div className="flex-1 p-6 overflow-auto">
          <div id="profile-content" className="content-section">
            <div className="mb-6 text-5xl font-bold dark:text-white">
              <h1>Your Profile</h1>
            </div>
            <div className="flex-1 space-y-7">
              {/* Personal Information */}
              <section className="bg- dark:bg-gray-800 p-6 rounded-lg shadow">
                <h2 className="text-3xl font-semibold mb-6 dark:text-white">
                  Personal Information
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center mb-4">
                    <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-3xl mr-4 dark:bg-gray-800 border-black border-2 dark:border-0">
                      {profileImage ? (
                        <img src={profileImage} alt="Profile" className="w-20 h-20 rounded-full" />
                      ) : (
                        <svg
                          className="w-12 h-12 dark:text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      )}
                    </div>
                    <button
                      onClick={handleProfilePictureClick} // Open file dialog
                      className="flex items-center text-blue-600 dark:text-blue-400 font-medium border-2 border-gray-400 px-2 py-1 rounded-xl"
                    >
                      <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                      </svg>
                      Edit 
                    </button>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      ref={fileInputRef} // Assign the ref to the input
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    {/* Fields for personal information */}
                    {Object.keys(profileData).map((key) => (
                      <div key={key} className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-3 dark:text-white dark:font-bold">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </label>
                        <div className="flex items-center border border-black rounded-xl dark:border-gray-600">
                          <input
                            type="text"
                            name={key}
                            value={profileData[key]}
                            onChange={handleChange}
                            className="flex-grow px-3 py-2 rounded-xl border-none focus:outline-none dark:bg-gray-700 dark:text-white"
                            readOnly={!editMode}
                          />
                          <button onClick={handleEditClick} className="absolute right-2 top-1/2 transform -translate-y-1/2 mt-4 text-black dark:text-white">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              {/* Email Preferences */}
              <section className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Email Preferences</h2>
                <div className="space-y-3">
                  <label className="flex items-start">
                    <input type="checkbox" className="mt-1 rounded text-blue-600" checked />
                    <span className="ml-2 text-sm">Important updates about your account, mentorship, messages and billing</span>
                  </label>
                  <label className="flex items-start">
                    <input type="checkbox" className="mt-1 rounded text-blue-600" unchecked />
                    <span className="ml-2 text-sm">Regular reminders of your ongoing mentorships</span>
                  </label>
                  <label className="flex items-start">
                    <input type="checkbox" className="mt-1 rounded text-blue-600" unchecked />
                    <span className="ml-2 text-sm">Notifications of mentees</span>
                  </label>
                </div>
              </section>
              {/* Close your account */}
              <section className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Close your account</h2>
                <p className="text-sm text-gray-600 mb-4 dark:text-white">Once you delete your account, there's no going back. Please be certain!</p>
                <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 text-sm">Delete account</button>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MProfile;