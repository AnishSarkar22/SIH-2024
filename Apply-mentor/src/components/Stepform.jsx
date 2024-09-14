import React, { useState } from "react";
// src/index.js or src/App.js
import '@fortawesome/fontawesome-free/css/all.min.css';


const StepForm = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [photoPreview, setPhotoPreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target.result);
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
                className={`flex-1 h-1 ${
                  currentPage > index ? "bg-indigo-600" : "bg-gray-300"
                }`}
              ></div>
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
            <div className="mb-4 flex items-center ml-6">
              <i id="avatarIcon" className="fa-solid fa-user avatar-icon"></i>
              {photoPreview && (
                <img
                  id="photoPreview"
                  src={photoPreview}
                  className="image-preview"
                  alt="Photo Preview"
                />
              )}
              <div className="file-input-wrapper flex-1">
                <input
                  type="file"
                  id="photoInput"
                  className="file-input"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <label htmlFor="photoInput" className="file-label">
                  <i className="fa-solid fa-upload upload-icon"></i>
                  <span className="upload-text">Upload your photo</span>
                </label>
              </div>
            </div>
            <p
              id="uploadStatus"
              className={photoPreview ? "upload-status" : "hidden"}
            >
              Image uploaded
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  First name
                </label>
                <input
                  type="text"
                  className="w-full border border-black rounded-md p-2"
                  placeholder="First name"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Last name
                </label>
                <input
                  type="text"
                  className="w-full border border-black rounded-md p-2"
                  placeholder="Last name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full border border-black rounded-md p-2"
                  placeholder="Email"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full border border-black rounded-md p-2"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Job Title
                </label>
                <input
                  type="text"
                  className="w-full border border-black rounded-md p-2"
                  placeholder="Job Title"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Company
                </label>
                <input
                  type="text"
                  className="w-full border border-black rounded-md p-2"
                  placeholder="Company"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-indigo-600 text-white py-2 px-4 rounded-md"
                onClick={() => showPage(1)}
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
            <p className="text-gray-700 font-bold mb-2">Category</p>
            <div className="mb-6 p-4 border border-black rounded-md bg-white shadow-sm">
              <div className="flex items-center">
                <input
                  type="text"
                  id="category"
                  className="w-full border-black rounded-md p-2"
                  placeholder="Category"
                />
                <button
                  type="button"
                  className="ml-2 p-2 bg-gray-200 rounded-full"
                >
                  <i className="fa-solid fa-search"></i>
                </button>
              </div>
            </div>

            {/* Skills Section */}
            <p className="text-gray-700 font-bold mb-2">Skills</p>
            <div className="mb-6 p-4 border border-black rounded-md bg-white shadow-sm">
              <textarea
                id="skills"
                className="w-full border-black rounded-md p-2"
                rows="2"
                placeholder="Add a new skill..."
              ></textarea>
            </div>
            <p className="text-gray-500 mb-2 text-sm">
              Describe your expertise to connect with mentees who have similar
              interests.
              <br />
              Comma-separated list of your skills (keep it below 10). Mentees
              will use this to find you.
            </p>

            {/* Bio Section */}
            <p className="text-gray-700 font-bold mb-2">Bio</p>
            <div className="mb-6 p-4 border border-black rounded-md bg-white shadow-sm">
              <textarea
                id="bio"
                className="w-full border-black rounded-md p-2"
                rows="4"
                placeholder=""
              ></textarea>
            </div>
            <p className="text-gray-500 mb-2 text-sm">
              This will be public. Talk about yourself in the first person, as
              if you’d directly talk to a mentee.
            </p>

            {/* LinkedIn, Twitter, and Personal Website Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {/* LinkedIn Profile */}
              <div>
                <label
                  htmlFor="linkedin"
                  className="block text-gray-700 font-bold mb-2"
                >
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  id="linkedin"
                  className="w-full border border-black rounded-md p-2"
                  placeholder="https://www.linkedin.com/in/your-profile/"
                />
              </div>

              {/* Twitter Profile */}
              <div>
                <label
                  htmlFor="twitter"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Twitter Handle
                </label>
                <input
                  type="url"
                  id="twitter"
                  className="w-full border border-black rounded-md p-2"
                  placeholder="https://twitter.com/your-profile"
                />
              </div>

              {/* Personal Website */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="website"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Personal Website
                </label>
                <input
                  type="url"
                  id="website"
                  className="w-full border border-black rounded-md p-2"
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <button
                type="button"
                className="bg-indigo-600 text-white py-2 px-4 rounded-md"
                onClick={() => showPage(0)}
              >
                Previous Step
              </button>
              <button
                type="button"
                className="bg-indigo-600 text-white py-2 px-4 rounded-md"
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
          <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto mt-3">
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
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="border rounded-md p-4">
                  <label
                    htmlFor="introVideo"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Intro Video
                  </label>
                  <input
                    type="text"
                    id="introVideo"
                    name="introVideo"
                    placeholder="Paste your intro video URL"
                    className="w-full px-3 py-2 border border-black rounded-md"
                  />
                </div>
                <div className="border rounded-md p-4">
                  <label
                    htmlFor="featuredArticle"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Featured Article
                  </label>
                  <input
                    type="text"
                    id="featuredArticle"
                    name="featuredArticle"
                    placeholder="Link an article you've written"
                    className="w-full px-3 py-2 border border-black rounded-md"
                  />
                </div>
              </div>

              <div className="mb-6 border rounded-md p-4">
                <label
                  htmlFor="whyMentor"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Why do you want to become a mentor? (Not publicly visible)
                </label>
                <textarea
                  id="whyMentor"
                  name="whyMentor"
                  rows="4"
                  className="w-full px-3 py-2 border border-black rounded-md"
                ></textarea>
              </div>

              <div className="mb-6 border rounded-md p-4">
                <label
                  htmlFor="greatestAchievement"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  What, in your opinion, has been your greatest achievement so
                  far? (Not publicly visible)
                </label>
                <textarea
                  id="greatestAchievement"
                  name="greatestAchievement"
                  rows="4"
                  className="w-full px-3 py-2 border border-black rounded-md"
                ></textarea>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  className="bg-indigo-600 text-white py-2 px-4 rounded-md"
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
