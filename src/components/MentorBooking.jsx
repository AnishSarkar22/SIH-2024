// MentorBooking.jsx
import React, { useState } from 'react';

const MentorBooking = ({ mentorId }) => {
  const [showModal, setShowModal] = useState(false);
  const [availability, setAvailability] = useState(null);

  const fetchAvailability = async () => {
    try {
      const response = await fetch(`/api/mentor-availability/${mentorId}`);
      const data = await response.json();
      setAvailability(data);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching availability:', error);
    }
  };

  return (
    <div>
      <button 
        onClick={fetchAvailability}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Book Session
      </button>

      
        {availability && (
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Available Time Slots</h2>
            {availability.schedules.map((slot, index) => (
              <div key={index} className="mb-2">
                <p>{new Date(slot.date).toLocaleDateString()}</p>
                {slot.slots.map((time, idx) => (
                  <button
                    key={idx}
                    className="mr-2 mb-2 px-3 py-1 bg-gray-100 rounded"
                    onClick={() => {/* Handle booking */}}
                  >
                    {new Date(time).toLocaleTimeString()}
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}
    </div>
  );
};

export default MentorBooking;