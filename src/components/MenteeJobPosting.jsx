import React, { useState } from "react";
import {
  Award,
  Briefcase,
  FileText,
  Search,
  Filter,
  MapPin,
  DollarSign,
  Building2,
  Upload,
  Star,
  CheckCircle,
  Clock,
  BadgeCheck,
  X,
  User,
  Mail,
  Calendar,
  Eye,
} from "lucide-react";
import Sidebar from "../components/Mentee/Sidebar";
import Header from "../components/Mentee/Header";
import html2pdf from 'html2pdf.js';

const MenteeJobPosting = () => {
  // States for filters and search
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState({
    resume: null,
    coverLetter: null,
    certificates: [],
  });

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

  const [filters, setFilters] = useState({
    location: "",
    minSalary: "",
    maxSalary: "",
    skills: [],
    endorsementRequired: false,
  });

  const [jobs] = useState([
    {
      id: 1,
      title: "Senior Data Scientist",
      company: "TechCorp",
      location: "Chandigarh, India",
      salary: "₹120,000 - ₹150,000",
      requiredSkills: ["Python", "Machine Learning", "SQL"],
      requiredEndorsements: ["Data Science", "Leadership"],
      description: "Looking for an experienced Data Scientist...",
      matchScore: 95,
      endorsedByMentor: true,
      postedDate: "2024-03-15",
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: "WebSolutions",
      location: "Remote",
      salary: "₹90,000 - ₹120,000",
      requiredSkills: ["React", "TypeScript", "UI/UX"],
      requiredEndorsements: ["Frontend Development"],
      description: "Seeking a Frontend Developer...",
      matchScore: 80,
      endorsedByMentor: false,
      postedDate: "2024-03-14",
    },
  ]);

  const filteredJobs = jobs.filter((job) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      job.title.toLowerCase().includes(searchLower) ||
      job.company.toLowerCase().includes(searchLower) ||
      job.requiredSkills.some((skill) =>
        skill.toLowerCase().includes(searchLower)
      );

    const matchesLocation =
      !filters.location ||
      job.location.toLowerCase().includes(filters.location.toLowerCase());

    const matchesSalary =
      (!filters.minSalary ||
        parseInt(job.salary.replace(/\D/g, "")) >=
          parseInt(filters.minSalary)) &&
      (!filters.maxSalary ||
        parseInt(job.salary.replace(/\D/g, "")) <= parseInt(filters.maxSalary));

    const matchesEndorsement =
      !filters.endorsementRequired || job.endorsedByMentor;

    return (
      matchesSearch && matchesLocation && matchesSalary && matchesEndorsement
    );
  });

  // Application tracking states
  const [applications, setApplications] = useState([
    {
      id: 1,
      jobTitle: "Senior Data Scientist",
      company: "TechCorp",
      status: "Under Review",
      appliedDate: "2024-03-10",
      endorsements: 2,
    },
  ]);

  // Mock data for endorsements
  const [endorsements, setEndorsements] = useState([
    {
      id: 1,
      skill: "Data Science",
      mentor: "Dr. Sarah Johnson",
      date: "2024-02-15",
      level: "Expert",
    },
    {
      id: 2,
      skill: "Leadership",
      mentor: "Prof. Michael Chen",
      date: "2024-02-20",
      level: "Advanced",
    },
  ]);

  

  // Mock data for jobs

  const FiltersSection = () => {
    if (!showFilters) return null;

    return (
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={filters.location}
              onChange={(e) =>
                setFilters({ ...filters, location: e.target.value })
              }
              placeholder="Enter location..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Salary Range
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                className="w-1/2 p-2 border rounded"
                value={filters.minSalary}
                onChange={(e) =>
                  setFilters({ ...filters, minSalary: e.target.value })
                }
                placeholder="Min"
              />
              <input
                type="number"
                className="w-1/2 p-2 border rounded"
                value={filters.maxSalary}
                onChange={(e) =>
                  setFilters({ ...filters, maxSalary: e.target.value })
                }
                placeholder="Max"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Requirements
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.endorsementRequired}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    endorsementRequired: e.target.checked,
                  })
                }
                className="mr-2"
              />
              Mentor Endorsed Only
            </label>
          </div>
        </div>
      </div>
    );
  };

  const handleFileUpload = (type, files) => {
    if (type === "certificates") {
      setUploadedFiles((prev) => ({
        ...prev,
        certificates: [...prev.certificates, ...Array.from(files)],
      }));
    } else {
      setUploadedFiles((prev) => ({
        ...prev,
        [type]: files[0],
      }));
    }
  };

  const handleApplicationSubmit = (e) => {
    e.preventDefault();

    if (!uploadedFiles.resume || !uploadedFiles.coverLetter) {
      alert("Please upload required documents");
      return;
    }

    if (
      !applicationForm.fullName ||
      !applicationForm.email ||
      !applicationForm.phone
    ) {
      alert("Please fill in all required personal information");
      return;
    }

    const newApplication = {
      id: applications.length + 1,
      jobTitle: selectedJob.title,
      company: selectedJob.company,
      status: "Applied",
      appliedDate: new Date().toISOString().split("T")[0],
      endorsements: endorsements.length,
    };

    setApplications([...applications, newApplication]);
    setShowApplicationModal(false);
    setSelectedJob(null);
    setUploadedFiles({
      resume: null,
      coverLetter: null,
      certificates: [],
    });
    setApplicationForm({
      fullName: "",
      email: "",
      phone: "",
      coverNote: "",
    });
  };

  const [applicationForm, setApplicationForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    coverNote: "",
  });

  // Application Modal Component
  const ApplicationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            Apply for {selectedJob?.title}
          </h2>
          <button onClick={() => setShowApplicationModal(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleApplicationSubmit} className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Personal Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={applicationForm.fullName}
                  onChange={(e) =>
                    setApplicationForm({
                      ...applicationForm,
                      fullName: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={applicationForm.email}
                  onChange={(e) =>
                    setApplicationForm({
                      ...applicationForm,
                      email: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  value={applicationForm.phone}
                  onChange={(e) =>
                    setApplicationForm({
                      ...applicationForm,
                      phone: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Cover Note
                </label>
                <textarea
                  value={applicationForm.coverNote}
                  onChange={(e) =>
                    setApplicationForm({
                      ...applicationForm,
                      coverNote: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  rows="4"
                />
              </div>
            </div>
          </div>
          <div className="space-y-6">
            {/* Job Overview */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center text-gray-600 mb-2">
                <Building2 className="h-4 w-4 mr-2" />
                <span className="mr-4">{selectedJob?.company}</span>
                <MapPin className="h-4 w-4 mr-2" />
                <span>{selectedJob?.location}</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-2 text-gray-600" />
                <span className="text-gray-600">{selectedJob?.salary}</span>
              </div>
            </div>

            {/* Required Documents */}
            <div>
              <h3 className="text-lg font-medium mb-4">Required Documents</h3>

              {/* Resume Upload */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Resume</label>
                <div className="border-2 border-dashed rounded-lg p-4">
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload("resume", e.target.files)}
                    className="hidden"
                    id="resume-upload"
                    accept=".pdf,.doc,.docx"
                  />
                  <label
                    htmlFor="resume-upload"
                    className="flex flex-col items-center cursor-pointer"
                  >
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">
                      {uploadedFiles.resume
                        ? uploadedFiles.resume.name
                        : "Upload Resume (PDF, DOC)"}
                    </span>
                  </label>
                </div>
              </div>

              {/* Cover Letter Upload */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Cover Letter
                </label>
                <div className="border-2 border-dashed rounded-lg p-4">
                  <input
                    type="file"
                    onChange={(e) =>
                      handleFileUpload("coverLetter", e.target.files)
                    }
                    className="hidden"
                    id="cover-letter-upload"
                    accept=".pdf,.doc,.docx"
                  />
                  <label
                    htmlFor="cover-letter-upload"
                    className="flex flex-col items-center cursor-pointer"
                  >
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">
                      {uploadedFiles.coverLetter
                        ? uploadedFiles.coverLetter.name
                        : "Upload Cover Letter (PDF, DOC)"}
                    </span>
                  </label>
                </div>
              </div>

              {/* Certificates Upload */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Certificates
                </label>
                <div className="border-2 border-dashed rounded-lg p-4">
                  <input
                    type="file"
                    multiple
                    onChange={(e) =>
                      handleFileUpload("certificates", e.target.files)
                    }
                    className="hidden"
                    id="certificates-upload"
                    accept=".pdf,.doc,.docx,.jpg,.png"
                  />
                  <label
                    htmlFor="certificates-upload"
                    className="flex flex-col items-center cursor-pointer"
                  >
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">
                      Upload Certificates (PDF, DOC, Images)
                    </span>
                  </label>
                </div>
                {uploadedFiles.certificates.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {uploadedFiles.certificates.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-gray-50 p-2 rounded"
                      >
                        <span className="text-sm">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const newCertificates =
                              uploadedFiles.certificates.filter(
                                (_, i) => i !== index
                              );
                            setUploadedFiles((prev) => ({
                              ...prev,
                              certificates: newCertificates,
                            }));
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Endorsements Section */}
            {endorsements.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-4">
                  Available Endorsements
                </h3>
                <div className="space-y-2">
                  {endorsements.map((endorsement) => (
                    <div
                      key={endorsement.id}
                      className="flex items-center justify-between bg-blue-50 p-3 rounded-lg"
                    >
                      <div>
                        <div className="font-medium">{endorsement.skill}</div>
                        <div className="text-sm text-gray-600">
                          Endorsed by {endorsement.mentor} • Level:{" "}
                          {endorsement.level}
                        </div>
                      </div>
                      <BadgeCheck className="h-5 w-5 text-green-500" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setShowApplicationModal(false)}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              disabled={
                !uploadedFiles.resume ||
                !uploadedFiles.coverLetter ||
                !applicationForm.fullName ||
                !applicationForm.email ||
                !applicationForm.phone
              }
            >
              Submit Application
            </button>
          </div>
        </form>
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
        <main
          className={`
            flex-1 
            overflow-y-auto 
            p-2 sm:p-6 
            ${sidebarShrink ? "pl-20" : "pl-6"} 
            transition-all duration-300 
            ${darkMode ? "bg-gray-900" : "bg-white"}
          `}
        >
          <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
              <div className="container mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold text-gray-900">
                    Job Opportunities
                  </h1>
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center text-gray-600 hover:text-gray-900">
                      <Mail className="h-5 w-5 mr-2" />
                      Messages
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-gray-900">
                      <Calendar className="h-5 w-5 mr-2" />
                      Interviews
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-6 py-8">
              {/* Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">
                        Active Applications
                      </p>
                      <p className="text-2xl font-bold">
                        {applications.length}
                      </p>
                    </div>
                    <Briefcase className="h-8 w-8 text-blue-500" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Endorsements</p>
                      <p className="text-2xl font-bold">
                        {endorsements.length}
                      </p>
                    </div>
                    <Award className="h-8 w-8 text-green-500" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Job Matches</p>
                      <p className="text-2xl font-bold">{jobs.length}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-purple-500" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Interview Invites</p>
                      <p className="text-2xl font-bold">2</p>
                    </div>
                    <Calendar className="h-8 w-8 text-orange-500" />
                  </div>
                </div>
              </div>

              {/* Search and Filters */}
              <div className="mb-8">
                <div className="flex gap-4 mb-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search jobs by title, company, or skills..."
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </button>
                </div>
                <FiltersSection />
              </div>

              {/* Job Listings */}
              <div className="space-y-6">
                {filteredJobs.map((job) => (
                  <div key={job.id} className="bg-white rounded-lg shadow p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold">{job.title}</h3>
                        <div className="flex items-center text-gray-600 mt-2">
                          <Building2 className="h-4 w-4 mr-2" />
                          <span className="mr-4">{job.company}</span>
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{job.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Star className="h-5 w-5 text-yellow-400 mr-1" />
                          <span className="font-medium">
                            {job.matchScore}% Match
                          </span>
                        </div>
                        {job.endorsedByMentor && (
                          <div className="flex items-center text-green-600">
                            <BadgeCheck className="h-5 w-5 mr-1" />
                            <span className="text-sm">Mentor Endorsed</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center text-gray-600 mb-2">
                        <DollarSign className="h-4 w-4 mr-2" />
                        <span>{job.salary}</span>
                      </div>
                      <p className="text-gray-600 mt-2">{job.description}</p>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Required Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {job.requiredSkills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium mb-2">
                        Required Endorsements
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {job.requiredEndorsements.map((endorsement, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm"
                          >
                            {endorsement}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-4 pt-4 border-t">
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>Posted {job.postedDate}</span>
                        <Eye className="h-4 w-4 ml-4 mr-2" />
                        <span>234 views</span>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedJob(job);
                          setShowApplicationModal(true);
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Applications Tracking */}
              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">My Applications</h2>
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Job Title
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Company
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Applied Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Endorsements
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {applications.map((application) => (
                        <tr key={application.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {application.jobTitle}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {application.company}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              {application.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {application.appliedDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {application.endorsements}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Application Modal */}
        {showApplicationModal && selectedJob && <ApplicationModal />}
      </div>
    </div>
  );
};

export default MenteeJobPosting;