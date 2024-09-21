import React, { useState } from "react";

const RoleToggle = ({ onRoleChange }) => {
  const [selectedRole, setSelectedRole] = useState("mentee");

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    onRoleChange(role);
  };

  return (
    <div className="flex w-full mb-4 border rounded-md overflow-hidden">
      <button
        onClick={() => handleRoleChange("mentee")}
        className={`flex-1 py-2 px-4 text-sm font-medium ${
          selectedRole === "mentee"
            ? "bg-indigo-500 text-white"
            : "bg-white text-gray-700 hover:bg-gray-50"
        }`}
      >
        I'm a mentee
      </button>
      <button
        onClick={() => handleRoleChange("mentor")}
        className={`flex-1 py-2 px-4 text-sm font-medium ${
          selectedRole === "mentor"
            ? "bg-indigo-500 text-white"
            : "bg-white text-gray-700 hover:bg-gray-50"
        }`}
      >
        I'm a mentor
      </button>
    </div>
  );
};

export default RoleToggle;
