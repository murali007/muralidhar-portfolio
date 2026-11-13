# Muralidhar Yerram — Premium Developer Portfolio

> **"Turning ideas into digital reality."**  
> **Full-Stack Developer | UI/UX Architect | AI Engineer | Game Developer**

A cinematic, award-winning Awwwards-style developer portfolio built for **Muralidhar Yerram**. Designed as a high-end digital studio showcase that communicates creativity, technical depth, innovation, and premium craftsmanship to startups, founders, businesses, and international clients.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + Vite 8
- **Language**: TypeScript 5 (Strict Mode)
- **Styling**: Tailwind CSS v4 + Custom Glassmorphism & Halftone Utilities
- **Animation Suite**:
  - **GSAP 3 + ScrollTrigger** (entrance reveals, text blur-to-clear, dual-speed parallax, infinite marquee)
  - **Framer Motion** (loading screen AnimatePresence, role rotation, bento card hover, lightbox modal drawer)
- **Video Stream**: `hls.js` with native HLS fallback for cinematic background video
- **Icons**: `lucide-react`
- **Typography**: Google Fonts:
  - **Inter** (300–700) for clean editorial and body text
  - **Instrument Serif** (italic, 400) for large expressive headings

---

## 🎨 Visual Identity & Architecture

- **Forced Dark Palette**:
  - Background: `#0A0A0A`
  - Surface: `#141414`
  - Primary text: `#F5F5F5`
  - Muted text: `#878787`
  - Borders: `#1F1F1F`
  - Accent gradient: `#89AACC` → `#4E85BF`

---

## 📦 Sections & Components Breakdown

### 1. Cinematic Loading Screen (`src/components/LoadingScreen.tsx`)
- Full-screen dark experience with `PORTFOLIO` header.
- Center rotating kinetic words: `Design`, `Create`, `Inspire`.
- Animated percentage counter (`000%` to `100%`) with blue gradient progress bar.
- Framer Motion `AnimatePresence` with smooth upward exit transition.

### 2. Floating Pill Navigation (`src/components/Navigation.tsx`)
- Floating pill centered at top viewport with backdrop blur and subtle border.
- Monogram circular `MY` logo.
- Smooth anchor navigation (`Home`, `Work`, `Services`, `Thoughts`, `About`, `Contact`).
- `Say Hi ↗` CTA button with hover gradient.
- Becomes more prominent on scroll; includes collapsible mobile menu.

### 3. Cinematic Hero (`src/components/Hero.tsx`)
- Looping HLS video background (`https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8`).
- Eyebrow badge: `INDEPENDENT DEVELOPER • DIGITAL CREATOR`.
- Oversized Instrument Serif heading: `Muralidhar Yerram.`.
- Kinetic role rotation: `Full-Stack Developer`, `UI/UX Developer`, `AI Application Developer`, `Game Developer`.
- GSAP entrance timeline: blur-to-clear heading reveals, staggered description, and dual CTAs (`Explore My Work`, `Let's Talk`).
- Animated scroll discovery indicator.

### 4. Selected Works Bento Grid (`src/components/SelectedWorks.tsx`)
- Asymmetric Bento Grid featuring:
  1. **JussGo** — Ride Booking Application (`.NET 8`, `Flutter`, `PostgreSQL`, `Redis`)
  2. **Video AI Studio** — AI-Assisted Video Editing (`React`, `Python`, `FastAPI`, `WebGPU`)
  3. **Web & Mobile Experiences** — Clean Interfaces & Distributed Systems (`React`, `Node.js`, `Tailwind`)
  4. **Game Development** — Unreal Engine Experiments (`UE5`, `C++`, `Nanite`, `Lumen`)
- Halftone grain overlay, image scale-on-hover, glassmorphism badges, and click-to-open detail modal.

### 5. Services Section (`src/components/Services.tsx`)
- 4 premium service cards:
  - `Web & Application Development`
  - `UI/UX Design`
  - `AI & Intelligent Applications`
  - `Game Development`
- Minimal icons, descriptions, tech stacks, and hover animations.

### 6. Creative Explorations (`src/components/CreativeExplorations.tsx`)
- Parallax dual-column floating image gallery:
  - Section title: *"Beyond the code."*
  - Dual-speed GSAP ScrollTrigger parallax.
  - Subtle card rotation angles.
  - Click-to-open interactive lightbox modal.

### 7. Journal & Insights (`src/components/Journal.tsx`)
- 4 editorial horizontal cards:
  - *Building products from zero.*
  - *The future of AI-powered applications.*
  - *Exploring Unreal Engine.*
  - *Designing better digital experiences.*
- Reading times, dates, categories, and hover arrow transitions.

### 8. About & Philosophy (`src/components/About.tsx`)
- Core statement: *"Curiosity drives everything I build."*
- Four approach pillars: *Clean Engineering*, *Visual Craftsmanship*, *Emerging Tech First*, *Ship with Ownership*.
- Interactive tech stack badge matrix.

### 9. Animated Statistics (`src/components/Statistics.tsx`)
- 3-column section with animated counters on viewport entry:
  - `24+` Projects Delivered
  - `14+` Technologies Explored
  - `100%` Client Dedication

### 10. Contact Section & Footer (`src/components/Contact.tsx`, `src/components/Footer.tsx`)
- Looping HLS video background with dark overlay.
- Continuous animated marquee: `BUILDING THE FUTURE • CREATING WHAT'S NEXT •`.
- Direct email trigger + interactive project inquiry form.
- Footer with monogram logo, LinkedIn, GitHub, Instagram, Dribbble, availability indicator, and dynamic copyright year.

---

## 🚀 Running Locally

```bash
cd C:\Users\Poojitha\.gemini\antigravity\scratch\muralidhar-portfolio

# Start Vite dev server
npm run dev

# Or build and preview production bundle
npm run build
npm run preview
```
Visit `http://localhost:5173` (or the port Vite outputs) in your browser.
