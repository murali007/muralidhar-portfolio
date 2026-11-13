import React from 'react';
import { motion } from 'framer-motion';
import { Code, Layout, Cpu, Gamepad2, ArrowUpRight } from 'lucide-react';
import { portfolioConfig } from '../data/portfolioData';

const iconMap: Record<string, React.ElementType> = {
  Code,
  Layout,
  Cpu,
  Gamepad2,
};

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-28 px-6 md:px-16 bg-[#0A0A0A] border-t border-[#1F1F1F]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141414] border border-[#1F1F1F] text-xs font-mono tracking-widest uppercase text-[#89AACC] mb-6">
            <span>SERVICES</span>
          </div>
          <h2 className="font-editorial text-5xl md:text-7xl lg:text-8xl text-[#F5F5F5] mb-6 tracking-tight">
            What I bring to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#89AACC] to-[#4E85BF]">the table.</span>
          </h2>
          <p className="max-w-2xl text-base md:text-lg text-[#878787] font-light leading-relaxed">
            Full-spectrum capabilities spanning high-scale web platforms, user experience craftsmanship, intelligent AI workflows, and real-time graphics.
          </p>
        </div>

        {/* 4 Premium Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {portfolioConfig.services.map((service, idx) => {
            const Icon = iconMap[service.iconName] || Code;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative p-8 md:p-10 rounded-3xl bg-[#141414] border border-[#1F1F1F] hover:border-[#89AACC]/40 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
              >
                <div>
                  {/* Top Icon & Category */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-[#1F1F1F] group-hover:bg-[#89AACC] text-[#89AACC] group-hover:text-[#0A0A0A] flex items-center justify-center transition-all duration-300">
                      <Icon size={22} />
                    </div>
                    <span className="text-[11px] font-mono tracking-widest uppercase text-[#878787]">
                      0{idx + 1} // {service.category}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-editorial text-3xl md:text-4xl text-[#F5F5F5] mb-4 group-hover:text-[#89AACC] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-base text-[#878787] font-light leading-relaxed mb-8">
                    {service.description}
                  </p>
                </div>

                {/* Technologies List & Arrow */}
                <div>
                  <div className="pt-6 border-t border-[#1F1F1F] flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md bg-[#0A0A0A] border border-[#1F1F1F] text-xs font-mono text-[#878787]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-1 text-xs font-mono tracking-wider uppercase text-[#89AACC] hover:text-[#F5F5F5] transition-colors"
                    >
                      <span>Inquire</span>
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
