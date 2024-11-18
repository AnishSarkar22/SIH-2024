import React, { useEffect, useState } from "react";
import { Star, MapPin, Heart, LinkedinIcon, XIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { LuMessageSquare } from "react-icons/lu";
import { MdOutlineGroups } from "react-icons/md";
import { MdOutlineVideocam } from "react-icons/md";

const Header = () => (
  <div className="bg-slate-800 h-22 p-4 w-full relative flex items-center justify-between">
    {/* Logo on the left */}
    <div className="flex items-center ml-20">
      <Link to="/home">
        <img
          src="images/logo-white-removebg-preview.svg"
          className="h-[120px] w-[100px]"
          alt="logo"
        />
      </Link>
    </div>

    {/* Navigation links in the center */}
    <nav className="hidden md:flex space-x-6">
      <a href="#" className="text-white hover:text-teal-400 transition-colors">
        Home
      </a>
      <a href="#" className="text-white hover:text-teal-400 transition-colors">
        Careers
      </a>
      <a href="#" className="text-white hover:text-teal-400 transition-colors">
        Blog
      </a>
      <a href="#" className="text-white hover:text-teal-400 transition-colors">
        About Us
      </a>
    </nav>

    {/* Log In and Sign Up buttons on the right */}
    <div className="flex items-center space-x-4 mr-24">
      <button className="px-4 py-2 text-black bg-[#FFF] rounded-md hover:bg-gray-400 transition duration-300">
        Log In
      </button>
      <button className="px-4 py-2 text-black bg-[#FFF] rounded-md hover:bg-gray-400 transition duration-300">
        Sign Up
      </button>

      {/* Mobile menu button */}
      <button className="md:hidden text-white">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>
  </div>
);

const MenteeReview = ({ name, rating, review, date }) => (
  <div className="border-b border-black py-4">
    <div className="flex items-center mb-2">
      <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 mb-5"></div>
      <div>
        <h3 className="font-semibold text-lg">{name}</h3>
        <div className="flex items-center mb-6">
          {[...Array(5)].map((_, i) => (
            <Star className="w-4 h-4 mr-1 text-[#2F855C] fill-current" />
          ))}
          <span className="ml-2 text-sm text-gray-600">{date}</span>
        </div>
      </div>
    </div>
    <p className="text-base text-black font-normal ">{review}</p>
  </div>
);

const SkillTag = ({ skill }) => (
  <span className="bg-[#A8D6CA] text-[#000000] text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md  h-8 flex justify-center items-center">
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
  <div className="flex items-center gap-6 p-4 border-b border-black bg-[#D1E8E2]">
    <img src="" className="w-16 h-16 rounded-full bg-gray-300" />
    <div className="flex-1">
      <div className="flex items-center gap-2">
        <h3 className="text-2xl font-medium mb-2">{name}</h3>
        <div className="flex items-center gap-1">
          <Star size={16} className="text-green-700 fill-current" />
          <span className="text-green-700">{rating}</span>
          <span className="text-green-700">({reviews} reviews)</span>
        </div>
      </div>

      <p className="text-gray-800 text-md mb-3 font-normal">
        {role} @ {company}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 text-xs rounded-md bg-[#A8D6CA] text-black"
          >
            {skill}
          </span>
        ))}
      </div>

      <p className="text-gray-700 font-medium">From ₹{price} / month</p>
    </div>
  </div>
);

