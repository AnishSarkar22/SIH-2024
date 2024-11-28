import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Flag, Clock, Check, Star, User, X, ChevronLeft, HelpCircle, Eye, ArrowLeft, Crown } from "lucide-react";
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

  const topPerformers = [
    { name: "Soniya", score: 102456, rank: 1, avatar: "/avatars/soniya.jpg" },
    { name: "Shraddha", score: 99348, rank: 2, avatar: "/avatars/shraddha.jpg" },
    { name: "Kartik", score: 95627, rank: 3, avatar: "/avatars/kartik.jpg" },
  ];

  const userStats = {
    name: "John Doe",
    quizzesPassed: 27,
    fastestTime: "27min",
    correctAnswers: 200,
  };

  const featuredQuizzes = [
    {
      id: 1,
      title: "Job Aptitude Assessment: Test Your Skills for Success",
      duration: "15 min",
      image: "/images/aptitude-test.png",
    },
    {
      id: 2,
      title: "Personality and Career Fit Test",
      duration: "15 min",
      image: "/images/personality-test.png",
    },
  ];

  const monthlyTopScorers = [
    { rank: 4, name: "Jacob Jones", score: 94120, avatar: "/avatars/jacob.jpg" },
    { rank: 5, name: "Esther Howard", score: 93672, avatar: "/avatars/esther.jpg" },
    { rank: 6, name: "Robert Fox", score: 90150, avatar: "/avatars/robert.jpg" },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="flex">
        <Sidebar shrink={sidebarShrink} darkMode={darkMode} />
        <div className="flex-1 p-8">
          <Header 
            toggleSidebar={toggleSidebar} 
            toggleDarkMode={toggleDarkMode} 
            darkMode={darkMode}
          />
          
          <div className="grid grid-cols-12 gap-8 mt-8">
            {/* Profile Stats */}
            <div className="col-span-12 lg:col-span-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-6">
                  <img 
                    src={userStats.avatar || "/default-avatar.png"} 
                    alt="Profile" 
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-2xl font-semibold">{userStats.name}</h2>
                    <p className="text-gray-500 dark:text-gray-400">Rank up faster in 24h</p>
                    <div className="flex gap-8 mt-4">
                      <div className="text-center">
                        <Flag className="w-5 h-5 mx-auto text-blue-500" />
                        <div className="mt-2 font-semibold">{userStats.quizzesPassed}</div>
                        <div className="text-sm text-gray-500">Quiz Passed</div>
                      </div>
                      <div className="text-center">
                        <Clock className="w-5 h-5 mx-auto text-green-500" />
                        <div className="mt-2 font-semibold">{userStats.fastestTime}</div>
                        <div className="text-sm text-gray-500">Fastest Time</div>
                      </div>
                      <div className="text-center">
                        <Check className="w-5 h-5 mx-auto text-purple-500" />
                        <div className="mt-2 font-semibold">{userStats.correctAnswers}</div>
                        <div className="text-sm text-gray-500">Correct Answers</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Featured Quizzes */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Featured Quizzes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredQuizzes.map((quiz) => (
                    <div 
                      key={quiz.id}
                      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => openQuizModal(quiz)}
                    >
                      <img 
                        src={quiz.image} 
                        alt={quiz.title} 
                        className="w-full h-40 object-cover rounded-lg mb-4"
                      />
                      <h4 className="font-semibold mb-2">{quiz.title}</h4>
                      <div className="flex items-center text-gray-500">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{quiz.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Leaderboard */}
            <div className="col-span-12 lg:col-span-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-6">Leaderboard</h3>
                
                {/* Top 3 Performers */}
                <div className="flex justify-center items-end gap-4 mb-8">
                  {topPerformers.map((performer) => (
                    <div 
                      key={performer.rank}
                      className={`text-center ${
                        performer.rank === 1 ? 'order-2' :
                        performer.rank === 2 ? 'order-1' : 'order-3'
                      }`}
                    >
                      <div className="relative">
                        <img 
                          src={performer.avatar} 
                          alt={performer.name}
                          className={`rounded-full mx-auto ${
                            performer.rank === 1 ? 'w-20 h-20' : 'w-16 h-16'
                          }`}
                        />
                        {performer.rank === 1 && (
                          <Crown className="w-6 h-6 text-yellow-400 absolute -top-3 left-1/2 transform -translate-x-1/2" />
                        )}
                      </div>
                      <div className="mt-2">
                        <div className="font-semibold">{performer.name}</div>
                        <div className="text-sm text-gray-500">{performer.score}</div>
                        <div className="text-lg font-bold">{performer.rank}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Monthly Top Scorers */}
                <div className="bg-orange-50 dark:bg-gray-700 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold">Top Scorers</h4>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 rounded-full text-gray-500">July</button>
                      <button className="px-3 py-1 rounded-full text-gray-500">August</button>
                      <button className="px-3 py-1 rounded-full bg-orange-500 text-white">Sep</button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {monthlyTopScorers.map((scorer) => (
                      <div key={scorer.rank} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-orange-500 font-semibold w-6">{scorer.rank}</span>
                          <img 
                            src={scorer.avatar} 
                            alt={scorer.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="font-medium">{scorer.name}</span>
                        </div>
                        <span className="text-gray-500">{scorer.score}</span>
                      </div>
                    ))}
                  </div>
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
            <DialogDescription>Time: {selectedQuiz?.duration}</DialogDescription>
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