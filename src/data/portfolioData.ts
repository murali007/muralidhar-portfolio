/**
 * Muralidhar Yerram - Master Portfolio Data
 * Calibrated for Lead SDET & Full-Stack Systems Architect
 */

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  technologies: string[];
  image: string;
  featured: boolean;
  gridSpan: string;
  metrics?: string[];
  link?: string;
}

export interface Service {
  id: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  iconName: string;
}

export interface JournalArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  summary: string;
}

export interface ExplorationItem {
  id: string;
  title: string;
  medium: string;
  image: string;
  aspect: string;
  rotation?: number;
}

export const portfolioConfig = {
  owner: {
    name: "Muralidhar Yerram",
    firstName: "Muralidhar",
    lastName: "Yerram.",
    title: "Lead SDET & Full-Stack Systems Architect",
    email: "murali.yerram@gmail.com",
    phone: "+91-7013098326",
    location: "Hyderabad, India (Open to Remote / Hybrid)",
    noticePeriod: "Immediate Joiner (0 Days Notice)",
    roles: [
      "Lead SDET",
      "Automation Architect",
      "Systems Engineer",
      "Fullstack Builder"
    ],
    eyebrow: "7+ YRS ENTERPRISE SDET • IMMEDIATE JOINER",
    heroDescription:
      "Senior QA Automation Engineer and Lead SDET with 7+ years of enterprise experience architecting automated test frameworks, driving CI/CD quality gates, and engineering production full-stack systems. Proven track record at Wipro, Bizmatics, and Infosys.",
    aboutIntro: "Deep testing rigor meets production engineering velocity.",
    aboutBio: [
      "Throughout my career across Wipro, Bizmatics, and Infosys, I have specialized in building robust test automation architectures using C#/.NET, Java, Selenium WebDriver, SpecFlow (BDD), Playwright, and Postman API automation integrated with TeamCity and Azure DevOps.",
      "What makes my engineering approach unique: beyond enterprise QA automation, I design and ship full-scale production products. I have architected 3-sided mobile ride-hailing marketplaces (Flutter + Razorpay), multi-portal industrial logistics ecosystems (PostgreSQL + Node.js), and secure US tax compliance portals (React + Supabase). Because I understand how systems are engineered, I know exactly how to break, automate, and bulletproof them."
    ],
    videoUrl:
      "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8",
    socials: [
      { name: "LinkedIn", url: "https://www.linkedin.com/in/murali-dhar-yerram", label: "LinkedIn Profile" },
      { name: "GitHub", url: "https://github.com/murali007", label: "GitHub Codebases" },
      { name: "Email", url: "mailto:murali.yerram@gmail.com", label: "Direct Email" }
    ]
  },

  projects: [
    {
      id: "juszgo",
      title: "JuszGo Ride-Hailing",
      subtitle: "3-Sided Mobile Marketplace & Backend",
      category: "Mobility Platform • High-Concurrency Architecture",
      description:
        "Enterprise-scale ride-hailing marketplace engineered with synchronized mobile apps for Passengers, Captains, and Admins. Integrated Razorpay cryptographic signature verification and automated real-time dispatch state-machine testing.",
      technologies: ["Flutter", "Dart", "Firebase", "Razorpay", ".NET", "PostgreSQL"],
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80",
      featured: true,
      gridSpan: "col-span-12 lg:col-span-7",
      metrics: ["100k+ Concurrency", "Sub-2s Driver Match", "99.9% Uptime"],
      link: "https://github.com/murali007"
    },
    {
      id: "playwright-teamcity",
      title: "Enterprise Playwright Suite",
      subtitle: "Distributed CI/CD Quality Gates",
      category: "Automation Architecture • Wipro Limited",
      description:
        "Architected enterprise-grade automation frameworks integrated into TeamCity CI/CD pipelines, triggering parallelized containerized regression runs on build deployments and reducing release cycles by 40%.",
      technologies: ["Playwright", "TypeScript", "C# / .NET", "TeamCity", "Docker"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      featured: true,
      gridSpan: "col-span-12 lg:col-span-5",
      metrics: ["85%+ Auto Coverage", "40% Faster Release", "Zero Flaky Tests"],
      link: "https://github.com/murali007"
    },
    {
      id: "vikisha-logistics",
      title: "5-Portal Logistics SaaS",
      subtitle: "Industrial Workflow & Invoicing Ecosystem",
      category: "Multi-Tenant Platform • Full-Stack Systems",
      description:
        "Full-lifecycle enterprise logistics suite spanning Customer Booking App, Branch POS with Kanban dispatch, Rider Logistics with damage photo proof & OTP handover, Workshop Thermal Tagging with QC, and Super Admin command center.",
      technologies: ["Node.js", "PostgreSQL", "REST APIs", "Kanban Dispatch", "Thermal QC"],
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
      featured: true,
      gridSpan: "col-span-12 lg:col-span-5",
      metrics: ["5 Synchronized Portals", "PostgreSQL State Machine", "GST Invoicing"],
      link: "https://github.com/murali007"
    },
    {
      id: "locust-performance",
      title: "Locust 1,000 VU Engine",
      subtitle: "Concurrency & Performance Stress Suite",
      category: "Performance Engineering • SLA Benchmarking",
      description:
        "Distributed headless load-testing suite simulating 1,000 concurrent Virtual Users across multi-tier APIs, isolating connection pool exhaustion, memory leaks, and verifying sub-40ms P99 latency SLAs.",
      technologies: ["Python", "Locust", "REST APIs", "Docker", "SLA Benchmarking"],
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
      featured: true,
      gridSpan: "col-span-12 lg:col-span-7",
      metrics: ["1,000 Virtual Users", "< 40ms P99 Latency", "Zero Race Conditions"],
      link: "https://github.com/murali007"
    }
  ] as Project[],

  services: [
    {
      id: "test-arch",
      title: "Test Automation Architecture",
      category: "Enterprise SDET",
      description:
        "Designing scalable, zero-flakiness automated test frameworks from scratch using Playwright, Selenium WebDriver, SpecFlow (BDD), and Page Object Model.",
      technologies: ["Playwright", "Selenium", "SpecFlow (BDD)", "Cucumber", "Java", "C#"],
      iconName: "Code"
    },
    {
      id: "api-testing",
      title: "API & Microservices Automation",
      category: "Contract & Security QA",
      description:
        "Automated RESTful API test suites in RestAssured and Postman, validating dynamic JWT authentication, JSON schema compliance, and payload boundary integrity.",
      technologies: ["RestAssured", "Postman", "OAuth 2.0 / JWT", "JSON Schema", "Webhooks"],
      iconName: "Cpu"
    },
    {
      id: "cicd-devops",
      title: "CI/CD & Quality Gates",
      category: "DevOps & Pipeline Automation",
      description:
        "Integrating automated regression suites into TeamCity, Azure DevOps, and GitHub Actions with Dockerized parallel execution and Slack/Jira failure alerts.",
      technologies: ["TeamCity", "Azure DevOps", "Docker", "GitHub Actions", "Jira"],
      iconName: "Layout"
    },
    {
      id: "fullstack-systems",
      title: "Full-Stack Production Engineering",
      category: "Systems & Database Architecture",
      description:
        "Engineering distributed SaaS backends, mobile applications, and relational schemas with PostgreSQL, Node.js, and Flutter for high-velocity startups.",
      technologies: ["PostgreSQL", "Flutter / Dart", "Node.js", "Supabase", "Razorpay"],
      iconName: "Gamepad2"
    }
  ] as Service[],

  journal: [
    {
      id: "j1",
      title: "Architecting zero-flakiness Playwright CI/CD quality gates.",
      category: "Test Automation",
      readTime: "5 min read",
      date: "Enterprise SDET",
      summary:
        "How to eliminate asynchronous race conditions, auto-heal dynamic DOM locators, and parallelize test runs in Dockerized CI/CD pipelines."
    },
    {
      id: "j2",
      title: "Simulating 1,000 concurrent Virtual Users with Locust.",
      category: "Performance Engineering",
      readTime: "6 min read",
      date: "Performance QA",
      summary:
        "A practical framework for benchmarking microservice SLAs, uncovering database connection starvation, and guaranteeing sub-40ms P99 latency."
    },
    {
      id: "j3",
      title: "Why modern SDETs must understand full-stack architecture.",
      category: "Engineering Philosophy",
      readTime: "4 min read",
      date: "Career Insights",
      summary:
        "The shift from black-box manual testing to code-level root-cause analysis: why engineers who build production systems test 10x better."
    },
    {
      id: "j4",
      title: "Building high-compliance EHR test suites under HIPAA.",
      category: "Compliance & Security",
      readTime: "5 min read",
      date: "Healthcare Tech",
      summary:
        "Leveraging BDD with SpecFlow, Ranorex, and MS SQL Server to audit enterprise audit logs and data integrity across healthcare software."
    }
  ] as JournalArticle[],

  explorations: [
    {
      id: "exp1",
      title: "Concurrency Load Stress Model",
      medium: "Locust Architecture",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
      aspect: "aspect-[3/4]",
      rotation: -1.5
    },
    {
      id: "exp2",
      title: "JuszGo Real-Time Geospatial Cluster",
      medium: "Flutter & H3 Indexing",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80",
      aspect: "aspect-[4/5]",
      rotation: 1.8
    },
    {
      id: "exp3",
      title: "Containerized Test Grid Topology",
      medium: "Docker & TeamCity",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      aspect: "aspect-[1/1]",
      rotation: -2.0
    },
    {
      id: "exp4",
      title: "5-Portal Logistics State Machine",
      medium: "PostgreSQL & Node.js",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
      aspect: "aspect-[4/3]",
      rotation: 1.2
    },
    {
      id: "exp5",
      title: "Cryptographic Webhook Signature Verifier",
      medium: "Razorpay / Security QA",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
      aspect: "aspect-[3/4]",
      rotation: -1.0
    },
    {
      id: "exp6",
      title: "IRS Pub 4557 AES-256-GCM Gateway",
      medium: "Tax Compliance Security",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
      aspect: "aspect-[4/5]",
      rotation: 2.2
    }
  ] as ExplorationItem[],

  statistics: [
    { value: 7, suffix: "+ Yrs", label: "Enterprise Experience", description: "High-stakes QA automation track record across Wipro, Bizmatics, and Infosys." },
    { value: 85, suffix: "%+", label: "Automated Test Coverage", description: "Across critical business paths, eliminating production defect escapes." },
    { value: 0, suffix: " Days", label: "Immediate Joiner", description: "Available to onboard immediately with zero notice period delay." }
  ],

  approachPillars: [
    {
      title: "Shift-Left QA Rigor",
      desc: "Embedding automated quality gates and contract tests from day one of sprint grooming to catch defects before staging."
    },
    {
      title: "Zero Flakiness Architecture",
      desc: "Building rock-solid locator abstractions, dynamic explicit waiting, and isolated database fixtures that never produce false alarms."
    },
    {
      title: "Production Systems Mindset",
      desc: "Understanding backend state machines, connection pools, and distributed queues allows deep root-cause debugging alongside developers."
    },
    {
      title: "High-Velocity CI/CD",
      desc: "Parallelizing automated regression test suites inside Docker containers to keep pipeline execution times under 8 minutes."
    }
  ]
};
