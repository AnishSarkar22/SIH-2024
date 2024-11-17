import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const AvatarUpload = ({ photoPreview, handleFileChange }) => {
  return (
    <div className="flex items-center ml-6 mb-4">
      {/* Avatar Icon */}
      {!photoPreview && (
        <i
          id="avatarIcon"
          className="fa-solid fa-user text-2xl text-[#131316] mr-4 flex items-center justify-center w-16 h-16 border-2 border-black rounded-full box-border px-4 py-4"
        ></i>
      )}

      {/* Image Preview */}
      {photoPreview && (
        <img
          id="photoPreview"
          src={photoPreview}
          className="max-w-[4rem] max-h-[4rem] object-cover rounded-full border-2 border-black mr-4"
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
          className="flex items-center rounded-lg shadow border border-gray-300 text-black px-2 py-2 font-bold cursor-pointer text-xs relative overflow-hidden w-40"
        >
          <i className="fa-solid fa-upload mr-2.5 text-black"></i>
          <span className="upload-text">Upload your photo</span>
        </label>
        {/* <p
          id="uploadStatus"
          className={`upload-status ${photoPreview ? "block" : "hidden"}`}
        >
          Image uploaded
        </p> */}
      </div>
    </div>
  );
};

const StepForm = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [photoPreview, setPhotoPreview] = useState(null);

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
              <div
                className="mt-2 text-sm font-medium text-gray-500"
                style={index === 2 ? { marginLeft: "-1rem" } : {}}
              >
                {index === 0 ? "Profile" : index === 1 ? "Info" : "Summary"}
              </div>
            </div>
            {index < 2 && (
              <div
                className={`h-1 ${
                  currentPage > index ? "bg-indigo-600" : "bg-gray-300"
                }`}
                style={{ marginTop: "-1.5rem", width: "600px" }} // Increase the width and move the line up
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
            <AvatarUpload
              photoPreview={photoPreview}
              handleFileChange={handleFileChange}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 font-bold mb-4">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full shadow rounded-lg p-2 border border-gray-300"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-4">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full shadow rounded-lg p-2 border border-gray-300"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 font-bold mb-4">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full shadow rounded-lg p-2 border border-gray-300"
                  placeholder="johndoe@example.com"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-4">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full shadow rounded-lg p-2 border border-gray-300"
                  placeholder="Must have at least 6 characters"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              <div>
                <label className="block text-gray-700 font-bold mb-4">
                  Job Title
                </label>
                <input
                  type="text"
                  className="w-full shadow rounded-lg p-2 border border-gray-300"
                  placeholder="Software Engineer"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-4">
                  Company (optional)
                </label>
                <input
                  type="text"
                  className="w-full shadow rounded-lg p-2 border border-gray-300"
                  placeholder="ABC Corporation"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-indigo-600 text-white py-2 px-4 rounded-lg"
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
            </div>

            {/* Skills Section */}
            <p className="text-gray-700 font-bold mb-2">Skills</p>
            <div className="mb-6 p-4 rounded-md bg-white">
              <textarea
                id="skills"
                className="w-full shadow rounded-lg p-2 border border-gray-300"
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
            <div className="mb-6 p-4 rounded-md bg-white">
              <textarea
                id="bio"
                className="w-full shadow rounded-lg p-2 border border-gray-300"
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
                  className="w-full shadow rounded-lg p-2 border border-gray-300"
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
                  className="w-full shadow rounded-lg p-2 border border-gray-300"
                  placeholder="https://twitter.com/your-profile"
                />
              </div>

              {/* Personal Website */}
              <div className="sm:col-span-2 mb-6">
                <label
                  htmlFor="website"
                  className="block text-gray-700 font-bold mb-2"
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
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="rounded-md p-4">
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
                    className="w-full shadow rounded-lg p-2 border border-gray-300"
                  />
                </div>
                <div className="rounded-md p-4">
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
                    className="w-full shadow rounded-lg p-2 border border-gray-300"
                  />
                </div>
              </div>

              <div className="mb-6 rounded-md p-4">
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
                  className="w-full shadow rounded-lg p-2 border border-gray-300"
                ></textarea>
              </div>

              <div className="mb-6 rounded-md p-4">
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
