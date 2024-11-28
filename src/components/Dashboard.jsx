import React, { useState, useEffect, useMemo, useRef } from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const PrevArrow = ({ onClick }) => (
  <button
    className="absolute left-0 z-50 -translate-y-1/2 top-1/2 transform bg-gray-200 border border-gray-300 rounded-full shadow-lg dark:bg-gray-700 dark:border-gray-800 w-12 h-12 flex items-center justify-center"
    onClick={onClick}
    style={{ marginLeft: "-20px" }}
  >
    <FontAwesomeIcon
      icon={faChevronLeft}
      className="text-gray-800 dark:text-gray-300"
    />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    className="absolute right-0 z-50 -translate-y-1/2 top-1/2 transform bg-gray-200 border border-gray-300 rounded-full shadow-lg dark:bg-gray-700 dark:border-gray-800 w-12 h-12 flex items-center justify-center"
    onClick={onClick}
    style={{ marginRight: "-20px" }}
  >
    <FontAwesomeIcon
      icon={faChevronRight}
      className="text-gray-800 dark:text-gray-300"
    />
  </button>
);

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [sidebarShrink, setSidebarShrink] = useState(() => {
    const savedSidebarState = localStorage.getItem("sidebarState");
    return savedSidebarState === "shrink";
  });

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

  // display first name of the user
  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      if (userData && userData.name) {
        const firstName = userData.name.split(" ")[0];
        setUserName(firstName);
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      setUserName("Guest");
    }
  }, []);

  const toggleSidebar = () => setSidebarShrink(!sidebarShrink);

  const mentors = [
    {
      name: "Karan Singh",
      role: "Lead SRE @ MICROSOFT",
      image: "images/mentor1.png",
      rating: "5.0 (44 reviews)",
      price: "₹5000/mo",
      skills: [
        "Azure",
        "Cloud",
        "Google Cloud",
        "Python",
        "Ansible",
        "Kubernetes",
      ],
    },
    {
      name: "Radhika Sharma",
      role: "Research and Development @ NJM",
      image: "/images/mentor2.jpeg",
      rating: "5.0 (18 reviews)",
      price: "₹6000/mo",
      skills: [
        "Brand Strategy",
        "Personal Branding",
        "Marketing",
        "Leadership",
        "Social Media",
      ],
    },
    {
      name: "Aniket Luthra",
      role: "Research and Development @ NJM",
      image: "/images/mentor3.jpg",
      rating: "5.0 (18 reviews)",
      price: "₹6000/mo",
      skills: [
        "Brand Strategy",
        "Personal Branding",
        "Marketing",
        "Leadership",
        "Social Media",
      ],
    },
    {
      name: "Ronak Kumar",
      role: "Research and Development @ NJM",
      image: "/images/mentor4.jpg",
      rating: "5.0 (18 reviews)",
      price: "₹6000/mo",
      skills: [
        "Brand Strategy",
        "Personal Branding",
        "Marketing",
        "Leadership",
        "Social Media",
      ],
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
      {
        question: "What is the role of a mentee on this platform?",
        answer:
          "As a mentee, you can connect with experienced mentors or advisors for guidance on a wide range of topics, including career growth, skill development, personal challenges, or relationship advice. The platform provides a safe and supportive environment where you can seek help tailored to your specific needs, ensuring holistic development and well-being.",
      },
      {
        question: "How do I book a session with a mentor?",
        answer:
          "Simply browse through available mentors, select a mentor based on your requirements, and use the automated calendar booking system to find a suitable time for a session.",
      },
      {
        question: "Can I reschedule or cancel my session?",
        answer:
          "Yes, rescheduling or canceling a session is allowed. You can easily manage your bookings through the platform, subject to the mentor’s availability.",
      },
      {
        question:
          "What should I do if a mentor is unresponsive and not responding to my application?",
        answer:
          "Mentors are typically given a set amount of time to respond to applications. If you haven't heard back within 3-5 business days, you may reach out to the platform's support team for assistance.",
      },
      {
        question:
          "What should I do if I have a problem or feel uncomfortable with my mentor?",
        answer:
          "If you experience any issues or feel uncomfortable with your mentor, you can report the situation through the platform's support or feedback system. We take such concerns seriously and will review the matter confidentially. If necessary, we can help you find another mentor or provide further assistance to ensure you have a positive and supportive experience.",
      },
      {
        question: "How do I provide feedback about my session?",
        answer:
          "After your session, you'll be prompted to rate your mentor and leave feedback to help us improve the platform experience.",
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
  // // for loading spinner
  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <l-tail-chase size="40" speed="1.75" color="black"></l-tail-chase>
  //     </div>
  //   );
  // }

  return (
    <div className={`flex h-screen bg-white ${darkMode ? "dark" : ""}`}>
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
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-700 dark:text-gray-200">
              Welcome back, {userName || "Guest"} 👋
            </h1>
            {/* Personal Assistant and Your Plan */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 text-gray-800 dark:text-white">
              {/* Personal Assistant */}
              <div className="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800">
                <h2 className="text-xl font-semibold mb-4 text-center">
                  Personal Assistant
                </h2>
                <div className="bg-gray-100 p-4 rounded-lg mb-4 dark:bg-gray-800">
                  <div className="flex items-center mb-2">
                    <FontAwesomeIcon
                      icon={faCircleUser}
                      className="text-6xl rounded-full mr-2 p-2"
                    />
                    <div>
                      <p className="font-semibold text-2xl">Your Assistant</p>
                      <p className="text-gray-500 text-md">Sep 17 2024</p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    What do you need help with?
                  </p>
                </div>
                <input
                  type="text"
                  placeholder="Type here..."
                  className="w-full p-3 rounded-lg border shadow-lg border-gray-100 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-gray-700 dark:text-gray-300 dark:focus:ring-gray-300 dark:border-gray-800"
                />
                <a
                  href="#"
                  className="text-blue-500 hover:underline flex justify-center text-center mt-3"
                >
                  Continue your Conversation →
                </a>
              </div>
              {/* Your Plan */}
              <div className="bg-white rounded-lg shadow-md p-6 dark:bg-gray-800">
                <h2 className="text-xl font-semibold text-center mb-4  text-gray-800 dark:text-white">
                  Your Plan
                </h2>
                <div className="space-y-4 shadow-md rounded-lg">
                  <div className="flex justify-between items-center px-4 pt-4">
                    <div className="flex items-center">
                      <i className="fa-solid fa-user-group text-blue-500 mr-2"></i>
                      <span>Mayowa Ade</span>
                    </div>
                    <div>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2 dark:bg-gray-700 dark:font-extrabold dark:text-blue-500">
                        Group
                      </span>
                      <span className="text-gray-800 dark:text-white">
                        09:34
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center px-4">
                    <div className="flex items-center">
                      <i className="fas fa-user text-green-500 mr-2"></i>
                      <span>Gautam Nigam</span>
                    </div>
                    <div>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-2 dark:bg-gray-700 dark:font-extrabold dark:text-green-500">
                        One-to-One
                      </span>
                      <span className="text-gray-800 dark:text-white">
                        11:30
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center px-4">
                    <div className="flex items-center">
                      <i className="fas fa-user text-green-500 mr-2"></i>
                      <span>Mayowa Ade</span>
                    </div>
                    <div>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-2 dark:bg-gray-700 dark:font-extrabold dark:text-green-500">
                        One-to-One
                      </span>
                      <span className="text-gray-800 dark:text-white">
                        13:40
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center px-4">
                    <div className="flex items-center">
                      <i className="fa-solid fa-user-group text-blue-500 mr-2"></i>
                      <span>Joshua Ashiru</span>
                    </div>
                    <div>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2 dark:bg-gray-700 dark:font-extrabold dark:text-blue-500">
                        Group
                      </span>
                      <span className="text-gray-800 dark:text-white">
                        15:30
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center px-4">
                    <div className="flex items-center">
                      <i className="fa-solid fa-user-group text-blue-500 mr-2"></i>
                      <span>Olawuyi Tobi</span>
                    </div>
                    <div>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2 dark:bg-gray-700 dark:font-extrabold dark:text-blue-500">
                        Group
                      </span>
                      <span className="text-gray-800 dark:text-white">
                        19:30
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center px-4 pb-4">
                    <div className="flex items-center">
                      <i className="fas fa-user text-green-500 mr-2"></i>
                      <span>Gautam Nigam</span>
                    </div>
                    <div>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-2 dark:bg-gray-700 dark:font-extrabold dark:text-green-500">
                        One-to-One
                      </span>
                      <span className="text-gray-800 dark:text-white">
                        11:30
                      </span>
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
                      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 w-90 h-64 flex flex-col mx-4 border border-gray-300 dark:border-gray-800">
                        <div className="flex items-start mb-4">
                          <img
                            src={mentor.image}
                            alt={mentor.name}
                            className="w-25 h-24 rounded-lg"
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
                          <span className="ml-auto font-semibold dark:text-white">
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
