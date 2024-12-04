import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import {
  Flag,
  Clock,
  Check,
  Star,
  User,
  X,
  ChevronLeft,
  HelpCircle,
  Eye,
  ArrowLeft,
  Crown,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./Dialog";
import { Trophy, Medal } from "lucide-react";
import { Button } from "./Button";
import { RadioGroup, RadioGroupItem } from "./RadioGroup";
import { Label } from "./Label";

function Leaderboard() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode === "enabled";
  });

  const [sidebarShrink, setSidebarShrink] = useState(false);
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timer, setTimer] = useState(60);

  const BorderLinearProgress = styled(LinearProgress)({
    height: 8,
    width: "200px", // Adjust width as needed
    borderRadius: 4,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: "#e0e0e0",
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 4,
      backgroundColor: "#1a90ff",
    },
  });

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const toggleSidebar = () => {
    setSidebarShrink(!sidebarShrink);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode ? "enabled" : "disabled");
  };

  const openQuizModal = (quiz) => {
    setSelectedQuiz(quiz);
    setQuizModalOpen(true);
  };

  const closeQuizModal = () => {
    setQuizModalOpen(false);
    setSelectedQuiz(null);
    setSelectedAnswer("");
  };

  const handleSubmitQuiz = () => {
    console.log("Submitted answer:", selectedAnswer);
    closeQuizModal();
  };

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleQuizStart = (quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setTimer(60); // Reset timer
  };

  const handleAnswerClick = (answer) => {
    if (answer === selectedQuiz.questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < selectedQuiz.questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handleTimerEnd = () => {
    setShowScore(true);
  };

  const quizzes = [
    {
      id: 1,
      title: "Job Aptitude Assessment: Test Your Skills for Success",
      time: "15 min",
      image: "images/quiz1.png",
      questions: [
        { question: "What is 5 + 3?", options: ["5", "8", "10"], answer: "8" },
        {
          question: "What is the capital of France?",
          options: ["Paris", "Rome", "Berlin"],
          answer: "Paris",
        },
        // Add more questions...
      ],
    },
    {
      id: 2,
      title: "Personality and Career Fit Test",
      time: "15 min",
      image: "images/quiz2.jpeg",
      questions: [
        {
          question: "Are you more introverted or extroverted?",
          options: ["Introverted", "Extroverted"],
          answer: "Introverted",
        },
        {
          question: "Do you enjoy working in teams?",
          options: ["Yes", "No"],
          answer: "Yes",
        },
        // Add more questions...
      ],
    },
    {
      id: 3,
      title: "General Knowledge Test",
      time: "15 min",
      image: "images/quiz3.jpg",
      questions: [
        {
          question: "Who wrote 'Hamlet'?",
          options: ["Shakespeare", "Chaucer", "Austen"],
          answer: "Shakespeare",
        },
        {
          question: "What is the largest planet?",
          options: ["Earth", "Mars", "Jupiter"],
          answer: "Jupiter",
        },
        // Add more questions...
      ],
    },
    {
      id: 4,
      title: "Reasoning",
      time: "15 min",
      image: "images/quiz4.jpg",
      questions: [
        {
          question: "Which number comes next in the series: 2, 4, 8, 16?",
          options: ["20", "24", "32"],
          answer: "32",
        },
        {
          question: "Which shape is different?",
          options: ["Circle", "Square", "Triangle"],
          answer: "Circle",
        },
        // Add more questions...
      ],
    },
    // {
    //   id: 3,
    //   title: "Keeping Debit & Credit Cards Safe",
    //   time: "15 min",
    //   image: "images/l4.png",
    //   question:
    //     "Which of the following is NOT a safe practice for using credit cards online?",
    //   options: [
    //     "Saving card details on trusted websites",
    //     "Using a unique password for each online account",
    //     "Sharing your PIN with family members for emergencies",
    //     "Regularly checking your bank statements",
    //   ],
    // },
  ];

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
        <div className="flex-1 overflow-y-auto p-2 sm:p-4 lg:p-6 [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  [&::-webkit-scrollbar-thumb]:rounded-full
  dark:[&::-webkit-scrollbar-track]:bg-slate-700
  dark:[&::-webkit-scrollbar-thumb]:bg-slate-500">
          <div className="bg-white dark:bg-gray-900 p-2 sm:p-4 lg:p-6 flex flex-col lg:flex-row w-full gap-4">
            <div className="flex-1 bg-white shadow-md dark:bg-gray-800 rounded-lg p-4 sm:p-6 lg:p-8 w-full lg:w-2/3">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="flex-shrink-0">
                  <img
                    src="images/l1.png"
                    alt="User avatar"
                    className="w-full sm:w-40 h-auto rounded-xl object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between bg-white dark:bg-gray-800 text-gray-700 p-4 rounded-lg shadow-md">
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold dark:text-white">
                      John Doe
                    </h1>
                    <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
                      Rank up faster in 24h
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                    <div className="flex items-center">
                      <Flag className="text-blue-500 mr-2" />
                      <div>
                        <div className="text-2xl font-bold dark:text-white">
                          27
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Quiz Passed
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="text-blue-500 mr-2" />
                      <div>
                        <div className="text-2xl font-bold dark:text-white">
                          27min
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Fastest Time
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Check className="text-blue-500 mr-2" />
                      <div>
                        <div className="text-2xl font-bold dark:text-white">
                          200
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Correct Answers
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 mb-4 p-4 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm mb-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                    <span className="text-xl sm:text-2xl font-bold dark:text-white">
                      Achievements
                    </span>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <span className="text-sm text-gray-500">9/50</span>
                      <ThemeProvider theme={theme}>
                        <BorderLinearProgress
                          variant="determinate"
                          value={18}
                          sx={{
                            "& .MuiLinearProgress-bar": {
                              backgroundColor: darkMode ? "#2f4454" : "#2f4454",
                            },
                            backgroundColor: darkMode ? "#424242" : "#e0e0e0",
                          }}
                        />
                      </ThemeProvider>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                    <div className="flex flex-col items-center">
                      <img
                        src="./images/Badge_01.svg"
                        alt="Beginner Badge"
                        className="w-24 h-24"
                      />
                      <span className="text-sm mt-1 dark:text-gray-400">
                        Beginner
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <img
                        src="./images/Badge_02.svg"
                        alt="Novice Badge"
                        className="w-24 h-24"
                      />
                      <span className="text-sm mt-1 dark:text-gray-400">
                        Novice
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <img
                        src="./images/Badge_03.svg"
                        alt=" Badge"
                        className="w-24 h-24"
                      />
                      <span className="text-sm mt-1 dark:text-gray-400">
                        Master
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <img
                        src="./images/Badge_04.svg"
                        alt=" Badge"
                        className="w-24 h-24"
                      />
                      <span className="text-sm mt-1 dark:text-gray-400">
                        Master
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-8">
                    <div className="flex flex-col items-center">
                      <img
                        src="./images/Badge_05.svg"
                        alt=" Badge"
                        className="w-24 h-24"
                      />
                      <span className="text-sm mt-1 dark:text-gray-400">
                        Master
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <img
                        src="./images/Badge_06.svg"
                        alt=" Badge"
                        className="w-24 h-24"
                      />
                      <span className="text-sm mt-1 dark:text-gray-400">
                        Master
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <img
                        src="./images/Badge_07.svg"
                        alt=" Badge"
                        className="w-24 h-24"
                      />
                      <span className="text-sm mt-1 dark:text-gray-400">
                        Master
                      </span>
                    </div>
                    <div className="flex flex-col items-center">
                      <img
                        src="./images/Badge_08.svg"
                        alt=" Badge"
                        className="w-24 h-24"
                      />
                      <span className="text-sm mt-1 dark:text-gray-400">
                        Master
                      </span>
                    </div>
                    <div className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center mx-auto w-full sm:w-auto">
                      <img
                        src="./images/Badge_09.svg"
                        alt=" Badge"
                        className="w-24 h-24"
                      />
                      <span className="text-sm mt-1 dark:text-gray-400">
                        Master
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 mb-3">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl sm:text-2xl font-bold dark:text-white">
                    Featured Quizzes
                  </h2>
                  {/* <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                    onClick={toggleDropdown}
                  >
                    Category
                  </button> */}
                </div>
                {isDropdownVisible && (
                  <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg p-4 mt-2 z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                    <div className="flex flex-col justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-lg mb-2 text-center">
                          Electronics
                        </h3>
                        <ul className="list-disc list-inside space-y-1 pl-5">
                          <li>Computers</li>
                          <li>TV</li>
                          <li>Projectors</li>
                          <li>Tablets</li>
                          <li>Audio</li>
                          <li>Smartwatches</li>
                          <li>Headphones</li>
                          <li>Phones</li>
                        </ul>
                      </div>
                      <button className="text-blue-500 mt-2">See more</button>
                    </div>
                    <div className="flex flex-col justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-lg mb-2 text-center">
                          Fashion
                        </h3>
                        <ul className="list-disc list-inside space-y-1 pl-5">
                          <li>T-shirts</li>
                          <li>Jeans</li>
                          <li>Dresses</li>
                          <li>Jackets</li>
                          <li>Sweaters</li>
                          <li>Skirts</li>
                          <li>Scarves</li>
                        </ul>
                      </div>
                      <button className="text-blue-500 mt-2">See more</button>
                    </div>
                    <div className="flex flex-col justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-lg mb-2 text-center">
                          Food
                        </h3>
                        <ul className="list-disc list-inside space-y-1 pl-5">
                          <li>Fresh Fruits</li>
                          <li>Vegetables</li>
                          <li>Seafood</li>
                          <li>Canned Goods</li>
                          <li>Snacks</li>
                          <li>Beverages</li>
                        </ul>
                      </div>
                      <button className="text-blue-500 mt-2">See more</button>
                    </div>
                    <div className="flex flex-col justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-lg mb-2 text-center">
                          Sports
                        </h3>
                        <ul className="list-disc list-inside space-y-1 pl-5">
                          <li>Tents</li>
                          <li>Backpacks</li>
                          <li>Sleeping Bags</li>
                          <li>Sports Shoes</li>
                          <li>Fishing Gear</li>
                          <li>Kayaks</li>
                        </ul>
                      </div>
                      <button className="text-blue-500 mt-2">See more</button>
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {quizzes.map((quiz, index) => (
                    <a
                      key={index}
                      href={`/quiz/${quiz.id}`}
                      className="bg-white dark:bg-gray-700 rounded-lg shadow overflow-hidden block"
                    >
                      <img
                        src={quiz.image}
                        alt={quiz.title}
                        className="w-full h-32 sm:h-40 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold mb-2 dark:text-white text-sm sm:text-base">
                          {quiz.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                          {quiz.time}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
              {/* <div className="mb-1 mt-6">
                <a href="#" className="text-blue-500 dark:text-blue-400">
                  View All
                </a>
              </div> */}
            </div>

            <div className="h-120 w-full lg:w-1/3 mx-auto lg:ml-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center">
              <div className="w-full max-w-sm mx-auto">
                <div className="p-4">
                <h1 className="text-xl sm:text-2xl font-bold dark:text-white text-center mb-4">
            Leaderboard
          </h1>

                  <div className="flex justify-between items-end mb-8 relative px-2">
                    <div className="w-1/3 bg-yellow-300 dark:text-black rounded-lg p-2 text-center -mb-4 mt-8 relative z-0 translate-x-2 shadow-xl">
                      <div className="w-14 h-14 mx-auto mb-2 rounded-full overflow-hidden">
                        <img
                          src="images/illus-avatar-3.svg"
                          alt="Shraddha"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="font-semibold text-sm">Shraddha</p>
                      <p className="text-xs">99348</p>
                      <div className="text-2xl font-bold -mt-1">2</div>
                    </div>
                    <div className="w-1/3 bg-yellow-200 dark:text-black rounded-lg p-2 text-center relative z-20 -mb-4 transform scale-110 shadow-xl">
                      <Crown className="w-8 h-8 text-yellow-500 absolute -top-4 left-1/2 transform -translate-x-1/2" />
                      <div className="w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden">
                        <img
                          src="images/illus-avatar-1.svg"
                          alt="Soniya"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="font-semibold text-sm">Soniya</p>
                      <p className="text-xs">102456</p>
                      <div className="text-3xl font-bold -mt-1">1</div>
                    </div>
                    <div className="w-1/3 bg-yellow-400 dark:text-black rounded-lg p-2 text-center -mb-4 mt-8 relative z-0 shadow-xl -translate-x-2">
                      <div className="w-12 h-12 mx-auto mb-2 rounded-full overflow-hidden">
                        <img
                          src="images/illus-avatar-2.svg"
                          alt="Kartik"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="font-semibold text-sm">Kartik</p>
                      <p className="text-xs">95627</p>
                      <div className="text-xl font-bold -mt-1">3</div>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-100 rounded-lg p-4">
                  <div className="flex justify-center mb-2">
                    <div className="bg-orange-200 rounded-full overflow-hidden">
                      <button className="px-6 py-2 text-orange-800">
                        July
                      </button>
                      <button className="px-6 py-2 text-orange-800">
                        August
                      </button>
                      <button className="px-6 py-2 bg-orange-500 text-white">
                        Sep
                      </button>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold mb-2 dark:text-black">Top Scorers</h2>

                  {[
                    { rank: 4, name: "Michael Scott", score: 94120 },
                    { rank: 5, name: "Jim Halpert", score: 93672 },
                    { rank: 6, name: "Pam Beesly", score: 90150 },
                    { rank: 7, name: "Dwight Schrute", score: 89327 },
                    { rank: 8, name: "Andy Bernard", score: 85143 },
                    { rank: 9, name: "Kelly Kapoor", score: 80212 },
                    { rank: 10, name: "Oscar Martinez", score: 78549 },
                  ].map((player) => (
                    <div
                      key={player.rank}
                      className="bg-white rounded-xl p-4 flex items-center mb-4 shadow-sm"
                    >
                      <div className="text-2xl font-bold text-orange-500 w-8">
                        {player.rank}
                      </div>
                      <div className="w-12 h-12 rounded-full overflow-hidden mx-4">
                        <img
                          src="/placeholder.svg"
                          alt={player.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <p className="font-semibold text-gray-900">{player.name}</p>
                      </div>
                      <div className="text-orange-500 font-semibold">
                        {player.score}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={quizModalOpen} onOpenChange={closeQuizModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{selectedQuiz?.title}</DialogTitle>
            <DialogDescription>Time: {selectedQuiz?.time}</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-4">{selectedQuiz?.question}</p>
            <RadioGroup
              value={selectedAnswer}
              onValueChange={setSelectedAnswer}
            >
              {selectedQuiz?.options.map((option, index) => (
                <div key={index} className="flex flex-col space-y-2 mb-2">
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <DialogFooter>
            <Button onClick={handleSubmitQuiz} disabled={!selectedAnswer}>
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Leaderboard;