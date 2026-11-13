/**
 * Muralidhar Yerram - Portfolio Main Application Logic
 */

import { portfolioData } from './data.js';
import { ParticleEngine } from './particles.js';

class PortfolioApp {
  constructor() {
    this.engine = null;
    this.activeCategory = "all";
    this.audioEnabled = false;
    this.audioCtx = null;

    this.init();
  }

  init() {
    // 1. Initialize GPU Particle & Fluid Engine
    this.engine = new ParticleEngine('bg');

    // 2. Render Portfolio Sections
    this.renderProjects();
    this.renderServices();
    this.renderTechStack();
    this.renderProcess();
    this.renderAbout();

    // 3. Setup Interactivity
    this.setupNavigation();
    this.setupHUDAndClock();
    this.setupParticleControls();
    this.setupContactForm();
    this.setupProjectModal();
    this.setupAudioSynth();
  }

  renderProjects(filter = "all") {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    grid.innerHTML = '';
    const filtered = filter === "all" 
      ? portfolioData.projects 
      : portfolioData.projects.filter(p => p.discipline === filter || p.category.toLowerCase().includes(filter));

    filtered.forEach((p, index) => {
      const card = document.createElement('article');
      card.className = 'project-card';
      card.dataset.id = p.id;
      card.dataset.discipline = p.discipline;

      card.innerHTML = `
        <div class="project-video-wrap">
          <video class="project-video" autoplay muted loop playsinline preload="metadata" src="${p.videoUrl}"></video>
          <div class="preview-overlay">
            <span class="preview-badge"><span class="badge-dot"></span> ARCHITECTURE</span>
            <span class="preview-metric">${p.metrics[0]}</span>
          </div>
        </div>
        <div class="project-content">
          <div class="project-meta">
            <span class="project-cat">${p.category}</span>
            <span class="project-index">0${index + 1} //</span>
          </div>
          <h3 class="project-title">${p.title}</h3>
          <p class="project-desc">${p.shortDescription}</p>
          <div class="project-tags">
            ${p.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}
          </div>
          <div class="project-footer">
            <button class="view-project-btn" data-id="${p.id}">
              <span>VIEW ARCHITECTURE</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
            </button>
          </div>
        </div>
      `;

      grid.appendChild(card);
    });
  }

  renderServices() {
    const list = document.getElementById('services-list');
    if (!list) return;

    list.innerHTML = portfolioData.services.map((s, idx) => `
      <div class="service-row" data-id="${s.id}">
        <div class="service-header">
          <span class="service-num">0${idx + 1}</span>
          <h3 class="service-name">${s.title}</h3>
          <p class="service-summary">${s.summary}</p>
          <div class="service-arrow">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
          </div>
        </div>
        <div class="service-body">
          <p class="service-details">${s.details}</p>
          <div class="deliverables-grid">
            ${s.deliverables.map(d => `<div class="deliverable-item"><span class="deliv-bullet">▹</span> ${d}</div>`).join('')}
          </div>
        </div>
      </div>
    `).join('');

    list.querySelectorAll('.service-header').forEach(header => {
      header.addEventListener('click', () => {
        const row = header.parentElement;
        const isOpen = row.classList.contains('active');
        list.querySelectorAll('.service-row').forEach(r => r.classList.remove('active'));
        if (!isOpen) {
          row.classList.add('active');
          this.playSyntheticChime(480, 0.08);
        }
      });
    });
  }

  renderTechStack(filter = "all") {
    const container = document.getElementById('tech-grid');
    if (!container) return;

    const filtered = filter === "all" 
      ? portfolioData.techStack 
      : portfolioData.techStack.filter(t => t.category === filter);

    container.innerHTML = filtered.map(item => `
      <div class="tech-card" data-category="${item.category}">
        <div class="tech-head">
          <span class="tech-name">${item.name}</span>
          <span class="tech-level">${item.level}</span>
        </div>
        <p class="tech-desc">${item.desc}</p>
        <div class="tech-bar"><div class="tech-bar-fill"></div></div>
      </div>
    `).join('');
  }

