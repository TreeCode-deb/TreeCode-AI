import React, { useRef, useState, useEffect } from 'react';
import { forestHero } from '../../data/initialData';

export const HeroBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  // High-performance, locally hosted 759KB optimized forest video
  const localVideoSource = '/videos/forest_hero.mp4';

  useEffect(() => {
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setHasError(true);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    const handlePlaySuccess = () => {
      setIsPlaying(true);
      setVideoLoaded(true);
    };

    const handleCanPlay = () => {
      setVideoLoaded(true);
      video.play().then(handlePlaySuccess).catch((err) => {
        console.warn('Autoplay prevented or video failed to play:', err);
      });
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('playing', handlePlaySuccess);

    // Visibility change: pause when tab hidden to save CPU
    const handleVisibilityChange = () => {
      if (document.hidden && video) {
        video.pause();
      } else if (!document.hidden && video && !hasError) {
        video.play().catch(() => {});
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('playing', handlePlaySuccess);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [hasError]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* High-Resolution Static Fallback Image (Always present underneath for instant render) */}
      <img
        src={forestHero}
        alt="Mystic Dark Forest Canopy"
        referrerPolicy="no-referrer"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          videoLoaded && isPlaying ? 'opacity-25' : 'opacity-85'
        }`}
      />

      {/* Local Optimized Video Element */}
      {!hasError && (
        <video
          ref={videoRef}
          src={localVideoSource}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onError={(e) => {
            console.warn('Local video load error, falling back to static poster:', e);
            setHasError(true);
          }}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded && isPlaying ? 'opacity-45' : 'opacity-0'
          }`}
        />
      )}

      {/* Cinematic Dark Forest & Emerald Color Grading Overlays */}
      <div className="absolute inset-0 bg-[#06180e]/50 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080d0a] via-[#080d0a]/75 to-[#080d0a]/50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.12)_0%,transparent_75%)]" />
    </div>
  );
};
