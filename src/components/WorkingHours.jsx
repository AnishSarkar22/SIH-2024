import { useState } from "react";
import { Switch } from "@mui/material";
import { Link } from "react-router-dom";

const WorkingHours = () => {
  const [workingHours, setWorkingHours] = useState([
    { day: "Sunday", enabled: false },
    { day: "Monday", enabled: true },
    { day: "Tuesday", enabled: true },
    { day: "Wednesday", enabled: true },
    { day: "Thursday", enabled: true },
    { day: "Friday", enabled: true },
    { day: "Saturday", enabled: false },
  ]);

  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const TIMEZONE_OPTIONS = [
    { value: "America/New_York", label: "Eastern Time (ET)" },
    { value: "America/Chicago", label: "Central Time (CT)" },
    { value: "America/Denver", label: "Mountain Time (MT)" },
    { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
    { value: "America/Anchorage", label: "Alaska Time (AKT)" },
    { value: "Pacific/Honolulu", label: "Hawaii Time (HT)" },
    { value: "Europe/London", label: "London (GMT)" },
    { value: "Europe/Paris", label: "Central European Time (CET)" },
    { value: "Asia/Dubai", label: "Dubai (GST)" },
    { value: "Asia/Singapore", label: "Singapore (SGT)" },
    { value: "Asia/Tokyo", label: "Japan (JST)" },
    { value: "Asia/Kolkata", label: "India (IST)" },
    { value: "Australia/Sydney", label: "Sydney (AEST)" },
  ];
  const handleToggle = (index) => {
    const newWorkingHours = [...workingHours];
    newWorkingHours[index].enabled = !newWorkingHours[index].enabled;
    setWorkingHours(newWorkingHours);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium">Working hours</h2>
        <div className="flex items-center gap-4">
          <button className="text-gray-600 hover:text-gray-800">
            Set to Default
          </button>
          <Link to="/mentor-dashboard">
            <button className="bg-black text-white px-4 py-2 rounded-md">
              Save
            </button>
          </Link>
        </div>
      </div>

      <div className="flex gap-8">
        <div className="flex-1 bg-white rounded-lg p-6 shadow-sm">
          {workingHours.map((item, index) => (
            <div key={item.day} className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-3 w-32">
                <Switch
                  checked={item.enabled}
                  onChange={() => handleToggle(index)}
                  color="primary"
                />
                <span className="text-gray-600">{item.day}</span>
              </div>

              {item.enabled && (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    defaultValue="9:00am"
                    className="border rounded px-3 py-1 w-24 text-sm"
                  />
                  <span>-</span>
                  <input
                    type="text"
                    defaultValue="5:00pm"
                    className="border rounded px-3 py-1 w-24 text-sm"
                  />
                  <button className="text-gray-400 hover:text-gray-600">
                    +
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg viewBox="0 0 24 24" className="w-5 h-5">
                      <path d="M16 16H8V8H16V16Z" fill="currentColor" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="w-64">
          <label className="block text-sm text-gray-600 mb-1">Timezone</label>
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
          >
            {TIMEZONE_OPTIONS.map((tz) => (
              <option key={tz.value} value={tz.value}>
                {tz.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default WorkingHours;
