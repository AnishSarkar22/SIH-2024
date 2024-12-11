import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const CardStack = ({ cards }) => {
  const [stack, setStack] = useState(cards);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef(null);
  const dragStartPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseUp = () => setDragging(false);
    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!dragging) {
        setStack((prevStack) => {
          const newStack = [...prevStack];
          const [removed] = newStack.splice(0, 1);
          newStack.push(removed);
          return newStack;
        });
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [dragging]);

  const handleDragStart = (e) => {
    e.preventDefault();
    dragStartPosRef.current = { x: e.clientX, y: e.clientY };
    setDragging(true);
  };

  const handleDrag = (e) => {
    if (!dragging) return;
    e.preventDefault();
    const deltaX = e.clientX - dragStartPosRef.current.x;

    const containerRect = containerRef.current.getBoundingClientRect();
    if (Math.abs(deltaX) > containerRect.width / 2) {
      setStack((prevStack) => {
        const newStack = [...prevStack];
        const [removed] = newStack.splice(0, 1);
        newStack.push(removed);
        return newStack;
      });
      setDragging(false);
    }
  };

  const handleDragEnd = () => {
    setDragging(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[400px] overflow-visible"
    >
      {stack.map((card, index) => (
        <motion.div
          key={card.key}
          className="absolute top-0 left-0 w-full cursor-grab active:cursor-grabbing select-none"
          initial={{
            scale: 1 - index * 0.05,
            y: index * 20,
            zIndex: stack.length - index,
            rotate: index === 0 ? 0 : index % 2 === 0 ? 3 : -3,
          }}
          animate={{
            scale: 1 - index * 0.05,
            y: index * 20,
            zIndex: stack.length - index,
            rotate: index === 0 ? 0 : index % 2 === 0 ? 3 : -3,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 1.5,
            rotate: { duration: 1.5, ease: "easeInOut" },
          }}
          drag={index === 0 ? "x" : false}
          dragConstraints={containerRef}
          dragElastic={0.1}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          whileHover={index === 0 ? { scale: 1.02 } : {}}
        >
          {card}
        </motion.div>
      ))}
    </div>
  );
};

export default function Features() {
  const styles = {
    fontFamily: "'Aeonik', sans-serif"
  };

  const cardData = [
    {
      key: "group-sessions",
      video: "images/florid-remote-workflow.gif",
      title: "free group sessions",
      description: "One powerful online software suite that combines",
    },
    {
      key: "video-calls",
      video: "images/cubes-online-meeting-between-two-people.gif",
      title: "1-on-1 video calls",
      description: "One powerful online software suite that combines",
    },
    {
      key: "flexible-program",
      video: "images/bendy-man-developer-writing-programming-code.gif",
      title: "flexible program structures",
      description: "One powerful online software suite that combines",
    },
    {
      key: "personal-chats",
      video: "images/abstract-9.gif",
      title: "Personal Chats",
      description: "One powerful online software suite that combines",
    },
  ];

  const cards = cardData.map((card) => (
    <div
      key={card.key}
      className="bg-white p-4 sm:p-6 rounded-lg shadow-2xl flex flex-col justify-center items-center h-[300px] sm:h-[400px] w-full hover:bg-slate-100 transition-all duration-500 transform hover:-translate-y-2"
    >
      {card.image ? (
        <img
          src={card.image}
          alt={card.title}
          className="w-14 h-14 sm:w-17 sm:h-19 mb-1 sm:mb-6 pointer-events-none"
        />
      ) : (
        <img
          src={card.video}
          alt={card.title}
          className="w-60 h-48 sm:w-72 sm:h-32 mb-2 sm:mb-1 md:h-60 md:w-80 pointer-events-none object-cover"
        />
      )}
      <h3 className="text-lg sm:text-xl font-semibold text-2F4454 mb-1 sm:mb-0 mt-0 text-center pointer-events-none">
        {card.title}
      </h3>
      <p className="text-sm sm:text-base text-gray-600 text-center mt-0 sm:mt-2 pointer-events-none">
        {card.description}
      </p>
    </div>
  ));

  return (
    <section className="py-20 md:py-40 xl:py-1 bg-white mt-[100px] sm:mt-[200px] md:mt-[-50px] lg:mt-[-100px] xl:mt-[-10px] relative bg-[url('static/bg-pattern.svg')] bg-[length:50rem] bg-no-repeat bg-[175%_100%] pb-[100px] top-[-40px]">
      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 bg-[length:45rem] bg-no-repeat bg-center flex flex-col md:flex-row items-center md:items-start">
        {/* Heading for mobile - shows first */}
        <h2 className="md:hidden text-2xl sm:text-3xl lg:text-4xl font-bold text-[#3D5466] mb-8 text-center order-1">
          At your fingertips: a dedicated coach
        </h2>

        {/* Card Stack - shows second on mobile */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-start order-2 md:order-none">
          <div className="w-full mt-8 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl px-4 md:ml-24">
            <CardStack cards={cards} />
          </div>
        </div>

        {/* Text content container */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-end text-center md:text-right mt-10 md:mt-24 md:mr-40 mb-40">
          {/* Desktop heading - hidden on mobile */}
          <h2 className="hidden md:block text-2xl sm:text-3xl lg:text-4xl font-bold text-[#3D5466] mb-12 sm:mb-6">
            At your fingertips: a dedicated coach
          </h2>

          {/* Paragraph - shows third on mobile */}
          <p className="text-sm sm:text-base text-center text-gray-600 mt-3 md:mr-10 sm:mt-5 max-w-2xl mx-auto md:mx-0 order-3 md:order-none">
            Want to build your career, successfully repair your relationships,
            and
            <br className="hidden sm:inline" />
            enhance your education for a brighter future?
          </p>

          {/* Button - shows last on mobile */}
          <div className="flex gap-4 mt-12 sm:mt-[70px] md:mr-56 justify-center md:justify-end order-4 md:order-none">
            <a
              href="#"
              className="bg-[#2F4454] text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-lg hover:bg-teal-700 transition duration-300 text-sm sm:text-base"
            >
              Find a mentor
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
