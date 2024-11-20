
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import intlTelInput from "intl-tel-input";
import languages from "@cospired/i18n-iso-languages";
import en from "@cospired/i18n-iso-languages/langs/en.json";
import moment from "moment-timezone";
import Select from "react-select";
import defaultAvatar from "/images/defaultAvatar.png";

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

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const phoneInput = document.getElementById("phone-input");
    if (phoneInput) {
      intlTelInput(phoneInput, {
        initialCountry: "us",
        utilsScript:
          "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
      });
    }
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
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Submitted: ", formData);
      navigate("/profile-completion-form2");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8">
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
          <input
            id="phone-input"
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className="w-80 border border-black rounded-md p-2 sm:w-96"
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
            options={moment.tz.names().map((tz) => ({ value: tz, label: tz }))}
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
          {

errors.age && (
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
    </div>
  );
};

export default ProfileCompletionForm;