  renderProcess() {
    const container = document.getElementById('process-track');
    if (!container) return;

    container.innerHTML = portfolioData.process.map(step => `
      <div class="process-node">
        <div class="node-header">
          <span class="step-num">${step.step}</span>
          <h4 class="step-title">${step.title}</h4>
        </div>
        <p class="step-summary">${step.summary}</p>
        <p class="step-details">${step.details}</p>
      </div>
    `).join('');
  }

  renderAbout() {
    const statsGrid = document.getElementById('about-stats');
    if (statsGrid) {
      statsGrid.innerHTML = portfolioData.profile.stats.map(s => `
        <div class="stat-card">
          <span class="stat-val">${s.value}</span>
          <span class="stat-label">${s.label}</span>
        </div>
      `).join('');
    }
  }

  setupNavigation() {
    const railItems = document.querySelectorAll('.rail-cat-item');
    railItems.forEach(btn => {
      btn.addEventListener('click', () => {
        railItems.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const cat = btn.dataset.category;
        this.activeCategory = cat;

        const disc = portfolioData.disciplines.find(d => d.id === cat);
        const targetFormation = disc ? disc.formation : 'ecosystem';
        
        if (this.engine) {
          this.engine.setFormation(targetFormation);
          this.engine.triggerShockwave(2.4);
        }

        this.renderProjects(cat);
        this.playSyntheticChime(620, 0.06);

        const projSec = document.getElementById('work');
        if (projSec) {
          projSec.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    const techTabs = document.querySelectorAll('.tech-tab');
    techTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        techTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.renderTechStack(tab.dataset.filter);
        this.playSyntheticChime(540, 0.05);
      });
    });

    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const targetId = a.getAttribute('href').substring(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth' });
          this.playSyntheticChime(420, 0.04);
        }
      });
    });
  }

  setupHUDAndClock() {
    const clockEl = document.getElementById('hud-time');
    const updateTime = () => {
      if (!clockEl) return;
      const now = new Date();
      const opts = { timeZone: 'Asia/Kolkata', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' };
      clockEl.textContent = `${now.toLocaleTimeString('en-US', opts)} IST`;
    };
    updateTime();
    setInterval(updateTime, 1000);

    const coordEl = document.getElementById('hud-coords');
    window.addEventListener('pointermove', (e) => {
      if (coordEl) {
        coordEl.textContent = `X:${String(e.clientX).padStart(4, '0')} Y:${String(e.clientY).padStart(4, '0')}`;
      }
    });
  }

  setupParticleControls() {
    const formationPills = document.querySelectorAll('.formation-pill');
    formationPills.forEach(pill => {
      pill.addEventListener('click', () => {
        formationPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const formation = pill.dataset.formation;
        if (this.engine) {
          this.engine.setFormation(formation);
          this.engine.triggerShockwave(2.6);
        }
        this.playSyntheticChime(720, 0.08);
      });
    });

    const pulseBtn = document.getElementById('btn-particle-pulse');
    if (pulseBtn) {
      pulseBtn.addEventListener('click', () => {
        if (this.engine) {
          this.engine.triggerShockwave(3.5);
        }
        this.playSyntheticChime(320, 0.15);
      });
    }
  }

  setupProjectModal() {
    const modal = document.getElementById('project-modal');
    const closeBtn = document.getElementById('modal-close-btn');
    if (!modal) return;

    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.view-project-btn') || e.target.closest('.project-card');
      if (btn) {
        const id = btn.dataset.id || btn.closest('.project-card')?.dataset.id;
        const project = portfolioData.projects.find(p => p.id === id);
        if (project) {
          this.openProjectModal(project);
        }
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  openProjectModal(p) {
    const modal = document.getElementById('project-modal');
    if (!modal) return;

    document.getElementById('modal-title').textContent = p.title;
    document.getElementById('modal-category').textContent = p.category;
    document.getElementById('modal-desc').textContent = p.fullDescription;

    const metricsEl = document.getElementById('modal-metrics');
    if (metricsEl) {
      metricsEl.innerHTML = p.metrics.map(m => `
        <div class="modal-metric-card">
          <span class="m-val">${m}</span>
        </div>
      `).join('');
    }

    const techEl = document.getElementById('modal-tech');
    if (techEl) {
      techEl.innerHTML = p.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('');
    }

    const highlightsEl = document.getElementById('modal-highlights');
    if (highlightsEl) {
      highlightsEl.innerHTML = p.highlights.map(h => `<li>${h}</li>`).join('');
    }

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    this.playSyntheticChime(800, 0.1);
  }

  setupContactForm() {
    const form = document.getElementById('project-inquiry-form');
    const toast = document.getElementById('form-toast');
    if (!form) return;

    const catChips = form.querySelectorAll('.form-chip');
    let selectedType = "Web Application";
    catChips.forEach(chip => {
      chip.addEventListener('click', () => {
        catChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        selectedType = chip.dataset.type;
        this.playSyntheticChime(500, 0.05);
      });
    });

    const budgetChips = form.querySelectorAll('.budget-chip');
    let selectedBudget = "$10k - $25k";
    budgetChips.forEach(chip => {
      chip.addEventListener('click', () => {
        budgetChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        selectedBudget = chip.dataset.budget;
        this.playSyntheticChime(580, 0.05);
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !message) {
        alert('Please fill out all required fields.');
        return;
      }

      const submitBtn = form.querySelector('.form-submit-btn');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = `<span>ENCRYPTING & TRANSMITTING...</span>`;
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = `<span>TRANSMITTED SUCCESSFULLY ✓</span>`;
        submitBtn.style.borderColor = '#22c55e';
        submitBtn.style.color = '#22c55e';

        if (toast) {
          toast.classList.add('show');
          setTimeout(() => toast.classList.remove('show'), 6000);
        }

        if (this.engine) {
          this.engine.triggerShockwave(4.0);
        }
        this.playSyntheticChime(950, 0.2);

        const subject = encodeURIComponent(`Project Inquiry: ${selectedType} - ${name}`);
        const body = encodeURIComponent(`Hi Muralidhar,\n\nName: ${name}\nEmail: ${email}\nProject Type: ${selectedType}\nBudget Range: ${selectedBudget}\n\nProject Scope:\n${message}\n`);
        const mailtoUrl = `mailto:murali.yerram@gmail.com?subject=${subject}&body=${body}`;

        const directLinkEl = document.getElementById('direct-mailto-link');
        if (directLinkEl) {
          directLinkEl.href = mailtoUrl;
          directLinkEl.style.display = 'inline-block';
        }

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          submitBtn.style.borderColor = '';
          submitBtn.style.color = '';
          form.reset();
        }, 4000);
      }, 1200);
    });
  }

  setupAudioSynth() {
    const audioBtn = document.getElementById('btn-audio-toggle');
    if (!audioBtn) return;

    audioBtn.addEventListener('click', () => {
      this.audioEnabled = !this.audioEnabled;
      if (this.audioEnabled && !this.audioCtx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.audioCtx = new AudioCtx();
      }
      audioBtn.classList.toggle('active', this.audioEnabled);
      const label = audioBtn.querySelector('.audio-label');
      if (label) {
        label.textContent = this.audioEnabled ? "AUDIO: ON" : "AUDIO: OFF";
      }
      if (this.audioEnabled) {
        this.playSyntheticChime(660, 0.1);
      }
    });
  }

  playSyntheticChime(freq = 440, duration = 0.1) {
    if (!this.audioEnabled || !this.audioCtx) return;
    try {
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, this.audioCtx.currentTime + duration);

      gain.gain.setValueAtTime(0.06, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (e) {
      // Audio fallback silent
    }
  }
}

// Bootstrap
window.addEventListener('DOMContentLoaded', () => {
  window.app = new PortfolioApp();
});
