import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LoadingScreen } from './components/LoadingScreen';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { SelectedWorks } from './components/SelectedWorks';
import { Services } from './components/Services';
import { CreativeExplorations } from './components/CreativeExplorations';
import { Journal } from './components/Journal';
import { About } from './components/About';
import { Statistics } from './components/Statistics';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  const handleSayHi = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] selection:bg-[#89AACC] selection:text-[#0A0A0A] overflow-x-hidden relative">
      {/* Cinematic Loading Animation (~2.7s) */}
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* Floating Pill Navigation */}
      <Navigation onSayHi={handleSayHi} />

      {/* Main Single-Page Sections */}
      <main>
        <Hero />
        <SelectedWorks />
        <Services />
        <CreativeExplorations />
        <Journal />
        <About />
        <Statistics />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
