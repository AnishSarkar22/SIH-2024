import React, { useState, useEffect, useRef } from "react";
import MHeader from "./MHeader"; // Import Mentor Header component
import MSidebar from "./MSidebar"; // Import Mentor Sidebar component
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "./event-utils"; // Correct import
import Carousel from "react-multi-carousel"; // Import Carousel component
import "react-multi-carousel/lib/styles.css"; // Import Carousel styles
import "../index.css"; // Import the stylesheet
import { ChevronLeft, ChevronRight } from "react-feather";

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

function MSchedule() {
  const [sidebarShrink, setSidebarShrink] = useState(() => {
    const savedSidebarState = localStorage.getItem("sidebarState");
    return savedSidebarState === "shrink";
  }); // Set initial state from localStorage

  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode === "enabled";
  }); // Set initial state from localStorage

  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode ? "enabled" : "disabled");
  }, [darkMode]); // Ensure dark mode is applied correctly

  useEffect(() => {
    localStorage.setItem("sidebarState", sidebarShrink ? "shrink" : "expanded");
  }, [sidebarShrink]); // Save sidebar state to localStorage

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleSidebar = () => setSidebarShrink(!sidebarShrink);

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

  return (
    <div className={`flex h-screen bg-white ${darkMode ? "dark" : ""}`}>
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
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white dark:bg-gray-900 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-700">
          <div className="container mx-auto px-6">
            {/* <h1 className="text-3xl font-bold text-center text-gray-700 dark:text-gray-200">
              Classes Page
            </h1> */}
            <div className="flex-1 p-6 space-y-2">
              {/* Calendar Section */}
              <div className="container mx-auto px-6">
                <h1 className="text-3xl mb-2 font-bold text-left text-gray-700 dark:text-white">
                  My Progress
                </h1>
                <div className="shadow-md max-w-[2000px] mt-0">
                  {/* Reduced gap by setting mt-0 */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-full">
                    <FullCalendar
                      plugins={[
                        dayGridPlugin,
                        timeGridPlugin,
                        interactionPlugin,
                      ]}
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
                      initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
                      select={handleDateSelect}
                      eventContent={renderEventContent} // custom render function
                      eventClick={handleEventClick}
                      eventsSet={handleEvents} // called after events are initialized/added/changed/removed
                      height="400px" // Set the height of the calendar
                      className={darkMode ? "dark" : ""}
                      style={{
                        "--fc-bg-color": darkMode ? "#1f2937" : "#ffffff",
                        "--fc-border-color": darkMode ? "#ffffff" : "#000000",
                        "--fc-text-color": darkMode ? "#ffffff" : "#1f2937",
                        "--fc-event-bg-color": darkMode ? "#2563eb" : "#3b82f6",
                        "--fc-event-border-color": darkMode
                          ? "#2563eb"
                          : "#3b82f6",
                        "--fc-event-text-color": darkMode
                          ? "#ffffff"
                          : "#ffffff",
                      }}
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
                        border-top: 1px solid
                          ${darkMode ? "#ffffff" : "#000000"} !important;
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
                        border-top: 1px solid
                          ${darkMode ? "#ffffff" : "#000000"} !important;
                      }

                      // .fc .fc-daygrid-day-frame {
                      //   border: 1px solid ${darkMode ? "#ffffff" : "#000000"} !important;
                      // }

                      .fc .fc-daygrid {
                        border: 1px solid ${darkMode ? "#ffffff" : "#000000"} !important;
                      }
                    `}</style>
                  </div>
                </div>
              </div>
              {/* Upcoming Activities Section */}
              <div className="max-w-[3000px] p-7">
              <h2 className="text-3xl text-gray-700 dark:text-white font-semibold mb-4">
                    Upcoming Activities
                  </h2>
                <div className="bg-white text-gray-700 dark:text-white dark:bg-gray-900 rounded-lg shadow-md p-5">
                  <Carousel
                    responsive={responsive}
                    infinite={true}
                    autoPlay={false} // Set autoPlay to false to stop automatic scrolling
                    autoPlaySpeed={3000}
                    keyBoardControl={true}
                    showDots={true}
                    rtl={false ? "true" : undefined} // Ensure rtl is passed as a string or omitted
                    containerClass="carousel-container"
                    itemClass="carousel-item-padding-40-px"
                    customLeftArrow={<PrevArrow />}
                    customRightArrow={<NextArrow />}
                  >
                    <div className="flex flex-col justify-between bg-gray-100 dark:bg-gray-800 p-6 rounded-lg h-full mx-4">
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-500 text-white font-semibold text-lg">
                          8
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="text-sm dark:text-white font-bold mb-2">
                            Alice Johnson
                          </h3>
                          <p className="text-xs text-gray-600 dark:text-gray-300">
                            8th November 2024 • 9:30 PM - 10 PM
                          </p>
                        </div>
                      </div>
                      <div className="mt-auto flex justify-end">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm">
                          Join
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between bg-gray-100 dark:bg-gray-800 p-6 rounded-lg h-full mx-4">
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-pink-500 text-white font-semibold text-lg">
                          10
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="text-sm dark:text-white font-bold mb-2">
                            Krunal Parmar
                          </h3>
                          <p className="text-xs text-gray-600 dark:text-gray-300">
                            10th October 2024 • 8 AM - 9 AM
                          </p>
                        </div>
                      </div>
                      <div className="mt-auto flex justify-end">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm">
                          Join
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between bg-gray-100 dark:bg-gray-800 p-6 rounded-lg h-full mx-4">
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-500 text-white font-semibold text-lg">
                          18
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="text-sm dark:text-white font-bold mb-2">
                            Jane Smith
                          </h3>
                          <p className="text-xs text-gray-600 dark:text-gray-300">
                            18th October 2024 • 8 PM - 9 PM
                          </p>
                        </div>
                      </div>
                      <div className="mt-auto flex justify-end">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm">
                          Join
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between bg-gray-100 dark:bg-gray-800 p-6 rounded-lg h-full mx-4">
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-orange-500 text-white font-semibold text-lg">
                          2
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="text-sm dark:text-white font-bold mb-2">
                            Gautam Nigam
                          </h3>
                          <p className="text-xs text-gray-600 dark:text-gray-300">
                            2nd November 2021 • 12 PM - 1 PM
                          </p>
                        </div>
                      </div>
                      <div className="mt-auto flex justify-end">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm">
                          Join
                        </button>
                      </div>
                    </div>
                  </Carousel>
                </div>
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

export default MSchedule;