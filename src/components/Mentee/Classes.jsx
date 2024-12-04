import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "../services/event-utils.js";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../../index.css";
import Sidebar from "./Sidebar";
import Header from "./Header";

const PrevArrow = ({ onClick }) => (
  <button
    className="absolute left-0 z-50 -translate-y-1/2 top-1/2 transform bg-gray-200 border border-gray-400 p-3 rounded-full shadow-lg dark:bg-gray-700 dark:border-gray-600"
    onClick={onClick}
    style={{ marginTop: "8px" }}
  >
    <ChevronLeft className="text-gray-800 dark:text-gray-300" />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    className="absolute right-0 z-50 -translate-y-1/2 top-1/2 transform bg-gray-200 border border-gray-400 p-3 rounded-full shadow-lg dark:bg-gray-700 dark:border-gray-600"
    onClick={onClick}
    style={{ marginTop: "8px" }}
  >
    <ChevronRight className="text-gray-800 dark:text-gray-300" />
  </button>
);

function Classes() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode === "enabled";
  });
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [sidebarShrink, setSidebarShrink] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode ? "enabled" : "disabled");
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleSidebar = () => {
    setSidebarShrink(!sidebarShrink);
  };

  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible);
  };

  const handleDateSelect = (selectInfo) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  const handleEventClick = (clickInfo) => {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  };

  const handleEvents = (events) => {
    setCurrentEvents(events);
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const dayCellClassNames = (date) => {
    const today = new Date();
    const dateObj = new Date(date); // Ensure date is a Date object

    if (
      dateObj.getDate() === today.getDate() &&
      dateObj.getMonth() === today.getMonth() &&
      dateObj.getFullYear() === today.getFullYear()
    ) {
      return darkMode ? "current-date-dark" : "current-date-light";
    }
    return "";
  };

  return (
    <div
      className={`flex h-screen ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
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
        <main
          className={`flex-1 overflow-x-hidden overflow-y-auto ${
            darkMode ? "bg-gray-900" : "bg-white"
          }`}
        >
          <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl mb-6 font-bold">My Progress</h1>
            <div className="shadow-md w-full border border-black dark:border-white mt-0">
              <div
                className={`rounded-lg shadow-md p-6 h-full ${
                  darkMode ? "bg-gray-800" : "bg-gray-100"
                }`}
              >
                <div className="mt-6">
                  <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    headerToolbar={{
                      left: "prev,next today",
                      center: "title",
                      right: "dayGridMonth,timeGridWeek,timeGridDay",
                    }}
                    initialView="dayGridMonth"
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    weekends={weekendsVisible}
                    initialEvents={INITIAL_EVENTS}
                    select={handleDateSelect}
                    eventContent={renderEventContent}
                    eventClick={handleEventClick}
                    eventsSet={handleEvents}
                    dayCellClassNames={dayCellClassNames}
                    height="400px"
                    className={darkMode ? "dark" : ""}
                  />
                  <style jsx global>{`
                    .fc .fc-toolbar-title,
                    .fc .fc-daygrid-day-top,
                    .fc .fc-daygrid-day-number,
                    .fc .fc-daygrid-day-frame,
                    .fc .fc-daygrid-day-events,
                    .fc .fc-col-header-cell-cushion,
                    .fc .fc-timegrid-axis-cushion,
                    .fc .fc-timegrid-slot-label-cushion {
                      color: ${darkMode ? "#ffffff" : "#1f2937"} !important;
                    }

                    .fc .fc-daygrid-day,
                    .fc .fc-timegrid-slot {
                      border: 1px solid ${darkMode ? "#ffffff" : "#000000"} !important;
                    }

                    .fc .fc-col-header-cell,
                    .fc .fc-timegrid-axis {
                      border: 1px solid ${darkMode ? "#ffffff" : "#000000"} !important;
                    }

                    .fc .fc-timegrid-slot {
                      border-top: 1px solid ${darkMode ? "#ffffff" : "#000000"} !important;
                    }

                    .fc .fc-timegrid-slot-lane {
                      border-right: 1px solid
                        ${darkMode ? "#ffffff" : "#000000"} !important;
                    }

                    .fc-timegrid-col-frame {
                      border-right: 1px solid
                        ${darkMode ? "#ffffff" : "#000000"} !important;
                    }

                    .fc-timegrid-axis-frame {
                      border-top: 1px solid ${darkMode ? "#ffffff" : "#000000"} !important;
                    }

                    .fc .fc-daygrid {
                      border: 1px solid ${darkMode ? "#ffffff" : "#000000"} !important;
                    }

                    .fc .fc-more-popover {
                      display: none;
                    }

                    @media (max-width: 1024px) {
                      .fc .fc-toolbar-chunk:nth-child(3) {
                        display: none;
                      }
                      .fc .fc-col-header-cell-cushion {
                        font-size: 0.75rem; /* Decrease text size for day names */
                      }
                      .fc .fc-daygrid-day-events .fc-daygrid-more-link {
                        display: none; /* Hide "+2 more" text */
                      }
                    }

                    .current-date-light {
                      background-color: #ffeb3b !important;
                    }

                    .current-date-dark {
                      background-color: #f59e0b !important;
                    }
                  `}</style>
                </div>
              </div>
            </div>
            <div className="max-w-[3000px] mt-8">
              <h2 className="text-3xl font-semibold mb-4">
                Upcoming Activities
              </h2>
              <div
                className={`rounded-lg shadow-md p-5 ${
                  darkMode ? "bg-gray-800" : "bg-gray-100"
                }`}
              >
                <Carousel
                  responsive={responsive}
                  infinite={true}
                  autoPlay={false}
                  autoPlaySpeed={3000}
                  keyBoardControl={true}
                  showDots={true}
                  rtl={false ? "true" : undefined}
                  containerClass="carousel-container"
                  itemClass="carousel-item-padding-40-px"
                  customLeftArrow={<PrevArrow />}
                  customRightArrow={<NextArrow />}
                >
                  <div className="flex flex-col justify-between border border-black dark:border-white bg-gray-100 dark:bg-gray-800 p-6 rounded-lg h-full mx-4">
                    <div className="lg:flex items-center mb-3 lg:mb-0">
                      <div className="flex items-center justify-center w-10 h-10 mb-2 lg:mb-2 lg:w-16 lg:h-16 rounded-full bg-blue-500 text-white font-semibold text-lg">
                        8
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="text-sm font-bold mb-2">
                          Alice Johnson
                        </h3>
                        <p className="text-xs text-gray-400">
                          8th November 2024 • 9:30 PM - 10 PM
                        </p>
                      </div>
                    </div>
                    <div className="mt-auto flex justify-center lg:justify-end">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white lg:px-4 px-16 py-2 lg:py-2 rounded-lg text-sm">
                        Join
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between border border-black dark:border-white bg-gray-100 dark:bg-gray-800 p-6 rounded-lg h-full mx-4">
                    <div className="lg:flex items-center mb-3 lg:mb-0">
                      <div className="flex items-center justify-center w-10 h-10 mb-2 lg:mb-2 lg:w-16 lg:h-16 rounded-full bg-pink-500 text-white font-semibold text-lg">
                        10
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="text-sm font-bold mb-2">
                          Krunal Parmar
                        </h3>
                        <p className="text-xs text-gray-400">
                          10th October 2024 • 8 AM - 9 AM
                        </p>
                      </div>
                    </div>
                    <div className="mt-auto flex justify-center lg:justify-end">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white lg:px-4 px-16 py-2 lg:py-2 rounded-lg text-sm">
                        Join
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between border border-black dark:border-white bg-gray-100 dark:bg-gray-800 p-6 rounded-lg h-full mx-4">
                    <div className="lg:flex items-center mb-3 lg:mb-0">
                      <div className="flex items-center justify-center w-10 h-10 mb-2 lg:mb-2 lg:w-16 lg:h-16 rounded-full bg-green-500 text-white font-semibold text-lg">
                        18
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="text-sm font-bold mb-2">Jane Smith</h3>
                        <p className="text-xs text-gray-400">
                          18th October 2024 • 8 PM - 9 PM
                        </p>
                      </div>
                    </div>
                    <div className="mt-auto flex justify-center lg:justify-end">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white lg:px-4 px-16 py-2 lg:py-2 rounded-lg text-sm">
                        Join
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between border border-black dark:border-white bg-gray-100 dark:bg-gray-800 p-6 rounded-lg h-full mx-4">
                    <div className="lg:flex items-center mb-3 lg:mb-0">
                      <div className="flex items-center justify-center w-10 h-10 mb-2 lg:mb-2 lg:w-16 lg:h-16 rounded-full bg-orange-500 text-white font-semibold text-lg">
                        2
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="text-sm font-bold mb-2">Gautam Nigam</h3>
                        <p className="text-xs text-gray-400">
                          2nd November 2021 • 12 PM - 1 PM
                        </p>
                      </div>
                    </div>
                    <div className="mt-auto flex justify-center lg:justify-end">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white lg:px-4 px-16 py-2 lg:py-2 rounded-lg text-sm">
                        Join
                      </button>
                    </div>
                  </div>
                  {/* Additional carousel items */}
                </Carousel>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

export default Classes;