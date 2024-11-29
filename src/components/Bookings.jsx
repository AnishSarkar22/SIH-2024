import React, { useState } from "react";
import MSidebar from "./MSidebar";
import MHeader from "./MHeader";
import { User } from "lucide-react";

function BookingsTable() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode === "enabled";
  });

  const [sidebarShrink, setSidebarShrink] = useState(false);
  const bookings = [
    {
      name: "Rohan Ahluwalia",
      bookings: "20 bookings so far",
      avatar: "./images/26.svg",
    },
    {
      name: "Sumit Kumar",
      bookings: "23 bookings so far",
      avatar: "./images/27.svg",
    },
    {
      name: "Muskaan Sharma",
      bookings: "4 bookings so far",
      avatar: "./images/12.svg",
    },
    {
      name: "Roop Singh",
      bookings: "4 bookings so far",
      avatar: "./images/30.svg",
    },
    {
      name: "Fatima Khan",
      bookings: "2 bookings so far",
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
  ${darkMode ? "bg-gray-900" : "bg-gray-100"}
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
                      Card/Form
                    </th>
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
                      <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">{booking.bookings}</td>
                      <td className="px-3 sm:px-6 py-3 sm:py-4">
                        <div className="flex flex-col sm:flex-row gap-2">
                          <button className={`px-4 py-1 text-green-500 border border-green-500 rounded-md sm:px-4 sm:py-2 text-xs sm:text-sm font-medium ${darkMode ? 'hover:bg-green-900' : 'hover:bg-green-100'}`}>
                            Accept
                          </button>
                          <button className={`px-4 py-1 text-red-500 border border-red-500 rounded-md sm:px-4 sm:py-2 text-xs sm:text-sm font-medium ${darkMode ? 'hover:bg-red-950' : 'hover:bg-red-100'}`}>
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
    </div>
  );
}

export default BookingsTable;
