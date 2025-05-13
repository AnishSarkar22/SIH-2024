import React, { useEffect, useState } from "react";
import {
  Award,
  BadgeCheck,
  FileText,
  Shield,
  Star,
  Clock,
  ChevronRight,
  User,
  Briefcase,
  CheckCircle,
  AlertTriangle,
  Download,
  ExternalLink,
} from "lucide-react";
import Sidebar from "../components/Mentee/Sidebar";
import Header from "../components/Mentee/Header";
import html2pdf from "html2pdf.js";

const MenteeReferralsPage = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode === "enabled";
  });

  const [sidebarShrink, setSidebarShrink] = useState(false);

  const [mentorSettings, setMentorSettings] = useState({
    minimumSessions: 10, // This will be synced with mentor's settings
  });

  useEffect(() => {
    // In a real app, this would be done through an API or context
    // Here we're simulating the sync
    const handleMentorSettingsChange = (newSettings) => {
      setMentorSettings(newSettings);
    };

    // Subscribe to mentor settings changes
    // This is placeholder code - in real app would use proper state management
    window.addEventListener("mentorSettingsChange", handleMentorSettingsChange);

    return () => {
      window.removeEventListener(
        "mentorSettingsChange",
        handleMentorSettingsChange
      );
    };
  }, []);

  const checkEligibility = (sessions) => {
    return sessions >= mentorSettings.minimumSessions;
  };

  const SessionRating = ({ rating, date, feedback }) => (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div>
        <div className="flex items-center space-x-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-1">{date}</p>
        {feedback && <p className="text-gray-600 mt-2">{feedback}</p>}
      </div>
    </div>
  );

  const toggleSidebar = () => {
    setSidebarShrink(!sidebarShrink);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode ? "enabled" : "disabled");
  };
  // Mock data for endorsed skills
  const [endorsedSkills] = useState([
    {
      id: 1,
      skill: "React Development",
      level: "Expert",
      mentor: "Dr. Sarah Chen",
      date: "2024-03-10",
      badge: "Frontend Master",
      sessions: 3,
      verificationCode: "FE789XYZ",
    },
    {
      id: 2,
      skill: "Data Analysis",
      level: "Advanced",
      mentor: "Prof. James Wilson",
      date: "2024-03-05",
      badge: "Data Specialist",
      sessions: 12,
      verificationCode: "DA456ABC",
    },
  ]);

  // Mock data for referral letters
  const [referralLetters] = useState([
    {
      id: 1,
      mentor: "Dr. Sarah Chen",
      company: "TechCorp",
      position: "Senior Frontend Developer",
      date: "2024-03-15",
      status: "Verified",
      downloadUrl: "#",
    },
    {
      id: 2,
      mentor: "Prof. James Wilson",
      company: "DataTech Solutions",
      position: "Data Scientist",
      date: "2024-03-12",
      status: "Pending",
      downloadUrl: "#",
    },
  ]);

  // Mock data for endorsement progress
  const [endorsementProgress] = useState([
    {
      skill: "Machine Learning",
      mentor: "Dr. Michael Brown",
      sessionsCompleted: 8,
      sessionsRequired: 10,
      progress: 80,
    },
    {
      skill: "System Design",
      mentor: "Prof. Emily White",
      sessionsCompleted: 5,
      sessionsRequired: 12,
      progress: 42,
    },
  ]);

  const generateReferralLetterHTML = (endorsement) => {
    return `
      <div style="padding: 40px; font-family: Arial, sans-serif;">
        <div style="text-align: right">${new Date().toLocaleDateString()}</div>
        
        <div style="margin-top: 40px;">
          Dr. ${endorsement.mentor}
          <br />
          Professional Mentor
          <br />
          12 Wellness Drive
          <br />
          Sydney NSW 2000
        </div>
  
        <div style="margin-top: 40px;">
          To Whom It May Concern,
        </div>
  
        <div style="margin-top: 20px;">
          I am writing this letter to provide a professional endorsement for [Mentee Name] in the field of ${
            endorsement.skill
          }. 
          Throughout our mentoring sessions, [Mentee Name] has demonstrated exceptional proficiency and dedication in this area.
        </div>
  
        <div style="margin-top: 20px;">
          Based on our work together, I can confidently attest that [Mentee Name] has achieved a ${
            endorsement.level
          } level of expertise in ${endorsement.skill}. 
          They have consistently demonstrated strong problem-solving abilities and a commitment to professional growth.
        </div>
  
        <div style="margin-top: 20px;">
          I highly recommend [Mentee Name] for positions requiring ${
            endorsement.skill
          } expertise. Their skills, combined with their 
          professional attitude and work ethic, make them an excellent candidate for such roles.
        </div>
  
        <div style="margin-top: 40px;">
          Sincerely,
          <br /><br />
          ${endorsement.mentor}
          <br />
          Professional Mentor
          <br />
          Endorsement Date: ${endorsement.date}
          <br />
          Verification Code: ${Math.random()
            .toString(36)
            .substring(7)
            .toUpperCase()}
        </div>
      </div>
    `;
  };

  const handleDownloadReferralLetter = (endorsement) => {
    const element = document.createElement("div");
    element.innerHTML = generateReferralLetterHTML(endorsement);

    const opt = {
      margin: 1,
      filename: `referral_letter_${endorsement.skill.replace(/\s+/g, "_")}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  const SessionProgress = ({ sessions }) => (
    <div className="space-y-4">
      {sessions.map((session, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Session {session.sessionId}</h3>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                session.completed
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {session.completed ? "Completed" : "Scheduled"}
            </span>
          </div>

          {session.completed && (
            <>
              <div className="flex items-center mb-4">
                <span className="text-gray-600 mr-2">Mentor Rating:</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < session.rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="text-gray-600">
                <p>
                  <span className="font-medium">Focus:</span> {session.focus}
                </p>
                <p>
                  <span className="font-medium">Skills Covered:</span>{" "}
                  {session.skillsCovered.join(", ")}
                </p>
                <p className="mt-2">
                  <span className="font-medium">Mentor Feedback:</span>{" "}
                  {session.feedback}
                </p>
              </div>
            </>
          )}

          <div className="mt-4 text-sm text-gray-500">
            {new Date(session.date).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );

  const ReferralEligibilityStatus = ({
    totalSessions,
    requiredSessions,
    averageRating,
  }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
      <h3 className="text-lg font-semibold mb-4">
        Referral Eligibility Status
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600">Sessions Completed</p>
          <div className="flex items-center mt-1">
            <div className="text-xl text-black text-bold">
              {5}/{5}
            </div>
            {totalSessions >= requiredSessions && (
              <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
            )}
          </div>
        </div>

        <div>
          <p className="text-gray-600">Average Rating</p>
          <div className="flex items-center mt-1">
            <p className="text-2xl font-bold">{averageRating.toFixed(1)}</p>
            <Star className="h-5 w-5 text-yellow-400 ml-2" />
          </div>
        </div>
      </div>
    </div>
  );

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
        {/* Header */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white dark:bg-gray-900 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-700">
          <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                  My Referrals & Endorsements
                </h1>
                <p className="text-gray-600 mt-2">
                  Track your skill validations and professional referrals
                </p>
              </div>

              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Endorsed Skills</p>
                      <p className="text-2xl font-bold">
                        {endorsedSkills.length}
                      </p>
                    </div>
                    <Award className="h-8 w-8 text-blue-500" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Active Mentors</p>
                      <p className="text-2xl font-bold">3</p>
                    </div>
                    <User className="h-8 w-8 text-green-500" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Sessions</p>
                      <p className="text-2xl font-bold">5</p>
                    </div>
                    <Clock className="h-8 w-8 text-purple-500" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Referral Letters</p>
                      <p className="text-2xl font-bold">
                        {referralLetters.length}
                      </p>
                    </div>
                    <FileText className="h-8 w-8 text-orange-500" />
                  </div>
                </div>
              </div>

              {/* Eligibility Status */}
              <ReferralEligibilityStatus
  totalSessions={3}
  requiredSessions={5}
  averageRating={4.2}
/>

              {/* Session History with Ratings */}
              <div className="bg-white rounded-lg shadow mb-8">
                <div className="p-6 border-b flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Session History</h2>
                  <span className="text-sm text-gray-500">
                    5
                    Total Sessions
                  </span>
                </div>
                <div className="p-6">
                  <SessionProgress
                    sessions={[
                      {
                        sessionId: 1,
                        date: "2024-02-01",
                        focus: "Fundamentals",
                        completed: true,
                        rating: 4,
                        skillsCovered: ["Basic Concepts", "Best Practices"],
                        feedback: "Excellent grasp of core concepts",
                      },
                      {
                        sessionId: 2,
                        date: "2024-02-15",
                        focus: "Advanced Topics",
                        completed: true,
                        rating: 5,
                        skillsCovered: [
                          "System Architecture",
                          "Performance Optimization",
                        ],
                        feedback: "Outstanding work on complex problems",
                      },
                      {
                        sessionId: 3,
                        date: "2024-03-01",
                        focus: "Project Implementation",
                        completed: true,
                        rating: 4,
                        skillsCovered: ["Project Planning", "Code Quality"],
                        feedback:
                          "Good project execution and attention to detail",
                      },
                      {
                        sessionId: 4,
                        date: "2024-03-04",
                        focus: "Project Implementation",
                        completed: true,
                        rating: 4,
                        skillsCovered: ["Program Management", "Management Skills"],
                        feedback:
                          "Good project execution and attention to detail",
                      },
                      {
                        sessionId: 5,
                        date: "2024-03-08",
                        focus: "Project Implementation",
                        completed: true,
                        rating: 4,
                        skillsCovered: ["Planning", "Communication"],
                        feedback:
                          "Outstanding execution and attention to detail",
                      },
                      {
                        sessionId: 6,
                        date: "2024-03-15",
                        focus: "Testing & Deployment",
                        completed: false,
                        rating: null,
                        skillsCovered: ["Unit Testing", "CI/CD Pipeline"],
                        feedback: "Scheduled"
                      },
                      {
                        sessionId: 7,
                        date: "2024-03-30",
                        focus: "Final Review",
                        completed: false,
                        rating: null,
                        skillsCovered: ["Code Review", "Documentation"],
                        feedback: "Scheduled"
                      }
                      // Add more sessions as needed
                    ]}
                  />
                </div>
              </div>

              {/* Referral Letters Section */}
              <div className="bg-white rounded-lg shadow mb-8">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold">Referral Letters</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {referralLetters.map((letter) => (
                      <div key={letter.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center">
                              <Briefcase className="h-5 w-5 text-gray-400 mr-2" />
                              <h3 className="font-semibold">
                                {letter.position} at {letter.company}
                              </h3>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              Written by {letter.mentor} • {letter.date}
                            </p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm flex items-center ${
                                letter.status === "Verified"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {letter.status === "Verified" ? (
                                <CheckCircle className="h-4 w-4 mr-1" />
                              ) : (
                                <Clock className="h-4 w-4 mr-1" />
                              )}
                              {letter.status}
                            </span>
                            <button
                              onClick={() =>
                                handleDownloadReferralLetter({
                                  skill: letter.position,
                                  mentor: letter.mentor,
                                  level: "Professional",
                                  date: letter.date,
                                })
                              }
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <Download className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* In Progress Section */}
              {/* <div className="bg-white rounded-lg shadow mb-8">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold">
                    Endorsements In Progress
                  </h2>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    {endorsementProgress.map((item, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold">{item.skill}</h3>
                            <p className="text-sm text-gray-600 mt-1">
                              Mentored by {item.mentor}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-600">
                              {item.sessionsCompleted} of{" "}
                              {item.sessionsRequired} sessions completed
                            </div>
                            <div className="mt-2 w-48 h-2 bg-gray-200 rounded-full">
                              <div
                                className="h-full bg-blue-500 rounded-full"
                                style={{ width: `${item.progress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div> */}

              {/* Guidelines Section */}
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold">Referral Guidelines</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Requirements</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span>
                            Minimum 5 mentoring
                            sessions completed
                          </span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span>
                            Demonstrated proficiency in claimed skills
                          </span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <span>
                            Regular participation in skill assessments
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Important Notes</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                          <span>
                            Referrals are merit-based and not guaranteed
                          </span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                          <span>All endorsements undergo verification</span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                          <span>
                            Maintain professional conduct during the process
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MenteeReferralsPage;