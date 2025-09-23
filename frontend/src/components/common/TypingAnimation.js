import React, { useState, useEffect, useRef } from 'react';

const TypingAnimation = ({ texts, typingSpeed = 100, deletingSpeed = 50, pauseTime = 2000, resetTrigger }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef(null);

  // Reset animation when component mounts or resetTrigger changes
  useEffect(() => {
    setCurrentTextIndex(0);
    setCurrentText('');
    setIsDeleting(false);
    setIsPaused(false);
  }, [resetTrigger]);

  useEffect(() => {
    const currentFullText = texts[currentTextIndex];

    const animate = () => {
      if (isPaused) {
        setIsPaused(false);
        setIsDeleting(true);
        return;
      }

      if (isDeleting) {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      } else {
        if (currentText.length < currentFullText.length) {
          setCurrentText(currentFullText.slice(0, currentText.length + 1));
        } else {
          setIsPaused(true);
        }
      }
    };

    timeoutRef.current = setTimeout(animate, isDeleting ? deletingSpeed : isPaused ? pauseTime : typingSpeed);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentText, currentTextIndex, isDeleting, isPaused, texts, typingSpeed, deletingSpeed, pauseTime]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <span className="font-bold bg-yellow-300 text-purple-900 px-2 py-1 rounded-full inline-block min-w-[120px] text-center">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default TypingAnimation;
