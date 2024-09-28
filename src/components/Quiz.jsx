import React, { useState, useRef } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

function Quiz() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode === "enabled";
  }); // Set initial state from localStorage

  const [sidebarShrink, setSidebarShrink] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const toggleSidebar = () => {
    setSidebarShrink(!sidebarShrink);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode ? "enabled" : "disabled");
  };

  const quizDetailsRef = useRef(null);

  const scrollToQuizDetails = () => {
    if (quizDetailsRef.current) {
      quizDetailsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const questions = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Lisbon"],
      answer: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    // Add more questions as needed
  ];

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div
      className={`flex h-screen ${
        darkMode ? "dark" : ""
      } bg-white dark:bg-gray-900`}
    >
      <Sidebar
        sidebarShrink={sidebarShrink}
        isDarkMode={darkMode}
        toggleSidebar={toggleSidebar}
      />
      <div className="flex-1 flex flex-col overflow-hidden dark:bg-gray-900 dark:text-white">
        <Header
          toggleSidebar={toggleSidebar}
          sidebarShrink={sidebarShrink}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />

        {/* Quiz Content */}
        <div className="flex flex-col md:flex-row p-8 overflow-y-auto ">
          {/* Left Section - Quiz Video and Details */}
          <div className="md:w-2/3 p-2">
            <h2 className="text-blue-600 dark:text-blue-400 font-semibold text-xl mb-2">
              Protecting the Organisation from Cyber Attacks
            </h2>
            <div className="bg-white dark:bg-gray-900 p-2 rounded-lg shadow-md">
              <img
                src="/images/l2.png"
                alt="Quiz Preview"
                className="rounded-lg mb-2"
                style={{ width: "80%", height: "20rem" }}
              />
              <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center mb-2">
                <span className="mr-2">1.6k views</span>
                <span className="mr-2">•</span>
                <span>145 likes</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                One of the most efficient ways to protect against cyber attacks
                and all types of data breaches is to train your employees on
                cyber attack prevention.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                The quiz consists of questions. To be successful with the
                quizzes, it’s important to conversant with the topic by paying
                attention to the short video.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                To start, click the “Start” button. When finished, click the
                “Submit” button.
              </p>
              <button
                onClick={scrollToQuizDetails}
                className="bg-blue-600 dark:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg w-full hover:bg-blue-700 dark:hover:bg-blue-600 mt-12"
              >
                View Quiz Details
              </button>
            </div>
          </div>

          {/* Right Section - Quiz Details */}
          <div className="md:w-1/3 p-2 mt-10" ref={quizDetailsRef}>
            <div className="bg-white dark:bg-gray-900 p-2 rounded-lg shadow-md">
              <div className="text-gray-700 dark:text-gray-300 mb-1">
                <strong>Time Limit:</strong> 15 Mins
              </div>
              <div className="text-gray-700 dark:text-gray-300 mb-1">
                <strong>Attempts:</strong> Twice
              </div>
              <div className="text-gray-700 dark:text-gray-300 mb-2">
                <strong>Pass Points:</strong> 80 Points
              </div>
              <button
                onClick={() => setIsDialogOpen(true)}
                className="bg-blue-600 dark:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg w-full hover:bg-blue-700 dark:hover:bg-blue-600 mt-6"
              >
                Start Quiz
              </button>
            </div>
          </div>
        </div>

        {/* Dialog Box */}
        {isDialogOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg w-3/4 md:w-1/2">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">
                Quiz
              </h2>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2 dark:text-gray-100">
                  {questions[currentQuestion].question}
                </h3>
                <ul>
                  {questions[currentQuestion].options.map((option, index) => (
                    <li key={index} className="mb-2">
                      <label className="flex items-center">
                        <input type="radio" name="option" className="mr-2" />
                        <span className="dark:text-gray-300">{option}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={handlePreviousQuestion}
                  className="bg-gray-600 dark:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600"
                  disabled={currentQuestion === 0}
                >
                  Previous
                </button>
                <button
                  onClick={handleNextQuestion}
                  className="bg-blue-600 dark:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600"
                  disabled={currentQuestion === questions.length - 1}
                >
                  Next
                </button>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setIsDialogOpen(false)}
                  className="mt-4 bg-red-600 dark:bg-red-500 text-white font-semibold py-2 px-4 rounded-lg w-40 hover:bg-red-700 dark:hover:bg-red-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Quiz;