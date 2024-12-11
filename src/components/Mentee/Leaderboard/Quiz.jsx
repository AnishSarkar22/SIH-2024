import React, { useState, useRef } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";

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
      question:
        "Problem Solving: A man has 6 shirts and 3 pairs of pants. How many different outfits can he make, assuming each outfit consists of one shirt and one pair of pants?",
      options: ["9", "18", "24", "36"],
      answer: "18",
    },
    {
      question:
        "Logical Reasoning: In a certain code language, “MIND” is written as “OMLF”. How would “WORK” be written in the same code?",
      options: ["XPTL", "XQTL", "XRTL", "YQTL"],
      answer: "XQTL",
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
              Job Aptitude Assessment: Test Your Skills for Success
            </h2>
            <div className="bg-white dark:bg-gray-900 p-2 rounded-lg shadow-md">
              <img
                src="images/quiz1.png"
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
                This quiz is designed to assess your aptitude for job-related
                skills, such as problem-solving, logical reasoning, and
                numerical ability. These questions are typical of what
                candidates might face during recruitment processes for various
                roles.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                By testing your analytical skills, this quiz will help you
                understand areas where you might excel and where you can
                improve, enhancing your preparation for job aptitude tests.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                To start, click the “Start Quiz” button. When finished, click
                the “Submit” button.
              </p>
              {/* <button
                onClick={scrollToQuizDetails}
                className="bg-blue-600 dark:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg w-full hover:bg-blue-700 dark:hover:bg-blue-600 mt-12"
              >
                View Quiz Details
              </button> */}
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
