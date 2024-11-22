import React from "react";
import MentorDetails from "./Mentordetails";


function Mentorprofile() {
  return (
    <div
      className="flex h-screen overflow-hidden bg-[#D1E8E2]"
    >
      <div className="flex-1 overflow-y-auto">
        <div>
          {/* Add other content or components here */}
          
          <MentorDetails />
        </div>
      </div>
    </div>
  );
}

export default Mentorprofile;
