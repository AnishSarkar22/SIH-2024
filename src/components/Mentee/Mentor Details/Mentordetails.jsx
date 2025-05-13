import React, { useEffect, useState } from "react";
import { Star, MapPin, Heart, LinkedinIcon, XIcon } from "lucide-react";
import { LuMessageSquare } from "react-icons/lu";
import { MdOutlineGroups } from "react-icons/md";
import { MdOutlineVideocam } from "react-icons/md";
import MentorBookingModal from "../../MentorBookingModal";
import  mentorImage  from "../../../../public/images/1pic (1).png";


const MenteeReview = ({ name, rating, review, date }) => (
  <div className="border-b border-black">
    <div className="flex items-center mb-2">
      <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-300 rounded-full mr-3 mb-5"></div>
      <div>
        <h3 className="font-semibold text-base md:text-lg dark:text-white">
          {name}
        </h3>
        <div className="flex items-center mb-6">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="w-3 h-3 md:w-4 md:h-4 mr-1 text-[#2F855C] fill-current"
            />
          ))}
          <span className="ml-2 text-xs md:text-sm text-gray-600 dark:text-white">
            {date}
          </span>
        </div>
      </div>
    </div>
    <p className="text-sm md:text-base text-black dark:text-white font-normal">
      {review}
    </p>
  </div>
);

const SkillTag = ({ skill }) => (
  <span className="bg-[#d9d9d9] text-[#000000] dark:text-black text-xs font-medium mr-2 px-2 py-0.5 rounded-md h-6 md:h-8 flex justify-center items-center">
    {skill}
  </span>
);

const SimilarMentor = ({
  name,
  role,
  company,
  rating,
  reviews,
  skills,
  price,
}) => (
  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 p-4 border-b border-black bg-white dark:bg-gray-900">
    <img
      src={mentorImage} alt="Mentor Profile"
      className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-300"
    />
    <div className="flex-1">
      <div className="flex flex-col md:flex-row md:items-center gap-2">
        <h3 className="text-xl md:text-2xl font-medium mb-1 md:mb-2 dark:text-white">
          {name}
        </h3>
        <div className="flex items-center gap-1">
          <Star size={16} className="text-green-700 fill-current" />
          <span className="text-green-700">{rating}</span>
          <span className="text-green-700">({reviews} reviews)</span>
        </div>
      </div>

      <p className="text-gray-800 dark:text-white text-sm md:text-md mb-2 md:mb-3 font-normal">
        {role} @ {company}
      </p>

      <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-2 md:px-3 py-1 text-xs rounded-md bg-[#d9d9d9] text-black dark:text-black"
          >
            {skill}
          </span>
        ))}
      </div>

      <p className="text-gray-700 dark:text-white font-medium text-sm md:text-base">
        From ₹{price} / month
      </p>
    </div>
  </div>
);

