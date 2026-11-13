import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';

interface NavProps {
  onSayHi: () => void;
}

export const Navigation: React.FC<NavProps> = ({ onSayHi }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'Thoughts', href: '#journal' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 flex justify-center pt-5 px-4 pointer-events-none">
        <motion.nav
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto flex items-center justify-between gap-3 md:gap-7 px-4 py-2.5 rounded-full transition-all duration-300 border ${
            scrolled
              ? 'bg-[#141414]/90 backdrop-blur-xl border-[#89AACC]/30 shadow-[0_8px_30px_rgba(0,0,0,0.8)]'
              : 'bg-[#141414]/65 backdrop-blur-md border-[#1F1F1F] hover:border-[#89AACC]/40'
          }`}
        >
          {/* Circular MY Monogram */}
          <a
            href="#hero"
            className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-[#89AACC] to-[#4E85BF] text-[#0A0A0A] font-bold text-xs tracking-tighter hover:scale-105 transition-transform"
            aria-label="Home - Muralidhar Yerram"
          >
            MY
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 text-xs font-mono tracking-wider uppercase text-[#878787]">
            <span className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono tracking-wider font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              IMMEDIATE JOINER
            </span>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#F5F5F5] transition-colors relative py-1"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Say Hi Button */}
          <button
            onClick={onSayHi}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1F1F1F] hover:bg-[#89AACC] text-[#F5F5F5] hover:text-[#0A0A0A] text-xs font-mono tracking-wide uppercase transition-all duration-200"
          >
            <span>Say Hi</span>
            <ArrowUpRight size={13} />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-8 h-8 rounded-full bg-[#1F1F1F] text-[#F5F5F5] hover:text-[#89AACC] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </motion.nav>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-4 top-20 z-40 p-6 rounded-2xl bg-[#141414]/95 backdrop-blur-2xl border border-[#1F1F1F] shadow-2xl flex flex-col gap-4 text-center md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-mono tracking-widest uppercase text-[#878787] hover:text-[#89AACC] py-2 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-[#1F1F1F]">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onSayHi();
                }}
                className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#89AACC] to-[#4E85BF] text-[#0A0A0A] font-medium text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-1.5"
              >
                <span>Say Hi</span>
                <ArrowUpRight size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
