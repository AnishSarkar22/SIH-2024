import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpload,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Upload } from "lucide-react";
const StepForm = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    jobTitle: "",
    company: "",
    resume: null,
    companyId: null,
    education: [],
    employment: [],
    category: "",
    skills: "",
    bio: "",
    linkedinUrl: "",
    twitterHandle: "",
    website: "",
    introVideo: "",
    featuredArticle: "",
    whyMentor: "",
    greatestAchievement: "",
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState({
    resume: null,
    companyId: null,
    education: [],
    employment: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Special handling for firstName and lastName to prevent number input
    if ((name === "firstName" || name === "lastName") && /[0-9]/.test(value)) {
      return; // Don't update state if numbers are entered
    }

    // Special handling for email to ensure it is valid

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate immediately for better user feedback
    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    let newErrors = { ...errors };

    switch (fieldName) {
      case "firstName":
      case "lastName":
        if (!value) {
          newErrors[fieldName] = "This field is required";
        } else if (!/^[A-Za-z]+$/i.test(value)) {
          // Only allows letters, case insensitive
          newErrors[fieldName] = "Only letters are allowed";
        } else {
          delete newErrors[fieldName];
        }
        break;

      case "email":
        if (!value) {
          newErrors.email = "Email is required";
        } else if (!/@/.test(value)) {
          // Ensure email contains "@"
          newErrors.email = "Email must contain '@'";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          // More comprehensive email validation
          newErrors.email = "Please enter a valid email address";
        } else {
          delete newErrors.email;
        }
        break;

      case "password":
        if (!value) {
          newErrors.password = "Password is required";
        } else if (value.length < 6) {
          newErrors.password = "Password must be at least 6 characters";
        } else {
          delete newErrors.password;
        }
        break;

      case "jobTitle":
        if (!value) {
          newErrors.jobTitle = "Job title is required";
        } else if (!/^[A-Za-z\s]+$/.test(value)) {
          newErrors.jobTitle = "Job title should only contain letters";
        } else {
          delete newErrors.jobTitle;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };
  // Check if all required fields are filled and valid
  useEffect(() => {
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "password",
      "jobTitle",
    ];
    const areAllFieldsFilled = requiredFields.every(
      (field) => formData[field] && !errors[field]
    );
    const areAllFilesFilled =
      uploadedFiles.resume &&
      uploadedFiles.companyId &&
      uploadedFiles.education.length > 0 &&
      uploadedFiles.employment.length > 0;

    setIsFormValid(areAllFieldsFilled && areAllFilesFilled);
  }, [formData, errors, uploadedFiles]);

  const RequiredLabel = ({ text }) => (
    <label className="block text-gray-700 font-bold mb-4">
      {text} <span className="text-red-500">*</span>
    </label>
  );

  const FieldError = ({ error }) =>
    error ? (
      <p className="text-red-500 text-sm mt-1 flex items-center">
        <FontAwesomeIcon icon={faExclamationCircle} className="mr-1" />
        {error}
      </p>
    ) : null;

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/submit-mentor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        alert("Form submitted successfully!");
      } else {
        alert("Error submitting form");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting form");
    }
  };

  const AvatarUpload = ({ photoPreview, handleFileChange }) => {
    return (
      <div className="flex items-center ml-6 mb-4">
        {/* Avatar Icon */}
        {!photoPreview && (
          <i
            id="avatarIcon"
            className="fa-solid fa-user text-2xl mr-5 flex items-center justify-center w-16 h-16 border-2 border-gray-700 rounded-full box-border px-4 py-4"
          ></i>
        )}

        {/* Image Preview */}
        {photoPreview && (
          <img
            id="photoPreview"
            src={photoPreview}
            className="max-w-[4rem] max-h-[4rem] object-cover rounded-full border-2 border-gray-700 mr-4"
            alt="Photo Preview"
          />
        )}

        {/* File Input */}
        <div className="relative flex-1 file-input-wrapper">
          <input
            type="file"
            id="photoInput"
            className="file-input hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
          <label
            htmlFor="photoInput"
            className="flex items-center rounded-lg shadow border border-gray-300 text-gray-700 px-3 py-2 font-bold cursor-pointer text-xs relative overflow-hidden w-40"
          >
            <FontAwesomeIcon icon={faUpload} className="mr-2.5 text-gray-700" />
            <span className="upload-text">Upload your photo</span>
          </label>
          {/* <p
          id="uploadStatus"
          className={upload-status ${photoPreview ? "block" : "hidden"}}
        >
          Image uploaded
        </p> */}
        </div>
      </div>
    );
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateStepper = () => {
    return (step) => {
      return currentPage > step ? "completed" : "";
    };
  };

  const showPage = (index) => {
    setCurrentPage(index);
  };

  const handleDocumentUpload = (e, type) => {
    const files = e.target.files;
    if (type === "education" || type === "employment") {
      setUploadedFiles((prev) => ({
        ...prev,
        [type]: [...prev[type], ...Array.from(files)],
      }));
    } else {
      setUploadedFiles((prev) => ({
        ...prev,
        [type]: files[0],
      }));
    }
  };

  const InputField = ({ label, name, type, placeholder, value, onChange }) => {
    return (
      <div>
        <RequiredLabel text={label} />
        <input
          type={type}
          name={name}
          className={`w-full shadow rounded-lg p-2 border ${
            errors[name] ? "border-red-500" : "border-gray-300"
          }`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <FieldError error={errors[name]} />
      </div>
    );
  };

  const CompanyField = () => {
    return (
      <div>
        <RequiredLabel text="Company" />
        <input
          type="text"
          name="company"
          className="w-full shadow rounded-lg p-2 border border-gray-300"
          placeholder="ABC Corporation"
          value={formData.company || ""}
          onChange={handleInputChange}
        />
      </div>
    );
  };

  const DocumentUploadField = ({ label, type, multiple = false }) => {
    const isRequired = true;
    const hasError =
      isRequired && !uploadedFiles[type]?.length && !uploadedFiles[type];

    return (
      <div className="mb-6">
        <label className="block text-gray-700 font-bold mb-4">
          {label} <span className="text-red-500">*</span>
        </label>
        <div className="relative flex items-center">
          <input
            type="file"
            id={`${type}Upload`}
            className="hidden"
            onChange={(e) => handleDocumentUpload(e, type)}
            multiple={multiple}
            accept=".pdf,.doc,.docx"
          />
          <label
            htmlFor={`${type}Upload`}
            className={`flex items-center space-x-2 px-4 py-2 bg-white border ${
              hasError ? "border-red-500" : "border-gray-300"
            } rounded-lg cursor-pointer hover:bg-gray-50`}
          >
            <Upload className="h-5 w-5 text-gray-500" />
            <span className="text-sm text-gray-600">
              {multiple ? "Upload Files" : "Upload File"}
            </span>
          </label>
          {uploadedFiles[type] && (
            <span className="ml-3 text-sm text-gray-600">
              {multiple
                ? `${uploadedFiles[type].length} file(s) selected`
                : uploadedFiles[type].name}
            </span>
          )}
        </div>
        {hasError && (
          <p className="text-red-500 text-sm mt-1"></p> // add later "This field is required"
        )}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      {/* Stepper */}
      <div className="flex justify-between items-center mb-8">
        {[1, 2, 3].map((step, index) => (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                  currentPage >= index ? "bg-indigo-600" : "bg-gray-300"
                }`}
              >
                {step}
              </div>
              <div className="mt-2 text-sm font-medium text-gray-500">
                {index === 0 ? "Profile" : index === 1 ? "Info" : "Summary"}
              </div>
            </div>
            {index < 2 && (
              <div
                className={`h-1 ${
                  currentPage > index ? "bg-indigo-600" : "bg-gray-300"
                }`}
                style={{ width: "600px" }}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Page 1: Profile */}
      {currentPage === 0 && (
        <div id="page1" className="form-page">
          <div className="bg-blue-300 text-white p-4 rounded-lg mb-6">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6 flex items-center justify-center bg-blue-800 text-white rounded-full">
                <i className="fa-solid fa-exclamation"></i>
              </span>
              <p className="text-lg font-semibold text-blue-800">
                Lovely to see you!
              </p>
            </div>
            <p className="text-gray-700 mt-2 text-sm">
              Filling out the form only takes a couple minutes. We’d love to
              learn more about your background and the ins-and-outs of why you’d
              like to become a mentor. Keep things personal and talk directly to
              us and your mentees. We don’t need jargon and polished cover
              letters here! You agree to our code of conduct and the mentor
              agreement by sending the form, so be sure to have a look at those.
            </p>
          </div>
          <form>
            <AvatarUpload
              photoPreview={photoPreview}
              handleFileChange={handleFileChange}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <RequiredLabel text="First Name" />
                <input
                  name="firstName"
                  type="text"
                  className="w-full shadow rounded-lg p-2 border border-gray-300"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  pattern="[A-Za-z]+"
                  title="Only letters are allowed"
                />
              </div>
              <div>
                <RequiredLabel text="Last Name" />
                <input
                  label="Last Name"
                  name="lastName"
                  type="text"
                  className="w-full shadow rounded-lg p-2 border border-gray-300"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <RequiredLabel text="Email" />
                <input
                  name="email"
                  type="email"
                  className={`w-full shadow rounded-lg p-2 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="johndoe@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                  title="Please enter a valid email address"
                />
                <FieldError error={errors.email} />
              </div>

              <div>
                <RequiredLabel text="Password" />
                <input
                  name="password"
                  type="password"
                  className={`w-full shadow rounded-lg p-2 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Must have at least 6 characters"
                  value={formData.password}
                  onChange={handleInputChange}
                  minLength={6}
                  title="Password must be at least 6 characters"
                />
                <FieldError error={errors.password} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              <div>
                <RequiredLabel text="Job Title" />
                <input
                  name="jobTitle"
                  type="text"
                  className="w-full shadow rounded-lg p-2 border border-gray-300"
                  placeholder="Software Engineer"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <RequiredLabel text="Company" />
                <input
                  type="text"
                  name="company"
                  className="w-full shadow rounded-lg p-2 border border-gray-300"
                  placeholder="ABC Corporation"
                  value={formData.company}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              <DocumentUploadField label="Resume" type="resume" />
              <DocumentUploadField label="Company ID" type="companyId" />
              <DocumentUploadField
                label="Higher Education Completion Certificates"
                type="education"
                multiple
              />
              <DocumentUploadField
                label="Appointment Letters/Employment Contracts"
                type="employment"
                multiple
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="py-2 px-4 rounded-lg bg-indigo-600 text-white cursor-pointer"
                onClick={() => setCurrentPage(1)}
              >
                Next Step
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Page 2: Info */}
      {currentPage === 1 && (
        <div id="page2" className="form-page">
          <form>
            {/* Category Section */}
            {/* <p className="text-gray-700 font-bold mb-4">Category</p>
            <div className="mb-6 p-4 rounded-md bg-white">
              <div className="flex items-center">
                <input
                  type="text"
                  id="category"
                  className="w-full shadow rounded-lg p-2 border border-gray-300"
                  placeholder="Enter your category"
                />
                <button
                  type="button"
                  className="ml-2 p-2 bg-gray-200 rounded-full"
                >
                  <i className="fa-solid fa-search"></i>
                </button>
              </div>
            </div> */}

            {/* Skills Section */}
            <p className="text-gray-700 font-bold mb-4">Skills</p>
            <div className="mb-1 p-4 rounded-md bg-white">
              <textarea
                id="skills"
                className="w-full shadow rounded-lg p-2 border border-gray-300"
                rows="2"
                placeholder="Add a new skill..."
              ></textarea>
            </div>
            <p className="text-gray-500 mb-4 ml-4 text-sm">
              Describe your expertise to connect with mentees who have similar
              interests.
              <br />
              Comma-separated list of your skills (keep it below 10). Mentees
              will use this to find you.
            </p>
            <div className="gap-4 mb-4">
              <label
                htmlFor="cal"
                className="block text-gray-700 font-bold mb-4"
              >
                Your cal.com URL
              </label>
              <div className="flex flex-col space-y-2">
                <input
                  type="url"
                  id="cal"
                  className="w-full shadow rounded-lg p-2 border border-gray-300"
                  placeholder="https://cal.com/your-profile"
                />
                <a
                  href="https://cal.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-indigo-600 hover:text-indigo-800"
                >
                  Create your cal.com account here
                </a>
              </div>
            </div>

            {/* Bio Section */}
            <p className="text-gray-700 font-bold mb-2 mt-2">Bio</p>
            <div className="mb-1 p-4 rounded-md bg-white">
              <textarea
                id="bio"
                className="w-full shadow rounded-lg p-2 border border-gray-300"
                rows="4"
                placeholder=""
              ></textarea>
            </div>
            <p className="text-gray-500 mb-4 ml-4 text-sm">
              This will be public. Talk about yourself in the first person, as
              if you’d directly talk to a mentee.
            </p>

            {/* LinkedIn, Twitter, and Personal Website Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {/* LinkedIn Profile */}
              <div>
                <label
                  htmlFor="linkedin"
                  className="block text-gray-700 font-bold mb-4"
                >
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  id="linkedin"
                  className="w-full shadow rounded-lg p-2 border border-gray-300"
                  placeholder="https://www.linkedin.com/in/your-profile/"
                />
              </div>

              {/* Twitter Profile */}
              <div>
                <label
                  htmlFor="twitter"
                  className="block text-gray-700 font-bold mb-4"
                >
                  Twitter Handle
                </label>
                <input
                  type="url"
                  id="twitter"
                  className="w-full shadow rounded-lg p-2 border border-gray-300"
                  placeholder="https://twitter.com/your-profile"
                />
              </div>

              {/* Personal Website */}
              <div className="sm:col-span-2 mb-6">
                <label
                  htmlFor="website"
                  className="block text-gray-700 font-bold mb-4"
                >
                  Personal Website
                </label>
                <input
                  type="url"
                  id="website"
                  className="w-full shadow rounded-lg p-2 border border-gray-300"
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <button
                type="button"
                className="bg-indigo-600 text-white py-2 px-4 rounded-lg"
                onClick={() => showPage(0)}
              >
                Previous Step
              </button>
              <button
                type="button"
                className="bg-indigo-600 text-white py-2 px-4 rounded-lg"
                onClick={() => showPage(2)}
              >
                Next Step
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Page 3: Summary */}
      {currentPage === 2 && (
        <div id="page3" className="form-page">
          <div className="bg-white rounded-lg p-8 max-w-4xl mx-auto mt-3">
            <div className="bg-blue-300 text-white p-4 rounded-lg mb-6">
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 flex items-center justify-center bg-blue-800 text-white rounded-full">
                  <i className="fa-solid fa-exclamation"></i>
                </span>
                <p className="text-lg font-semibold text-blue-800">
                  Almost there!
                </p>
              </div>
              <p className="text-gray-700 mt-2 text-sm">
                You’re just one step away from being a mentor and connecting
                with mentees all over the country! In this step, show off your
                accomplishments and how you can help others. Many of these
                fields are optional but will help us get better insights into
                your work - and therefore exponentially increase your chances.
                They also give you a jumpstart once you’re a mentor.
              </p>
            </div>

            <form id="mentor-form">
              <div className="grid grid-cols-2 gap-6 mb-2">
                <div className="rounded-md p-4">
                  <label
                    htmlFor="introVideo"
                    className="block text-gray-700 font-bold mb-4"
                  >
                    Intro Video
                  </label>
                  <input
                    type="text"
                    id="introVideo"
                    name="introVideo"
                    placeholder="Paste your intro video URL"
                    className="w-full shadow rounded-lg p-2 border border-gray-300"
                  />
                  <p className="text-gray-500 mt-4 text-sm">
                    Share a video link (from youtube) introducing yourself. This
                    will be public.
                  </p>
                </div>
                <div className="rounded-md p-4">
                  <label
                    htmlFor="featuredArticle"
                    className="block text-gray-700 font-bold mb-4"
                  >
                    Featured Article
                  </label>
                  <input
                    type="text"
                    id="featuredArticle"
                    name="featuredArticle"
                    placeholder="Link an article you've written"
                    className="w-full shadow rounded-lg p-2 border border-gray-300"
                  />
                </div>
              </div>

              <div className="mb-6 rounded-md p-4">
                <label
                  htmlFor="whyMentor"
                  className="block text-gray-700 font-bold mb-4"
                >
                  Why do you want to become a mentor? (Not publicly visible)
                </label>
                <textarea
                  id="whyMentor"
                  name="whyMentor"
                  rows="4"
                  className="w-full shadow rounded-lg p-2 border border-gray-300"
                ></textarea>
              </div>

              <div className="mb-6 rounded-md p-4">
                <label
                  htmlFor="greatestAchievement"
                  className="block text-gray-700 font-bold mb-4"
                >
                  What, in your opinion, has been your greatest achievement so
                  far? (Not publicly visible)
                </label>
                <textarea
                  id="greatestAchievement"
                  name="greatestAchievement"
                  rows="4"
                  className="w-full shadow rounded-lg p-2 border border-gray-300"
                ></textarea>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  className="bg-indigo-600 text-white py-2 px-4 rounded-lg"
                  onClick={() => showPage(1)}
                >
                  Previous Step
                </button>
                <button
                  type="button"
                  className="bg-indigo-600 text-white py-2 px-4 rounded-md"
                  onClick={() => alert("Form submitted!")}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepForm;
