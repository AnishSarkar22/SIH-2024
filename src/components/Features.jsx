import React from 'react';

export default function Features() {
  const styles = {
    "@layer base": {
      "@font-face": [
        {
          fontFamily: "'Be Vietnam Pro'",
          fontStyle: "normal",
          fontWeight: 400,
          src:
            "url('../styles/fonts/BeVietnamPro-Bold.woff') format('woff'),\n                url('../styles/fonts/BeVietnamPro-Bold.woff2') format('woff2')",
          fontDisplay: "swap"
        },
        {
          fontFamily: "'Be Vietnam Pro'",
          fontWeight: 500,
          src:
            "url('../styles/fonts/BeVietnamPro-Bold.woff') format('woff'),\n                url('../styles/fonts/BeVietnamPro-Bold.woff2') format('woff2')",
          fontDisplay: "swap"
        },
        {
          fontFamily: "'Be Vietnam Pro'",
          fontWeight: 700,
          fontStyle: "normal",
          src:
            "url('../styles/fonts/BeVietnamPro-Bold.woff') format('woff'),\n                url('../styles/fonts/BeVietnamPro-Bold.woff2') format('woff2')",
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
    "#features": {
      backgroundImage: "url('images/bg-tablet-pattern.svg')",
      backgroundSize: "50rem",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "-80% -155%",
      paddingBottom: "100px",
      position: "relative",
      top: "-40px",
    },
    "@media only screen and (max-width: 376px)": {
      body: {
        backgroundPosition: "5.125rem -4.5rem",
        backgroundSize: "24.375rem"
      },
    },
    centerContent: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
    },
    ".grid": {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "1rem",
      margin: "5rem"
    },
    ".bg-2F4454": {
      "--tw-bg-opacity": "1",
      backgroundColor: "rgb(47 68 84 / var(--tw-bg-opacity))"
    },
    ".button": { display: "flex", gap: "16px" },
    ".text-2F4454": {
      "--tw-text-opacity": "1",
      color: "rgb(61 84 102 / var(--tw-bg-opacity))"
    },
    ".move-up":{marginBottom: "-80px"},
  };

  return (
    <section id="features" className="md:py-40 xl:py-10 bg-white mt-[-50px]" style={styles["#features"]}>
      <div className="relative mx-auto px-5 max-w-7xl" 
      style={{
        backgroundImage: "url('images/bg-tablet-pattern.svg')",
        backgroundSize: "50rem",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
      }}>
        <h2 className="text-4xl font-bold text-[#2F4454] mb-6 text-center">
          At your fingertips: a dedicated coach
        </h2>
        <p className="text-gray-1200 mt-5 text-center center-content">
          Want to build your career, successfully repair your relationships, and
          enhance your
          <br />
          education for a brighter future?
        </p>
        <div className="flex items-center justify-center min-h-screen mt-[-130px]">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-5">
            <div className="bg-white p-6 rounded-lg shadow-2xl center-content" style={styles.centerContent}>
              <img
                src="images/online-study.svg"
                alt="Group Sessions"
                className="w-17 h-19 mb-6"
              />
              <h3 className="text-xl font-semibold mb-4 text-center">free group sessions</h3>
              <p className="text-gray-600 text-center mt-4">
                One powerful online software suite that combines
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-2xl center-content" style={styles.centerContent}>
              <img
                src="images/3d-rendering-people-avatars-zoom-call-removebg 1.svg"
                alt="Video Calls"
                className="w-17 h-19 mb-4"
              />
              <h3 className="text-xl font-semibold mb-4">1-on-1 video calls</h3>
              <p className="text-gray-600 text-center mt-4">
                One powerful online software suite that combines
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-2xl center-content" style={styles.centerContent}>
              <img
                src="images/Saly-26.svg"
                alt="Flexible Program"
                className="w-17 h-19 mb-6"
              />
              <h3 className="text-xl font-semibold text-center mb-4">
                flexible program structures
              </h3>
              <p className="text-gray-600 text-center mt-4">
                One powerful online software suite that combines
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-2xl center-content" style={styles.centerContent}>
              <img
                src="images/Saly-12.svg"
                alt="Personal Chats"
                className="w-17 h-19 mb-6"
              />
              <h3 className="text-xl font-semibold mb-4">Personal Chats</h3>
              <p className="text-gray-600 text-center mt-4">
                One powerful online software suite that combines
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col py-6 mx-auto items-center xl:pt-1 xl:pb-32 spaced-section">
          <a
            href="#"
            className="bg-[#2F4454] text-white font-bold py-3 px-6 rounded-lg hover:bg-teal-700 transition duration-300 move-up" style={{ marginBottom: '-20px' }} 
          >
            Find a mentor
          </a>
        </div>
      </div>
    </section>
  );
}