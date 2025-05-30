import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faMagnifyingGlass,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Avatar from "@mui/material/Avatar";
import Checkbox from "@mui/material/Checkbox";

const PurpleCheckbox = styled(Checkbox)({
  color: "purple",
  "&.Mui-checked": {
    color: "purple",
  },
  width: "40px",
  height: "50px",
});
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#aab4be",
        ...theme.applyStyles("dark", {
          backgroundColor: "#8796A5",
        }),
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#001e3c",
    width: 32,
    height: 32,
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
    ...theme.applyStyles("dark", {
      backgroundColor: "#003892",
    }),
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "#aab4be",
    borderRadius: 20 / 2,
    ...theme.applyStyles("dark", {
      backgroundColor: "#8796A5",
    }),
  },
}));

const MHeader = ({
  toggleSidebar,
  sidebarShrink,
  darkMode,
  toggleDarkMode,
}) => {
  const [userName, setUserName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // useEffect(() => {
  //   try {
  //     const userData = JSON.parse(localStorage.getItem("userData"));
  //     if (userData && userData.name) {
  //       setUserName(userData.name);
  //     }
  //   } catch (error) {
  //     console.error("Error parsing user data:", error);
  //     setUserName("Guest");
  //   }
  // }, []);

  const initials = userName
    .split(" ")
    .map((name) => name[0])
    .join("");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDarkModeToggle = (event) => {
    toggleDarkMode(event.target.checked);
  };

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  useEffect(() => {
    try {
      const isDarkModeEnabled = localStorage.getItem("darkMode") === "enabled";
      const userPreferenceDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      if (
        isDarkModeEnabled ||
        (!localStorage.getItem("darkMode") && userPreferenceDark)
      ) {
        toggleDarkMode(true);
      }

      const sidebarState = localStorage.getItem("sidebarState");
      if (sidebarState === "shrink") {
        toggleSidebar(true);
      }
    } catch (error) {
      console.error("Error accessing local storage", error);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode ? "enabled" : "disabled");
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("sidebarState", sidebarShrink ? "shrink" : "expanded");
  }, [sidebarShrink]);

  return (
    <header className="bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between p-4 lg:space-x-8">
        <div className="lg:flex hidden items-center space-x-5">
          <button
            onClick={toggleSidebar}
            className="text-gray-500 focus:outline-none"
            aria-label="Toggle Sidebar"
            style={{ width: "50px", height: "50px" }} // Increase the size of the button
          >
            {sidebarShrink ? (
              <FontAwesomeIcon icon={faChevronRight} size="xl" /> // Increase the size of the icon
            ) : (
              <FontAwesomeIcon icon={faChevronLeft} size="xl" /> // Increase the size of the icon
            )}
          </button>
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search Mentors..."
              className="w-full lg:w-[600px] ml-7 lg:ml-0 mt-2 lg:mt-0 p-2 pl-10 rounded-lg dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-md transition-colors duration-300"
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
            />
          </div>
        </div>

        {/* Dark Mode Toggle, Notifications, and User Info */}
        <div className="flex items-center space-x-8">
          <MaterialUISwitch
            checked={darkMode}
            onChange={handleDarkModeToggle}
            aria-label="Toggle Dark Mode"
          />

          <div className="relative hidden lg:block">
            <button
              id="dropdownNotificationButton"
              className="text-green-700 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 focus:outline-none"
              onClick={toggleDropdown}
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 14 20"
              >
                <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
              </svg>
              <div className="absolute block w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-0.5 start-2.5 dark:border-gray-900"></div>
            </button>
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div
                id="dropdownNotification"
                className="z-20 absolute right-0 w-64 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-lg dark:bg-gray-800 dark:divide-gray-700"
                aria-labelledby="dropdownNotificationButton"
              >
                <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800 dark:text-white">
                  Notifications
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  <a
                    href="#"
                    className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <div className="flex-shrink-0 relative">
                      <img
                        className="rounded-full w-11 h-11"
                        src="images/thomasjohn.jpeg"
                        alt="Jese image"
                      />
                      <div className="absolute flex items-center justify-center w-5 h-5 ms-6 -mt-5 bg-blue-600 border border-white rounded-full dark:border-gray-800">
                        <svg
                          className="w-2 h-2 text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 18 18"
                        >
                          <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z" />
                          <path d="M4.439 9a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239Z" />
                        </svg>
                      </div>
                    </div>
                    <div className="w-full ps-3">
                      <div className="text-gray-500 text-sm mb-1.5 font-semibold dark:text-gray-400">
                        New message from{" "}
                        <span className="font-semibold text-gray-900 dark:text-white">
                          Jese Leos
                        </span>
                        : Are all your doubts clear?
                      </div>
                      <div className="text-xs text-blue-600 dark:text-blue-500">
                        a few moments ago
                      </div>
                    </div>
                  </a>
                  {/* Add more notification items here */}
                </div>
                <a
                  href="#"
                  className="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
                >
                  <div className="inline-flex items-center ">
                    <svg
                      className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 14"
                    >
                      <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                    </svg>
                    View all
                  </div>
                </a>
              </div>
            )}
          </div>
          <div className="lg:flex hidden items-center space-x-2">
            {/* <Avatar sx={{ bgcolor: "#3f51b5" }}>{initials}</Avatar> */}

            {/* <span className="text-gray-700 dark:text-gray-200">
              {userName || "Guest"}
            </span> */}
          </div>
          <button
            onClick={toggleDialog} // Update this line
            className="flex items-center px-8 py-2 mt-2 lg:mt-0 lg:px-4 lg:py-2 bg-white text-black rounded-md border border-black dark:border-gray-600 dark:bg-gray-700 dark:text-white hover:bg-slate-300  dark:hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <i className="fa-solid fa-plus mr-2"></i>
            <span>Create Session</span>
          </button>
          {isDialogOpen && (
            <div className="fixed z-50 inset-0 overflow-y-auto ">
              <div className="flex items-center justify-center min-h-screen">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6 mx-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium dark:text-gray-200">
                      Create a Session
                    </h2>
                    <button
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none"
                      aria-label="Close"
                      onClick={toggleDialog}
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="title"
                        className="block font-medium text-gray-700 dark:text-gray-300"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Add Title"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="date"
                        className="block font-medium text-gray-700 dark:text-gray-300"
                      >
                        Date
                      </label>
                      <div className="flex items-center">
                        <div className="w-8 h-8 mr-2">
                          <svg
                            className="w-full h-full"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            ></path>
                          </svg>
                        </div>
                        <input
                          type="text"
                          id="date"
                          className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value="Saturday, 7th December"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="time"
                        className="block font-medium text-gray-700 dark:text-gray-300"
                      >
                        Time
                      </label>
                      <div className="flex items-center">
                        <div className="w-8 h-8 mr-2">
                          <svg
                            className="w-full h-full"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                        </div>
                        <input
                          type="text"
                          id="time"
                          className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value="3:30pm - 4:30pm"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="description"
                        className="block font-medium text-gray-700 dark:text-gray-300"
                      >
                        Description
                      </label>
                      <textarea
                        id="description"
                        rows="3"
                        className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Add Description"
                      ></textarea>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <PurpleCheckbox {...label} />
                        <label
                          htmlFor="notify"
                          className="ml-2 block font-medium text-gray-700 dark:text-gray-300"
                        >
                          Notify Me
                        </label>
                      </div>
                    </div>
                    {/* <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <svg
                          width="30"
                          height="40"
                          viewBox="0 0 50 50"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_3318_2318)">
                            <path
                              d="M14.2857 0C15.7701 0 16.9643 1.04492 16.9643 2.34375V6.25H33.0357V2.34375C33.0357 1.04492 34.2299 0 35.7143 0C37.1987 0 38.3929 1.04492 38.3929 2.34375V6.25H42.8571C46.7969 6.25 50 9.05273 50 12.5V14.0625V18.75V43.75C50 47.1973 46.7969 50 42.8571 50H7.14286C3.20312 50 0 47.1973 0 43.75V18.75V14.0625V12.5C0 9.05273 3.20312 6.25 7.14286 6.25H11.6071V2.34375C11.6071 1.04492 12.8013 0 14.2857 0ZM44.6429 18.75H5.35714V43.75C5.35714 44.6094 6.16071 45.3125 7.14286 45.3125H42.8571C43.8393 45.3125 44.6429 44.6094 44.6429 43.75V18.75ZM36.7188 29.0039L24.2188 39.9414C23.1696 40.8594 21.4732 40.8594 20.4353 39.9414L13.2924 33.6914C12.2433 32.7734 12.2433 31.2891 13.2924 30.3809C14.3415 29.4727 16.0379 29.4629 17.0759 30.3809L22.3214 34.9707L32.9241 25.6934C33.9732 24.7754 35.6696 24.7754 36.7076 25.6934C37.7455 26.6113 37.7567 28.0957 36.7076 29.0039H36.7188Z"
                              fill="black"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_3318_2318">
                              <rect width="50" height="50" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        <label
                          htmlFor="programming-knowledge"
                          className="ml-2 block font-medium text-gray-700 dark:text-gray-300"
                        >
                          Programming Knowledge
                        </label>
                      </div>
                    </div> */}
                    <div className="flex justify-end">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Done
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default MHeader;
