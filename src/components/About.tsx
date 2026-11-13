import React from 'react';
import { motion } from 'framer-motion';
import { portfolioConfig } from '../data/portfolioData';

export const About: React.FC = () => {
  const techStack = [
    'C#',
    '.NET 8',
    'Flutter',
    'Dart',
    'TypeScript',
    'React',
    'Node.js',
    'PostgreSQL',
    'Redis',
    'REST APIs',
    'Docker',
    'AI / LLM Agents',
    'Unreal Engine 5',
    'Nanite & Lumen',
  ];

  return (
    <section id="about" className="py-28 px-6 md:px-16 bg-[#0A0A0A] border-t border-[#1F1F1F]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141414] border border-[#1F1F1F] text-xs font-mono tracking-widest uppercase text-[#89AACC] mb-6">
            <span>ABOUT &amp; PHILOSOPHY</span>
          </div>
          <h2 className="font-editorial text-5xl md:text-7xl lg:text-8xl text-[#F5F5F5] mb-8 tracking-tight max-w-4xl">
            {portfolioConfig.owner.aboutIntro}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-base md:text-lg text-[#878787] font-light leading-relaxed">
            {portfolioConfig.owner.aboutBio.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Development Philosophy / Working Approach */}
        <div className="mb-20">
          <h3 className="text-xs font-mono tracking-[0.2em] uppercase text-[#878787] mb-8 pb-3 border-b border-[#1F1F1F]">
            HOW I WORK // FOUR CORE PILLARS
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolioConfig.approachPillars.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-[#141414] border border-[#1F1F1F] flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono text-[#89AACC] block mb-3">
                    0{idx + 1}
                  </span>
                  <h4 className="font-editorial text-2xl text-[#F5F5F5] mb-2">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-[#878787] font-light leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Core Stack Matrix */}
        <div>
          <h3 className="text-xs font-mono tracking-[0.2em] uppercase text-[#878787] mb-6 pb-3 border-b border-[#1F1F1F]">
            ENGINEERING STACK &amp; SPECIALTIES
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-xl bg-[#141414] border border-[#1F1F1F] hover:border-[#89AACC]/40 text-xs md:text-sm font-mono text-[#F5F5F5] transition-all hover:scale-105"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
