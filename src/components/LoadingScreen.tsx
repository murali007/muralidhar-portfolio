import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const words = ['Design', 'Create', 'Inspire'];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    // Progress counter: 0 to 100 in ~2.5s
    const start = performance.now();
    const duration = 2500;

    const interval = setInterval(() => {
      const elapsed = performance.now() - start;
      const current = Math.min(Math.floor((elapsed / duration) * 100), 100);
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 300);
      }
    }, 24);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Rotate words
  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 750);
    return () => clearInterval(wordInterval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -40, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#0A0A0A] p-8 md:p-14 text-[#F5F5F5] select-none"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between text-xs font-mono uppercase tracking-[0.25em] text-[#878787]">
        <span className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#89AACC] animate-pulse"></span>
          PORTFOLIO
        </span>
        <span>MURALIDHAR YERRAM</span>
      </div>

      {/* Center Word Cycler */}
      <div className="flex flex-col items-center justify-center my-auto">
        <div className="h-20 overflow-hidden flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.h1
              key={words[wordIndex]}
              initial={{ y: 50, opacity: 0, filter: 'blur(8px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              exit={{ y: -50, opacity: 0, filter: 'blur(8px)' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="font-editorial text-5xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-[#F5F5F5] via-[#89AACC] to-[#4E85BF] text-center"
            >
              {words[wordIndex]}
            </motion.h1>
          </AnimatePresence>
        </div>
        <p className="text-xs font-mono tracking-[0.2em] uppercase text-[#878787] mt-3">
          Loading digital experience
        </p>
      </div>

      {/* Bottom Counter & Bar */}
      <div className="w-full flex flex-col gap-4">
        <div className="flex items-end justify-between font-mono text-xs text-[#878787]">
          <span className="tracking-widest uppercase">Initializing Canvas</span>
          <span className="text-2xl font-light text-[#F5F5F5] tabular-nums">
            {String(progress).padStart(3, '0')}
            <span className="text-xs text-[#89AACC] font-mono ml-1">%</span>
          </span>
        </div>

        {/* Progress Bar with Blue Accent Gradient */}
        <div className="w-full h-[2px] bg-[#1F1F1F] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#89AACC] to-[#4E85BF]"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'linear' }}
          />
        </div>
      </div>
    </motion.div>
  );
};
