import React, { useEffect, useRef } from 'react';

export default function Hero() {
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
    "@media only screen and (max-width: 376px)": {
      body: {
        backgroundPosition: "5.125rem -4.5rem",
        backgroundSize: "24.375rem"
    },
    "#hero": {
      backgroundImage: "url('images/bg-tablet-pattern.svg')",
      backgroundPosition: "5.125rem -4.5rem",
      backgroundSize: "24.375rem"
    }
    },
    ".move-up": { marginTop: "-70px" },
      ".bg-2F4454": {
      "--tw-bg-opacity": "1",
      backgroundColor: "rgb(47 68 84 / var(--tw-bg-opacity))"
    },
    ".cursor": {
      fontWeight: 100,
      color: "#2E8B57",
      animation: "blink 1s step-end infinite"
    },
    "@keyframes blink": { "from, to": { opacity: 1 }, "50%": { opacity: 0 } },
    ".button": { display: "flex", gap: "16px" },
    ".container": { width: "100%" },
    "@media (min-width: 375px)": { ".container": { maxWidth: "375px" } },
    "@media (min-width: 768px)": { ".container": { maxWidth: "768px" } },
    "@media (min-width: 976px)": { ".container": { maxWidth: "976px" } },
    "@media (min-width: 1440px)": { ".container": { maxWidth: "1440px" } },
    }

  
  
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
        await sleep(110); // Adjust typing speed here
      }
    }

    async function backspace(text) {
      for (let i = text.length; i >= 0; i--) {
        textElement.textContent = text.slice(0, i);
        await sleep(50); // Adjust backspacing speed here
      }
    }

    async function animateText() {
      while (true) {
        let currentText = specialties[currentIndex];
        await typeText(currentText);
        await sleep(1500); // Pause before backspacing
        await backspace(currentText);
        currentIndex = (currentIndex + 1) % specialties.length;
        await sleep(500); // Pause before typing next word
      }
    }

    // Cursor blinking effect
    const cursorBlinking = setInterval(() => {
      if (cursorElement) {
        cursorElement.style.opacity = cursorElement.style.opacity === "0" ? "1" : "0";
      }
    }, 500);

    // Start the animation
    if (textElement && cursorElement) {
      animateText();
    }

    // Cleanup function to clear intervals when the component unmounts
    return () => {
      clearInterval(cursorBlinking);
    };
  }, []);

  
  // Run the initialization function after the DOM is fully loaded
  // document.addEventListener('DOMContentLoaded', initializeTextAnimation);

  return (
    <section id="hero">
  {/* FLEX CONTAINER */}
  <div className="container flex flex-col-reverse items-center px-12 mx-auto mt-14 space-y-0 md:flex-row md:space-y-0">
    {/* LEFT COLUMN */}
    <div className="flex flex-col mb-2 space-y-12 md:mb-32 md:w-1/2">
      {/* <h1 className="max-w-md text-6xl font-bold text-center md:text-3xl md:text-left">
        1 - on - 1 Mentorship
      </h1> */}
      <h1 
        className="max-w-md text-4xl font-bold text-center md:text-4xl md:text-left" 
        style={{ 
          fontSize: '3rem',
          lineHeight: '0.4', // Adjusted line height
        }}>
        <div style={{ marginBottom: '1rem', lineHeight: '0.7'}}> {/* Added margin to the bottom of the first line */}
        <span className="font-bold text-navy-900" style={{lineHeight: '0.7', }}>1-on-1&nbsp;</span>
        
          <br className="block lg:hidden"></br>
          <span 
            ref={textElementRef} 
            style={{ 
              fontSize: '3rem', 
              color: 'rgba(11, 112, 119, 1)',
              paddingTop: '2rem',
              lineHeight: '1.2',
            }}
            datatypeitid="c5pse95kk3o"
          ></span>
          <span 
            ref={cursorElementRef} 
            className="cursor" 
            style={{ 
              fontSize: '3rem',
              color: 'rgba(11, 112, 119, 1)',
              zIndex: 10,
                }}
          >|</span>
          <br class="hidden md:block"></br>
        </div>
        <div style={{ paddingTop: '0.4rem' }}> {/* Added padding to the top of "Mentorship" */}
          Mentorship
        </div>
      </h1>
      <h3 className="max-w-md text-xl text-center md:text-xl md:text-left">
        Connecting Ambition with Expertise, Seamlessly Scheduled.
      </h3>
      <div className="button flex justify-center md:justify-start">
        <a
          href="#"
          className="bg-2F4454 text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-700 transition duration-300"
        >
          Get Started
        </a>
      </div>
    </div>
    {/* RIGHT COLUMN */}
    <div className="md:w-1/2 move-up">
  <video 
    src="images/3d-casual-life-user-interface-elements.webm" 
    className="video move-up" 
    autoPlay 
    loop 
    muted 
    playsInline // Ensures the video plays inline on mobile devices, not full-screen
    style={{
      objectFit: 'cover',  // Ensures the video covers the area
      width: '100%',       // Makes the video responsive
      height: 'auto',       // Adjusts the height proportionally
     // Positions the video at the top
    }}
  >
    Your browser does not support the video tag.
  </video>
</div>

  </div>
</section>

  )
}
