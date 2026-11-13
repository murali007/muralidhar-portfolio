/**
 * GPU / WebGL Particle System & Fluid Interaction Engine
 * Designed for Muralidhar Yerram Portfolio
 * 
 * Features:
 * - 3D Organic Particle Formations (Digital Ecosystem, Neural, Hypergrid, Vortex, Polyhedron)
 * - Cursor-driven fluid displacement with curl turbulence & momentum transfer
 * - Spring-damping restoring physics (organic return to home formation)
 * - Cinematic camera parallax tracking
 * - Soft-glowing lavender/purple particle shader palette
 * - Responsive particle scaling (Desktop: ~28k, Tablet: ~12k, Mobile: ~6k)
 * - High FPS GPU buffer pipeline
 */

export class ParticleEngine {
  constructor(canvasContainerId) {
    this.container = document.getElementById(canvasContainerId);
    if (!this.container) {
      console.error(`Container #${canvasContainerId} not found.`);
      return;
    }

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.particleMesh = null;
    this.geometry = null;

    // Device & Count Scaling
    this.isMobile = window.innerWidth <= 768;
    this.isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
    this.particleCount = this.isMobile ? 6500 : (this.isTablet ? 12000 : 26000);

    // Buffers
    this.positions = null;
    this.targetPositions = null;
    this.homePositions = null;
    this.velocities = null;
    this.colors = null;
    this.scales = null;
    this.phases = null;

    // Interaction State
    this.mouse = {
      x: 0,
      y: 0,
      lastX: 0,
      lastY: 0,
      vx: 0,
      vy: 0,
      worldX: 0,
      worldY: 0,
      active: false,
      down: false,
      radius: this.isMobile ? 2.8 : 3.6,
      strength: 1.4
    };

    this.targetCam = { x: 0, y: 0, z: 22 };
    this.currentCam = { x: 0, y: 0, z: 22 };
    this.time = 0;
    this.currentFormation = "ecosystem";
    this.morphProgress = 1.0;
    this.isMorphing = false;

    // Color definitions (Lavender / Purple / Icy Violet)
    this.palette = [
      { r: 0.65, g: 0.55, b: 0.98 }, // #a78bfa (primary lavender)
      { r: 0.75, g: 0.52, b: 0.99 }, // #c084fc (bright violet)
      { r: 0.51, g: 0.55, b: 0.97 }, // #818cf8 (indigo lavender)
      { r: 0.92, g: 0.88, b: 1.00 }, // #ebe4ff (crystal white-violet)
      { r: 0.45, g: 0.35, b: 0.82 }  // #7359d1 (deep electric purple)
    ];

    this.init();
  }

  init() {
    if (typeof THREE === 'undefined') {
      console.warn("Three.js not yet loaded, waiting...");
      setTimeout(() => this.init(), 100);
      return;
    }

    // 1. Scene & Camera
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x030305, 0.022);