const MentorDetails = ({ darkMode, toggleDarkMode }) => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveClick = () => {
    setIsSaved(!isSaved);
  };

  useEffect(() => {
    const handleScroll = () => {
      console.log("Scrolled to:", window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleBooking = () => {
    setIsBookingModalOpen(true);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="bg-white dark:bg-gray-900">
        {/* Profile Container */}
        <div className="bg-white dark:bg-gray-900 h-auto md:h-80 relative px-0 md:px-0">
          <div className="max-w-5xl mx-auto px-4 md:px-16">
            {" "}
            {/* Reduced max-w from 7xl to 5xl */}
            <div className="flex flex-col md:flex-row justify-between md:absolute md:bottom-0 md:transform md:translate-y-1/2 w-full max-w-5xl py-6 md:py-0">
              {" "}
              {/* Reduced max-w from 7xl to 5xl */}
              {/* Left side - Profile and Badge */}
              <div className="flex flex-col md:flex-row items-center mb-6 md:mb-16">
                <div className="flex items-center space-x-4">
                  <img
                    src={mentorImage}
                    alt="Mentor Profile"
                    className="w-32 h-32 md:w-44 md:h-44 rounded-full object-cover bg-gray-400"
                  />
                </div>
                <div className="flex items-center space-x-2 mt-4 md:mt-0 md:ml-6">
                  <span className="w-28 md:w-36 bg-green-100 text-black dark:text-black text-xs md:text-sm font-medium px-4 md:px-6 py-1 rounded-md flex flex-row items-center">
                    <Star className="w-3 h-3 md:w-4 md:h-4 mr-1 text-[#2F855C] fill-current" />
                    Top Mentor
                  </span>
                </div>
              </div>
              {/* Skills section - Desktop view
              <div className="hidden md:flex flex-col px-2 pb-4 ml-20 mt-96 w-full">
                <h3 className="text-3xl font-bold mb-4 mt-6 dark:text-white">Skills</h3>
                <div className="grid gap-3 grid-cols-2 lg:grid-cols-3 w-full text-md items-center">
                  <SkillTag skill="Data Science" />
                  <SkillTag skill="Statistics" />
                  <SkillTag skill="Teaching" />
                  <SkillTag skill="Consulting" />
                  <SkillTag skill="Open source" />
                  <SkillTag skill="+9 more" />
                </div>
              </div> */}
              {/* Right side - Social Links and Pricing Card */}
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex items-center space-x-4 mb-6 md:mb-16">
                  <div className="flex space-x-5">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-300 cursor-pointer">
                      <LinkedinIcon className="w-5 h-5 text-black-600 dark:text-white" />
                    </div>
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-300 cursor-pointer">
                      <XIcon className="w-5 h-5 text-gray-700 dark:text-white" />
                    </div>
                  </div>
                </div>
                {/* Pricing Card */}
                <div className="w-full md:w-[400px] hidden md:block">
                  <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-lg shadow-xl min-h-[350px] md:min-h-[400px] flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-4 text-left dark:text-white">
                        
                      </h3>
                      <p className="text-sm md:text-base text-gray-600 dark:text-white mb-6 text-left">
                        The most popular way to get mentored, let's work towards
                        your goals!
                      </p>
                      <ul className="space-y-4 mb-8">
                        <li className="flex items-center text-sm md:text-base dark:text-white">
                          <MdOutlineVideocam className="w-6 h-6 md:w-8 md:h-8 mr-3 text-black dark:text-white" />
                          Group Sessions, One-to-one Sessions
                        </li>
                        <li className="flex items-center text-sm md:text-base dark:text-white">
                          <LuMessageSquare className="w-5 h-5 md:w-6 md:h-6 mr-3 text-black dark:text-white" />
                          Unlimited Q&A via Chat
                        </li>
                        <li className="flex items-center text-sm md:text-base dark:text-white">
                          <MdOutlineGroups className="w-6 h-6 md:w-7 md:h-7 mr-3 text-black dark:text-white" />
                          Hands-on Support
                        </li>
                      </ul>
                    </div>
                    <button
                      className="w-full bg-gray-700 text-white py-3 md:py-4 px-6 rounded-full font-medium hover:bg-gray-800 transition duration-300 flex items-center justify-center text-sm md:text-base"
                      onClick={handleBooking}
                    >
                      Book Your Session
                      <svg
                        className="w-5 h-5 md:w-6 md:h-6 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        ></path>
                      </svg>
                    </button>
                    <MentorBookingModal
                      isOpen={isBookingModalOpen}
                      closeModal={() => setIsBookingModalOpen(false)}
                      // mentorUsername={mentor.calendarUsername} 
                      mentorUsername="rebooters"
                      calendarUrl="https://cal.com/rebooters/30min"
                    />
                  </div>
                  {/* Skills section - Desktop view */}
                  <div className="hidden md:flex flex-col px-2 pb-4 w-full">
                    <h3 className="text-3xl font-bold mb-4 mt-6 dark:text-white">
                      Skills
                    </h3>
                    <div className="grid gap-3 grid-cols-2 lg:grid-cols-3 w-full text-md items-center">
                      <SkillTag skill="Data Science" />
                      <SkillTag skill="Statistics" />
                      <SkillTag skill="Teaching" />
                      <SkillTag skill="Consulting" />
                      <SkillTag skill="Open source" />
                      <SkillTag skill="+9 more" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-5xl mx-auto px-4 md:px-16 pt-12 md:pt-24 dark:text-white">
          {" "}
          {/* Reduced max-w from 7xl to 5xl */}
          <div className="w-full bg-white dark:bg-gray-900 rounded-lg overflow-hidden">
            <div className="p-4 md:p-6 flex flex-col md:flex-row">
              {/* Left column */}
              <div className="w-full md:w-2/3 md:pr-6">
                {/* Left column */}
                <div className="w-full md:w-2/3 md:pr-6">
                  {/* Mentor Info */}
                  <h2 className="text-2xl md:text-3xl font-bold mb-3 dark:text-white">
                    Krunal Parmar
                  </h2>
                  <p className="text-gray-700 dark:text-white font-medium text-sm md:text">
                    Research and Development @ NJNM
                  </p>
                  <p className="text-[#2F855C] text-sm md:text-base dark:text-white">
                    Data Scientist, Software Developer,and
                  </p>
                  <p className="text-[#2F855C] mb-7 text-sm md:text-base dark:text-white">
                    Stats Consultant
                  </p>
                  <div className="flex items-center mb-3">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 text-[#2F855C] mr-2 dark:text-white" />
                    <span className="text-[#2F855C] font-medium text-sm md:text-base dark:text-white">
                      India
                    </span>
                  </div>
                  <div className="flex items-center mb-6">
                    <Star className="w-4 h-4 md:w-5 md:h-5 text-[#2F855C] fill-current mr-1 dark:text-white" />
                    <span className="text-[#2F855C] font-medium text-sm md:text-base dark:text-white">
                      5.0 (15 reviews)
                    </span>
                  </div>
                  <button
                    className={`flex items-center justify-center px-6 md:px-8 py-2 border border-black dark:border-white rounded-xl text-base md:text-lg font-medium transition duration-150 ease-in-out ${
                      isSaved
                        ? "bg-red-500 text-white"
                        : "text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                    onClick={handleSaveClick}
                  >
                    <Heart className="w-4 h-4 md:w-5 md:h-5 mr-2 dark:text-white" />
                    {isSaved ? "Saved" : "Save"}
                  </button>

                  {/* Skills section - Mobile view */}
                  <div className="md:hidden flex flex-col px-2 pb-4 w-full mt-12">
                    <h3 className="text-2xl font-bold mb-4 text-black dark:text-white">
                      Skills
                    </h3>
                    <div className="grid gap-2 grid-cols-2 w-full text-sm items-center">
                      <SkillTag skill="Data Science" />
                      <SkillTag skill="Statistics" />
                      <SkillTag skill="Teaching" />
                      <SkillTag skill="Consulting" />
                      <SkillTag skill="Open source" />
                      <SkillTag skill="+9 more" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Card for Mobile */}
            <div className="w-full md:hidden">
              {/* Existing mobile pricing card content */}
            </div>

            {/* Additional Sections */}
            <div className="w-full md:w-2/3 px-4 md:pr-6">
              <div className="mx-auto md:ml-5">
                {/* About Me Section */}
                <div className="mb-10 md:mb-14 mt-10 md:mt-20">
                  <h3 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-10 dark:text-white">
                    About Me
                  </h3>
                  <p className="text-black dark:text-white text-base md:text-lg leading-relaxed mb-4 md:mb-6 font-normal">
                    I'm a Software Developer since 2008, Data Scientist since
                    2014, with experience in predictive modeling applied to
                    lending, consumer packaged goods, online advertising, and
                    other industries.
                  </p>
                  <p className="text-black dark:text-white text-base md:text-lg leading-relaxed font-normal">
                    I'm Open-source software is a common thread and passion
                    though out my career - I would be happy to mentor anyone
                    actively contributing back to the community, or anyone with
                    a great idea that needs a second pair of eyes on it.
                  </p>
                </div>

                {/* Mentee Reviews Section */}
                <div className="mb-10 md:mb-14">
                  <h3 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-6 dark:text-white">
                    What mentees say
                  </h3>
                  <div className="space-y-6">
                    <MenteeReview
                      name="John Doe"
                      rating={5}
                      review="Radhika was an exceptional mentor. Her insights into data science were invaluable, and she provided me with the guidance I needed to advance my career."
                      date="June 20, 2023"
                    />
                    <MenteeReview
                      name="Jane Smith"
                      rating={4}
                      review="She has a deep understanding of data science concepts and can explain them in an easy-to-understand manner. Highly recommended!"
                      date="May 15, 2023"
                    />
                    <MenteeReview
                      name="Mark Johnson"
                      rating={5}
                      review="One of the best mentors I have had the pleasure of learning from. She is patient, knowledgeable, and always willing to help."
                      date="April 10, 2023"
                    />
                  </div>
                </div>

                {/* Similar Mentors Section */}
                <div className="mb-10 md:mb-14">
                  <h3 className="text-2xl md:text-3xl font-semibold mb-4 dark:text-white">
                    Similar Mentors
                  </h3>
                  <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden">
                    <SimilarMentor
                      name="Gautam Nigam"
                      role="Program Manager"
                      company="Meta"
                      rating="5.0"
                      reviews={12}
                      skills={[
                        "Career Coaching",
                        "Interview",
                        "Resume",
                        "Leadership",
                        "Operations",
                      ]}
                      price="5500"
                    />
                    <SimilarMentor
                      name="Thomas John"
                      role="Lead SRE"
                      company="MICROSOFT"
                      rating="5.0"
                      reviews={12}
                      skills={[
                        "Python",
                        "Kubernetes",
                        "Azure",
                        "Google Cloud",
                        "Ansible",
                      ]}
                      price="5000"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MentorDetails;
