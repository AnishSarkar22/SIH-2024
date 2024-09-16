import React, { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Testimonials() {
  const styles = {
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
    },
    body: {
      backgroundImage: "url('images/bg-tablet-pattern.svg')",
      backgroundSize: "50rem",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "120% -8%"
    },
    "#testimonials": {
      backgroundImage: "url('images/bg-tablet-pattern.svg')"},
    "@media only screen and (max-width: 376px)": {
      body: {
        backgroundPosition: "5.125rem -4.5rem",
        backgroundSize: "24.375rem"
    },
    },
      ".bg-2F4454": {
      "--tw-bg-opacity": "1",
      backgroundColor: "rgb(47 68 84 / var(--tw-bg-opacity))"
    },
    ".button": { display: "flex", gap: "16px" },
    ".container": { width: "100%" },
    "@media (min-width: 375px)": { ".container": { maxWidth: "375px" } },
    "@media (min-width: 768px)": { ".container": { maxWidth: "768px" } },
    "@media (min-width: 976px)": { ".container": { maxWidth: "976px" } },
    "@media (min-width: 1440px)": { ".container": { maxWidth: "1440px" } },
    "#mobile-nav-btn": {
    position: "relative",
    zIndex: 2,
    width: "1.25rem",
    height: "1.25rem"
  },
  ".spaced-section": { marginTop: "30px" },
  ".overflow-hidden": { overflow: "hidden" },
  
    }
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current) {
      const swiper = new Swiper(swiperRef.current, {
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

      return () => {
        swiper.destroy();
      };
    }
  }, []);

  return (
    <section id="testimonials" className="overflow-hidden py-0" 
    style={{
      backgroundImage: "url('images/bg-tablet-pattern.svg')",
      backgroundSize: "50rem",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "160% -40%"
    }}>
      <h2 className="text-4xl font-bold text-center py-4 spaced-section">Success Stories</h2>
      <p className="text-gray-600 text-center max-w-md mx-auto spaced-section">
        Still not convinced?
        <br />
        Don't just take our word for it
      </p>
      <div className="container mx-auto spaced-section">
        <div ref={swiperRef} className="swiper testimonial-slider py-16">
          <div className="swiper-wrapper">
            {/* TESTIMONIAL 1 */}
            <div className="swiper-slide">
              <div className="flex flex-col items-center text-center p-6 space-y-6 rounded-lg bg-veryLightGray">
                <img
                  src="images/avatar-anisha.png"
                  className="w-16 -mt-20"
                  alt="Anjana Guha"
                />
                <p className="font-bold text-darkBlue">Anjana Guha</p>
                <p className="text-darkGrayishBlue">
                  "My main goal was to get the guidance and learn from another experienced specialist. I’m keen to grow as fast as I can in my career and it’s great to have such platform like GuideMe to help you."
                </p>
              </div>
            </div>
            {/* TESTIMONIAL 2 */}
            <div className="swiper-slide">
              <div className="flex flex-col items-center text-center p-6 space-y-6 rounded-lg bg-veryLightGray">
                <img
                  src="images/avatar-ali.png"
                  className="w-16 -mt-20"
                  alt="Ali Bravo"
                />
                <p className="font-bold text-darkBlue">Sushmita Saha</p>
                <p className="text-darkGrayishBlue">
                "In just a few weeks, I feel a LOT more confident navigating the React world. Rohan has been an excellent mentor."
                </p>
              </div>
            </div>
            {/* TESTIMONIAL 3 */}
            <div className="swiper-slide">
              <div className="flex flex-col items-center text-center p-6 space-y-6 rounded-lg bg-veryLightGray">
                <img
                  src="images/avatar-richard.png"
                  className="w-16 -mt-20"
                  alt="Richard Watts"
                />
                <p className="font-bold text-darkBlue">Richard Watts</p>
                <p className="text-darkGrayishBlue">
                  "Radhika helped me improve as a student. Looking back, I took
                  a huge step, beyond my expectations.""
                </p>
              </div>
            </div>
            {/* TESTIMONIAL 4 */}
            <div className="swiper-slide">
              <div className="flex flex-col items-center text-center p-6 space-y-6 rounded-lg bg-veryLightGray">
                <img
                  src="images/avatar-shanai.png"
                  className="w-16 -mt-20"
                  alt="Shanai Gough"
                />
                <p className="font-bold text-darkBlue">Shanai Gough</p>
                <p className="text-darkGrayishBlue">
                  "Between now and 6 months ago, I feel like I improved as an engineer. Looking back, I took a huge step, beyond my expectations"
                </p>
              </div>
            </div>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </div>
      <div className="flex flex-col py-6 mx-auto items-center xl:pt-1 xl:pb-32 spaced-section">
        <a
          href="#"
          className="bg-2F4454 text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-700 transition duration-300"
        >
          Get Started
        </a>
      </div>
      <div className="flex justify-center space-x-4" style={{paddingBottom: '4rem'}}>
        <a href="#">
          <img
            className="h-12"
            alt="Download on the App Store"
            src="images/Apple-store.svg"
          />
        </a>
        <a href="#">
          <img
            className="h-12"
            alt="Get it on Google Play"
            src="images/Play-store.svg"
          />
        </a>
      </div>
    </section>
  );
}