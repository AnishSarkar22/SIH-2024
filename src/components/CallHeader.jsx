import React, { useState, useEffect } from 'react';
import { Icon } from '@stream-io/video-react-sdk';

const CallHeader = ({ isTransparent, isActive }) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prevTime => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className={`fixed top-0 left-0 right-0 flex items-center justify-between ${isTransparent ? 'bg-transparent' : 'bg-[var(--str-video__base-color7)]'} rounded-[var(--str-video__border-radius-xxl)] p-[var(--str-video__spacing-lg)] z-20 max-w-[800px] mx-auto`}>
      <div className="flex items-center gap-4 flex-1">
        <img src="/images/logo-white-removebg-preview.svg" alt="Logo" className="w-8 h-8 sm:w-12 sm:h-12" />
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-[var(--str-video__base-color6)] p-1 rounded-[var(--str-video__border-radius-md)] text-[var(--str-video__font-size-xs)] font-semibold">
          <div className="bg-[var(--str-video__alert-success)] h-4 w-4 rounded-full mr-1"></div>
          <span>{formatTime(elapsedTime)}</span>
        </div>
      </div>
    </div>
  );
};

export default CallHeader;