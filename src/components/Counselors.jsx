import React, { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import BeVietnamProBold from '../fonts/BeVietnamPro-Bold.woff';

export default function Counselors() {
  const styles = {
    "@font-face": {
      fontFamily: 'Be Vietnam Pro',
      fontStyle: 'normal',
      fontWeight: 'bold',
      src: `url(${BeVietnamProBold}) format('woff')`,
      fontDisplay: 'swap',
    },
    fontFamily: 'Be Vietnam Pro, sans-serif',
    fontWeight: 'bold',
  };
  const swiperRef = useRef(null);

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
    <section id="counselors" className="md:py-40 xl:py-40 bg-[url('images/bg-tablet-pattern.svg')] bg-[length:50rem] bg-no-repeat bg-[-70%_15%] mt-50px relative" style={styles}>
      <div className="relative mx-auto px-8 mt-[300px] md:mt-[-300px] md:pt-60 text-[#2F4454]">
        <div className="flex flex-col md:flex-row items-center justify-between mt-[-400px] md:mt-0">
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
            <div ref={swiperRef} className="swiper testimonial-slider py-16 w-full h-full md:flex-row max-w-[950px] mx-auto">
              <div className="swiper-wrapper">
                {/* TESTIMONIAL 1 */}
                <div className="swiper-slide">
                  <div className="flex flex-col p-7 space-y-6 rounded-lg bg-white justify-center items-center sm:justify-start sm:items-start">
                    <img
                      src="images/image 1.svg"
                      className="w-40 mt-2.5"
                      alt="Thomas John"
                    />
                    <h2 className="font-bold text-darkBlue text-left text-xl">Thomas John</h2>
                    <p className="text-darkGrayishBlue text-left mt-1 text-lg">Bachelors in Hospitality</p>
                    <div className="flex justify-start space-x-4">
                      <p className="text-blue-800 bg-blue-100 text-xs px-2 py-1 rounded-full mr-2 font-normal">SEO</p>
                      <p className="text-blue-800 bg-blue-100 text-xs px-2 py-1 rounded-full mr-2 font-normal">AWS</p>
                      <p className="text-blue-800 bg-blue-100 text-xs px-2 py-1 rounded-full mr-2 font-normal">Generative AI</p>
                    </div>
                    <div className="flex justify-start space-x-4 text-left">
                      <p className="text-blue-800 bg-blue-100 text-xs px-2 py-1 rounded-full mr-2 font-normal">AI</p>
                    </div>
                  </div>
                </div>
                {/* TESTIMONIAL 2 */}
                <div className="swiper-slide">
                  <div className="flex flex-col text-center p-7 space-y-6 rounded-lg bg-white justify-center items-center sm:justify-start sm:items-start">
                    <img
                      src="images/image 2.svg"
                      className="w-40 mt-2.5"
                      alt="Radhika Sharma"
                    />
                    <p className="font-bold text-darkBlue text-left text-xl">Radhika Sharma</p>
                    <p className="text-darkGrayishBlue text-left mt-1 text-lg">Masters in Psychology</p>
                    <div className="flex justify-start space-x-4">
                      <p className="text-blue-800 bg-blue-100 text-xs px-2 py-1 rounded-full mr-2 font-normal">Interview Preparation</p>
                    </div>
                    <div className="flex justify-start space-x-4">
                      <p className="text-blue-800 bg-blue-100 text-xs px-2 py-1 rounded-full mr-2 font-normal">Mock Interviews</p>
                      <p className="text-blue-800 bg-blue-100 text-xs px-2 py-1 rounded-full mr-2 font-normal">Interviews</p>
                    </div>
                    
                  </div>
                </div>
                {/* TESTIMONIAL 3 */}
                <div className="swiper-slide">
                  <div className="flex flex-col text-center p-7 space-y-6 rounded-lg bg-white justify-center items-center sm:justify-start sm:items-start">
                    <img
                      src="images/image 3.svg"
                      className="w-40 mt-2.5"
                      alt="Gautam Nigam"
                    />
                    <p className="font-bold text-darkBlue text-left text-xl">Gautam Nigam</p>
                    <p className="text-darkGrayishBlue text-left text-lg">Program Manager@Meta</p>
                    <div className="flex justify-start space-x-4">
                      <p className="text-blue-800 bg-blue-100 text-xs px-2 py-1 rounded-full mr-2 font-normal">Javascript</p>
                      <p className="text-blue-800 bg-blue-100 text-xs px-2 py-1 rounded-full mr-2 font-normal">Typescript</p>
                      <p className="text-blue-800 bg-blue-100 text-xs px-2 py-1 rounded-full mr-2 font-normal">React</p>
                    </div>
                    
                  </div>
                </div>
                {/* TESTIMONIAL 4 */}
                <div className="swiper-slide">
                  <div className="flex flex-col text-center p-7 space-y-6 rounded-lg bg-white justify-center items-center sm:justify-start sm:items-start">
                    <img
                      src="images/image 302.svg"
                      className="w-40 mt-2.5"
                      alt="Sushmita Sinha"
                    />
                    <p className="font-bold text-darkBlue text-left text-xl">Sushmita Sinha</p>
                    <p className="text-darkGrayishBlue text-left text-lg">Data Analyst</p>
                    <div className="flex justify-start space-x-4">
                      <p className="text-blue-800 bg-blue-100 text-xs px-2 py-1 rounded-full mr-2 font-normal">JavaScript</p>
                      <p className="text-blue-800 bg-blue-100 text-xs px-2 py-1 rounded-full mr-2 font-normal">NodeJs</p>
                      <p className="text-blue-800 bg-blue-100 text-xs px-2 py-1 rounded-full mr-2 font-normal">React</p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="swiper-pagination absolute bottom-[-1rem] w-full hidden"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}