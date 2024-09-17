import React, { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Counselors() {
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current) {
      new Swiper(swiperRef.current, {
        modules: [Navigation, Pagination, Autoplay],
        slidesPerView: 1,
        spaceBetween: 20,
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
    <section id="counselors" className="py-12 mb-20 mt-3 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row items-start justify-between mb-8">
          {/* Left Info Column */}
          <div className="md:w-1/2 mb-8 md:mb-0 mt-9">
            <h2 className="text-4xl font-extrabold text-left mb-4 text-blue-900">
              Our counselors sculpting
              <br />
              student success
            </h2>
            <p className="text-gray-600 text-left max-w-md text-sm">
              500+ Counselors with 20+ years of experience in our team who have helped 1 Million+ students to kick start their Career Journey.
            </p>
          </div>
          {/* Carousel Column */}
          <div className="md:w-1/2">
            <div ref={swiperRef} className="swiper testimonial-slider">
              <div className="swiper-wrapper">
                {/* TESTIMONIAL 1 */}
                <TestimonialSlide
                  image="images/image 1.svg"
                  name="Thomas John"
                  education="Bachelors in Hospitality"
                  experience="9+ years of counselling"
                />
                {/* TESTIMONIAL 2 */}
                <TestimonialSlide
                  image="images/image 2.svg"
                  name="Radhika Sharma"
                  education="Masters in Psychology"
                  experience="10+ years of counselling"
                />
                {/* TESTIMONIAL 3 */}
                <TestimonialSlide
                  image="images/image 3.svg"
                  name="Gautam Nigam"
                  education="Program Manager@Meta"
                  experience="15+ years of counselling"
                />
                {/* TESTIMONIAL 4 */}
                <TestimonialSlide
                  image="images/image 302.svg"
                  name="Sushmita Sinha"
                  education="Data Analyst"
                  experience="12+ years of counselling"
                />
              </div>
              <div className="swiper-pagination mt-4"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialSlide({ image, name, education, experience }) {
  return (
    <div className="swiper-slide py-8">
      <div className="flex flex-col items-center text-center space-y-2">
        <img src={image} className="w-20 h-20 object-cover rounded-full" alt={name} />
        <h3 className="font-bold text-gray-800 text-lg">{name}</h3>
        <p className="text-gray-500 text-sm">{education}</p>
        <p className="text-teal-500 text-sm">{experience}</p>
      </div>
    </div>
  );
}