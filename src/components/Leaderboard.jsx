import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Flag, Clock, Check, Star, User, X, ChevronLeft, HelpCircle, Eye, ArrowLeft, Crown  } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./Dialog";
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

  const quizzes = [
    {
      id: 1,
      title: "Protecting the Organization against Phishing Attacks",
      time: "15 min",
      image: "/public/images/l2.png",
      question: "What is the most common type of phishing attack?",
      options: ["Email phishing", "Spear phishing", "Whaling", "Vishing"],
    },
    {
      id: 2,
      title: "Ransomware and Attack Landscape in Corporate",
      time: "15 min",
      image: "/public/images/l3.png",
      question: "What is ransomware?",
      options: [
        "A type of malware that encrypts files and demands payment",
        "A security software to protect against viruses",
        "A network monitoring tool",
        "A type of firewall",
      ],
    },
    {
      id: 3,
      title: "Keeping Debit & Credit Cards Safe",
      time: "15 min",
      image: "/public/images/l4.png",
      question:
        "Which of the following is NOT a safe practice for using credit cards online?",
      options: [
        "Saving card details on trusted websites",
        "Using a unique password for each online account",
        "Sharing your PIN with family members for emergencies",
        "Regularly checking your bank statements",
      ],
    },
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
        <div className="flex-1 overflow-y-auto p-4">
          <div className="bg-gray-50 dark:bg-gray-900 p-6 font-sans flex">
            <div className="flex-1 bg-white shadow-md border border-black dark:border-white dark:bg-gray-800 rounded-lg p-8">
              <div className="flex items-stretch mb-6">
                <div className="flex-shrink-0">
                  <img
                    src="/public/images/l1.png"
                    alt="User avatar"
                    className="w-48 h-full rounded-xl mr-4 object-cover"
                  />
                </div>
                <div className="flex flex-col justify-between bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6 h-full">
                  <div>
                    <h1 className="text-2xl font-bold dark:text-white">
                      John Doe
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                      Rank up faster in 24h
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-4">
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

              <div className="mb-3">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold dark:text-white">
                    Featured Quizzes
                  </h2>
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                    onClick={toggleDropdown}
                  >
                    Category
                  </button>
                </div>
                {isDropdownVisible && (
                  <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg p-4 mt-2 z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                    <div className="flex flex-col justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-lg mb-2 text-center">Electronics</h3>
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
                <div className="grid grid-cols-3 gap-4">
                  {quizzes.map((quiz, index) => (
                    <a
                      key={index}
                      href={`/quiz/${quiz.id}`}
                      className="bg-white dark:bg-gray-700 rounded-lg shadow overflow-hidden block"
                    >
                      <img
                        src={quiz.image}
                        alt={quiz.title}
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold mb-2 dark:text-white">
                          {quiz.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {quiz.time}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
              <div className="mb-1 mt-6">
                <a href="#" className="text-blue-500 dark:text-blue-400">
                  View All
                </a>
              </div>
            </div>

            <div className="w-80 h-120 ml-6 bg-gray-300 dark:bg-gray-800 p-4 rounded-lg shadow flex flex-col items-center border border-black dark:border-white">
              <div className=" min-h-screen font-sans text-black">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <ArrowLeft className="w-6 h-6 text-white" />
                    <h1 className="text-3xl font-bold text-white ml-4">LeaderBoard</h1>
                  </div>
                  
                  <div className="flex justify-between items-end mb-8">
                    <div className="w-1/3 bg-yellow-400 rounded-lg p-2 text-center -mb-4">
                      <div className="w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden">
                        <img src="/placeholder.svg" alt="Marvin" className="w-full h-full object-cover" />
                      </div>
                      <p className="font-semibold">Marvin</p>
                      <p className="text-sm">99348</p>
                      <div className="text-2xl font-bold -mt-1">2</div>
                    </div>
                    <div className="w-1/3 bg-yellow-300 rounded-lg p-2 text-center relative z-10">
                      <Crown className="w-6 h-6 text-yellow-500 absolute -top-3 right-2" />
                      <div className="w-20 h-20 mx-auto mb-2 rounded-full overflow-hidden">
                        <img src="/placeholder.svg" alt="Leslie" className="w-full h-full object-cover" />
                      </div>
                      <p className="font-semibold">Leslie</p>
                      <p className="text-sm">102456</p>
                      <div className="text-3xl font-bold -mt-1">1</div>
                    </div>
                    <div className="w-1/3 bg-yellow-400 rounded-lg p-2 text-center -mb-4">
                      <div className="w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden">
                        <img src="/placeholder.svg" alt="Kathryn" className="w-full h-full object-cover" />
                      </div>
                      <p className="font-semibold">Kathryn</p>
                      <p className="text-sm">95627</p>
                      <div className="text-2xl font-bold -mt-1">3</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-orange-100 rounded-t-[2rem] p-6">
                  <div className="flex justify-center mb-6">
                    <div className="bg-orange-200 rounded-full overflow-hidden">
                      <button className="px-6 py-2 text-orange-800">March</button>
                      <button className="px-6 py-2 text-orange-800">April</button>
                      <button className="px-6 py-2 bg-orange-500 text-white">May</button>
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-4">Top Scorers</h2>
                  
                  {[
                    { rank: 4, name: "Jacob Jones", score: 94120 },
                    { rank: 5, name: "Esther Howard", score: 93672 },
                    { rank: 6, name: "Robert Fox", score: 90150 },
                    { rank: 7, name: "Dianne Russell", score: 89327 },
                    { rank: 8, name: "Arlene McCoy", score: 85143 },
                  ].map((player) => (
                    <div key={player.rank} className="bg-white rounded-xl p-4 flex items-center mb-4 shadow-sm">
                      <div className="text-2xl font-bold text-orange-500 w-8">{player.rank}</div>
                      <div className="w-12 h-12 rounded-full overflow-hidden mx-4">
                        <img src="/placeholder.svg" alt={player.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow">
                        <p className="font-semibold">{player.name}</p>
                      </div>
                      <div className="text-orange-500 font-semibold">{player.score}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 max-w-sm mx-auto">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <ChevronLeft className="w-6 h-6 text-cyan-500 mr-2" />
                    <h2 className="text-xl font-semibold">Achievements</h2>
                  </div>
                  <span className="text-gray-500">2/40</span>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <div className="bg-red-500 rounded-full p-2 mr-4">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Newbie</h3>
                      <p className="text-gray-500 text-sm">Complete Level 1</p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-gray-200 rounded-full p-2 mr-4">
                      <HelpCircle className="w-6 h-6 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold">I'm new in Town</h3>
                      <p className="text-gray-500 text-sm">Complete your first 5 levels</p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-green-400 rounded-full p-2 mr-4">
                      <Eye className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Ridiculus</h3>
                      <p className="text-gray-500 text-sm">Complete a level with just one star</p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-gray-200 rounded-full p-2 mr-4">
                      <HelpCircle className="w-6 h-6 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Good Luck</h3>
                      <p className="text-gray-500 text-sm">Complete your first 3 levels with 3 Stars</p>
                    </div>
                  </li>
                  <li className="flex items-center">
                    <div className="bg-gray-200 rounded-full p-2 mr-4">
                      <HelpCircle className="w-6 h-6 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Nevermind</h3>
                      <p className="text-gray-500 text-sm">Use Octoblue as character in level 30</p>
                    </div>
                  </li>
                </ul>
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