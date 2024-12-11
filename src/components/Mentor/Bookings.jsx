import React, { useState } from "react";
import MSidebar from "./MSidebar";
import MHeader from "./MHeader";
import { User, X } from "lucide-react";

// Description Modal Component
const DescriptionModal = ({ isOpen, onClose, description }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X size={20} />
        </button>
        
        <h3 className="text-lg font-semibold mb-4 dark:text-white">Booking Description</h3>
        <div className="text-gray-600 dark:text-gray-300">
          {description}
        </div>
        
        <button
          onClick={onClose}
          className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

function BookingsTable() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode === "enabled";
  });

  const [sidebarShrink, setSidebarShrink] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState("");

  const bookings = [
    {
      name: "Rohan Ahluwalia",
      time: "10:00 AM",
      description: "I’m Rohan, a 25-year-old recent graduate in Fashion Design. I have an idea for a sustainable clothing line, but I don’t know how to turn it into a successful business. I feel overwhelmed trying to create a business model, secure funding, and understand market trends. I need guidance to make a solid business plan, find funding opportunities, and develop an effective branding strategy. A mentor with experience in startups or sustainable businesses would be incredibly helpful in turning my vision into reality.",
      avatar: "./images/26.svg",
    },
    {
      name: "Sumit Kumar",
      time: "11:15 AM",
      description: "I’m Sumit, and I’ve been a school teacher for the last eight years, but now I want to transition into instructional design for e-learning platforms. I’m struggling because I lack specific skills like using authoring tools such as Articulate 360 and creating digital learning content. Moving from an academic environment to a corporate setting feels daunting. I’m looking for a mentor who can help me identify the right skills, build a professional portfolio, and provide advice on networking to land my first job in this new field.",
      avatar: "./images/27.svg",
    },
    {
      name: "Muskaan Sharma",
      time: "12:30 PM",
      description: "Hi, I’m Muskaan, a first-year Computer Science student. I’m curious about many areas in tech like data science, web development, and artificial intelligence, but I feel lost trying to figure out where to start. The field feels so vast, and I don’t know which projects or certifications will actually add value to my resume. I’d love to have a mentor guide me in exploring different tech domains, building practical skills, and helping me choose projects that align with industry demands.",
      avatar: "./images/12.svg",
    },
    {
      name: "Roop Singh",
      time: "1:45 PM",
      description: "My name is Roop, and I’m a marketing professional returning to work after a 10-year career break to focus on my family. It’s been a challenge to regain confidence and get back in touch with current marketing trends and tools like social media marketing and SEO. I’m struggling to restart my career and need personalized advice on updating my skills, creating a professional resume, and explaining my career gap during interviews. A mentor’s support could make this transition smoother for me.",
      avatar: "./images/30.svg",
    },
    {
      name: "Fatima Khan",
      time: "3:00 PM",
      description: "I’m Fatima, a 28-year-old product manager at a mid-sized SaaS company. I’m striving for a promotion but feel stuck in my current role. I know I need to improve my stakeholder management and strategic thinking skills, but I also struggle with task prioritization and enhancing team performance. I need a mentor who can provide insights into advanced product management strategies, leadership techniques, and constructive feedback to prepare me for higher responsibilities in my career.",
      avatar: "./images/3.svg",
    },
  ];

  const toggleSidebar = () => {
    setSidebarShrink(!sidebarShrink);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode ? "enabled" : "disabled");
  };

  const handleDescriptionClick = (description) => {
    setSelectedDescription(description);
    setModalOpen(true);
  };

  return (
    <div
      className={`min-h-screen flex h-screen overflow-hidden ${
        darkMode ? "dark bg-gray-800 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <MSidebar darkMode={darkMode} sidebarShrink={sidebarShrink} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <MHeader
          toggleSidebar={toggleSidebar}
          sidebarShrink={sidebarShrink}
          toggleDarkMode={toggleDarkMode}
          darkMode={darkMode}
        />
        <main
          className={`
            flex-1 
            overflow-y-auto 
            p-2 sm:p-6 
            ${sidebarShrink ? "pl-20" : "pl-6"} 
            transition-all duration-300 
            ${darkMode ? "bg-gray-900" : "bg-white"}
          `}
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold">Bookings</h2>
            </div>

            <div className="overflow-x-auto rounded-lg bg-white dark:bg-gray-800 shadow-sm">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <tr>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-sm font-semibold">
                      User Details
                    </th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-sm font-semibold">
                      Time
                    </th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-sm font-semibold">Description</th>
                    <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {bookings.map((booking, index) => (
                    <tr key={index} className={`group ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <div className="flex flex-row items-center gap-4">
                          <div className="w-10 h-10 rounded-full overflow-hidden">
                            <img
                              src={booking.avatar}
                              alt={booking.name}
                              className="w-full h-full object-cover text-sm font-medium"
                            />
                          </div>
                          <span className="font-medium text-xs sm:text-sm">{booking.name}</span>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">{booking.time}</td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                        <button
                          onClick={() => handleDescriptionClick(booking.description)}
                          className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          View Description
                        </button>
                      </td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <div className="flex flex-col sm:flex-row gap-2">
                          <button className={`px-4 py-1 text-green-500 border border-green-500 rounded-md sm:px-4 sm:py-2 text-xs sm:text-sm font-medium hover:bg-green-500 hover:text-white ${darkMode ? 'hover:bg-green-900' : 'hover:bg-green-100'}`}>
                            Accept
                          </button>
                          <button className={`px-4 py-1 text-red-500 border border-red-500 rounded-md sm:px-4 sm:py-2 text-xs sm:text-sm font-medium hover:bg-red-500 hover:text-white ${darkMode ? 'hover:bg-red-950' : 'hover:bg-red-100'}`}>
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      <DescriptionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        description={selectedDescription}
      />
    </div>
  );
}

export default BookingsTable;