    const aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 100);
    this.camera.position.set(0, 0, 22);
    this.camera.lookAt(0, 0, 0);

    // 2. Renderer
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);
    this.container.appendChild(this.renderer.domElement);

    // 3. Allocate particle buffers
    this.initBuffers();

    // 4. Generate Initial Formations
    this.formations = {
      ecosystem: this.generateEcosystem(),
      neural: this.generateNeuralNetwork(),
      hypergrid: this.generateHypergrid(),
      vortex: this.generateVortex(),
      polyhedron: this.generatePolyhedron()
    };

    // Set default home & target to ecosystem
    this.setFormation("ecosystem", true);

    // 5. Build Material & Points Mesh
    this.buildPointsMesh();

    // 6. Bind events
    this.bindEvents();

    // 7. Start RAF Loop
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  initBuffers() {
    const count = this.particleCount;
    this.positions = new Float32Array(count * 3);
    this.targetPositions = new Float32Array(count * 3);
    this.homePositions = new Float32Array(count * 3);
    this.velocities = new Float32Array(count * 3);
    this.colors = new Float32Array(count * 3);
    this.scales = new Float32Array(count);
    this.phases = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      this.phases[i] = Math.random() * Math.PI * 2;
      this.scales[i] = Math.random() * 0.7 + 0.4;
      
      // Color weighting: mostly lavender/purple with bright nodes
      const colIndex = Math.random() < 0.15 ? 3 : Math.floor(Math.random() * 5);
      const c = this.palette[colIndex];
      this.colors[i * 3 + 0] = c.r;
      this.colors[i * 3 + 1] = c.g;
      this.colors[i * 3 + 2] = c.b;
    }
  }

  /**
   * FORMATION 1: The Signature Digital Ecosystem
   * A multi-layered celestial product nexus:
   * - Central dense crystal nucleus (the product idea)
   * - Inclined orbital data rings (multi-disciplinary domains)
   * - Outer harmonic twisted torus (global infrastructure)
   * - Helical connecting arcs
   */
  generateEcosystem() {
    const count = this.particleCount;
    const array = new Float32Array(count * 3);

    const nucleusCount = Math.floor(count * 0.22);
    const ring1Count = Math.floor(count * 0.26);
    const ring2Count = Math.floor(count * 0.24);
    const outerTorusCount = count - (nucleusCount + ring1Count + ring2Count);

    let idx = 0;

    // Part A: Crystalline Core Nucleus
    for (let i = 0; i < nucleusCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 2.2; // dense center

      array[idx * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      array[idx * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      array[idx * 3 + 2] = r * Math.cos(phi);
      idx++;
    }

    // Part B: Orbital Ring 1 (Inclined ~35 deg)
    const inc1 = 0.6;
    for (let i = 0; i < ring1Count; i++) {
      const angle = (i / ring1Count) * Math.PI * 2 + (Math.random() - 0.5) * 0.08;
      const rad = 4.8 + (Math.random() - 0.5) * 0.8;
      const x = Math.cos(angle) * rad;
      const y = Math.sin(angle) * rad;
      const z = (Math.random() - 0.5) * 0.5;

      // Rotate around X axis
      const rx = x;
      const ry = y * Math.cos(inc1) - z * Math.sin(inc1);
      const rz = y * Math.sin(inc1) + z * Math.cos(inc1);

      array[idx * 3 + 0] = rx;
      array[idx * 3 + 1] = ry;
      array[idx * 3 + 2] = rz;
      idx++;
    }

    // Part C: Orbital Ring 2 (Inclined ~ -45 deg, tilted Y)
    const inc2 = -0.75;
    for (let i = 0; i < ring2Count; i++) {
      const angle = (i / ring2Count) * Math.PI * 2 + (Math.random() - 0.5) * 0.08;
      const rad = 6.2 + (Math.random() - 0.5) * 0.9;
      const x = Math.cos(angle) * rad;
      const y = Math.sin(angle) * rad;
      const z = (Math.random() - 0.5) * 0.6;

      // Rotate around Y and Z
      const rx = x * Math.cos(inc2) - z * Math.sin(inc2);
      const ry = y;
      const rz = x * Math.sin(inc2) + z * Math.cos(inc2);

      array[idx * 3 + 0] = rx;
      array[idx * 3 + 1] = ry;
      array[idx * 3 + 2] = rz;
      idx++;
    }

    // Part D: Outer Harmonic Torus
    const majorR = 7.5;
    const minorR = 1.6;
    for (let i = 0; i < outerTorusCount; i++) {
      const u = Math.random() * Math.PI * 2;
      const v = Math.random() * Math.PI * 2;
      // Add subtle harmonic wave to torus path
      const wave = Math.sin(u * 3) * 0.6;
      const r = majorR + wave + (Math.random() - 0.5) * 0.5;
      const thickness = (Math.random() * 0.7 + 0.3) * minorR;

      const x = (r + thickness * Math.cos(v)) * Math.cos(u);
      const y = (r + thickness * Math.cos(v)) * Math.sin(u) * 0.85; // slightly elliptical
      const z = thickness * Math.sin(v) + Math.cos(u * 2) * 0.8;

      array[idx * 3 + 0] = x;
      array[idx * 3 + 1] = y;
      array[idx * 3 + 2] = z;
      idx++;
    }

    return array;
  }

  /**
   * FORMATION 2: Neural AI Synaptic Network
   * Clustered cognitive nodes with connective dendrites
   */
  generateNeuralNetwork() {
    const count = this.particleCount;
    const array = new Float32Array(count * 3);

    // 12 Major synaptic cluster hubs
    const hubs = [];
    const numHubs = 12;
    for (let h = 0; h < numHubs; h++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const rad = 3.0 + Math.random() * 4.5;
      hubs.push({
        x: rad * Math.sin(phi) * Math.cos(theta),
        y: rad * Math.sin(phi) * Math.sin(theta),
        z: rad * Math.cos(phi)
      });
    }

    for (let i = 0; i < count; i++) {
      if (Math.random() < 0.6) {
        // Clustered around a hub
        const hub = hubs[Math.floor(Math.random() * numHubs)];
        const spread = (Math.random() ** 2) * 1.6;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;

        array[i * 3 + 0] = hub.x + spread * Math.sin(phi) * Math.cos(theta);
        array[i * 3 + 1] = hub.y + spread * Math.sin(phi) * Math.sin(theta);
        array[i * 3 + 2] = hub.z + spread * Math.cos(phi);
      } else {
        // Axon bridge between two hubs
        const h1 = hubs[Math.floor(Math.random() * numHubs)];
        const h2 = hubs[Math.floor(Math.random() * numHubs)];
        const t = Math.random();
        const jitter = (Math.random() - 0.5) * 0.4;

        array[i * 3 + 0] = h1.x + (h2.x - h1.x) * t + jitter;
        array[i * 3 + 1] = h1.y + (h2.y - h1.y) * t + jitter;
        array[i * 3 + 2] = h1.z + (h2.z - h1.z) * t + jitter;
      }
    }
    return array;
  }

  /**
   * FORMATION 3: Hypergrid / Architectural Matrix
   * Volumetric 3D structural lattice with layered levels
   */
  generateHypergrid() {
    const count = this.particleCount;
    const array = new Float32Array(count * 3);
    const size = 11.0;
    const layers = 5;

    for (let i = 0; i < count; i++) {
      if (Math.random() < 0.75) {
        // Floor layers with grid lines
        const layerIdx = Math.floor(Math.random() * layers);
        const y = (layerIdx / (layers - 1) - 0.5) * 7.0;
        const x = (Math.random() - 0.5) * size;
        const z = (Math.random() - 0.5) * size;

        // Snap partially to grid lines
        const snapX = Math.round(x / 1.5) * 1.5 + (Math.random() - 0.5) * 0.15;
        const snapZ = Math.round(z / 1.5) * 1.5 + (Math.random() - 0.5) * 0.15;

        array[i * 3 + 0] = snapX;
        array[i * 3 + 1] = y + (Math.random() - 0.5) * 0.1;
        array[i * 3 + 2] = snapZ;
      } else {
        // Vertical data columns
        const colX = (Math.floor(Math.random() * 7) - 3) * 1.5;
        const colZ = (Math.floor(Math.random() * 7) - 3) * 1.5;
        const y = (Math.random() - 0.5) * 8.0;

        array[i * 3 + 0] = colX + (Math.random() - 0.5) * 0.2;
        array[i * 3 + 1] = y;
        array[i * 3 + 2] = colZ + (Math.random() - 0.5) * 0.2;
      }
    }
    return array;
  }

  /**
   * FORMATION 4: Swirling Vortex / Accretion Energy Stream
   */
  generateVortex() {
    const count = this.particleCount;
    const array = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const r = Math.pow(u, 0.6) * 8.5 + 0.5;
      const angle = r * 1.8 + Math.random() * 0.4;
      const spiralArm = (Math.floor(Math.random() * 3) * (Math.PI * 2 / 3));
      const totalAngle = angle + spiralArm;

      const zHeight = (Math.sin(r * 0.8) * 1.2) + (1.0 / (r * 0.5 + 0.2)) * (Math.random() < 0.5 ? 1 : -1) * 0.4;

      array[i * 3 + 0] = Math.cos(totalAngle) * r;
      array[i * 3 + 1] = Math.sin(totalAngle) * r * 0.7; // tilted perspective
      array[i * 3 + 2] = zHeight + (Math.random() - 0.5) * 0.6;
    }
    return array;
  }

  /**
   * FORMATION 5: 3D Geodesic Polyhedron / Cyber Core
   */
  generatePolyhedron() {
    const count = this.particleCount;
    const array = new Float32Array(count * 3);
    const radius = 6.0;

    // Golden ratio for icosahedron vertices
    const phi = (1 + Math.sqrt(5)) / 2;
    const vertices = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
    ].map(v => {
      const len = Math.hypot(v[0], v[1], v[2]);
      return [v[0] / len * radius, v[1] / len * radius, v[2] / len * radius];
    });

    for (let i = 0; i < count; i++) {
      if (Math.random() < 0.35) {
        // Vertex clusters
        const v = vertices[Math.floor(Math.random() * vertices.length)];
        const spread = Math.random() * 1.0;
        array[i * 3 + 0] = v[0] + (Math.random() - 0.5) * spread;
        array[i * 3 + 1] = v[1] + (Math.random() - 0.5) * spread;
        array[i * 3 + 2] = v[2] + (Math.random() - 0.5) * spread;
      } else if (Math.random() < 0.7) {
        // Facet surface shell
        const theta = Math.random() * Math.PI * 2;
        const costheta = Math.random() * 2 - 1;
        const sintheta = Math.sqrt(1 - costheta * costheta);
        const r = radius * (0.95 + Math.random() * 0.1);

        array[i * 3 + 0] = r * sintheta * Math.cos(theta);
        array[i * 3 + 1] = r * sintheta * Math.sin(theta);
        array[i * 3 + 2] = r * costheta;
      } else {
        // Inner floating crystalline core
        const r = Math.random() * 2.8;
        const theta = Math.random() * Math.PI * 2;
        const phiAngle = Math.random() * Math.PI;

        array[i * 3 + 0] = r * Math.sin(phiAngle) * Math.cos(theta);
        array[i * 3 + 1] = r * Math.sin(phiAngle) * Math.sin(theta);
        array[i * 3 + 2] = r * Math.cos(phiAngle);
      }
    }
    return array;
  }

  buildPointsMesh() {
    this.geometry = new THREE.BufferGeometry();
    this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
    this.geometry.setAttribute('color', new THREE.BufferAttribute(this.colors, 3));

    // Create custom smooth circular glow texture programmatically
    const texture = this.createParticleTexture();

    const material = new THREE.PointsMaterial({
      size: this.isMobile ? 0.22 : 0.26,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      depthWrite: false,
      opacity: 0.88,
      sizeAttenuation: true
    });

    this.particleMesh = new THREE.Points(this.geometry, material);
    this.scene.add(this.particleMesh);
  }

  createParticleTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.25, 'rgba(192, 132, 252, 0.85)');
    grad.addColorStop(0.6, 'rgba(139, 92, 246, 0.35)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }

  setFormation(name, immediate = false) {
    if (!this.formations[name]) return;
    this.currentFormation = name;
    const targetArr = this.formations[name];

    for (let i = 0; i < this.particleCount * 3; i++) {
      this.targetPositions[i] = targetArr[i];
      if (immediate) {
        this.positions[i] = targetArr[i];
        this.homePositions[i] = targetArr[i];
        this.velocities[i] = 0;
      }
    }

    if (!immediate) {
      this.isMorphing = true;
      this.morphProgress = 0.0;
    }
  }

  bindEvents() {
    // Window Resize
    window.addEventListener('resize', () => {
      if (!this.container || !this.renderer || !this.camera) return;
      const width = this.container.clientWidth;
      const height = this.container.clientHeight;

      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      this.isMobile = window.innerWidth <= 768;
      this.mouse.radius = this.isMobile ? 2.8 : 3.6;
    });

    // Pointer Move (Mouse / Touch)
    const handlePointerMove = (clientX, clientY) => {
      const rect = this.container.getBoundingClientRect();
      const nx = ((clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((clientY - rect.top) / rect.height) * 2 - 1);

      this.mouse.vx = nx - this.mouse.x;
      this.mouse.vy = ny - this.mouse.y;
      this.mouse.x = nx;
      this.mouse.y = ny;
      this.mouse.active = true;

      // Project NDC to Z=0 world plane
      // With tan(fov/2) and distance 22
      const fovRad = (this.camera.fov * Math.PI) / 180;
      const planeHalfHeight = Math.tan(fovRad / 2) * this.camera.position.z;
      const planeHalfWidth = planeHalfHeight * this.camera.aspect;

      this.mouse.worldX = nx * planeHalfWidth;
      this.mouse.worldY = ny * planeHalfHeight;

      // Subtle parallax camera target
      this.targetCam.x = nx * 2.2;
      this.targetCam.y = ny * 1.8;
    };

    window.addEventListener('pointermove', (e) => {
      handlePointerMove(e.clientX, e.clientY);
    });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    window.addEventListener('pointerdown', () => {
      this.mouse.down = true;
      this.triggerShockwave();
    });

    window.addEventListener('pointerup', () => {
      this.mouse.down = false;
    });

    window.addEventListener('pointerleave', () => {
      this.mouse.active = false;
      this.targetCam.x = 0;
      this.targetCam.y = 0;
    });
  }

  /**
   * Shockwave blast on click or mode transition
   */
  triggerShockwave(strength = 2.4) {
    const count = this.particleCount;
    const mx = this.mouse.worldX;
    const my = this.mouse.worldY;
    const mz = 0;

    for (let i = 0; i < count; i++) {
      const px = this.positions[i * 3 + 0];
      const py = this.positions[i * 3 + 1];
      const pz = this.positions[i * 3 + 2];

      const dx = px - mx;
      const dy = py - my;
      const dz = pz - mz;
      const distSq = dx * dx + dy * dy + dz * dz + 0.1;
      const dist = Math.sqrt(distSq);

      if (dist < 7.5) {
        const force = (1.0 - dist / 7.5) * strength;
        this.velocities[i * 3 + 0] += (dx / dist) * force * (0.8 + Math.random() * 0.4);
        this.velocities[i * 3 + 1] += (dy / dist) * force * (0.8 + Math.random() * 0.4);
        this.velocities[i * 3 + 2] += (dz / dist + (Math.random() - 0.5) * 0.5) * force;
      }
    }
  }

  animate() {
    requestAnimationFrame(this.animate);

    this.time += 0.015;

    // 1. Camera lerp following cursor (cinematic organic feel)
    this.currentCam.x += (this.targetCam.x - this.currentCam.x) * 0.04;
    this.currentCam.y += (this.targetCam.y - this.currentCam.y) * 0.04;
    this.camera.position.x = this.currentCam.x;
    this.camera.position.y = this.currentCam.y;
    this.camera.lookAt(0, 0, 0);

    // 2. Slow base rotation of the entire lattice
    if (this.particleMesh) {
      this.particleMesh.rotation.y = this.time * 0.045;
      this.particleMesh.rotation.x = Math.sin(this.time * 0.03) * 0.08;
    }

    // 3. Fluid & Spring Physics Simulation
    const count = this.particleCount;
    const pos = this.positions;
    const target = this.targetPositions;
    const vel = this.velocities;
    const phases = this.phases;

    const mx = this.mouse.worldX;
    const my = this.mouse.worldY;
    const radius = this.mouse.radius;
    const radiusSq = radius * radius;
    const mouseActive = this.mouse.active;

    // Curl turbulence vector based on mouse velocity
    const mCurlX = -this.mouse.vy * 4.0;
    const mCurlY = this.mouse.vx * 4.0;

    // Physics parameters
    const springK = 0.042; // restoring force
    const damping = 0.88;  // momentum retention / fluid drag
    const breathAmp = 0.06;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const i3_1 = i3 + 1;
      const i3_2 = i3 + 2;

      let px = pos[i3];
      let py = pos[i3_1];
      let pz = pos[i3_2];

      // Organic subtle breathing oscillation
      const phase = phases[i] + this.time * 1.2;
      const breathX = Math.sin(phase) * breathAmp;
      const breathY = Math.cos(phase * 0.8) * breathAmp;
      const breathZ = Math.sin(phase * 1.4) * breathAmp;

      const tx = target[i3] + breathX;
      const ty = target[i3_1] + breathY;
      const tz = target[i3_2] + breathZ;

      // Spring displacement toward target formation
      const dx = tx - px;
      const dy = ty - py;
      const dz = tz - pz;

      vel[i3] += dx * springK;
      vel[i3_1] += dy * springK;
      vel[i3_2] += dz * springK;

      // Mouse Fluid Disturbance
      if (mouseActive) {
        const diffX = px - mx;
        const diffY = py - my;
        const diffZ = pz - 0;
        const distSq = diffX * diffX + diffY * diffY + diffZ * diffZ;

        if (distSq < radiusSq) {
          const dist = Math.sqrt(distSq) + 0.001;
          const factor = (1.0 - dist / radius);
          const repel = factor * factor * 0.38;

          // Radial repulsion
          vel[i3] += (diffX / dist) * repel;
          vel[i3_1] += (diffY / dist) * repel;
          vel[i3_2] += (diffZ / dist) * repel * 0.6;

          // Fluid curl / turbulence swirl
          vel[i3] += mCurlX * factor * 0.18 + (-diffY / dist) * factor * 0.08;
          vel[i3_1] += mCurlY * factor * 0.18 + (diffX / dist) * factor * 0.08;
          vel[i3_2] += Math.sin(this.time * 3 + i) * factor * 0.06;
        }
      }

      // Apply damping & update positions
      vel[i3] *= damping;
      vel[i3_1] *= damping;
      vel[i3_2] *= damping;

      pos[i3] += vel[i3];
      pos[i3_1] += vel[i3_1];
      pos[i3_2] += vel[i3_2];
    }

    // Flag buffer update
    this.geometry.attributes.position.needsUpdate = true;

    // Smooth damp mouse velocity
    this.mouse.vx *= 0.85;
    this.mouse.vy *= 0.85;

    // Render frame
    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    if (this.renderer && this.renderer.domElement) {
      this.renderer.domElement.remove();
    }
  }
}
