import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ArrowDown, ArrowUpRight, Sparkles } from 'lucide-react';
import { portfolioConfig } from '../data/portfolioData';

export const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const eyebrowRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  const [roleIndex, setRoleIndex] = useState(0);

  // Setup HLS video playback
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;
    const videoSrc = portfolioConfig.owner.videoUrl;

    if (Hls.isSupported()) {
      hls = new Hls({
        autoStartLoad: true,
        startLevel: -1,
        capLevelToPlayerSize: true,
      });
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {
          // Autoplay fallback silently
        });
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native Safari HLS
      video.src = videoSrc;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {});
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, []);

  // Role rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % portfolioConfig.owner.roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // GSAP entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 20, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1, delay: 0.2 }
      )
        .fromTo(
          headingRef.current,
          { opacity: 0, y: 50, filter: 'blur(12px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2 },
          '-=0.7'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9 },
          '-=0.6'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-between pt-32 pb-12 px-6 md:px-16 overflow-hidden bg-[#0A0A0A]"
    >
      {/* Background HLS Video */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          muted
          autoPlay
          loop
          playsInline
          className="w-full h-full object-cover opacity-35 filter brightness-90 contrast-110"
        />
        {/* Dark overlays & bottom gradient fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-transparent to-[#0A0A0A]/60" />
        <div className="absolute inset-0 bg-halftone opacity-40 pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto w-full my-auto flex flex-col justify-center">
        {/* Eyebrow */}
        <div
          ref={eyebrowRef}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#141414]/80 border border-[#1F1F1F] text-[11px] font-mono tracking-[0.2em] uppercase text-[#89AACC] mb-8 w-fit backdrop-blur-sm"
        >
          <Sparkles size={12} className="animate-spin text-[#89AACC]" style={{ animationDuration: '8s' }} />
          <span>{portfolioConfig.owner.eyebrow}</span>
        </div>

        {/* Oversized Instrument Serif Italic Typography */}
        <h1
          ref={headingRef}
          className="font-editorial text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] leading-[0.88] text-[#F5F5F5] tracking-tight mb-8"
        >
          {portfolioConfig.owner.firstName} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5F5F5] via-[#89AACC] to-[#4E85BF]">
            {portfolioConfig.owner.lastName}
          </span>
        </h1>

        {/* Dynamic Role Rotation */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 font-mono text-sm md:text-base text-[#878787] mb-8">
          <span className="text-[#878787]">Building digital experiences that matter:</span>
          <div className="h-7 overflow-hidden inline-flex items-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={portfolioConfig.owner.roles[roleIndex]}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="font-semibold text-[#89AACC] border-b border-[#89AACC]/40 pb-0.5"
              >
                {portfolioConfig.owner.roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Description */}
        <p className="max-w-2xl text-base md:text-lg text-[#878787] font-light leading-relaxed mb-10">
          {portfolioConfig.owner.heroDescription}
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
          <a
            href="#work"
            className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#89AACC] to-[#4E85BF] text-[#0A0A0A] font-semibold text-xs font-mono uppercase tracking-widest overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(137,170,204,0.4)] hover:scale-105"
          >
            <span>Explore My Work</span>
            <ArrowDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#141414] hover:bg-[#1F1F1F] border border-[#1F1F1F] hover:border-[#89AACC]/50 text-[#F5F5F5] font-mono text-xs uppercase tracking-widest transition-all duration-300 hover:scale-105"
          >
            <span>Let's Talk</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>

      {/* Animated Scroll Indicator */}
      <div className="relative z-10 max-w-6xl mx-auto w-full flex items-center justify-between text-xs font-mono text-[#878787] pt-8 border-t border-[#1F1F1F]/60">
        <span className="hidden sm:inline tracking-wider">SCROLL TO DISCOVER</span>
        <div className="flex items-center gap-2 tracking-widest uppercase">
          <div className="w-1.5 h-1.5 rounded-full bg-[#89AACC] animate-ping" />
          <span>BASED IN HYDERABAD • WORLDWIDE AVAILABILITY</span>
        </div>
      </div>
    </section>
  );
};
