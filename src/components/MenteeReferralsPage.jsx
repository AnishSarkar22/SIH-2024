import React, { useState } from "react";
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
      sessions: 15,
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

  const SessionProgress = ({ isOpen, sessions }) => {
    if (!isOpen) return null;

    return (
      <div className="mt-4 bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium mb-4">Session Progress</h4>
        <div className="space-y-4">
          {sessions.map((session, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Session {index + 1}</span>
                <span
                  className={`text-sm px-2 py-1 rounded-full ${
                    session.completed
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {session.completed ? "Completed" : "Scheduled"}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                <div>Date: {session.date}</div>
                <div>Focus: {session.focus}</div>
                {session.completed && (
                  <div className="mt-2">
                    <div>
                      Skills Covered: {session.skillsCovered.join(", ")}
                    </div>
                    <div>Mentor Feedback: {session.feedback}</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
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
                      <p className="text-2xl font-bold">27</p>
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

              {/* Endorsed Skills Section */}
              {/* Endorsed Skills Section */}
              <div className="bg-white rounded-lg shadow mb-8">
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold">Endorsed Skills</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    {endorsedSkills.map((skill) => (
                      <div key={skill.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold">
                              {skill.skill}
                            </h3>
                            <p className="text-gray-600">
                              Endorsed by {skill.mentor} • Level: {skill.level}
                            </p>
                            <p className="text-sm text-gray-500">
                              Date: {skill.date}
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              const element = document.getElementById(
                                `sessions-${skill.id}`
                              );
                              element.style.display =
                                element.style.display === "none"
                                  ? "block"
                                  : "none";
                            }}
                            className="px-3 py-1 border rounded-lg hover:bg-gray-50"
                          >
                            View Sessions
                          </button>
                        </div>
                        <div
                          id={`sessions-${skill.id}`}
                          style={{ display: "none" }}
                        >
                          <SessionProgress
                            isOpen={true}
                            sessions={[
                              {
                                date: "2024-02-01",
                                focus: "Fundamentals",
                                completed: true,
                                skillsCovered: [
                                  "Basic Concepts",
                                  "Best Practices",
                                ],
                                feedback: "Excellent grasp of core concepts",
                              },
                              {
                                date: "2024-02-15",
                                focus: "Advanced Topics",
                                completed: true,
                                skillsCovered: [
                                  "Advanced Patterns",
                                  "Real-world Applications",
                                ],
                                feedback:
                                  "Shows strong problem-solving abilities",
                              },
                              {
                                date: "2024-03-01",
                                focus: "Expert Level Concepts",
                                completed: false,
                                skillsCovered: [],
                                feedback: "",
                              },
                            ]}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
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
                          <span>Minimum 10 mentoring sessions completed</span>
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