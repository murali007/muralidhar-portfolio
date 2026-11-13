import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { ArrowUpRight, Send, CheckCircle2 } from 'lucide-react';
import { portfolioConfig } from '../data/portfolioData';

export const Contact: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    discipline: 'Web & Mobile Application',
    message: '',
  });

  // HLS Video background
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;
    const videoSrc = portfolioConfig.owner.videoUrl;

    if (Hls.isSupported()) {
      hls = new Hls({ autoStartLoad: true });
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitted(true);

    // Direct mailto link fallback
    const subject = encodeURIComponent(`Project Inquiry: ${formData.discipline} - ${formData.name}`);
    const body = encodeURIComponent(
      `Hi Muralidhar,\n\nName: ${formData.name}\nEmail: ${formData.email}\nProject Type: ${formData.discipline}\n\nProject Scope:\n${formData.message}\n`
    );
    const mailto = `mailto:${portfolioConfig.owner.email}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      window.location.href = mailto;
    }, 1000);
  };

  const marqueeText = "BUILDING THE FUTURE • CREATING WHAT'S NEXT • ";

  return (
    <section id="contact" className="relative min-h-screen py-24 bg-[#0A0A0A] overflow-hidden flex flex-col justify-between">
      {/* Background HLS Video with stronger dark overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          muted
          autoPlay
          loop
          playsInline
          className="w-full h-full object-cover opacity-20 filter brightness-75 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0A0A0A]/75 to-[#0A0A0A]" />
        <div className="absolute inset-0 bg-halftone opacity-35" />
      </div>

      {/* Infinite Animated Marquee */}
      <div className="relative z-10 w-full overflow-hidden py-4 border-y border-[#1F1F1F] bg-[#0A0A0A]/60 backdrop-blur-sm mb-16">
        <div className="flex whitespace-nowrap animate-marquee font-mono text-xs md:text-sm tracking-[0.25em] text-[#878787] uppercase">
          <span className="mx-4">{marqueeText.repeat(8)}</span>
        </div>
      </div>

      {/* Main Contact Container */}
      <div className="relative z-10 max-w-6xl mx-auto w-full px-6 md:px-16 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & CTA */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141414] border border-[#1F1F1F] text-xs font-mono tracking-widest uppercase text-[#89AACC] mb-6">
              <span>GET IN TOUCH</span>
            </div>
            <h2 className="font-editorial text-5xl sm:text-6xl md:text-7xl text-[#F5F5F5] mb-6 tracking-tight leading-[0.95]">
              Have an idea? <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#89AACC] to-[#4E85BF]">
                Let's build something extraordinary.
              </span>
            </h2>
            <p className="text-base text-[#878787] font-light leading-relaxed mb-8">
              Whether you are launching an early-stage startup, scaling a modern digital platform, or exploring innovative AI and 3D graphics — I would love to hear from you.
            </p>

            <a
              href={`mailto:${portfolioConfig.owner.email}`}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#89AACC] to-[#4E85BF] text-[#0A0A0A] font-semibold text-xs font-mono uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_25px_rgba(137,170,204,0.3)] mb-8"
            >
              <span>Start a Conversation</span>
              <ArrowUpRight size={15} />
            </a>

            <div className="pt-6 border-t border-[#1F1F1F]">
              <span className="text-xs font-mono text-[#878787] block mb-2 uppercase tracking-wider">
                Direct Communication
              </span>
              <a
                href={`mailto:${portfolioConfig.owner.email}`}
                className="text-sm font-mono text-[#F5F5F5] hover:text-[#89AACC] transition-colors"
              >
                {portfolioConfig.owner.email}
              </a>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 md:p-12 rounded-3xl bg-[#141414]/90 border border-[#1F1F1F] backdrop-blur-xl">
              <h3 className="font-editorial text-3xl text-[#F5F5F5] mb-2">
                Initiate a Project
              </h3>
              <p className="text-xs font-mono uppercase tracking-widest text-[#878787] mb-8">
                Estimated reply window: Within 24 Hours
              </p>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-[#0A0A0A] border border-[#89AACC]/40 text-center">
                  <CheckCircle2 size={36} className="text-[#89AACC] mx-auto mb-3" />
                  <h4 className="font-editorial text-2xl text-[#F5F5F5] mb-2">
                    Transmission Initiated
                  </h4>
                  <p className="text-xs font-mono text-[#878787]">
                    Opening default email client with your prepared brief. Talk soon!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono uppercase text-[#878787] tracking-wider">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex Mercer"
                        className="bg-[#0A0A0A] border border-[#1F1F1F] focus:border-[#89AACC] rounded-xl px-4 py-3 text-sm text-[#F5F5F5] placeholder-[#878787]/50 outline-none transition-colors"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono uppercase text-[#878787] tracking-wider">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="bg-[#0A0A0A] border border-[#1F1F1F] focus:border-[#89AACC] rounded-xl px-4 py-3 text-sm text-[#F5F5F5] placeholder-[#878787]/50 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono uppercase text-[#878787] tracking-wider">
                      Project Discipline
                    </label>
                    <select
                      value={formData.discipline}
                      onChange={(e) => setFormData({ ...formData, discipline: e.target.value })}
                      className="bg-[#0A0A0A] border border-[#1F1F1F] focus:border-[#89AACC] rounded-xl px-4 py-3 text-sm text-[#F5F5F5] outline-none transition-colors cursor-pointer"
                    >
                      <option value="Web & Mobile Application">Web &amp; Mobile Application</option>
                      <option value="UI/UX & Product Design">UI/UX &amp; Product Design</option>
                      <option value="AI / LLM Product Workflow">AI / LLM Product Workflow</option>
                      <option value="Unreal Engine / 3D Experience">Unreal Engine / 3D Experience</option>
                      <option value="Custom Software Solution">Custom Software Solution</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono uppercase text-[#878787] tracking-wider">
                      Project Scope &amp; Brief
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your product vision, timeline, and goals..."
                      className="bg-[#0A0A0A] border border-[#1F1F1F] focus:border-[#89AACC] rounded-xl px-4 py-3 text-sm text-[#F5F5F5] placeholder-[#878787]/50 outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-gradient-to-r from-[#89AACC] to-[#4E85BF] text-[#0A0A0A] font-semibold text-xs font-mono uppercase tracking-widest hover:opacity-95 transition-opacity"
                  >
                    <span>Transmit Project Brief</span>
                    <Send size={14} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
