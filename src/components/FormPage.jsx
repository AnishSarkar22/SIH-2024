import React, { useEffect, useRef } from "react";
import intlTelInput from "intl-tel-input";
import "intl-tel-input/build/css/intlTelInput.css";
import moment from "moment-timezone";

const FormPage = () => {
  const phoneInputRef = useRef(null);

  useEffect(() => {
    const input = phoneInputRef.current;

    if (input) {
      intlTelInput(input, {
        initialCountry: "auto",
        geoIpLookup: function (callback) {
          fetch("https://ipinfo.io?token=YOUR_TOKEN")
            .then((response) => response.json())
            .then((data) => callback(data.country))
            .catch(() => callback("us"));
        },
        utilsScript:
          "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
      });
    }

    const timeZones = moment.tz.names();
    const timezoneSelect = document.getElementById("timezone");

    timeZones.forEach((tz) => {
      const option = document.createElement("option");
      option.value = tz;
      option.textContent = tz;
      timezoneSelect.appendChild(option);
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div id="page1" className="form-page">
        <form>
          {/* Full Name */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div className="flex flex-col">
              <label className="block text-gray-700 font-bold mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full border border-black rounded-md p-2"
                placeholder="First name"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-700 font-bold mb-2">
                Middle Name
              </label>
              <input
                type="text"
                className="w-full border border-black rounded-md p-2"
                placeholder="Middle name"
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-700 font-bold mb-2">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full border border-black rounded-md p-2"
                placeholder="Last name"
                required
              />
            </div>
          </div>

          {/* Phone Number and Language */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col">
              <label className="block text-gray-700 font-bold mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                ref={phoneInputRef} // Attach ref to the phone input field
                id="phone"
                type="tel"
                className="w-full border sm:w-96 border-black rounded-md p-2"
                placeholder="Phone number"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="block text-gray-700 font-bold mb-2">
                Language <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full border border-black rounded-md p-2"
                placeholder="Language"
                required
              />
            </div>
          </div>

          {/* Country and Time Zone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col">
              <label className="block text-gray-700 font-bold mb-2">
                Country <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-96 border border-black rounded-md p-2"
                placeholder="Country"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-700 font-bold mb-2">
                Time Zone <span className="text-red-500">*</span>
              </label>
              <select
                id="timezone"
                className="w-full border border-black rounded-md p-2"
                required
              >
                <option value="" disabled selected>
                  Select your time zone
                </option>
              </select>
            </div>
          </div>

          {/* Age and Gender */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col">
              <label className="block text-gray-700 font-bold mb-2">
                Age <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                className="w-96 border border-black rounded-md p-2"
                placeholder="Age"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-700 font-bold mb-2">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full border border-black rounded-md p-2"
                required
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer_not_to_say">Prefer not to say</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormPage;