import React, { useState, useEffect } from 'react';

const PHRASES = [
  'AI Engineering',
  'Machine Learning',
  'Deep Learning',
  'AI Agents',
  'Intelligent Systems',
  'Python',
  'Automation',
];

export const TypingHero: React.FC = () => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // Respect user's reduced-motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCurrentText(PHRASES[0]);
      return;
    }

    const currentPhrase = PHRASES[phraseIndex];

    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 2000); // 2 second pause when fully typed
      return () => clearTimeout(pauseTimer);
    }

    const speed = isDeleting ? 40 : 85;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        const nextCharCount = currentText.length + 1;
        setCurrentText(currentPhrase.substring(0, nextCharCount));
        if (nextCharCount === currentPhrase.length) {
          setIsPaused(true);
        }
      } else {
        // Erasing backward
        const nextCharCount = currentText.length - 1;
        setCurrentText(currentPhrase.substring(0, nextCharCount));
        if (nextCharCount === 0) {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, isPaused, phraseIndex]);

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-lg sm:text-2xl md:text-3xl font-medium tracking-tight min-h-[44px] text-zinc-300">
      <span className="text-emerald-400/90 font-mono text-base sm:text-xl font-semibold tracking-wider">
        EXPLORING:
      </span>
      <span className="font-semibold text-white relative inline-flex items-center">
        <span>{currentText}</span>
        {/* Blinking Cursor */}
        <span 
          className="inline-block w-[3px] h-[1.1em] ml-1 bg-emerald-400 align-middle animate-pulse" 
          aria-hidden="true" 
        />
      </span>
    </div>
  );
};
