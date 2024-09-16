import React, { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Counselors() {
  const styles = {
    
    ".swiper-pagination": { height: "fit-content", marginTop: "20rem" },
    ".swiper-pagination-bullet": {
      border: ".0625rem solid #f25f3a",
      backgroundColor: "transparent",
      opacity: 1
    },
    ".swiper-pagination-bullet-active": { backgroundColor: "#f25f3a" },
    "@media only screen and (min-width: 700px)": {
      ".swiper-pagination": { display: "none" }
    },
    body: {
      backgroundImage: "url('images/bg-tablet-pattern.svg')",
      backgroundSize: "50rem",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "120% -8%"
    },
    "@media only screen and (max-width: 376px)": {
    body: {
      backgroundPosition: "5.125rem -4.5rem",
      backgroundSize: "24.375rem"
    },
  },
  "@media only screen and (min-width: 976px)": {
    "#footer": { height: "17.1875rem" }
  },
  ".custom-width": { width: "950px", margin: "0 auto" },
  ".-mr-12": { marginRight: "-6rem" },
  ".relative.mx-auto.px-2": { marginTop: "-500px", paddingTop: "0" },
  ".fixed": { position: "fixed" },
  ".bottom-5": { bottom: "20px" },
  ".right-5": { right: "20px" },
  ".text-4xl.font-bold.text-teal-600.mb-6.text-center": {
    marginBottom: "-40px"
  },
  "#counselors": {
    marginTop: "-50px",
    position: "relative",
    backgroundImage: "url('images/bg-tablet-pattern.svg')",
    backgroundSize: "50rem",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "-80% -155%"
  },
  ".top-1": { marginTop: "-300px" },
  ".container": { width: "100%" },
  "@media (min-width: 375px)": { ".container": { maxWidth: "375px" } },
  "@media (min-width: 768px)": { ".container": { maxWidth: "768px" } },
  "@media (min-width: 976px)": { ".container": { maxWidth: "976px" } },
  "@media (min-width: 1440px)": { ".container": { maxWidth: "1440px" } },
    "@layer base": {
      "@font-face": [
        {
          fontFamily: "'Be Vietnam Pro'",
          fontStyle: "normal",
          fontWeight: 400,
          src:
            "url('../styles/fonts/BeVietnamPro-Bold.woff'), format('woff'),\n                url('../styles/fonts/BeVietnamPro-Bold.woff2'), format('woff2')",
          fontDisplay: "swap"
        },
        {
          fontFamily: "'Be Vietnam Pro'",
          fontWeight: 500,
          src:
            "url('../styles/fonts/BeVietnamPro-Bold.woff'), format('woff'),\n                url('../styles/fonts/BeVietnamPro-Bold.woff2'), format('woff2')",
          fontDisplay: "swap"
        },
        {
          fontFamily: "'Be Vietnam Pro'",
          fontWeight: 700,
          fontStyle: "normal",
          src:
            "url('../styles/fonts/BeVietnamPro-Bold.woff'), format('woff'),\n                url('../styles/fonts/BeVietnamPro-Bold.woff2'), format('woff2')",
          fontDisplay: "swap"
        }
      ],
      body: { fontFamily: "'Be Vietnam Pro', sans-serif" },
      h1: { "@apply font-bold": true, "@apply text-darkBlue": true },
      h2: { "@apply font-medium": true, "@apply font-bold": true },
      p: { "@apply font-normal": true, "@apply text-base": true },
      ".button a": { "@apply font-bold": true, "@apply text-sm": true },
      "h1, h2, h3, h5": { "@apply text-darkBlue": true },
      ".social-icons-footer": {
        scale: "1.3",
        "@media only screen and (max-width: 376px)": { scale: "5" }
      },
      ".input-failed": { border: ".0625rem solid #f25f3a" },
      ".input-success": { border: ".0625rem solid #9095a7" }
    }
  }
  
  

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
    <section id="counselors" className="md:py-40 xl:py-10 ">
      
      
      <div className="relative mx-auto px-8 mt-[-100px]"  style={{ marginTop: '500px' }}>
        <div className="flex flex-col md:flex-row items-center justify-between top-1">
          {/* Left Info Column */}
          <div className="md:w-3/4 mb-12 md:mb-0 md:-mr-12">
            <h2 className="text-4xl font-bold text-center md:text-left mb-4" style={{ marginLeft: '15px' }}>
              Our counselors sculpting
              <br />
              student success
            </h2>
            <p className="text-gray-600 text-center md:text-left max-w-md" style={{ marginLeft: '15px'}}>
              500+ Counselors with 20+ years of experience in our team who have
              helped 1 Million+ students to kick start their Career Journey.
            </p>
          </div>
          {/* Carousel Column */}
          <div className="flex container mx-auto md:w-2/3">
            <div ref={swiperRef} className="swiper testimonial-slider py-16 w-full h-full md:flex-row custom-width">
              <div className="swiper-wrapper">
                {/* TESTIMONIAL 1 */}
                <div className="swiper-slide">
                  <div className="flex flex-col items-center text-center p-7 space-y-6 rounded-lg bg-veryLightGray">
                    <img
                      src="images/image 1.svg"
                      className="w-20 -mt-10"
                      style={{ marginTop: '10px' }}
                      alt="Thomas John"
                    />
                    <h2 className="font-bold text-darkBlue">Thomas John</h2>
                    <p className="text-darkGrayishBlue">Bachelors in Hospitality</p>
                    <p className="text-teal-600">9+ years of counselling</p>
                  </div>
                </div>
                {/* TESTIMONIAL 2 */}
                <div className="swiper-slide">
                  <div className="flex flex-col items-center text-center p-7 space-y-6 rounded-lg bg-veryLightGray">
                    <img
                      src="images/image 2.svg"
                      className="w-20 -mt-8"
                      style={{ marginTop: '10px' }}
                      alt="Radhika Sharma"
                    />
                    <p className="font-bold text-darkBlue">Radhika Sharma</p>
                    <p className="text-darkGrayishBlue">Masters in Psychology</p>
                    <p className="text-teal-600">10+ years of counselling</p>
                  </div>
                </div>
                {/* TESTIMONIAL 3 */}
                <div className="swiper-slide">
                  <div className="flex flex-col items-center text-center p-7 space-y-6 rounded-lg bg-veryLightGray">
                    <img
                      src="images/image 3.svg"
                      className="w-20 -mt-8"
                      style={{ marginTop: '10px' }}
                      alt="Gautam Nigam"
                    />
                    <p className="font-bold text-darkBlue">Gautam Nigam</p>
                    <p className="text-darkGrayishBlue">Program Manager@Meta</p>
                    <p className="text-teal-600">15+ years of counselling</p>
                  </div>
                </div>
                {/* TESTIMONIAL 4 */}
                <div className="swiper-slide">
                  <div className="flex flex-col items-center text-center p-7 space-y-6 rounded-lg bg-veryLightGray">
                    <img
                      src="images/image 302.svg"
                      className="w-20 -mt-8"
                      style={{ marginTop: '10px' }}
                      alt="Sushmita Sinha"
                    />
                    <p className="font-bold text-darkBlue">Sushmita Sinha</p>
                    <p className="text-darkGrayishBlue">Data Analyst</p>
                    <p className="text-teal-600">12+ years of counselling</p>
                  </div>
                </div>
              </div>
              <div
            className="swiper-pagination"
            style={{ bottom: '-1rem', position: 'absolute', width: '100%' }} // Adjust the value as needed to move the bullets down
          ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}