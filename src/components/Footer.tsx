import React from 'react';
import { portfolioConfig } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 py-12 px-6 md:px-16 bg-[#0A0A0A] border-t border-[#1F1F1F]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand & Availability */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <a
            href="#hero"
            className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-[#89AACC] to-[#4E85BF] text-[#0A0A0A] font-bold text-xs tracking-tighter"
          >
            MY
          </a>
          <div>
            <div className="font-editorial text-xl text-[#F5F5F5]">
              {portfolioConfig.owner.name}
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-[11px] font-mono text-[#878787] mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>AVAILABLE FOR SELECT COMMISSIONS</span>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-6 text-xs font-mono tracking-wider uppercase text-[#878787]">
          {portfolioConfig.owner.socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#89AACC] transition-colors"
            >
              {social.name}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-xs font-mono text-[#878787]">
          © {currentYear} {portfolioConfig.owner.name}. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
};
