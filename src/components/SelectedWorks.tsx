import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, ExternalLink, CheckCircle } from 'lucide-react';
import { portfolioConfig, type Project } from '../data/portfolioData';

export const SelectedWorks: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="work" className="py-28 px-6 md:px-16 bg-[#0A0A0A] relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141414] border border-[#1F1F1F] text-xs font-mono tracking-widest uppercase text-[#89AACC] mb-6">
            <span>SELECTED WORK</span>
          </div>
          <h2 className="font-editorial text-5xl md:text-7xl lg:text-8xl text-[#F5F5F5] mb-6 tracking-tight">
            Turning ideas into <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#89AACC] to-[#4E85BF]">digital reality.</span>
          </h2>
          <p className="max-w-2xl text-base md:text-lg text-[#878787] font-light leading-relaxed">
            A collection of digital experiences, applications, and creative experiments built with purpose.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          {portfolioConfig.projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: idx * 0.12 }}
              onClick={() => setSelectedProject(project)}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer border border-[#1F1F1F] bg-[#141414] transition-all duration-500 hover:border-[#89AACC]/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] ${project.gridSpan} min-h-[420px] md:min-h-[480px] flex flex-col justify-end p-8 md:p-10`}
            >
              {/* Background Image with Zoom & Dark Glass Overlay */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-75 contrast-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />
                <div className="absolute inset-0 bg-[#0A0A0A]/40 backdrop-blur-[2px] transition-opacity duration-500 group-hover:opacity-20" />
                <div className="absolute inset-0 bg-halftone opacity-30" />
              </div>

              {/* Top Badges */}
              <div className="relative z-10 flex items-center justify-between mb-auto">
                <span className="px-3 py-1 rounded-full bg-[#141414]/80 backdrop-blur-md border border-[#1F1F1F] text-[11px] font-mono text-[#89AACC] tracking-wider uppercase">
                  {project.category}
                </span>

                <div className="w-10 h-10 rounded-full bg-[#141414]/80 backdrop-blur-md border border-[#1F1F1F] group-hover:border-[#89AACC] group-hover:bg-[#89AACC] flex items-center justify-center text-[#F5F5F5] group-hover:text-[#0A0A0A] transition-all duration-300">
                  <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Bottom Content */}
              <div className="relative z-10 pt-16">
                <div className="font-mono text-xs text-[#878787] uppercase tracking-wider mb-2">
                  {project.subtitle}
                </div>
                <h3 className="font-editorial text-3xl md:text-4xl text-[#F5F5F5] mb-3 group-hover:text-[#89AACC] transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-[#878787] font-light leading-relaxed mb-6 line-clamp-2 max-w-xl">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-[#1F1F1F]/70 text-[11px] font-mono text-[#F5F5F5]/80 border border-[#1F1F1F]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Details Modal Drawer */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-[#0A0A0A]/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-3xl bg-[#141414] border border-[#1F1F1F] rounded-3xl p-8 md:p-12 overflow-y-auto max-h-[90vh] shadow-2xl"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#1F1F1F] text-[#878787] hover:text-[#F5F5F5] flex items-center justify-center transition-colors"
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>

              <div className="mb-6">
                <span className="text-xs font-mono uppercase tracking-widest text-[#89AACC]">
                  {selectedProject.category}
                </span>
                <h3 className="font-editorial text-4xl md:text-5xl text-[#F5F5F5] mt-1 mb-2">
                  {selectedProject.title}
                </h3>
                <p className="text-sm font-mono text-[#878787] uppercase">
                  {selectedProject.subtitle}
                </p>
              </div>

              <div className="rounded-2xl overflow-hidden mb-6 aspect-video bg-[#0A0A0A]">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-base text-[#878787] font-light leading-relaxed mb-8">
                {selectedProject.description}
              </p>

              {selectedProject.metrics && (
                <div className="mb-8">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#F5F5F5] mb-3">
                    Project Benchmarks
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {selectedProject.metrics.map((m) => (
                      <div
                        key={m}
                        className="p-3 rounded-xl bg-[#0A0A0A] border border-[#1F1F1F] flex items-center gap-2 text-xs font-mono text-[#89AACC]"
                      >
                        <CheckCircle size={14} />
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-8">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#F5F5F5] mb-3">
                  Technologies Employed
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 rounded-lg bg-[#1F1F1F] text-xs font-mono text-[#F5F5F5]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-[#1F1F1F] flex justify-end">
                <a
                  href="#contact"
                  onClick={() => setSelectedProject(null)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#89AACC] to-[#4E85BF] text-[#0A0A0A] font-semibold text-xs font-mono uppercase tracking-wider hover:scale-105 transition-all"
                >
                  <span>Inquire About Similar Architecture</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