const MentorDetails = () => {
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveClick = () => {
    setIsSaved(!isSaved);
  };

  useEffect(() => {
    const handleScroll = () => {
      console.log("Scrolled to:", window.scrollY);
      // Add your scroll-related logic here
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Header />

      <div className="bg-[#D1E8E2]">
        {/* Profile Container - Using sticky positioning */}
        <div className="w-full bg-slate-800 h-80 relative">
          <div className="max-w-7xl mx-auto px-16">
            <div className="flex flex-row justify-between absolute bottom-0 transform translate-y-1/2 w-full max-w-7xl">
              {/* Left side - Profile and Badge */}
              <div className="flex items-center mb-16">
                <div className="flex items-center space-x-4">
                  <img
                    src=""
                    alt="Mentor Profile"
                    className="w-44 h-44 rounded-full object-cover bg-gray-400"
                  />
                </div>
                <div className="flex items-center space-x-2 ml-6">
                  <span className="w-36 bg-green-100 text-black text-sm font-medium px-6 py-1 rounded-md flex flex-row">
                    <Star className="w-4 h-4 mr-1 text-[#2F855C] fill-current" />
                    Top Mentor
                  </span>
                </div>
              </div>

              {/* Skills section */}
              <div className="flex flex-col px-2 pb-4 ml-20 mt-96 w-full">
                <h3 className="text-3xl font-bold mb-4 mt-6">Skills</h3>
                <div className="grid gap-3 grid-cols-3 w-full text-md items-center">
                  <SkillTag skill="Data Science" />
                  <SkillTag skill="Statistics" />
                  <SkillTag skill="Teaching" />
                  <SkillTag skill="Consulting" />
                  <SkillTag skill="Open source" />
                  <SkillTag skill="+9 more" />
                </div>
              </div>

              {/* Right side - Social Links and Pricing Card */}
              <div className="flex items-center gap-6">
                <div className="flex items-center space-x-4 mb-16">
                  <div className="flex space-x-5">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition duration-300 cursor-pointer">
                      <LinkedinIcon className="w-5 h-5 text-black-600" />
                    </div>
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition duration-300 cursor-pointer">
                      <XIcon className="w-5 h-5 text-gray-700" />
                    </div>
                  </div>
                </div>
                {/* Pricing Card with fixed width */}
                <div className=" top-4">
                  <div className="bg-[#C5EBE1] w-[400px] p-8 rounded-lg shadow-lg min-h-[400px] flex flex-col justify-between">
                    <div>
                      <h3 className="text-3xl font-bold mb-4 text-left">
                        ₹5500/month
                      </h3>
                      <p className="text-base text-gray-600 mb-6 text-left">
                        The most popular way to get mentored, let's work towards
                        your goals!
                      </p>
                      <ul className="space-y-4 mb-8">
                        <li className="flex items-center text-base">
                          <MdOutlineVideocam className="w-8 h-8 mr-3 text-black" />
                          Group Sessions, One-to-one Sessions
                        </li>
                        <li className="flex items-center text-base">
                          <LuMessageSquare className="w-6 h-6 mr-3 text-black" />
                          Unlimited Q&A via Chat
                        </li>
                        <li className="flex items-center text-base">
                          <MdOutlineGroups className="w-7 h-7 mr-3 text-black" />
                          Hands-on Support
                        </li>
                      </ul>
                    </div>
                    <button className="w-full bg-gray-700 text-white py-4 px-6 rounded-full font-medium hover:bg-gray-800 transition duration-300 flex items-center justify-center">
                      BOOK NOW
                      <svg
                        className="w-6 h-6 ml-2"
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-16 pt-24">
          <div className="w-full bg-[#D1E8E2] rounded-lg overflow-hidden">
            <div className="p-6 flex flex-col md:flex-row">
              {/* Left column */}
              <div className="md:w-2/3 pr-6">
                {/* Mentor Info */}
                <h2 className="text-3xl font-bold mb-3">Radhika Sharma</h2>
                <p className="text-gray-700 font-medium text">
                  Research and Development @ NJNM
                </p>
                <p className="text-[#2F855C] ">
                  Data Scientist, Software Developer,and
                </p>
                <p className="text-[#2F855C] mb-7">Stats Consultant</p>
                <div className="flex items-center mb-3">
                  <MapPin className="w-5 h-5 text-[#2F855C] mr-2" />
                  <span className="text-[#2F855C] font-medium">India</span>
                </div>
                <div className="flex items-center mb-6">
                  <Star className="w-5 h-5 text-[#2F855C] fill-current mr-1" />
                  <span className="text-[#2F855C] font-medium">
                    5.0 (15 reviews)
                  </span>
                </div>
                <button
                  className={`flex items-center justify-center px-8 py-2 border border-black rounded-xl text-lg font-medium transition duration-150 ease-in-out ${
                    isSaved
                      ? "bg-red-500 text-white"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={handleSaveClick}
                >
                  <Heart className="w-5 h-5 mr-2" />
                  {isSaved ? "Saved" : "Save"}
                </button>
              </div>
            </div>

            {/* Additional Sections */}
            <div className="md:w-2/3 pr-6">
              {/* Container for Additional Sections */}
              <div className="ml-5 mx-auto">
                {/* About Me */}
                <div className="mb-14 mt-20">
                  <h3 className="text-3xl font-semibold mb-10">About Me</h3>
                  <p className="text-black text-lg leading-relaxed mb-6 font-normal">
                    I'm a Software Developer since 2008, Data Scientist since
                    2014, with experience in predictive modeling applied to
                    lending, consumer packaged goods, online advertising, and
                    other industries.
                  </p>
                  <p className="text-black text-lg leading-relaxed font-normal">
                    I'm Open-source software is a common thread and passion
                    though out my career - I would be happy to mentor anyone
                    actively contributing back to the community, or anyone with
                    a great idea that needs a second pair of eyes on it.
                  </p>
                </div>

                {/* Mentee Reviews */}
                <div className="mb-14">
                  <h3 className="text-3xl font-semibold mb-6">
                    What mentees say
                  </h3>
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

                {/* Similar Mentors */}
                <div className="mb-14">
                  <h3 className="text-3xl font-semibold mb-4">
                    Similar Mentors
                  </h3>
                  <div className="bg-white rounded-lg overflow-hidden">
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
