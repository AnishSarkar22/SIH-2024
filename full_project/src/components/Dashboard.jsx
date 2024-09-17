import React, { useState, useEffect, useMemo,useRef } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Sidebar from "./Sidebar";
import Header from "./Header";

const PrevArrow = ({ onClick }) => (
  <button
    className="absolute left-0 z-50 -translate-y-1/2 top-1/2 transform bg-gray-200 border border-gray-400 p-3 rounded-full shadow-lg dark:bg-gray-700 dark:border-gray-600"
    onClick={onClick}
    style={{ marginLeft: "-20px" }}
  >
    <ChevronLeft className="text-gray-800 dark:text-gray-300" />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    className="absolute right-0 z-50 -translate-y-1/2 top-1/2 transform bg-gray-200 border border-gray-400 p-3 rounded-full shadow-lg dark:bg-gray-700 dark:border-gray-600"
    onClick={onClick}
    style={{ marginRight: "-20px" }}
  >
    <ChevronRight className="text-gray-800 dark:text-gray-300" />
  </button>
);


const Dashboard = () => {
 const [sidebarShrink, setSidebarShrink] = useState(() => {
    const savedSidebarState = localStorage.getItem("sidebarState");
    return savedSidebarState === "shrink";
  });

  {/* Const for dark and light */}
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode === "enabled";
  });

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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleSidebar = () => setSidebarShrink(!sidebarShrink);

  const mentors = [
    {
      name: "Thomas John",
      role: "Lead SRE @ MICROSOFT",
      image: "./images/img1.jpeg",
      rating: "5.0 (44 reviews)",
      price: "₹5000/mo",
      skills: ["Azure", "Cloud", "Google Cloud", "Python", "Ansible", "Kubernetes"],
    },
    {
      name: "Radhika Sharma",
      role: "Research and Development @ NJM",
      image: "./images/img2.jpeg",
      rating: "5.0 (18 reviews)",
      price: "₹6000/mo",
      skills: ["Brand Strategy", "Personal Branding", "Marketing", "Leadership", "Social Media"],
    },
  ];

  const faqItems = useMemo(
    () => [
      {
        question: "How can I get in touch with a mentor?",
        answer:
          "We offer two main ways to get in touch with a mentor: long-term mentorship through application, or by booking a session.",
      },
      {
        question: "How much do mentors cost? How does pricing work?",
        answer:
          "Each mentor offers multiple pricing tiers. You'll be charged the monthly fee for mentorship or the session price if you book a session.",
      },
    ],
    []
  );

  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    prevArrow: <PrevArrow onClick={() => sliderRef.current.slickPrev()} />,
    nextArrow: <NextArrow onClick={() => sliderRef.current.slickNext()} />,
  };
  return (
    <div className={`flex h-screen bg-gray-100 ${darkMode ? "dark" : ""}`}>
      <Sidebar
        sidebarShrink={sidebarShrink}
        isDarkMode={darkMode}
        toggleSidebar={toggleSidebar}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          toggleSidebar={toggleSidebar}
          sidebarShrink={sidebarShrink}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-700 dark:text-gray-200">
              Welcome back, John 👋
            </h1>
            {/* Chat with AI and Your Plan */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 text-gray-800 dark:text-white">
              {/* Chat with AI */}
              <div className="bg-white rounded-lg shadow shadow-gray-900 p-6 dark:bg-gray-800">
                <h2 className="text-xl font-semibold mb-4 text-center">
                  Chat with AI
                </h2>
                <div className="bg-gray-100 p-4 rounded-lg mb-4 dark:bg-gray-800">
                  <div className="flex items-center mb-2">
                    <i className="fas fa-user-circle text-6xl rounded-full text-green-600 mr-2 p-2"></i>
                    <div>
                      <p className="font-semibold text-2xl">John</p>
                      <p className="text-gray-500 text-md">
                        12:49 pm Aug 19 2024
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    What do you need help with?
                  </p>
                </div>
                <input
                  type="text"
                  placeholder="Type here......"
                  className="w-full p-3 rounded-lg border shadow-sm shadow-gray-700 border-gray-300 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-gray-700 dark:text-gray-300 dark:focus:ring-gray-300 dark:border-gray-800"
                />
                <a
                  href="#"
                  className="text-blue-500 hover:underline flex justify-center text-center"
                >
                  Continue your Conversation →
                </a>
              </div>
              {/* Your Plan */}
              <div className="bg-white rounded-lg shadow shadow-gray-900 p-6 dark:bg-gray-800">
                <h2 className="text-xl font-semibold text-center mb-4 dark:text-gray-300">
                  Your Plan
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <i className="fa-solid fa-user-group text-blue-500 mr-2"></i>
                      <span>Mayowa Ade</span>
                    </div>
                    <div>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2 dark:bg-gray-700 dark:font-extrabold dark:text-blue-500">
                        Group
                      </span>
                      <span className="text-gray-600">09:34</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <i className="fas fa-user text-green-500 mr-2"></i>
                      <span>Gautam Nigam</span>
                    </div>
                    <div>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-2 dark:bg-gray-700 dark:font-extrabold dark:text-green-500">
                        One-to-One
                      </span>
                      <span className="text-gray-600">11:30</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <i className="fas fa-user text-green-500 mr-2"></i>
                      <span>Mayowa Ade</span>
                    </div>
                    <div>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-2 dark:bg-gray-700 dark:font-extrabold dark:text-green-500">
                        One-to-One
                      </span>
                      <span className="text-gray-600">13:40</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <i className="fa-solid fa-user-group text-blue-500 mr-2"></i>
                      <span>Joshua Ashiru</span>
                    </div>
                    <div>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2 dark:bg-gray-700 dark:font-extrabold dark:text-blue-500">
                        Group
                      </span>
                      <span className="text-gray-600">15:30</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <i className="fa-solid fa-user-group text-blue-500 mr-2"></i>
                      <span>Olawuyi Tobi</span>
                    </div>
                    <div>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2 dark:bg-gray-700 dark:font-extrabold dark:text-blue-500">
                        Group
                      </span>
                      <span className="text-gray-600">19:30</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <i className="fas fa-user text-green-500 mr-2"></i>
                      <span>Gautam Nigam</span>
                    </div>
                    <div>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-2 dark:bg-gray-700 dark:font-extrabold dark:text-green-500">
                        One-to-One
                      </span>
                      <span className="text-gray-600">11:30</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Recommended for You */}
            <div className="mt-12">
              <h2 className="text-2xl font-semibold mb-6 text-gray-700 dark:text-gray-200">
                Recommended for You
              </h2>
              <div id="indicators-carousel" className="relative w-full">
                <Slider ref={sliderRef} {...settings}>
                  {mentors.map((mentor, index) => (
                    <div key={index} className="flex justify-center px-1">
                      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 w-90 h-64 flex flex-col mx-4 border border-black">
                        <div className="flex items-start mb-4">
                          <img
                            src={mentor.image}
                            alt={mentor.name}
                            className="w-24 h-24 rounded-lg"
                          />
                          <div className="ml-4 flex-1">
                            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                              {mentor.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {mentor.role}
                            </p>
                            <div className="flex items-center mt-1">
                              <span className="text-sm text-gray-600 dark:text-gray-300 ml-1">
                                {mentor.rating}
                              </span>
                            </div>
                          </div>
                          <span className="ml-auto font-semibold">
                            {mentor.price}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {mentor.skills.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full dark:bg-gray-700 dark:text-blue-300"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
            {/* Frequently Asked Questions */}
            <div className="mt-16">
              <h2 className="text-2xl font-semibold mb-8 text-gray-900 dark:text-gray-100 text-center">
                Frequently Asked Questions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {faqItems.map((item, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                      {item.question}
                    </h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
