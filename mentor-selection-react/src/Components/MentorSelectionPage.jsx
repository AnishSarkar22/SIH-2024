import React, { useState } from "react";
import MentorCard1 from "./MentorCard1"; // Import your mentor cards
import MentorCard2 from "./MentorCard2";
import MentorCard3 from "./MentorCard3";
import FilterComponent from "./FilterComponent";

const mentors = [
  {
    id: 1,
    name: "Jane Doe",
    tags: ["UX & Design", "Product Design"],
    rating: 5,
  },
  { id: 2, name: "John Smith", tags: ["Product Design"], rating: 4 },
  {
    id: 3,
    name: "Manson Ng",
    tags: ["Software Engineering", "Tech Leadership"],
    rating: 4,
  },
  // Add other mentor data here
];

const MentorSelectionPage = () => {
  const [filters, setFilters] = useState({ tags: [], rating: 0 });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const filteredMentors = mentors.filter((mentor) => {
    const hasMatchingTags =
      filters.tags.length === 0 ||
      filters.tags.some((tag) => mentor.tags.includes(tag));
    const hasSufficientRating = mentor.rating >= filters.rating;
    return hasMatchingTags && hasSufficientRating;
  });

  return (
    <div className="p-6">
      <FilterComponent onFilterChange={handleFilterChange} />

      <div className="mt-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredMentors.map((mentor) => {
          if (mentor.id === 1)
            return <MentorCard1 key={mentor.id} darkMode={false} />;
          if (mentor.id === 2)
            return <MentorCard2 key={mentor.id} darkMode={false} />;
          if (mentor.id === 3)
            return <MentorCard3 key={mentor.id} darkMode={false} />;
          return null;
        })}
      </div>
    </div>
  );
};

export default MentorSelectionPage;
