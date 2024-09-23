import React, { useState } from "react";
import { CheckCircle, X } from "lucide-react";

const bookingsData = [
  { name: "Aniket Ghosh", connections: 216, date: "Today" },
  { name: "Arnab Dua", connections: 150, date: "Yesterday" },
  { name: "Anish Sarkar", connections: 120, date: "Today" },
  { name: "Arghya Panda", connections: 180, date: "Today" },
  { name: "Sankha Pal", connections: 200, date: "Today" },
  { name: "Anurag Biswas", connections: 170, date: "Today" },
  { name: "Arindam Das", connections: 160, date: "Today" },
  { name: "Ankit Ray", connections: 140, date: "Today" },
  { name: "Srikanta Das", connections: 130, date: "Today" },
  { name: "Soham Bhattacharay", connections: 110, date: "Today" },
  { name: "Joy sankar", connections: 90, date: "Today" },
];

const Booking = ({ name, date }) => {
  const [status, setStatus] = useState(null);

  const handleAccept = () => setStatus("accepted");
  const handleReject = () => setStatus("rejected");

  return (
    <div
      className={`w-[800px] h-40 rounded-lg shadow-md overflow-hidden mb-4 transition-colors duration-300 
      ${
        status === "accepted"
          ? "bg-green-100 dark:bg-green-800"
          : status === "rejected"
          ? "bg-red-100 dark:bg-red-800"
          : "bg-white dark:bg-gray-800"
      }`}
    >
      <div className="p-4 flex items-center space-x-4 h-full">
        <img
          src="/api/placeholder/48/48"
          alt="Profile"
          className="w-12 h-12 rounded-full"
        />
        <div className="flex-grow">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            {name}
          </h2>
          <p className="text-md text-gray-600 dark:text-gray-400 mb-1">
            Wants to book 1:1 session with you
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-300">{date}</p>
        </div>
        <div className="flex space-x-4">
          {status === null ? (
            <>
              <button
                onClick={handleAccept}
                className="flex items-center p-1 rounded-full text-green-500 hover:bg-green-50 dark:hover:bg-green-600"
              >
                <CheckCircle size={20} />
                <span className="ml-2">Accept</span>
              </button>
              <button
                onClick={handleReject}
                className="flex items-center p-1 rounded-full text-gray-400 hover:bg-red-100 dark:text-gray-200 dark:hover:bg-red-600"
              >
                <X size={20} />
                <span className="ml-2">Reject</span>
              </button>
            </>
          ) : (
            <div
              className={`font-semibold ${
                status === "accepted"
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {status === "accepted" ? "Accepted" : "Rejected"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const BookingsList = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900">
      {bookingsData.map((booking, index) => (
        <Booking key={index} name={booking.name} date={booking.date} />
      ))}
    </div>
  );
};

export default BookingsList;
