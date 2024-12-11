import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import languages from "@cospired/i18n-iso-languages";
import en from "@cospired/i18n-iso-languages/langs/en.json";
import moment from "moment-timezone";
import Select from "react-select";
import defaultAvatar from "/images/aniket.png";

languages.registerLocale(en);

const languageOptions = Object.entries(languages.getNames("en")).map(
  ([code, name]) => ({
    value: code,
    label: name,
  })
);

const ProfileCompletionForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    languages: [],
    country: "",
    timeZone: "",
    age: "",
    gender: "Female",
    profileImage: "",
  });

  const [topics, setTopics] = useState([]); // Start with an empty array
  const [newTopic, setNewTopic] = useState(""); // State for new topic input
  const [isUploading, setIsUploading] = useState(false); // Track upload status
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1); // Track the current step

  useEffect(() => {
    // No need to initialize intlTelInput
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.phone) newErrors.phone = "Phone Number is required";
    if (formData.languages.length === 0)
      newErrors.languages = "At least one language is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.timeZone) newErrors.timeZone = "Time Zone is required";
    if (!formData.age || isNaN(Number(formData.age)))
      newErrors.age = "Valid Age is required";
    if (!formData.gender) newErrors.gender = "Gender is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true); // Set uploading to true when file is selected
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({ ...prev, profileImage: reader.result }));
        setIsUploading(false); // Set uploading to false after reading the file
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTopic = (e) => {
    e.preventDefault();
    if (newTopic && !topics.includes(newTopic)) {
      setTopics([...topics, newTopic]);
      setNewTopic(""); // Clear the input field after adding
    }
  };

  const handleRemoveTopic = (topic) => {
    setTopics(topics.filter((t) => t !== topic));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (validateForm()) {
        setStep(2); // Move to the next step
      }
    } else {
      console.log("Form Submitted: ", formData, topics);
      navigate("/dashboard");
    }
  };

  // Ensure topics is always an array before calling .map
  const safeTopics = Array.isArray(topics) ? topics : [];

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8">
      {step === 1 ? (
        <>
          <div className="flex flex-col sm:flex-row items-center mb-8">
            {/* Avatar Section */}
            <div className="relative mr-0 sm:mr-6 mb-4 sm:mb-0">
              <div
                className="w-36 h-36 rounded-full p-2"
                style={{
                  background: `conic-gradient(
                    #3b82f6 0%, 
                    #e5e7eb 0% 100%
                  )`,
                }}
              >
                <div className="absolute inset-[9px] bg-white rounded-full p-4">
                  <img
                    src={formData.profileImage || defaultAvatar}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
            </div>
            {/* Completion Info */}
            <div className="flex flex-col items-center sm:items-start">
              <p className="text-xl font-semibold">Complete Your Profile</p>
              <p className="text-sm text-gray-500">0% Complete</p>
              <label
                htmlFor="profile-image"
                className="cursor-pointer mt-4 border px-3 py-2 rounded-md hover:bg-gray-200 border-black w-max text-sm"
              >
                ✎ Upload Photo
              </label>
              <input
                type="file"
                id="profile-image"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
          </div>

          {/* Uploading Status Message */}
          {isUploading && (
            <p className="text-sm text-gray-500 mt-4">
              Your photo is being uploaded...
            </p>
          )}

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className="w-80 border border-black rounded-md p-2 sm:w-96"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">{errors.firstName}</p>
              )}
            </div>
            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block mb-2">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="w-80 border border-black rounded-md p-2 sm:w-96"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">{errors.lastName}</p>
              )}
            </div>
            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <PhoneInput
                country={"us"}
                value={formData.phone}
                onChange={(phone) => handleInputChange("phone", phone)}
                containerStyle={{ width: "95%" , height :"54%"  }}
                inputStyle={{ width: "100%" }}
                className="w-72 border border-black rounded-md sm:w-96"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>
            {/* Languages */}
            <div>
              <label htmlFor="languages" className="block mb-2">
                Languages <span className="text-red-500">*</span>
              </label>
              <Select
                isMulti
                options={languageOptions}
                placeholder="Select Languages"
                className="w-80 border border-black rounded-md sm:w-96"
                onChange={(selected) =>
                  handleInputChange(
                    "languages",
                    selected ? selected.map((option) => option.value) : []
                  )
                }
              />
              {errors.languages && (
                <p className="text-red-500 text-sm">{errors.languages}</p>
              )}
            </div>
            {/* Country */}
            <div>
              <label htmlFor="country" className="block mb-2">
                Country <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="country"
                placeholder="Enter Country"
                value={formData.country}
                onChange={(e) => handleInputChange("country", e.target.value)}
                className="w-80 border border-black rounded-md p-2 sm:w-96"
              />
              {errors.country && (
                <p className="text-red-500 text-sm">{errors.country}</p>
              )}
            </div>
            {/* Time Zone */}
            <div>
              <label htmlFor="timeZone" className="block mb-2">
                Time Zone <span className="text-red-500">*</span>
              </label>
              <Select
                options={moment.tz
                  .names()
                  .map((tz) => ({ value: tz, label: tz }))}
                placeholder="Select Time Zone"
                className="w-80 border border-black rounded-md sm:w-96"
                onChange={(selected) =>
                  handleInputChange("timeZone", selected?.value || "")
                }
              />
              {errors.timeZone && (
                <p className="text-red-500 text-sm">{errors.timeZone}</p>
              )}
            </div>
            {/* Age */}
            <div>
              <label htmlFor="age" className="block mb-2">
                Age <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="age"
                placeholder="Age"
                value={formData.age}
                onChange={(e) => handleInputChange("age", e.target.value)}
                className="w-80 border border-black rounded-md p-2 sm:w-96"
              />
              {errors.age && (
                <p className="text-red-500 text-sm">{errors.age}</p>
              )}
            </div>
            {/* Gender */}
            <div>
              <label htmlFor="gender" className="block mb-2">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                id="gender"
                value={formData.gender}
                onChange={(e) => handleInputChange("gender", e.target.value)}
                className="w-80 border border-black rounded-md p-2 sm:w-96"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm">{errors.gender}</p>
              )}
            </div>
            {/* Continue Button */}
            <div className="col-span-1 sm:col-span-2">
              <button
                type="submit"
                className="bg-[#2F4454] text-white p-2 rounded-xl w-20"
              >
                Next
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <div className="min-h-screen flex flex-col items-center justify-start bg-gray-50 py-6 px-4 sm:px-12">
            {/* Profile Section */}
            <div className="w-full flex flex-col items-center sm:p-6 rounded-lg">
              <div className="flex flex-col sm:flex-row items-center sm:mb-8">
                {/* Avatar Section */}
                <div className="relative mx-auto sm:mr-10">
                  <div
                    className="w-24 h-24 sm:w-36 sm:h-36 rounded-full"
                    style={{
                      background: `conic-gradient(#2F4454 0%, #2F4454 50%, #e5e7eb 50%, #e5e7eb 100%)`,
                    }}
                  >
                    <div className="absolute inset-1 sm:inset-2 bg-white rounded-full p-2 sm:p-6">
                      <img
                        src={formData.profileImage || defaultAvatar}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Completion Info */}
                <div className="flex flex-col items-center sm:items-start mt-4 sm:mt-0">
                  <p className="text-xl font-semibold text-center sm:text-left">
                    Complete Your Profile
                  </p>
                  <p className="text-sm text-gray-500 text-center sm:text-left">
                    50% Complete
                  </p>
                  <label
                    htmlFor="profile-image"
                    className="cursor-pointer mt-6 border px-3 py-2 rounded-md hover:bg-gray-200 border-black text-sm"
                  >
                    ✎ Upload Photo
                  </label>
                  <input
                    type="file"
                    id="profile-image"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>

              {/* Uploading Status Message */}
              {isUploading && (
                <p className="text-sm text-gray-500 mt-4">
                  Your photo is being uploaded...
                </p>
              )}

              {/* Topics Section */}
              <h1 className="mt-6 text-gray-700 font-medium text-center text-2xl sm:text-4xl">
                Topics You Prefer
              </h1>
              <p className="text-base text-gray-500 text-center mb-6 sm:mb-12">
                (choose as many as you want)
              </p>

              {/* Input for new topic */}
              <form
                onSubmit={handleAddTopic}
                className="mt-4 w-full flex items-center justify-center"
              >
                <input
                  type="text"
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  placeholder="Add a topic"
                  className="w-full sm:w-[400px] px-4 py-2 border border-gray-700 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </form>

              {/* Tags Section */}
              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                {safeTopics.map((topic) => (
                  <div
                    key={topic}
                    className="flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {topic}
                    <button
                      onClick={() => handleRemoveTopic(topic)}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      ✖
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Continue Button */}
            <button
              onClick={handleSubmit} // Handle the click event
              className="mt-12 w-24 bg-[#2F4454] text-white py-2 rounded-md shadow"
            >
              Continue
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileCompletionForm;