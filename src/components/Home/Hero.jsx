import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const styles = {
    fontFamily: "'Aeonik', sans-serif"
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const menuRef = useRef(null);
  const textElementRef = useRef(null);
  const cursorElementRef = useRef(null);
  const navigate = useNavigate();

  const allMenuItems = {
    Design: [
      "Graphic Design",
      "UX Design",
      "UI/ Visual Design",
      "Industrial Design",
      "Motion Design",
    ],
    Product: [
      "Product Strategy",
      "Product Management",
      "Product Marketing",
      "Product Analytics",
    ],
    Engineering: [
      "Frontend Development",
      "Backend Development",
      "Mobile Development",
      "DevOps",
    ],
    Marketing: [
      "Digital Marketing",
      "Content Marketing",
      "Social Media",
      "SEO",
    ],
    "Data Science": [
      "Machine Learning",
      "Data Analytics",
      "Business Intelligence",
      "Statistics",
    ],
    "No/Low Code": ["Bubble", "Webflow", "Zapier", "Airtable"],
    "Content Writing": [
      "Technical Writing",
      "Copywriting",
      "Blog Writing",
      "UX Writing",
    ],
  };

  const handleSubItemClick = (subItem) => {
    navigate("/mentors", { state: { selectedSkill: subItem } });
  };

  const ChevronIcon = () => (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      className="tw-stroke-[#E3E6EA] group-data-[highlighted]:tw-stroke-[#384853]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.69751 5L15.8341 12L8.69751 19"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const style = {
    ".cursor": {
      fontWeight: 100,
      color: "#2E8B57",
      animation: "blink 1s step-end infinite",
    },
    "@keyframes blink": { "from, to": { opacity: 1 }, "50%": { opacity: 0 } },
  };

  const menuItems = [
    { id: 1, label: "Design", icon: "👨‍🎨" },
    { id: 2, label: "Product", icon: "📱" },
    { id: 3, label: "Engineering", icon: "👨‍💻" },
    { id: 4, label: "Marketing", icon: "📢" },
    { id: 5, label: "Data Science", icon: "📊" },
    { id: 6, label: "No/Low Code", icon: "⚡" },
    { id: 7, label: "Content Writing", icon: "✍️" },
  ];

  useEffect(() => {
    const specialties = ["Marketing", "AWS", "SEO", "AI", "Career"];
    let currentIndex = 0;
    const textElement = textElementRef.current;
    const cursorElement = cursorElementRef.current;

    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function typeText(text) {
      for (let i = 0; i <= text.length; i++) {
        textElement.textContent = text.slice(0, i);
        await sleep(110);
      }
    }

    async function backspace(text) {
      for (let i = text.length; i >= 0; i--) {
        textElement.textContent = text.slice(0, i);
        await sleep(50);
      }
    }

    async function animateText() {
      while (true) {
        let currentText = specialties[currentIndex];
        await typeText(currentText);
        await sleep(1500);
        await backspace(currentText);
        currentIndex = (currentIndex + 1) % specialties.length;
        await sleep(500);
      }
    }

    const cursorBlinking = setInterval(() => {
      if (cursorElement) {
        cursorElement.style.opacity =
          cursorElement.style.opacity === "0" ? "1" : "0";
      }
    }, 500);

    if (textElement && cursorElement) {
      animateText();
    }

    return () => {
      clearInterval(cursorBlinking);
    };
  }, []);

  return (
    <section
      id="hero"
      className="font-custom mb-4 bg-[url('static/bg-pattern.svg')] bg-[length:40rem] bg-no-repeat bg-[90%_-1%] scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-gray-200"
      style={styles}  // Use styles instead of font
    >
      <div className="font-custom container flex flex-col-reverse items-center px-16 mx-auto mt-28 space-y-0 md:flex-row md:space-y-10">
        <div className="flex flex-col mb-2 space-y-12 md:mb-28 md:w-1/2">
          <div className="flex flex-col space-y-8">
            <h1 className="max-w-md text-4xl font-bold text-center md:text-left text-darkBlue">
              <div className="mb-4">
                <span className="font-bold text-5xl text-[#2F4454]">1-on-1&nbsp;</span>
                <br className="block lg:hidden" />
                <span
                  ref={textElementRef}
                  className="text-[3rem] text-[rgba(11,112,119,1)] pt-8 leading-[1.2]"
                ></span>
                <span
                  ref={cursorElementRef}
                  className="text-[4rem] text-[rgba(11,112,119,1)] font-thin animate-blink"
                >
                  |
                </span>
                <br className="hidden md:block" />
              </div>
              <div className="pt-1.4 text-5xl text-[#2F4454]">Mentorship</div>
            </h1>
            <h3 className="max-w-md text-xl text-center md:text-left text-[#2F4454]">
              Connecting Ambition with Expertise, Seamlessly Scheduled.
            </h3>

            <div className="relative w-full max-w-sm" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-full flex items-center px-4 py-3 text-left border border-gray-300 rounded-lg bg-white hover:border-[#077f7f] focus:outline-none focus:border-[#077f7f] focus:ring-1 focus:ring-[#077f7f]"
              >
                <svg
                  className="w-5 h-5 text-[#077f7f] mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span className="text-gray-500">
                  What do you need help with?
                </span>
              </button>

              {isMenuOpen && (
                <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 z-50">
                  {menuItems.map((item) => (
                    <div
                      key={item.id}
                      className="relative"
                      onMouseEnter={() => setActiveMenuItem(item.label)}
                      onMouseLeave={() => setActiveMenuItem(null)}
                    >
                      <div className="flex items-center px-4 py-3 hover:bg-[#f0f6f9] cursor-pointer">
                        <span className="w-6 h-6 flex items-center justify-center">
                          {item.icon}
                        </span>
                        <span className="ml-3 text-[#2f4454]">
                          {item.label}
                        </span>
                        <svg
                          className="ml-auto w-5 h-5 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                        {activeMenuItem === item.label && (
                          <div
                            className="
    absolute 
    md:left-full md:top-0 
    left-0 top-full 
    w-full md:w-64 
    bg-white 
    rounded-xl 
    shadow-lg 
    border 
    border-gray-100 
    md:-ml-1
    mt-0 md:mt-0
    z-50
  "
                          >
                            {allMenuItems[item.label].map((subItem, index) => (
                              <div
                                key={index}
                                className="px-4 py-3 hover:bg-[#f0f6f9] cursor-pointer text-[#2f4454]"
                                onClick={() => handleSubItemClick(subItem)}
                              >
                                {subItem}
                              </div>
                            ))}
                            <div className="border-t border-gray-100 m-2">
                              <button
                                className="w-full text-center py-2 text-[#077f7f] hover:bg-[#f0f6f9] rounded-md"
                                onClick={() =>
                                  navigate("/mentors", {
                                    state: { category: item.label },
                                  })
                                }
                              >
                                View All
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="md:w-1/2 top-[-120px] sm:top-[-100px] lg:top-[-100px] xl:top-[-160px]">
          <video
            src="images/3d-casual-life-user-interface-elements.webm"
            className="w-full h-auto object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
}
