import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock, Calendar } from 'lucide-react';
import { portfolioConfig } from '../data/portfolioData';

export const Journal: React.FC = () => {
  return (
    <section id="journal" className="py-28 px-6 md:px-16 bg-[#0A0A0A] border-t border-[#1F1F1F]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141414] border border-[#1F1F1F] text-xs font-mono tracking-widest uppercase text-[#89AACC] mb-6">
            <span>JOURNAL &amp; INSIGHTS</span>
          </div>
          <h2 className="font-editorial text-5xl md:text-7xl lg:text-8xl text-[#F5F5F5] mb-6 tracking-tight">
            Thoughts &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#89AACC] to-[#4E85BF]">Explorations.</span>
          </h2>
          <p className="max-w-2xl text-base md:text-lg text-[#878787] font-light leading-relaxed">
            Observations, architectural learnings, and design notes gathered while shipping products across the digital spectrum.
          </p>
        </div>

        {/* 4 Horizontal Editorial Cards */}
        <div className="flex flex-col divide-y divide-[#1F1F1F] border-y border-[#1F1F1F]">
          {portfolioConfig.journal.map((item, idx) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="group py-8 md:py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-[#141414]/40 px-4 -mx-4 rounded-xl transition-all duration-300"
            >
              <div className="max-w-2xl">
                <div className="flex items-center gap-4 text-xs font-mono text-[#878787] uppercase tracking-wider mb-2">
                  <span className="text-[#89AACC]">{item.category}</span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock size={12} />
                    {item.readTime}
                  </span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar size={12} />
                    {item.date}
                  </span>
                </div>

                <h3 className="font-editorial text-3xl md:text-4xl text-[#F5F5F5] group-hover:text-[#89AACC] transition-colors mb-2">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base text-[#878787] font-light leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="flex items-center gap-3 self-end md:self-center">
                <div className="w-10 h-10 rounded-full bg-[#141414] border border-[#1F1F1F] group-hover:border-[#89AACC] group-hover:bg-[#89AACC] flex items-center justify-center text-[#878787] group-hover:text-[#0A0A0A] transition-all duration-300">
                  <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
