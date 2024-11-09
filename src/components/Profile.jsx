import React, { useState, useRef } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Navbar from './Navbar';

function Profile() {
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
    hobbies: "games, music, dance",
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
    <div className={`flex h-screen bg-gray-100 dark:bg-gray-900 ${darkMode ? "dark" : ""}`}>
      <Sidebar
        sidebarShrink={sidebarShrink}
        isDarkMode={darkMode}
        toggleSidebar={toggleSidebar}
      />
      <div className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-gray-900">
        <Header
          toggleSidebar={toggleSidebar}
          sidebarShrink={sidebarShrink}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <Navbar />
        <div className="flex-1 p-6 overflow-auto">
          <div id="profile-content" className="content-section">
            <div className="mb-6 text-5xl font-bold dark:text-white">
              <h1>Your Profile</h1>
            </div>
            <div className="flex-1 space-y-7">
              {/* Personal Information */}
              <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h2 className="text-3xl font-semibold mb-6 dark:text-white">
                  Personal Information
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center mb-4">
                    <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-3xl mr-4 dark:bg-gray-700 border-black border-2 dark:border-0">
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
              {/* Availability Section */}
              <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h2 className="text-3xl font-semibold mb-8 dark:text-white">Availability</h2>
                <h4 className="text-md font-semibold mb-8 dark:text-white">In general, when do you prefer to meet your mentor?</h4>
                <div className="space-y-8">
                  {["Early mornings (before 9am)", "During the day (9am - 5pm)", "In the evenings (after 5pm)"].map((timeSlot) => (
                    <label key={timeSlot} className="flex items-start dark:text-white">
                      <input
                        type="radio"
                        name="availability"
                        value={timeSlot}
                        className="form-radio h-6 w-6 text-blue-600 rounded-full border-gray-300 checked:bg-blue-600 checked:border-blue-600 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <span className="ml-2 text-sm">{timeSlot}</span>
                    </label>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;