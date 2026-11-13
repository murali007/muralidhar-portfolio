import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import { portfolioConfig, type ExplorationItem } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export const CreativeExplorations: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const colLeftRef = useRef<HTMLDivElement | null>(null);
  const colRightRef = useRef<HTMLDivElement | null>(null);

  const [activeItem, setActiveItem] = useState<ExplorationItem | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Different scroll speed parallax on the two columns
      if (colLeftRef.current && colRightRef.current && sectionRef.current) {
        gsap.to(colLeftRef.current, {
          y: -80,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });

        gsap.to(colRightRef.current, {
          y: 80,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const items = portfolioConfig.explorations;
  const leftCol = items.filter((_, i) => i % 2 === 0);
  const rightCol = items.filter((_, i) => i % 2 !== 0);

  return (
    <section
      id="explorations"
      ref={sectionRef}
      className="py-32 px-6 md:px-16 bg-[#0A0A0A] border-t border-[#1F1F1F] relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141414] border border-[#1F1F1F] text-xs font-mono tracking-widest uppercase text-[#89AACC] mb-6">
            <span>CREATIVE EXPLORATIONS</span>
          </div>
          <h2 className="font-editorial text-6xl md:text-8xl text-[#F5F5F5] mb-6 tracking-tight">
            Beyond the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#89AACC] to-[#4E85BF]">code.</span>
          </h2>
          <p className="text-base md:text-lg text-[#878787] font-light leading-relaxed">
            An ongoing exploration of creativity, technology, and imagination.
          </p>
        </div>

        {/* Two-Column Floating Parallax Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14">
          {/* Column Left */}
          <div ref={colLeftRef} className="flex flex-col gap-10 md:gap-16">
            {leftCol.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                className="group relative rounded-3xl overflow-hidden cursor-pointer border border-[#1F1F1F] bg-[#141414] transition-all duration-500 hover:border-[#89AACC]/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                style={{ transform: `rotate(${item.rotation || 0}deg)` }}
              >
                <div className={`${item.aspect} w-full overflow-hidden bg-[#0A0A0A]`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-85"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
                  <div className="absolute inset-0 bg-halftone opacity-25" />
                </div>

                <div className="absolute bottom-0 inset-x-0 p-6 md:p-8 flex items-end justify-between z-10">
                  <div>
                    <span className="text-[11px] font-mono tracking-widest uppercase text-[#89AACC]">
                      {item.medium}
                    </span>
                    <h3 className="font-editorial text-2xl md:text-3xl text-[#F5F5F5] mt-1">
                      {item.title}
                    </h3>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-[#141414]/90 border border-[#1F1F1F] flex items-center justify-center text-[#89AACC] group-hover:bg-[#89AACC] group-hover:text-[#0A0A0A] transition-all">
                    <ZoomIn size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Column Right */}
          <div ref={colRightRef} className="flex flex-col gap-10 md:gap-16 pt-0 md:pt-16">
            {rightCol.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                className="group relative rounded-3xl overflow-hidden cursor-pointer border border-[#1F1F1F] bg-[#141414] transition-all duration-500 hover:border-[#89AACC]/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                style={{ transform: `rotate(${item.rotation || 0}deg)` }}
              >
                <div className={`${item.aspect} w-full overflow-hidden bg-[#0A0A0A]`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-85"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
                  <div className="absolute inset-0 bg-halftone opacity-25" />
                </div>

                <div className="absolute bottom-0 inset-x-0 p-6 md:p-8 flex items-end justify-between z-10">
                  <div>
                    <span className="text-[11px] font-mono tracking-widest uppercase text-[#89AACC]">
                      {item.medium}
                    </span>
                    <h3 className="font-editorial text-2xl md:text-3xl text-[#F5F5F5] mt-1">
                      {item.title}
                    </h3>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-[#141414]/90 border border-[#1F1F1F] flex items-center justify-center text-[#89AACC] group-hover:bg-[#89AACC] group-hover:text-[#0A0A0A] transition-all">
                    <ZoomIn size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-[#0A0A0A]/95 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-4xl w-full bg-[#141414] border border-[#1F1F1F] rounded-3xl overflow-hidden shadow-2xl p-6 md:p-8"
            >
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-6 right-6 z-20 w-9 h-9 rounded-full bg-[#1F1F1F] text-[#878787] hover:text-[#F5F5F5] flex items-center justify-center transition-colors"
                aria-label="Close lightbox"
              >
                <X size={18} />
              </button>

              <div className="rounded-2xl overflow-hidden max-h-[70vh] mb-4 bg-[#0A0A0A] flex items-center justify-center">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-[#89AACC] uppercase tracking-widest">
                    {activeItem.medium}
                  </span>
                  <h3 className="font-editorial text-3xl text-[#F5F5F5]">
                    {activeItem.title}
                  </h3>
                </div>
                <span className="text-xs font-mono text-[#878787]">
                  Artifact // 2026
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
