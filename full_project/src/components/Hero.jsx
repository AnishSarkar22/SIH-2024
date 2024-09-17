import React, { useEffect, useRef } from 'react';

export default function Hero() {
  const textElementRef = useRef(null);
  const cursorElementRef = useRef(null);

  useEffect(() => {
    const specialties = ["Marketing", "Skill Development", "AWS", "SEO", "AI", "Career"];
    let currentIndex = 0;
    const textElement = textElementRef.current;
    const cursorElement = cursorElementRef.current;

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function typeText(text) {
      for (let i = 0; i <= text.length; i++) {
        textElement.textContent = text.slice(0, i);
        await sleep(110);
      }
    }

    async function backspace(text) {
      for (let i = text.length; i >= 0; i--) {
        textElement.textContent = text.slice(0, i);
        await sleep(50);
      }
    }

    async function animateText() {
      while (true) {
        let currentText = specialties[currentIndex];
        await typeText(currentText);
        await sleep(1500);
        await backspace(currentText);
        currentIndex = (currentIndex + 1) % specialties.length;
        await sleep(500);
      }
    }

    const cursorBlinking = setInterval(() => {
      if (cursorElement) {
        cursorElement.style.opacity = cursorElement.style.opacity === "0" ? "1" : "0";
      }
    }, 500);

    if (textElement && cursorElement) {
      animateText();
    }

    return () => {
      clearInterval(cursorBlinking);
    };
  }, []);

  return (
    <section id="hero" className="py-4 md:py-6">
      <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center">
        {/* LEFT COLUMN */}
        <div className="md:w-1/2 space-y-8 text-center md:text-left font-extrabold"
          style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
        >
          <h1 className="text-5xl md:text-6xl font-bold leading-tight" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
            <span className="text-navy-900" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>1-on-1 </span>
            <span 
              ref={textElementRef} 
              className="text-teal-600"
              style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
            ></span>
            <span 
              ref={cursorElementRef} 
              className="text-teal-600 animate-blink"
              style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
            >|</span>
            <br />
            Mentorship
          </h1>
          <h3 className="text-lg md:text-xl text-gray-700" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
            Connecting Ambition with Expertise,<br /> Seamlessly Scheduled.
          </h3>
          <div className="pt-2">
            <a
              href="#"
              className="inline-block bg-[#2F4454] text-white font-bold py-2 px-6 rounded-lg transition duration-300 hover:bg-teal-700"
              style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
            >
              Get Started
            </a>
          </div>
        </div>
        {/* RIGHT COLUMN */}
        <div className="md:w-1/2 mb-6 md:mb-0">
          <video 
            src="images/3d-casual-life-user-interface-elements.webm" 
            className="w-full h-auto object-cover" 
            autoPlay 
            loop 
            muted 
            playsInline
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
}