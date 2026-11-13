/**
 * Muralidhar Yerram - Master Portfolio Data
 * Calibrated with exact real-world experience & technical accuracy:
 * • Total Enterprise QA & SDET: 7+ Years (Selenium, SpecFlow, C#, Java, Cucumber)
 * • API Automation: 2 Years (RestAssured, Postman)
 * • Playwright Test Architecture: 1 Year (Wipro Limited)
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
  description?: string;
}

export const portfolioConfig = {
  owner: {
    name: "Muralidhar Yerram",
    firstName: "Muralidhar",
    lastName: "Yerram.",
    title: "Senior QA Automation Engineer & SDET",
    email: "murali.yerram@gmail.com",
    phone: "+91-7013098326",
    location: "Hyderabad, India (Open to Remote / Hybrid)",
    noticePeriod: "Immediate Joiner (0 Days Notice)",
    roles: [
      "Senior QA Engineer",
      "Automation Test Lead",
      "SDET",
      "Systems Builder"
    ],
    eyebrow: "7+ YRS ENTERPRISE QA • SELENIUM, SPECFLOW & PLAYWRIGHT • IMMEDIATE JOINER",
    heroDescription:
      "Senior QA Automation Engineer and SDET with 7+ years of enterprise experience building robust test frameworks (Selenium WebDriver, SpecFlow BDD, C#, Java), with 2 years of targeted API testing (RestAssured/Postman) and 1 year of modern Playwright test architecture. Ex-Wipro, Bizmatics, Infosys.",
    aboutIntro: "Deep testing rigor meets production engineering velocity.",
    aboutBio: [
      "Throughout my 7+ years across Wipro, Bizmatics, and Infosys, I have specialized in building robust test automation architectures using C#/.NET, Java, Selenium WebDriver, SpecFlow (BDD), and Cucumber, integrated with TeamCity CI/CD pipelines.",
      "Over the last 2 years, I have actively expanded into RESTful API automation (RestAssured & Postman) validating schema contracts and JWT auth lifecycles, and spent the past 1 year architecting modern parallel Playwright suites at Wipro. Beyond QA, I engineer full-scale production products (JuszGo, Vikisha, US Tax Portal) so I understand systems from the database layer to the UI."
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
      image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80",
      featured: true,
      gridSpan: "col-span-12 lg:col-span-7",
      metrics: ["100k+ Concurrency", "Sub-2s Driver Match", "99.9% Uptime"],
      link: "https://github.com/murali007"
    },
    {
      id: "playwright-teamcity",
      title: "Playwright & TeamCity Suite",
      subtitle: "1 Year Modern Framework Architecture (Wipro)",
      category: "Automation Architecture • Wipro Limited",
      description:
        "Engineered modern parallel test automation using Playwright and TypeScript, integrated into TeamCity CI/CD pipelines to trigger automated containerized regression suites upon build deployment.",
      technologies: ["Playwright (1 Yr)", "TypeScript", "C# / .NET", "TeamCity", "Docker"],
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
      title: "Locust Concurrency Suite",
      subtitle: "Performance Testing & SLA Benchmarking",
      category: "Performance Engineering • SLA Benchmarking",
      description:
        "Headless concurrency test suites simulating high-concurrency API traffic spikes, monitoring connection pool exhaustion, database deadlocks, and verifying sub-40ms P99 latency SLAs.",
      technologies: ["Python", "Locust", "REST APIs", "Docker", "SLA Benchmarking"],
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
      featured: true,
      gridSpan: "col-span-12 lg:col-span-7",
      metrics: ["1,000 Virtual Users", "< 40ms P99 Latency", "Zero Deadlocks"],
      link: "https://github.com/murali007"
    }
  ] as Project[],

  services: [
    {
      id: "test-arch",
      title: "Selenium & SpecFlow Automation",
      category: "7+ Years Enterprise Core",
      description:
        "Architecting enterprise-grade automated test frameworks using Selenium WebDriver, SpecFlow (BDD), Cucumber, C#/.NET, and Java across complex enterprise web apps.",
      technologies: ["Selenium (7 Yrs)", "SpecFlow BDD (7 Yrs)", "Cucumber", "Java", "C# / .NET"],
      iconName: "Code"
    },
    {
      id: "api-testing",
      title: "RESTful API Automation",
      category: "2 Years Targeted Focus",
      description:
        "Automated API contract testing with RestAssured and Postman, validating dynamic JWT token lifecycles, JSON schema models, and microservice payload resilience.",
      technologies: ["RestAssured (2 Yrs)", "Postman", "OAuth 2.0 / JWT", "JSON Schema"],
      iconName: "Cpu"
    },
    {
      id: "playwright-arch",
      title: "Modern Playwright SDET",
      category: "1 Year Focused Architecture",
      description:
        "Building fast, reliable Playwright automation suites in TypeScript/C# with native trace viewers, auto-waiting locators, and containerized headless execution.",
      technologies: ["Playwright (1 Yr)", "TypeScript", "Docker", "Trace Viewer", "Auto-Waiting"],
      iconName: "Layout"
    },
    {
      id: "cicd-devops",
      title: "CI/CD & Pipeline Quality Gates",
      category: "TeamCity & Azure DevOps",
      description:
        "Integrating automated regression suites into TeamCity, Azure DevOps, and GitHub Actions with Dockerized parallel execution and Slack/Jira failure alerts.",
      technologies: ["TeamCity", "Azure DevOps", "Docker", "GitHub Actions", "Jira"],
      iconName: "Gamepad2"
    }
  ] as Service[],

  journal: [
    {
      id: "j1",
      title: "Transitioning from Selenium to Playwright: A practical 1-year retrospective.",
      category: "Test Automation",
      readTime: "5 min read",
      date: "SDET Insights",
      summary:
        "Comparing auto-waiting mechanisms, trace debugging, and parallel sharding between traditional Selenium grids and modern Playwright test suites."
    },
    {
      id: "j2",
      title: "Two years of API automation: Schema validation vs functional contracts.",
      category: "API Testing",
      readTime: "5 min read",
      date: "Contract Testing",
      summary:
        "How RestAssured and Postman pre-request scripts streamline dynamic auth tokens, environment variables, and automated schema checks."
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
      title: "JuszGo Real-Time Geospatial Cluster",
      medium: "Mobility Architecture • Flutter & H3",
      image: "./lab/juszgo-arch.svg",
      aspect: "aspect-[4/3]",
      rotation: -1.0,
      description: "Real-time driver assignment state machine with geospatial hexagonal indexing and Razorpay payment webhooks."
    },
    {
      id: "exp2",
      title: "Locust 1,000 VU Concurrency Matrix",
      medium: "Performance QA • Python & SLA",
      image: "./lab/locust-arch.svg",
      aspect: "aspect-[4/3]",
      rotation: 1.5,
      description: "Distributed load testing with virtual user ramping, monitoring connection pool saturation and sub-40ms P99 latency."
    },
    {
      id: "exp3",
      title: "Containerized Test Grid Topology",
      medium: "CI/CD Automation • Docker & TeamCity",
      image: "./lab/docker-grid.svg",
      aspect: "aspect-[4/3]",
      rotation: -1.5,
      description: "Parallel headless browser clusters running cross-browser regression suites with zero locator flakiness."
    },
    {
      id: "exp4",
      title: "5-Portal Logistics State Machine",
      medium: "Enterprise SaaS • PostgreSQL",
      image: "./lab/vikisha-flow.svg",
      aspect: "aspect-[4/3]",
      rotation: 1.0,
      description: "End-to-end order lifecycle tracking from pickup dispatch to thermal barcode tagging and workshop inspection."
    },
    {
      id: "exp5",
      title: "RestAssured Contract & Schema Suite",
      medium: "API Testing • Java & JWT",
      image: "./lab/api-contract.svg",
      aspect: "aspect-[4/3]",
      rotation: -1.0,
      description: "Automated JSON schema validation, dynamic authentication tokens, and negative boundary payload verification."
    },
    {
      id: "exp6",
      title: "IRS Pub 4557 AES-256-GCM Vault",
      medium: "Security Engineering • Supabase RLS",
      image: "./lab/irs-security.svg",
      aspect: "aspect-[4/3]",
      rotation: 1.8,
      description: "Client-side PII data sanitization and AES-GCM envelope encryption for US tax compliance."
    }
  ] as ExplorationItem[],

  statistics: [
    { value: 7, suffix: "+ Yrs", label: "Enterprise QA Experience", description: "Proven core automation foundation across Wipro, Bizmatics, and Infosys." },
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
