import React, { useState } from "react";
import {
  Award,
  Briefcase,
  Building2,
  CheckCircle,
  Filter,
  MapPin,
  Search,
  Star,
  Users,
  DollarSign,
  BadgeCheck,
  Clock,
  Bell,
  X,
} from "lucide-react";
import MSidebar from "../components/Mentor/MSidebar";
import MHeader from "../components/Mentor/MHeader";

// New component for job posting form
// Expanded JobPostingForm component
const JobPostingForm = ({ onClose, onSubmit }) => {
  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    duration: "",
    applicantsCount: 0,
    requiredSkills: [],
    competencies: [],
    industryType: "",
    department: "",
    education: "",
    aboutCompany: "",
    requiredEndorsements: [],
    description: "",
    type: "full-time",
    postedDate: new Date().toISOString().split("T")[0],
    endorsedApplications: 0,
    totalApplications: 0,
  });

  const handleSkillsInput = (e) => {
    setJobData({
      ...jobData,
      requiredSkills: e.target.value.split(",").map((skill) => skill.trim()),
    });
  };

  const handleCompetenciesInput = (e) => {
    setJobData({
      ...jobData,
      competencies: e.target.value.split(",").map((comp) => comp.trim()),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-4 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold">Post New Job</h2>
          <button onClick={onClose}>
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Alert Message - made more compact */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-2 mb-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg
                className="h-4 w-4 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-2">
              <p className="text-sm text-yellow-700">
                <strong>Warning:</strong> Beware of imposters! We do not promise
                any job or interview in exchange for money.
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(jobData);
          }}
          className="space-y-3"
        >
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Job Title *"
              className="w-full p-1.5 border rounded text-sm"
              required
              onChange={(e) =>
                setJobData({ ...jobData, title: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Company Name *"
              className="w-full p-1.5 border rounded text-sm"
              required
              onChange={(e) =>
                setJobData({ ...jobData, company: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Location *"
              className="w-full p-1.5 border rounded text-sm"
              required
              onChange={(e) =>
                setJobData({ ...jobData, location: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Salary Range *"
              className="w-full p-1.5 border rounded text-sm"
              required
              onChange={(e) =>
                setJobData({ ...jobData, salary: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Duration *"
              className="w-full p-1.5 border rounded text-sm"
              required
              onChange={(e) =>
                setJobData({ ...jobData, duration: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Industry Type *"
              className="w-full p-1.5 border rounded text-sm"
              required
              onChange={(e) =>
                setJobData({ ...jobData, industryType: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Department *"
              className="w-full p-1.5 border rounded text-sm"
              required
              onChange={(e) =>
                setJobData({ ...jobData, department: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Required Education *"
              className="w-full p-1.5 border rounded text-sm"
              required
              onChange={(e) =>
                setJobData({ ...jobData, education: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Required Skills (comma separated) *"
              className="w-full p-1.5 border rounded text-sm"
              required
              onChange={handleSkillsInput}
            />
            <input
              type="text"
              placeholder="Competencies (comma separated) *"
              className="w-full p-1.5 border rounded text-sm"
              required
              onChange={handleCompetenciesInput}
            />
          </div>

          <textarea
            placeholder="Job Description *"
            className="w-full p-1.5 border rounded text-sm h-20"
            required
            onChange={(e) =>
              setJobData({ ...jobData, description: e.target.value })
            }
          />

          <textarea
            placeholder="About Company *"
            className="w-full p-1.5 border rounded text-sm h-20"
            required
            onChange={(e) =>
              setJobData({ ...jobData, aboutCompany: e.target.value })
            }
          />

          <div className="flex gap-2 justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 border rounded text-sm hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
            >
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const FiltersPanel = ({ filters, onFilterChange, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Filters</h2>
          <button onClick={onClose}>
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Experience Level
            </label>
            <select
              className="w-full p-2 border rounded"
              value={filters.experience}
              onChange={(e) =>
                onFilterChange({ ...filters, experience: e.target.value })
              }
            >
              <option value="">Any</option>
              <option value="entry">Entry Level</option>
              <option value="mid">Mid Level</option>
              <option value="senior">Senior Level</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={filters.location}
              onChange={(e) =>
                onFilterChange({ ...filters, location: e.target.value })
              }
              placeholder="Enter location"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Required Skills
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="Add skills (comma separated)"
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  skills: e.target.value.split(",").map((s) => s.trim()),
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const NotificationsPanel = ({ notifications, onClose }) => {
  return (
    <div className="absolute right-0 top-16 bg-white rounded-lg shadow-lg w-80 p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold">Notifications</h3>
        <button onClick={onClose}>
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="space-y-4">
        {notifications.map((notification, index) => (
          <div key={index} className="p-2 border-b last:border-b-0">
            <p className="text-sm">{notification.message}</p>
            <span className="text-xs text-gray-500">{notification.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const EndorseMenteeModal = ({ job, onClose, onEndorse }) => {
  const [selectedMentee, setSelectedMentee] = useState("");
  const [endorsementNote, setEndorsementNote] = useState("");

  // Mock mentees data
  const availableMentees = [
    { id: 1, name: "John Doe", skills: ["React", "Python"] },
    { id: 2, name: "Jane Smith", skills: ["Data Science", "Machine Learning"] },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Refer Mentee for {job.title}</h2>
          <button onClick={onClose}>
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Select Mentee
            </label>
            <select
              className="w-full p-2 border rounded"
              value={selectedMentee}
              onChange={(e) => setSelectedMentee(e.target.value)}
            >
              <option value="">Choose a mentee</option>
              {availableMentees.map((mentee) => (
                <option key={mentee.id} value={mentee.id}>
                  {mentee.name} - {mentee.skills.join(", ")}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Referral Note
            </label>
            <textarea
              className="w-full p-2 border rounded h-32"
              value={endorsementNote}
              onChange={(e) => setEndorsementNote(e.target.value)}
              placeholder="Why do you recommend this mentee?"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => onEndorse(selectedMentee, endorsementNote)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              disabled={!selectedMentee}
            >
              Submit Referral
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const JobDetailsModal = ({ job, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{job.title}</h2>
          <button onClick={onClose}>
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center text-gray-600">
            <Building2 className="h-4 w-4 mr-2" />
            <span className="mr-4">{job.company}</span>
            <MapPin className="h-4 w-4 mr-2" />
            <span className="mr-4">{job.location}</span>
            <DollarSign className="h-4 w-4 mr-2" />
            <span>{job.salary}</span>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {job.requiredSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Required Endorsements</h3>
            <div className="flex flex-wrap gap-2">
              {job.requiredEndorsements.map((endorsement) => (
                <span
                  key={endorsement}
                  className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm"
                >
                  {endorsement}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-gray-600">{job.description}</p>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <div className="flex items-center">
              <BadgeCheck className="h-4 w-4 mr-1 text-green-500" />
              <span>{job.endorsedApplications} referred applications</span>
            </div>
            <span>Posted {new Date(job.postedDate).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const JobPostingDashboard = () => {
  // States for different views and data
  const [activeTab, setActiveTab] = useState("jobListings");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    skills: [],
    location: "",
    experience: "",
    endorsementRequired: false,
  });

  const [showEndorseModal, setShowEndorseModal] = useState(false);
  const [selectedJobForEndorsement, setSelectedJobForEndorsement] =
    useState(null);

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedJobForDetails, setSelectedJobForDetails] = useState(null);

  const [filters, setFilters] = useState({
    remote: false,
    fullTime: false,
    endorsed: false,
  });

  const handleFilterChange = (filterName) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

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

  // Mock data for jobs
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Senior Data Scientist",
      company: "TechCorp",
      location: "Chandigarh, India",
      salary: "₹120,000 - ₹150,000",
      requiredSkills: ["Python", "Machine Learning", "SQL"],
      requiredEndorsements: ["Data Science", "Leadership"],
      description:
        "Looking for an experienced Data Scientist with strong ML background...",
      postedDate: "2024-03-15",
      endorsedApplications: 3,
      totalApplications: 8,
      industryType: "Technology",
      department: "Data Science",
      duration: "Full Time",
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: "WebSolutions",
      location: "Remote",
      salary: "₹90,000 - ₹120,000",
      requiredSkills: ["React", "TypeScript", "UI/UX"],
      requiredEndorsements: ["Frontend Development"],
      description: "Seeking a Frontend Developer with expertise in React...",
      postedDate: "2024-03-14",
      endorsedApplications: 2,
      totalApplications: 5,
      industryType: "Technology",
      department: "Engineering",
      duration: "Full Time",
    },
  ]);

  const [showJobForm, setShowJobForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      message: "New application received for Senior Data Scientist",
      time: "2 hours ago",
    },
    { message: "Endorsement request pending", time: "1 day ago" },
  ]);

  const handleJobSubmit = (jobData) => {
    const newJob = {
      ...jobData,
      id: jobs.length + 1,
      endorsedApplications: 0,
      totalApplications: 0,
      postedDate: new Date().toISOString().split("T")[0],
      requiredEndorsements: [], // Initialize with empty array if not provided
    };

    setJobs((prevJobs) => [newJob, ...prevJobs]); // Add new job to the beginning of the list
    setShowJobForm(false);
    setNotifications([
      { message: `New job posted: ${jobData.title}`, time: "Just now" },
      ...notifications,
    ]);
  };

  const handleEndorse = (jobId) => {
    setJobs(
      jobs.map((job) =>
        job.id === jobId
          ? { ...job, endorsedApplications: job.endorsedApplications + 1 }
          : job
      )
    );
    setNotifications([
      { message: "New endorsement submitted", time: "Just now" },
      ...notifications,
    ]);
  };

  return (
    <div
      className={`flex h-screen ${
        darkMode ? "dark" : ""
      } bg-white dark:bg-gray-900`}
    >
      <MSidebar
        sidebarShrink={sidebarShrink}
        isDarkMode={darkMode}
        toggleSidebar={toggleSidebar}
      />
      <div className="flex-1 flex flex-col overflow-hidden dark:bg-gray-900 dark:text-white">
        <MHeader
          toggleSidebar={toggleSidebar}
          sidebarShrink={sidebarShrink}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
        {/* Header */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white dark:bg-gray-900 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-700">
          <div className="bg-white border-b">
            <div className="container mx-auto px-6 py-4">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">
                  Job Posting Dashboard
                </h1>
                <div className="flex items-center gap-4">
                  {/* <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 hover:bg-gray-100 rounded-full"
                  >
                    <Bell className="h-6 w-6" />
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notifications.length}
                    </span>
                  </button> */}
                  <button
                    onClick={() => setShowJobForm(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
                  >
                    <Briefcase className="h-4 w-4 mr-2" />
                    Post New Job
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="container mx-auto px-6 py-8">
            {/* Search and Filter Section */}
            <div className="mb-8">
              <div className="flex gap-4 mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search jobs by title, company, or skills..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </button>
              </div>

              {/* Quick Filters */}
              <div className="flex gap-2">
                <button
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.endorsed
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  } hover:bg-blue-200`}
                  onClick={() => handleFilterChange("endorsed")}
                >
                  Referred Only
                </button>
                <button
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.remote
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  } hover:bg-blue-200`}
                  onClick={() => handleFilterChange("remote")}
                >
                  Remote Jobs
                </button>
                <button
                  className={`px-3 py-1 rounded-full text-sm ${
                    filters.fullTime
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  } hover:bg-blue-200`}
                  onClick={() => handleFilterChange("fullTime")}
                >
                  Full-Time
                </button>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Jobs</p>
                    <p className="text-2xl font-bold">{jobs.length}</p>
                  </div>
                  <Briefcase className="h-8 w-8 text-blue-500" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">
                      Referred Applications
                    </p>
                    <p className="text-2xl font-bold">
                      {jobs.reduce(
                        (acc, job) => acc + job.endorsedApplications,
                        0
                      )}
                    </p>
                  </div>
                  <Award className="h-8 w-8 text-green-500" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Companies</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                  <Building2 className="h-8 w-8 text-purple-500" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Success Rate</p>
                    <p className="text-2xl font-bold">76%</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-teal-500" />
                </div>
              </div>
            </div>

            {/* Job Listings */}
            <div className="space-y-6">
              {jobs.map((job) => (
                <div key={job.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        {job.title}
                      </h2>
                      <div className="flex items-center mt-2 text-gray-600">
                        <Building2 className="h-4 w-4 mr-2" />
                        <span className="mr-4">{job.company}</span>
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="mr-4">{job.location}</span>
                        <DollarSign className="h-4 w-4 mr-2" />
                        <span>{job.salary}</span>
                      </div>
                      <div className="mt-2 text-gray-600">
                        <span className="mr-4">{job.industryType}</span>
                        <span className="mr-4">•</span>
                        <span className="mr-4">{job.department}</span>
                        <span className="mr-4">•</span>
                        <span>{job.duration}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => {
                          setSelectedJobForDetails(job);
                          setShowDetailsModal(true);
                        }}
                        className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => {
                          setSelectedJobForEndorsement(job);
                          setShowEndorseModal(true);
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Refer Mentee
                      </button>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.requiredSkills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4">{job.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <BadgeCheck className="h-4 w-4 mr-1 text-green-500" />
                          <span>
                            {job.endorsedApplications} referred applications
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          <span>
                            {job.totalApplications} total applications
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>
                          Posted {new Date(job.postedDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Modals and panels */}
          {showEndorseModal && (
            <EndorseMenteeModal
              job={selectedJobForEndorsement}
              onClose={() => {
                setShowEndorseModal(false);
                setSelectedJobForEndorsement(null);
              }}
              onEndorse={(menteeId, note) => {
                console.log("Endorsement submitted:", {
                  menteeId,
                  note,
                  job: selectedJobForEndorsement,
                });
                setShowEndorseModal(false);
                setSelectedJobForEndorsement(null);
              }}
            />
          )}

          {showDetailsModal && (
            <JobDetailsModal
              job={selectedJobForDetails}
              onClose={() => {
                setShowDetailsModal(false);
                setSelectedJobForDetails(null);
              }}
            />
          )}

          {showJobForm && (
            <JobPostingForm
              onClose={() => setShowJobForm(false)}
              onSubmit={handleJobSubmit}
            />
          )}

          {showFilters && (
            <FiltersPanel
              filters={selectedFilters}
              onFilterChange={setSelectedFilters}
              onClose={() => setShowFilters(false)}
            />
          )}

          {showNotifications && (
            <NotificationsPanel
              notifications={notifications}
              onClose={() => setShowNotifications(false)}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default JobPostingDashboard;