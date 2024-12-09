import React, { useEffect, useRef } from "react";
import Swiper from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faComments } from "@fortawesome/free-solid-svg-icons";

export default function Counselors() {
  const swiperRef = useRef(null);

  const styles = {
    fontFamily: "'Aeonik', sans-serif"
  };

  useEffect(() => {
    if (swiperRef.current) {
      new Swiper(swiperRef.current, {
        modules: [Navigation, Pagination, Autoplay],
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        centeredSlides: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 3,
          },
        },
      });
    }
  }, []);

  return (
    <section
      id="counselors"
      className="md:py-40 xl:py-20 bg-[url('static/mega-creator.svg')] bg-[length:50rem] bg-no-repeat bg-[-70%_15%] mt-50px relative"
      style={styles}
    >
      <div className="relative mx-auto px-8 mt-[300px] md:mt-[-200px] md:pt-40 text-[#2F4454]">
      <div className="flex flex-col md:flex-row items-center justify-between mt-[-400px] md:mt-0 min-h-[600px]">
          {/* Left Info Column */}
          <div className="md:w-3/4 mb-12 md:mb-0 md:-mr-24">
            <h2 className="text-4xl font-bold text-center md:text-left mb-4 ml-4">
              Our counselors sculpting
              <br />
              student success
            </h2>
            <p className="text-gray-600 text-center md:text-left max-w-md ml-4">
              500+ Counselors with 20+ years of experience in our team who have
              helped 1 Million+ students to kick start their Career Journey.
            </p>
          </div>
          {/* Carousel Column */}
          <div className="flex container mx-auto md:w-2/3">
            <div
              ref={swiperRef}
              className="swiper testimonial-slider py-16 w-full h-full md:flex-row max-w-[1050px] mx-auto"
            >
              <div className="swiper-wrapper">
                {/* TESTIMONIAL 1 */}
                <div
                  className="swiper-slide rounded-lg bg-white p-4 cursor-pointer hover:shadow-lg transition-shadow border"
                  onClick={() => handleMentorProfileClick()}
                >
                  <div className="relative">
                    <img
                      src="./images/mentor1.png"
                      className="w-full rounded-lg"
                      alt="Profile"
                    />
                    <span className="absolute top-2 left-2 bg-white rounded-full px-2 py-1 text-sm">
                      Top rated
                    </span>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-semibold">Rajiv Shukla</h2>
                      <span className="text-gray-500 text-sm">US</span>
                    </div>

                    <div className="flex items-center gap-2 text-black text-sm mt-1">
                      <FontAwesomeIcon icon={faBriefcase} className="w-4 h-4" />
                      <p>
                        Senior Product Manager{" "}
                        <span className="text-gray-600">at</span> Amazon
                      </p>
                    </div>

                    <div className="flex gap-8 mt-4">
                      <div>
                        <div className="text-gray-600 text-s">
                          Experience:{" "}
                          <span className="text-black text-sm">13 years</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                      <FontAwesomeIcon icon={faComments} />
                      <div className="text-sm">105 sessions (16 reviews)</div>
                    </div>

                    <div className="mt-3">
                      <div className="flex justify-start space-x-4">
                        <p className="text-blue-800 bg-blue-100 text-xs px-2 py-1 rounded-full font-normal">
                          SEO
                        </p>
                        <p className="text-blue-800 bg-blue-100 text-xs px-2 py-1 rounded-full font-normal">
                          Digital Analytics
                        </p>
                      </div>
                      <div className="flex justify-start space-x-4 mt-2">
                        <p className="text-blue-800 bg-blue-100 text-xs px-2 py-1 rounded-full font-normal">
                          Google Analytics
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* TESTIMONIAL 2 */}
                <div
                  className="swiper-slide rounded-lg bg-white p-4 cursor-pointer hover:shadow-lg transition-shadow border"
                  onClick={() => handleMentorProfileClick()}
                >
                  <div className="relative">
                    <img
                      src="./images/mentor2.jpeg"
                      className="w-full rounded-lg"
                      alt="Profile"
                    />
                    <span className="absolute top-2 left-2 bg-white rounded-full px-2 py-1 text-sm">
                      Top rated
                    </span>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-semibold">
                        Shreya Mukherjee
                      </h2>
                      <span className="text-gray-500 text-sm">IN</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                      <FontAwesomeIcon icon={faBriefcase} className="w-4 h-4" />
                      <p className="text-sm mt-1 text-black">
                        Technical Program Manager{" "}
                        <span className="text-gray-600">at</span> Amazon
                      </p>
                    </div>

                    <div className="flex gap-8 mt-4">
                      <div className="text-gray-600 text-s">
                        Experience:{" "}
                        <span className="text-black text-sm">Senior</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                      <FontAwesomeIcon icon={faComments} />
                      <div className="text-sm">21 sessions (6 reviews)</div>
                    </div>

                    <div className="mt-3">
                      <div className="flex justify-start space-x-4">
                        <p className="text-blue-800 bg-blue-100 text-xs px-2 py-1 rounded-full font-normal">
                          JavaScript
                        </p>
                        <p className="text-blue-800 bg-blue-100 text-xs px-2 py-1 rounded-full font-normal">
                          Typescript
                        </p>

                        <p className="text-blue-800 bg-blue-100 text-xs px-2 py-1 rounded-full font-normal">
                          React
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* TESTIMONIAL 3 */}
                <div
                  className="swiper-slide rounded-lg bg-white p-4 cursor-pointer hover:shadow-lg transition-shadow border"
                  onClick={() => handleMentorProfileClick()}
                >
                  <div className="relative">
                    <img
                      src="./images/mentor3.jpg"
                      className="w-full rounded-lg"
                      alt="Profile"
                    />
                    <span className="absolute top-2 left-2 bg-white rounded-full px-2 py-1 text-sm">
                      Top rated
                    </span>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-semibold">Anoop Kumar</h2>
                      <span className="text-gray-500 text-sm">IN</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                      <FontAwesomeIcon icon={faBriefcase} className="w-4 h-4" />
                      <p className="text-black text-sm mt-1">
                        Consultant <span className="text-gray-600">at</span>{" "}
                        Xebia IT Architects
                      </p>
                    </div>

                    <div className="flex gap-8 mt-4">
                      <div className="text-gray-600 text-s">
                        Experience:{" "}
                        <span className="text-black text-sm">16 years</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                      <FontAwesomeIcon icon={faComments} />
                      <div className="text-sm">32 sessions (12 reviews)</div>
                    </div>

                    <div className="mt-3">
                      <div className="flex justify-start space-x-4">
                        <p className="text-blue-800 bg-blue-100 text-xs px-2 py-1 rounded-full font-normal">
                          Software Development
                        </p>
                        <p className="text-blue-800 bg-blue-100 text-xs px-2 py-1 rounded-full font-normal">
                          Budgeting
                        </p>
                      </div>
                      <div className="flex justify-start space-x-4 mt-2">
                        <p className="text-blue-800 bg-blue-100 text-xs px-2 py-1 rounded-full font-normal">
                          System Analysis
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* TESTIMONIAL 4 */}
                <div
                  className="swiper-slide rounded-lg bg-white p-4 cursor-pointer hover:shadow-lg transition-shadow border"
                  onClick={() => handleMentorProfileClick()}
                >
                  <div className="relative">
                    <img
                      src="./images/mentor4.jpg"
                      className="w-full rounded-lg"
                      alt="Profile"
                    />
                    <span className="absolute top-2 left-2 bg-white rounded-full px-2 py-1 text-sm">
                      Top rated
                    </span>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-semibold">Subham Sharma</h2>
                      <span className="text-gray-500 text-sm">IN</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                      <FontAwesomeIcon icon={faBriefcase} className="w-4 h-4" />
                      <p className="text-black text-sm mt-1">
                        Consultant <span className="text-gray-600">at</span>{" "}
                        Xebia IT Architects
                      </p>
                    </div>

                    <div className="flex gap-8 mt-4">
                      <div className="text-gray-600 text-s">
                        Experience:{" "}
                        <span className="text-black text-sm">16 years</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                      <FontAwesomeIcon icon={faComments} />
                      <div className="text-sm">32 sessions (12 reviews)</div>
                    </div>

                    <div className="mt-3">
                      <div className="flex justify-start space-x-4">
                        <p className="text-blue-800 bg-blue-100 text-xs px-2 py-1 rounded-full font-normal">
                          Software Development
                        </p>
                        <p className="text-blue-800 bg-blue-100 text-xs px-2 py-1 rounded-full font-normal">
                          Budgeting
                        </p>
                      </div>
                      <div className="flex justify-start space-x-4 mt-2">
                        <p className="text-blue-800 bg-blue-100 text-xs px-2 py-1 rounded-full font-normal">
                          System Analysis
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-pagination absolute bottom-[-1rem] w-full hidden"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
