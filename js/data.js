/**
 * Muralidhar Yerram - Developer Portfolio Data
 * Full-Stack Developer | UI/UX | AI | Game Development
 */

export const portfolioData = {
  profile: {
    name: "Muralidhar Yerram",
    role: "Full-Stack Developer / AI / UI/UX / Games",
    tagline: "I turn ideas into modern digital products.",
    heroTitle: "FROM IDEA TO PRODUCT.",
    heroSubtitle: "Web applications, AI products, immersive experiences and games — designed and built from idea to launch.",
    aboutStatement: "I build digital products across software, AI and interactive experiences. My focus is simple: understand the problem, design the experience, build the technology and ship the product.",
    availability: "OPEN TO PROJECTS",
    email: "murali.yerram@gmail.com",
    experienceYears: "6+ Years",
    stats: [
      { label: "Products Shipped", value: "24+" },
      { label: "Core Technologies", value: "14+" },
      { label: "Client Satisfaction", value: "100%" },
      { label: "Code Architecture", value: "Clean & Scalable" }
    ],
    socials: [
      { name: "GitHub", url: "https://github.com" },
      { name: "LinkedIn", url: "https://linkedin.com" },
      { name: "X / Twitter", url: "https://x.com" },
      { name: "Email", url: "mailto:murali.yerram@gmail.com" }
    ]
  },

  disciplines: [
    { id: "all", label: "ALL", formation: "ecosystem" },
    { id: "web-apps", label: "WEB APPS", formation: "hypergrid" },
    { id: "ui-ux", label: "UI / UX", formation: "polyhedron" },
    { id: "ai", label: "AI", formation: "neural" },
    { id: "mobile", label: "MOBILE", formation: "ecosystem" },
    { id: "games", label: "GAMES", formation: "vortex" },
    { id: "unreal-engine", label: "UNREAL ENGINE", formation: "polyhedron" }
  ],

  projects: [
    {
      id: "aetherflow-saas",
      title: "AetherFlow Collaborative Studio",
      category: "SaaS / Web Application",
      discipline: "web-apps",
      videoUrl: "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/oraciteslArea.mp4",
      shortDescription: "High-throughput cloud orchestration & collaborative workflow engine with real-time state synchronization, telemetry graphs, and micro-frontend architecture.",
      fullDescription: "AetherFlow is an enterprise SaaS platform built to unify complex multi-stage digital workflows. Designed from the ground up for high reliability, it supports real-time concurrent graph editing, automated state synchronization via distributed Redis channels, and responsive sub-50ms data pipelines.",
      technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Redis", "Docker"],
      metrics: ["50k+ Concurrent Users", "< 40ms P99 Latency", "99.99% Uptime"],
      highlights: [
        "Distributed lock-free operational transformation for concurrent canvas editing",
        "Sub-second microservice telemetry with real-time WebSocket broadcasting",
        "Custom UI design system with rigorous WCAG 2.1 AA accessibility"
      ]
    },
    {
      id: "velocita-mobility",
      title: "Velocita Dispatch Engine",
      category: "Ride Booking Platform",
      discipline: "mobile",
      videoUrl: "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/facet-glass-hero.mp4",
      shortDescription: "Enterprise ride-hailing and fleet coordination platform with geospatial geo-fencing, dynamic matching algorithms, and driver telemetry.",
      fullDescription: "A mission-critical mobility platform handling driver-rider dispatching in real time. Features low-latency spatial indexing with PostGIS, adaptive route calculation, trip fare estimation based on dynamic traffic metrics, and dedicated iOS/Android driver and passenger clients.",
      technologies: [".NET", "C#", "Flutter", "Dart", "PostgreSQL", "Redis"],
      metrics: ["100k+ Daily Trips", "Sub-2s Driver Match", "Zero Route Drift"],
      highlights: [
        "Custom spatial H3 hexagonal grid clustering for real-time demand surge computation",
        "Flutter cross-platform application with offline-resilient trip state storage",
        "Resilient .NET 8 event-driven microservices architecture communicating via Redis Streams"
      ]
    },
    {
      id: "cognitionops-ai",
      title: "CognitionOps Autonomous Studio",
      category: "AI Application",
      discipline: "ai",
      videoUrl: "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/stellarmind-hero.mp4",
      shortDescription: "Autonomous LLM agent platform with multi-modal RAG pipelines, dynamic tool orchestration, and deterministic safety guardrails.",
      fullDescription: "CognitionOps enables software development and data engineering teams to deploy autonomous AI agents that analyze code repositories, automate API integrations, and synthesize complex business intelligence queries with grounded citations.",
      technologies: ["AI / LLM", "Python", "TypeScript", "REST APIs", "Docker", "PostgreSQL"],
      metrics: ["99.4% Citation Accuracy", "4.8x Efficiency Boost", "Zero Hallucination Leaks"],
      highlights: [
        "Hybrid semantic retrieval combining dense vector embeddings with BM25 lexical ranking",
        "Sandboxed multi-agent consensus validation before executing irreversible database commands",
        "Interactive dark mode conversational studio with streaming code diff visualizers"
      ]
    },
    {
      id: "apex-chronos",
      title: "Project Apex & Chronos",
      category: "Game Development & Unreal Engine",
      discipline: "games",
      videoUrl: "https://pub-86dc5b5484314368ac5436a674b0d919.r2.dev/aaaf/thedropthroughArea.mp4",
      shortDescription: "Stylized 3D action RPG combat controller and photorealistic Unreal Engine 5 spatial simulation with Nanite geometry and Lumen dynamic global illumination.",
      fullDescription: "An expansive interactive project spanning precision combat game mechanics and architectural digital twin simulation. Features frame-perfect melee combat, state-machine animation choreography, custom HLSL volumetric shaders, and real-time IoT telemetry synchronization.",
      technologies: ["Unreal Engine 5", "C++", "C#", ".NET", "HLSL Shaders", "Nanite / Lumen"],
      metrics: ["Solid 60+ FPS", "Nanite Micro-Polygons", "Zero Stutter Load"],
      highlights: [
        "Custom finite-state machine combat controller with input buffering and cancel windows",
        "Dynamic inverse kinematics (IK) foot and weapon placement on uneven 3D terrain",
        "High-fidelity Nanite geometry and Lumen dynamic global illumination"
      ]
    }
  ],

  services: [
    {
      id: "web-apps",
      title: "WEB APPLICATIONS",
      summary: "Custom web platforms, dashboards and business applications.",
      details: "Architecting high-scale web platforms from concept to production. Specialized in responsive frontends, resilient microservices, distributed caching, and rock-solid relational architectures that scale under heavy concurrency.",
      deliverables: ["Modern Single-Page & SSR Apps", "Real-time Dashboards & Telemetry", "Custom APIs & Microservices", "Database Schema Optimization"]
    },
    {
      id: "ui-ux",
      title: "UI / UX",
      summary: "Modern interfaces designed around usability and conversion.",
      details: "Designing intuitive digital experiences where clean typography, visual hierarchy, micro-interactions, and behavioral ergonomics combine into products users love and trust.",
      deliverables: ["Design Systems & Token Architectures", "Interactive Prototypes & Wireframing", "Ergonomic Usability Testing", "High-Fidelity Interaction Design"]
    },
    {
      id: "ai-apps",
      title: "AI APPLICATIONS",
      summary: "AI-powered products, automation and intelligent workflows.",
      details: "Bridging foundational AI models with real-world enterprise utility. Creating production-grade agentic workflows, contextual RAG search, tool calling, and cognitive product features.",
      deliverables: ["Autonomous LLM Agent Systems", "Enterprise RAG & Semantic Search", "Custom Prompt & Fine-Tuning Pipelines", "AI Guardrails & Telemetry"]
    },
    {
      id: "mobile-apps",
      title: "MOBILE APPS",
      summary: "Cross-platform applications for real-world products.",
      details: "Developing fluid, native-grade mobile applications with Flutter and Dart. Designed with offline sync, biometric security, push channels, and smooth 120Hz gesture animations.",
      deliverables: ["Cross-Platform iOS & Android Apps", "Offline-First Synchronization", "Hardware Sensor & GPS Integration", "App Store & Play Store Deployment"]
    },
    {
      id: "game-dev",
      title: "GAME DEVELOPMENT",
      summary: "Interactive experiences and games using Unreal Engine and modern development tools.",
      details: "Crafting captivating 3D interactive mechanics, dynamic animation trees, combat controllers, and immersive audio environments built on modern game engine principles.",
      deliverables: ["Gameplay Mechanics & Player Systems", "Custom Shaders & Visual Effects", "State-Machine Character AI", "Performance Profiling & Optimization"]
    },
    {
      id: "custom-software",
      title: "CUSTOM SOFTWARE",
      summary: "End-to-end product development from concept to deployment.",
      details: "Taking ambiguous problems and transforming them into shipped products. Handling every layer: technical specifications, cloud infrastructure, security, monitoring, and iterative evolution.",
      deliverables: ["Complete MVP to Scale Engineering", "Cloud Infrastructure (Docker/K8s)", "Automated CI/CD Delivery Pipelines", "Security & System Auditing"]
    }
  ],

  techStack: [
    { name: "C#", category: "backend", level: "Expert", desc: "Enterprise services, game engines, async pipelines" },
    { name: ".NET", category: "backend", level: "Expert", desc: "High-throughput APIs, gRPC, microservices" },
    { name: "Flutter", category: "mobile", level: "Advanced", desc: "High-performance cross-platform iOS & Android" },
    { name: "Dart", category: "mobile", level: "Advanced", desc: "Strong typing, asynchronous streams, UI state" },
    { name: "JavaScript", category: "frontend", level: "Expert", desc: "Modern ESNext, asynchronous browser APIs, DOM" },
    { name: "React", category: "frontend", level: "Expert", desc: "Modular component systems, hooks, state management" },
    { name: "Node.js", category: "backend", level: "Expert", desc: "Fast event-driven backends, WebSockets, CLI tools" },
    { name: "PostgreSQL", category: "backend", level: "Expert", desc: "Relational modeling, indexing, ACID transactions" },
    { name: "Redis", category: "backend", level: "Advanced", desc: "In-memory caching, pub/sub messaging, streams" },
    { name: "REST APIs", category: "backend", level: "Expert", desc: "Clean RESTful interfaces, OpenAPI standards, security" },
    { name: "Docker", category: "backend", level: "Advanced", desc: "Containerized environments, multi-stage builds" },
    { name: "AI / LLM", category: "ai", level: "Advanced", desc: "Prompt architectures, vector embeddings, agent graphs" },
    { name: "Unreal Engine", category: "games", level: "Advanced", desc: "Lumen lighting, Nanite geometry, gameplay C++" }
  ],

  process: [
    {
      step: "01",
      title: "DISCOVER",
      summary: "Understand the idea and business problem.",
      details: "We start by uncovering the true product objective, technical constraints, user needs, and architectural tradeoffs. Every decision from day zero is grounded in practical value."
    },
    {
      step: "02",
      title: "DESIGN",
      summary: "Create the user experience and visual direction.",
      details: "Rapid interactive wireframing, high-fidelity prototypes, and cohesive design tokens that define clear ergonomics, responsive layout rhythm, and unmistakable brand sophistication."
    },
    {
      step: "03",
      title: "BUILD",
      summary: "Develop the product using modern technologies.",
      details: "Engineering clean, modular, and maintainable software with strict type safety, modular microservices, and battle-tested databases built to scale cleanly."
    },
    {
      step: "04",
      title: "TEST",
      summary: "Validate functionality, performance and experience.",
      details: "Rigorous automated testing, end-to-end integration checks, memory leak profiling, sub-100ms API benchmarking, and edge case resilience verification."
    },
    {
      step: "05",
      title: "LAUNCH",
      summary: "Deploy, optimize and prepare for real users.",
      details: "Flawless deployment with zero-downtime containerized pipelines, telemetry observability dashboards, analytics tracking, and continuous product iteration."
    }
  ]
};
