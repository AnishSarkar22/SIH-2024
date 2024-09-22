import React, { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Helmet } from 'react-helmet';
import BeVietnamProBold from '../fonts/BeVietnamPro-Bold.woff';

export default function Testimonials() {
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
    <section id="testimonials" className="overflow-hidden py-0 mt-[-100px] bg-[url('images/bg-tablet-pattern.svg')] bg-[length:50rem] bg-no-repeat bg-[160%_10%]" style={styles}>
      <h2 className="text-4xl font-bold text-center py-4 mt-7">Success Stories</h2>
      <p className="text-gray-600 text-center max-w-md mx-auto mt-7">
        Still not convinced?
        <br />
        Don't just take our word for it
      </p>
      <div className="container mx-auto mt-7">
        <div ref={swiperRef} className="swiper testimonial-slider py-16">
          <div className="swiper-wrapper">
            {/* TESTIMONIAL 1 */}
            <div className="swiper-slide">
              <div className="flex flex-col items-center text-center p-6 space-y-6 rounded-lg">
                <img
                  src="images/avatar-anisha.png"
                  className="w-16"
                  alt="Anjana Guha"
                />
                <p className="font-bold text-darkBlue">Anjana Guha</p>
                <p className="text-darkGrayishBlue">
                  "My main goal was to get the guidance and learn from another experienced specialist. I'm keen to grow as fast as I can in my career and it's great to have such platform like GuideMe to help you."
                </p>
              </div>
            </div>
            {/* TESTIMONIAL 2 */}
            <div className="swiper-slide">
              <div className="flex flex-col items-center text-center p-6 space-y-6 rounded-lg bg-veryLightGray">
                <img
                  src="images/avatar-ali.png"
                  className="w-16"
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
                  className="w-16"
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
                  className="w-16"
                  alt="Shanai Gough"
                />
                <p className="font-bold text-darkBlue">Shanai Gough</p>
                <p className="text-darkGrayishBlue">
                  "Between now and 6 months ago, I feel like I improved as an engineer. Looking back, I took a huge step, beyond my expectations"
                </p>
              </div>
            </div>
          </div>
          <div className="swiper-pagination hidden"></div>
        </div>
      </div>
      <div className="flex flex-col py-6 mx-auto items-center xl:pt-1 xl:pb-32 mt-7">
        <a
          href="#"
          className="bg-[#2F4454] text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-700 transition duration-300"
        >
          Get Started
        </a>
      </div>
      <div className="flex justify-center space-x-4 pb-16">
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