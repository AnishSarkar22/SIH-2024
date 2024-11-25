import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function Resource() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode === "enabled";
  });

  const [sidebarShrink, setSidebarShrink] = useState(false);

  const toggleSidebar = () => {
    setSidebarShrink(!sidebarShrink);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode ? "enabled" : "disabled");
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
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white dark:bg-gray-900 p-6">
          <div className="space-y-10">
            {/* Notes */}
            <Section title="Notes" viewAllLink="#">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center">
                  <a
                    href="https://cdsco.gov.in/opencms/export/sites/CDSCO_WEB/Pdf-documents/medical-device/Guidelines_Grouping_of_MDandIVD.pdf"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="images/note-1.jpeg"
                      className="w-full h-auto rounded-lg mb-2"
                    />
                  </a>
                  <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                    Group Tests Guidelines
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center">
                  <a
                    href="https://files.eric.ed.gov/fulltext/ED099427.pdf"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="images/note-1.jpeg"
                      className="w-full h-auto rounded-lg mb-2"
                    />
                  </a>
                  <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                    Unit/Administration & Scoring Hours
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center">
                  <a
                    href="https://www.revenue.ie/en/tax-professionals/tdm/income-tax-capital-gains-tax-corporation-tax/part-29/29-03-01.pdf"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="images/note-1.jpeg"
                      alt="Time Apportionment Totality"
                      className="w-full h-auto rounded-lg mb-2"
                    />
                  </a>
                  <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                    Time Apportionment Totality
                  </p>
                </div>
              </div>
            </Section>
            {/* Research Paper Links */}

            <Section title="Research Paper Links" viewAllLink="#">
              <ul className="space-y-6">
                <li>
                  <a
                    href="https://www.researchgate.net/topic/journalism?"
                    className="text-blue-600 hover:underline text-sm break-all"
                  >
                    https://www.researchgate.net/topic/journalism?_tp=eyjlb250ZXh0Ijp7Im2pcnNUbUGFnZSI6InNjaWVuY2VfaHViXBpcmVjdG9yeSI9fQ%3D%3D
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.researchgate.net/topic/journalism?"
                    className="text-blue-600 hover:underline text-sm break-all"
                  >
                    https://www.researchgate.net/topic/journalism?_tp=eyjlb250ZXh0Ijp7Im2pcnNUbUGFnZSI6InNjaWVuY2VfaHViX3BpcmVjdG9yeSI9fQ%3D%3D
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.researchgate.net/topic/journalism?"
                    className="text-blue-600 hover:underline text-sm break-all"
                  >
                    https://www.researchgate.net/topic/journalism?_tp=eyjlb250ZXh0Ijp7Im2pcnNUbUGFnZSI6InNjaWVuY2VfaHViX3BpcmVjdG9yeSI9fQ%3D%3D
                  </a>
                </li>
              </ul>
            </Section>
            {/* Book Recommendation */}
            <Section title="Book Recommendations" viewAllLink="#">
              <div className="grid grid-cols-3 gap-4">
                <BookCover
                  src="images/Soul.jpeg"
                  alt="Soul by Olivia Wilson"
                  title="Soul"
                  author="Olivia Wilson"
                />
                <BookCover
                  src="images/art-of-teaching.jpeg"
                  alt="The Art of Teaching Children by Phillip Done"
                  title="The Art of Teaching Children"
                  author="Phillip Done"
                />
                <BookCover
                  src="images/educational-technology.jpeg"
                  alt="Educational Technology: A Primer for the 21st Century"
                  title="Educational Technology"
                  author="Ronghuai Huang, J. Michael Spector, Junfeng Yang"
                />
              </div>
            </Section>
          </div>
        </main>
      </div>
    </div>
  );
}

function Section({ title, children, viewAllLink }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h2>
        <a
          href={viewAllLink}
          className="text-blue-600 hover:underline flex items-center text-lg"
        >
          view all{" "}
          <FontAwesomeIcon
            icon={faChevronRight}
            style={{ fontSize: "12px", marginLeft: "8px" }}
          />
        </a>
      </div>
      {children}
    </div>
  );
}

function BookCover({ src, alt, title, author }) {
  return (
    <div className="flex flex-col items-center">
      <img
        src={src}
        alt={alt}
        className="w-30 h-auto rounded-lg shadow-md mb-2"
      />
      <h3 className="text-sm font-medium text-gray-900 dark:text-white text-center">
        {title}
      </h3>
      <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
        {author}
      </p>
    </div>
  );
}

export default Resource;
