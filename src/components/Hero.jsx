import React, { useEffect, useRef } from 'react';
import BeVietnamProBold from '../fonts/BeVietnamPro-Bold.woff';

export default function Hero() {
  const style = {
    ".cursor": {
      fontWeight: 100,
      color: "#2E8B57",
      animation: "blink 1s step-end infinite"
    },
    "@keyframes blink": { "from, to": { opacity: 1 }, "50%": { opacity: 0 } },
  }
  const font ={
    "@font-face": {
    fontFamily: 'Be Vietnam Pro',
    fontStyle: 'normal',
    fontWeight: 'bold',
    src: `url(${BeVietnamProBold}) format('woff')`,
    fontDisplay: 'swap',
  },
  fontFamily: 'Be Vietnam Pro, sans-serif',
  fontWeight: 'bold',
  }
  const textElementRef = useRef(null);
  const cursorElementRef = useRef(null);

  useEffect(() => {
    const specialties = ["Marketing", "AWS", "SEO", "AI", "Career"];
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
    <section id="hero" className="font-custom mb-24 bg-[url('static/bg-pattern.svg')] bg-[length:40rem] bg-no-repeat bg-[90%_-1%]" style={font}>
      
      <div className="font-custom container flex flex-col-reverse items-center px-16 mx-auto mt-32 space-y-0 md:flex-row md:space-y-10">
        <div className="flex flex-col mb-2 space-y-12 md:mb-28 md:w-1/2">
          <h1 className="max-w-md text-4xl font-bold text-center md:text-4xl md:text-left text-darkBlue" style={{ fontSize: '3rem', lineHeight: '0.4' }}>
            <div className="mb-4" style={{ lineHeight: '0.7' }}>
              <span className="font-bold text-[#2F4454] text-navy-900" style={{ lineHeight: '0.7' }}>1-on-1&nbsp;</span>
              <br className="block lg:hidden" />
              <span 
                ref={textElementRef} 
                className="text-[3rem] text-[rgba(11,112,119,1)] pt-8 leading-[1.2]"
                datatypeitid="c5pse95kk3o"
              ></span>
              <span 
                ref={cursorElementRef} 
                className="text-[4rem] text-[rgba(11,112,119,1)] font-thin animate-blink"
              >|</span>
              <br className="hidden md:block" />
            </div>
            <div className="pt-1.5 text-[#2F4454]">
              Mentorship
            </div>
          </h1>
          <h3 className="max-w-md text-xl text-center md:text-xl md:text-left text-[#2F4454]">
            Connecting Ambition with Expertise, Seamlessly Scheduled.
          </h3>
          <div className="flex justify-center md:justify-start space-x-4">
            <a
              href="#"
              className="bg-[#2F4454] text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-700 transition duration-300"
            >
              Get Started
            </a>
          </div>
        </div>
        
        <div className="md:w-1/2 top-[-120px] sm:top-[-100px] lg:top-[-100px] xl:top-[-160px]">
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
  )
}