import React, { useState } from "react";
import {
  Award,
  Check,
  FileText,
  Shield,
  Star,
  User,
  X,
  Settings,
  CheckCircle,
} from "lucide-react";
import MSidebar from "../components/Mentor/MSidebar";
import MHeader from "../components/Mentor/MHeader";

const MentorReferrals = () => {
  const [selectedMentee, setSelectedMentee] = useState(null);

  const [darkMode, setDarkMode] = useState(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    return savedDarkMode === "enabled";
  });

  const [sidebarShrink, setSidebarShrink] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);

  const handleSettingsUpdate = (newSettings) => {
    setMentorSettings(newSettings);
    setGuidelinesText((prev) => ({
      ...prev,
      minimumSessions: newSettings.minimumSessions,
    }));
    setSettingsModalOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarShrink(!sidebarShrink);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode ? "enabled" : "disabled");
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState({});
  const [endorsementNotes, setEndorsementNotes] = useState("");

  const [guidelinesText, setGuidelinesText] = useState({
    minimumSessions: 10,
  });

  const proficiencyLevels = ["Beginner", "Intermediate", "Advanced", "Expert"];

  const skillCategories = [
    {
      name: "Technical Skills",
      skills: ["React", "Node.js", "Python", "Data Analysis", "UI/UX"],
    },
    {
      name: "Soft Skills",
      skills: [
        "Communication",
        "Problem Solving",
        "Leadership",
        "Time Management",
      ],
    },
  ];

  const [mentees, setMentees] = useState([
    {
      id: 1,
      name: "Sarah Chen",
      sessions: 12,
      skills: ["React", "Node.js", "UI/UX"],
      endorsements: 3,
      ratings: [
        { sessionId: 1, rating: 4, date: "2024-01-15" },
        { sessionId: 2, rating: 5, date: "2024-02-01" },
      ],
      averageRating: 4.5,
      readyForReferral: true,
    },
    {
      id: 2,
      name: "James Wilson",
      sessions: 8,
      skills: ["Python", "Data Analysis"],
      endorsements: 2,
      ratings: [
        { sessionId: 1, rating: 3, date: "2024-01-20" },
        { sessionId: 2, rating: 4, date: "2024-02-05" },
      ],
      averageRating: 3.5,
      readyForReferral: false,
    },
  ]);

  const SettingsModal = ({ isOpen, onClose, currentSettings, onUpdate }) => {
    const [tempSettings, setTempSettings] = useState(currentSettings);

    const handleSave = () => {
      onUpdate(tempSettings);
    };

    return (
      isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Referral Guidelines</h3>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Minimum Required Sessions
                </label>
                <input
                  type="number"
                  min="1"
                  value={tempSettings.minimumSessions}
                  onChange={(e) =>
                    setTempSettings({
                      ...tempSettings,
                      minimumSessions: parseInt(e.target.value),
                    })
                  }
                  className="w-full border rounded-lg p-3"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <button onClick={onClose} className="px-4 py-2 border rounded-md">
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )
    );
  };

  const [mentorSettings, setMentorSettings] = useState({
    minimumSessions: 10,
  });

  const handleEndorseClick = (mentee) => {
    setSelectedMentee(mentee);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMentee(null);
    setSelectedSkills({});
    setEndorsementNotes("");
  };

  const handleSkillSelect = (skill, level) => {
    setSelectedSkills((prev) => ({
      ...prev,
      [skill]: level,
    }));
  };

  const [ratingModalOpen, setRatingModalOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [ratingNotes, setRatingNotes] = useState("");

  const handleRateSession = (mentee) => {
    setSelectedMentee(mentee);
    setRatingModalOpen(true);
    setHistoryModalOpen(false); // Close the history modal when opening rating modal
  };

  const SessionHistoryModal = ({ isOpen, onClose, mentee }) => {
    const sortedRatings = [...mentee.ratings].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    return (
      isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">
                Session History - {mentee.name}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">Average Rating</div>
                <div className="text-2xl font-bold text-blue-600">
                  {mentee.averageRating.toFixed(1)} ★
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">Total Sessions</div>
                <div className="text-2xl font-bold text-blue-600">
                  {mentee.sessions}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">Rated Sessions</div>
                <div className="text-2xl font-bold text-blue-600">
                  {mentee.ratings.length}
                </div>
              </div>
            </div>

            {/* Rating Timeline */}
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {sortedRatings.map((rating) => (
                <div
                  key={rating.sessionId}
                  className="border rounded-lg p-4 hover:bg-gray-50"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">
                        Session #{rating.sessionId}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(rating.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-xl ${
                            i < rating.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  {rating.notes && (
                    <div className="mt-2 text-gray-600 text-sm">
                      {rating.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-between">
              <button
                onClick={() => handleRateSession(mentee)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Rate New Session
              </button>
              <button onClick={onClose} className="px-4 py-2 border rounded-md">
                Close
              </button>
            </div>
          </div>
        </div>
      )
    );
  };

  const submitRating = () => {
    const updatedMentees = mentees.map((mentee) => {
      if (mentee.id === selectedMentee.id) {
        const newRating = {
          sessionId: mentee.ratings.length + 1,
          rating: selectedRating,
          date: new Date().toISOString().split("T")[0],
          notes: ratingNotes,
        };

        const allRatings = [...mentee.ratings, newRating];
        const averageRating =
          allRatings.reduce((acc, curr) => acc + curr.rating, 0) /
          allRatings.length;

        return {
          ...mentee,
          ratings: allRatings,
          averageRating,
          readyForReferral: mentee.sessions >= mentorSettings.minimumSessions,
        };
      }
      return mentee;
    });

    setMentees(updatedMentees);
    setRatingModalOpen(false);
    setSelectedRating(0);
    setRatingNotes("");
  };

  const handleSubmitEndorsement = (e) => {
    e.preventDefault();

    // Count the number of newly endorsed skills
    const newEndorsementsCount = Object.keys(selectedSkills).length;

    // Update the mentees array with the new endorsement count
    const updatedMentees = mentees.map((mentee) => {
      if (mentee.id === selectedMentee.id) {
        return {
          ...mentee,
          endorsements: mentee.endorsements + newEndorsementsCount,
        };
      }
      return mentee;
    });

    // Update the mentees state
    setMentees(updatedMentees);

    // Here you would typically send the endorsement data to your backend
    console.log({
      menteeId: selectedMentee?.id,
      endorsedSkills: selectedSkills,
      notes: endorsementNotes,
      totalEndorsed: newEndorsementsCount,
    });

    handleCloseModal();
  };

  const [referralModalOpen, setReferralModalOpen] = useState(false);
  const [referralMentorName, setReferralMentorName] = useState("");
  const [referralSignature, setReferralSignature] = useState(null);
  const [selectedMenteeForReferral, setSelectedMenteeForReferral] =
    useState(null);

  const handleReferralClick = (mentee) => {
    setSelectedMenteeForReferral(mentee);
    setReferralModalOpen(true);
  };

  const handleCloseReferralModal = () => {
    setReferralModalOpen(false);
    setReferralMentorName("");
    setReferralSignature(null);
    setSelectedMenteeForReferral(null);
  };

  const handleSignatureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReferralSignature(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitReferral = (e) => {
    e.preventDefault();
    const letterHTML = generateLetterHTML();
    setGeneratedLetter(letterHTML);
    setReferralModalOpen(false); // Close the Write Referral modal first
    setShowLetterModal(true); // Then show the Generated Letter modal

    // Here you would send the letter to your backend
    console.log({
      mentorName: referralMentorName,
      menteeName: selectedMenteeForReferral?.name,
      signature: referralSignature,
      letterContent: letterHTML,
      date: new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    });
  };

  const [generatedLetter, setGeneratedLetter] = useState(null);
  const [showLetterModal, setShowLetterModal] = useState(false);

  const generateLetterHTML = () => {
    return `
    <div style="padding: 40px; max-width: 800px; margin: 0 auto; font-family: Arial, sans-serif;">
      <div style="text-align: right; margin-bottom: 20px;">
        ${new Date().toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </div>
      
      <div style="margin-bottom: 40px;">
        <div>Dr. ${referralMentorName}</div>
        <div>Family Practice</div>
        <div>12 Wellness Drive</div>
        <div>Sydney NSW 2000</div>
      </div>

      <div style="margin-bottom: 20px;">Dear [Recipient],</div>

      <div style="margin-bottom: 20px;">
        I am writing to provide a professional referral for ${
          selectedMenteeForReferral?.name
        }, 
        who has demonstrated exceptional skills and growth during our mentoring relationship.
      </div>

      <div style="margin-bottom: 20px;">
        Throughout our sessions, ${
          selectedMenteeForReferral?.name
        } has shown proficiency in:
        ${selectedMenteeForReferral?.skills.join(", ")},
        and has completed ${
          selectedMenteeForReferral?.sessions
        } mentoring sessions.
      </div>

      <div style="margin-bottom: 40px;">
        Based on their performance and dedication, I confidently recommend 
        ${
          selectedMenteeForReferral?.name
        } for professional opportunities in their field of expertise.
      </div>

      <div style="margin-top: 40px;">
        Yours sincerely,
        <div style="margin-top: 20px;">
          <img src="${referralSignature}" alt="Signature" style="max-height: 60px;"/>
          <div>${referralMentorName}</div>
        </div>
      </div>
    </div>
  `;
  };

  const handleDownloadLetter = () => {
    const element = document.createElement("div");
    element.innerHTML = generatedLetter;

    const opt = {
      margin: 1,
      filename: `referral_letter_${selectedMenteeForReferral?.name.replace(
        /\s+/g,
        "_"
      )}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().from(element).set(opt).save();
  };

  return (
    <div
      className={`min-h-screen flex h-screen overflow-hidden ${
        darkMode ? "dark bg-gray-800 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <MSidebar darkMode={darkMode} sidebarShrink={sidebarShrink} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <MHeader
          toggleSidebar={toggleSidebar}
          sidebarShrink={sidebarShrink}
          toggleDarkMode={toggleDarkMode}
          darkMode={darkMode}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white dark:bg-gray-900 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-700">
          <div className="container mx-auto px-6">
            <div className="mb-8 flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Referrals
                </h1>
                <p className="text-gray-600">
                  Manage your mentee referrals and endorsements
                </p>
              </div>
              <button
                onClick={() => setSettingsModalOpen(true)}
                className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-gray-100"
              >
                <Settings className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Stats Overview */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-lg font-semibold mb-4">Active Mentees</div>
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-blue-500" />
                  <span className="text-2xl font-bold">{mentees.length}</span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-lg font-semibold mb-4">
                  Total Endorsements
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-green-500" />
                  <span className="text-2xl font-bold">
                    {mentees.reduce(
                      (total, mentee) => total + mentee.endorsements,
                      0
                    )}
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-lg font-semibold mb-4">
                  Pending Referrals
                </div>
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-orange-500" />
                  <span className="text-2xl font-bold">2</span>
                </div>
              </div>
            </div>

            {/* Mentee List */}
            <div className="mt-8 bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">Your Mentees</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {mentees.map((mentee) => (
                    <div
                      key={mentee.id}
                      className="p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold flex items-center">
                            {mentee.name}
                            {mentee.readyForReferral && (
                              <span className="ml-2 px-2 py-1 text-sm rounded bg-green-100 text-green-800">
                                Ready for Referral
                              </span>
                            )}
                          </h3>
                          <div className="mt-1 text-sm text-gray-600">
                            Average Rating: {mentee.averageRating?.toFixed(1)} ★
                            ({mentee.ratings.length} sessions rated)
                          </div>
                          <div className="mt-1 text-sm text-gray-500">
                            {mentee.sessions} total sessions completed
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setSelectedMentee(mentee);
                              setHistoryModalOpen(true);
                            }}
                            className="px-4 py-2 border rounded-md hover:bg-gray-50 flex items-center"
                          >
                            <FileText className="h-4 w-4 mr-1" />
                            Session History
                          </button>
                          <button
                            className={`px-4 py-2 border rounded-md ${
                              mentee.readyForReferral
                                ? "hover:bg-gray-50"
                                : "opacity-50 cursor-not-allowed"
                            }`}
                            disabled={!mentee.readyForReferral}
                            onClick={() => handleReferralClick(mentee)}
                          >
                            Write Referral
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Guidelines Panel */}
            <div className="mt-8 bg-white rounded-lg shadow">
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
                          Minimum {guidelinesText.minimumSessions} mentoring
                          sessions completed
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>Demonstrated proficiency in claimed skills</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>Regular participation in skill assessments</span>
                      </li>
                    </ul>
                  </div>
                  {/* <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-1" />
                    <div>
                      <h4 className="font-medium">Minimum Sessions Required</h4>
                      <p className="text-gray-600">
                        Mentees must complete at least 10 sessions before being
                        eligible for referrals
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-1" />
                    <div>
                      <h4 className="font-medium">Skill Validation</h4>
                      <p className="text-gray-600">
                        Ensure mentees have demonstrated proficiency in endorsed
                        skills through practical applications
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-1" />
                    <div>
                      <h4 className="font-medium">Documentation Required</h4>
                      <p className="text-gray-600">
                        Include specific examples and achievements when writing
                        referrals
                      </p>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        currentSettings={mentorSettings}
        onUpdate={handleSettingsUpdate}
      />

      {/* Session History Modal */}
      {historyModalOpen && selectedMentee && (
        <SessionHistoryModal
          isOpen={historyModalOpen}
          onClose={() => {
            setHistoryModalOpen(false);
            setSelectedMentee(null);
          }}
          mentee={selectedMentee}
        />
      )}

      {/* Rating Modal */}
      {ratingModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h3 className="text-xl font-semibold mb-4">
              Rate Session with {selectedMentee?.name}
            </h3>

            <div className="flex justify-center space-x-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setSelectedRating(star)}
                  className={`text-2xl ${
                    star <= selectedRating ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>

            <textarea
              value={ratingNotes}
              onChange={(e) => setRatingNotes(e.target.value)}
              placeholder="Add session notes (optional)"
              className="w-full border rounded-lg p-3 mb-4"
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setRatingModalOpen(false)}
                className="px-4 py-2 border rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={submitRating}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                disabled={!selectedRating}
              >
                Submit Rating
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Generated Letter Modal */}
      {showLetterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`${
              darkMode ? "bg-gray-800" : "bg-white"
            } rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto mx-4`}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-blue-500 mr-2" />
                <h2
                  className={`text-xl font-semibold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Generated Referral Letter
                </h2>
              </div>
              <button
                onClick={() => {
                  setShowLetterModal(false);
                  handleCloseReferralModal();
                }}
                className={`text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Letter Preview */}
            <div className="p-6">
              <div
                className={`border rounded-lg p-8 ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-200 text-gray-900"
                }`}
                dangerouslySetInnerHTML={{ __html: generatedLetter }}
              />
            </div>

            {/* Modal Footer */}
            <div
              className={`px-6 py-4 border-t ${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-gray-50 border-gray-200"
              } flex justify-between items-center`}
            >
              <div className="text-sm text-green-600 dark:text-green-400">
                ✓ Letter has been sent to {selectedMenteeForReferral?.name}
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    setShowLetterModal(false);
                    handleCloseReferralModal();
                  }}
                  className={`px-4 py-2 border rounded-md ${
                    darkMode
                      ? "border-gray-600 hover:bg-gray-700 text-gray-300"
                      : "border-gray-300 hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  Close
                </button>
                <button
                  onClick={handleDownloadLetter}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Download Letter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Referral Letter Modal */}
      {referralModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`${
              darkMode ? "bg-gray-800" : "bg-white"
            } rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4`}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-blue-500 mr-2" />
                <h2
                  className={`text-xl font-semibold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Write Referral Letter
                </h2>
              </div>
              <button
                onClick={handleCloseReferralModal}
                className={`text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleSubmitReferral}>
              <div className="p-6">
                <div className="space-y-6">
                  {/* Current Date - Auto-generated */}
                  <div className="text-right">
                    {new Date().toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>

                  {/* Input Fields */}
                  <div className="space-y-4">
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Mentor Name
                      </label>
                      <input
                        type="text"
                        value={referralMentorName}
                        onChange={(e) => setReferralMentorName(e.target.value)}
                        className={`w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          darkMode
                            ? "bg-gray-700 border-gray-600 text-white"
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    {/* Signature Upload */}
                    <div>
                      <label
                        className={`block text-sm font-medium mb-2 ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Upload Signature
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleSignatureUpload}
                        className={`w-full ${
                          darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                        required
                      />
                      {referralSignature && (
                        <div className="mt-2">
                          <img
                            src={referralSignature}
                            alt="Signature Preview"
                            className="max-h-20 border rounded p-2"
                          />
                        </div>
                      )}
                    </div>

                    {/* Letter Preview */}
                    <div
                      className={`mt-6 p-6 border rounded-lg ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-200 text-gray-900"
                      }`}
                    >
                      <h3 className="font-medium mb-4">Letter Preview</h3>
                      <div className="space-y-4">
                        <p>Dear [Recipient],</p>
                        <p>
                          I am writing to provide a professional referral for{" "}
                          {selectedMenteeForReferral?.name}, who has
                          demonstrated exceptional skills and growth during our
                          mentoring relationship.
                        </p>
                        <p>
                          Throughout our sessions,{" "}
                          {selectedMenteeForReferral?.name} has shown
                          proficiency in:
                          {selectedMenteeForReferral?.skills.map(
                            (skill) => ` ${skill},`
                          )}
                          and has completed{" "}
                          {selectedMenteeForReferral?.sessions} mentoring
                          sessions.
                        </p>
                        <p>
                          Based on their performance and dedication, I
                          confidently recommend{" "}
                          {selectedMenteeForReferral?.name}
                          for professional opportunities in their field of
                          expertise.
                        </p>
                        <div className="mt-4">
                          <p>Yours sincerely,</p>
                          <p>{referralMentorName}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div
                className={`px-6 py-4 border-t ${
                  darkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-gray-50 border-gray-200"
                } flex justify-end space-x-4`}
              >
                <button
                  type="button"
                  onClick={handleCloseReferralModal}
                  className={`px-4 py-2 border rounded-md ${
                    darkMode
                      ? "border-gray-600 hover:bg-gray-700 text-gray-300"
                      : "border-gray-300 hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Referral
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Endorsement Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`${
              darkMode ? "bg-gray-800" : "bg-white"
            } rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4`}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <div className="flex items-center">
                <Award className="h-5 w-5 text-blue-500 mr-2" />
                <h2
                  className={`text-xl font-semibold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Endorse Skills - {selectedMentee?.name}
                </h2>
              </div>
              <button
                onClick={handleCloseModal}
                className={`text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleSubmitEndorsement}>
              <div className="p-6">
                {/* Skill Categories */}
                {skillCategories.map((category) => (
                  <div key={category.name} className="mb-6">
                    <h3
                      className={`text-lg font-medium mb-4 ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {category.name}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {category.skills.map((skill) => (
                        <div
                          key={skill}
                          className={`border rounded-lg p-4 ${
                            darkMode
                              ? "border-gray-700 bg-gray-800"
                              : "border-gray-200 bg-white"
                          }`}
                        >
                          <div className="flex justify-between items-center mb-3">
                            <span
                              className={`font-medium ${
                                darkMode ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {skill}
                            </span>
                            {selectedSkills[skill] && (
                              <span className="text-sm text-green-600 dark:text-green-400 flex items-center">
                                <Check className="h-4 w-4 mr-1" />
                                {selectedSkills[skill]}
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {proficiencyLevels.map((level) => (
                              <button
                                key={level}
                                type="button"
                                onClick={() => handleSkillSelect(skill, level)}
                                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                                  selectedSkills[skill] === level
                                    ? "bg-blue-500 text-white"
                                    : darkMode
                                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                              >
                                {level}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Notes Section */}
                <div className="mt-6">
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Endorsement Notes
                  </label>
                  <textarea
                    value={endorsementNotes}
                    onChange={(e) => setEndorsementNotes(e.target.value)}
                    className={`w-full border rounded-lg p-3 h-32 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                    placeholder="Provide specific examples and context for your endorsement..."
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div
                className={`px-6 py-4 border-t ${
                  darkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-gray-50 border-gray-200"
                } flex justify-end space-x-4`}
              >
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className={`px-4 py-2 border rounded-md ${
                    darkMode
                      ? "border-gray-600 hover:bg-gray-700 text-gray-300"
                      : "border-gray-300 hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
                >
                  <Star className="h-4 w-4 mr-2" />
                  Submit Endorsement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MentorReferrals;