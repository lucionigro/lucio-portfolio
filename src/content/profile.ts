export type Language = "en" | "es";

export type Category = "work" | "experience" | "projects" | "contact";

export type SystemStatus = "operational" | "active" | "research" | "draft";

export type ProjectFilter = "all" | "ai" | "backend" | "side-project";

export type SystemNode = {
  id: string;
  label: string;
  eyebrow: string;
  summary: string;
  category: "identity" | "personal" | "work" | "ai" | "payments" | "backend" | "side-project";
  status: SystemStatus;
  x: number;
  y: number;
  tags: string[];
  metrics: string[];
};

export type Project = {
  name: string;
  domain: string;
  role: string;
  stack: string[];
  impact: string;
  status: SystemStatus;
  tags: ProjectFilter[];
  url: string;
  linkLabel: string;
};

export type Experience = {
  company: string;
  location: string;
  mode: string;
  total: string;
  roles: {
    title: string;
    dates: string;
    detail?: string;
  }[];
};

export type Education = {
  institution: string;
  program: string;
  dates: string;
  detail?: string;
};

export type PortfolioContent = {
  meta: {
    title: string;
    description: string;
  };
  profile: {
    name: string;
    role: string;
    headline: string;
    summary: string;
    identity: string;
    personality: string;
    photo: string;
    links: {
      linkedin: string;
      github: string;
      email: string;
    };
  };
  navItems: { id: Category; label: string }[];
  filters: { value: ProjectFilter; label: string }[];
  statusLabel: string;
  statusValue: string;
  hero: {
    terminal: string;
    whoami: string;
    identityFile: string;
    identityCaption: string;
    place: string;
    mapTitle: string;
    mapStatus: string;
    commands: {
      href: string;
      label: string;
      description: string;
    }[];
  };
  systemNodes: SystemNode[];
  links: readonly (readonly [string, string])[];
  sections: {
    projectsKicker: string;
    projectsTitle: string;
    projectsTableLabel: string;
    projectHeaders: string[];
    terminalLine: string;
    experienceKicker: string;
    experienceTitle: string;
    experienceLabel: string;
    educationLabel: string;
    contactKicker: string;
    contactTitle: string;
    contactBody: string;
  };
  projects: Project[];
  experience: Experience[];
  education: Education[];
};

const sharedLinks = {
  linkedin: "https://www.linkedin.com/in/lucionigro/",
  github: "https://github.com/lucionigro",
  email: "mailto:lucionigrot@gmail.com",
};

const photo = "/assets/fotoportfolio.jpeg";

const graphLinks = [
  ["lucio", "personality"],
  ["lucio", "belong"],
  ["lucio", "gestio"],
  ["belong", "financebro"],
  ["gestio", "financebro"],
  ["gestio", "kalman"],
  ["financebro", "kalman"],
] as const;

export const portfolioContent = {
  en: {
    meta: {
      title: "Lucio Nigro | AI Architect",
      description:
        "Lucio Nigro portfolio: AI architect and backend developer specialized in AI systems, financial platforms, and autonomous agents.",
    },
    profile: {
      name: "Lucio Nigro",
      role: "AI Architect / Backend Developer",
      headline: "AI Architect for financial systems and autonomous agents",
      summary:
        "AI engineer specialized in financial systems, backend architecture, and agentic tools that turn complex operations into usable products.",
      identity:
        "Lucio Nigro, 24. I live in Capital Federal, Buenos Aires. I have been around computers since I was a kid, and I like building complex systems with patience, discipline, and close attention to detail.",
      personality:
        "Outside of work, I enjoy playing guitar. My favorite bands are Led Zeppelin and Pink Floyd, I love cinema, my favorite movie is The Godfather, and my favorite book is Crime and Punishment by Fyodor Dostoevsky.",
      photo,
      links: sharedLinks,
    },
    navItems: [
      { id: "work", label: "Work" },
      { id: "experience", label: "Experience" },
      { id: "projects", label: "Projects" },
      { id: "contact", label: "Contact" },
    ],
    filters: [
      { value: "all", label: "All" },
      { value: "ai", label: "AI" },
      { value: "backend", label: "Backend" },
      { value: "side-project", label: "Side projects" },
    ],
    statusLabel: "",
    statusValue: "",
    hero: {
      terminal: "> lucio.nigro/systems",
      whoami: "whoami",
      identityFile: "Identity file",
      identityCaption: "Belong · AI Architect · AI agents / Payments / Backend systems",
      place: "Capital Federal, Buenos Aires",
      mapTitle: "Personal system map",
      mapStatus: "Live",
      commands: [
        {
          href: "#projects",
          label: "View projects",
          description: "Repositories and live product links",
        },
        {
          href: "#experience",
          label: "Open experience",
          description: "Roles, systems, and education",
        },
        {
          href: "#contact",
          label: "Contact",
          description: "Start a direct channel",
        },
      ],
    },
    systemNodes: [
      {
        id: "lucio",
        label: "Lucio Nigro",
        eyebrow: "Who I am",
        summary:
          "AI Architect and Backend Developer specialized in financial systems, autonomous agents, and backend platforms.",
        category: "identity",
        status: "operational",
        x: 50,
        y: 16,
        tags: ["AI Architect", "Backend Developer", "Financial systems", "AI agents"],
        metrics: ["24 years old", "Capital Federal", "Detail-obsessed"],
      },
      {
        id: "personality",
        label: "Personality Layer",
        eyebrow: "Taste / discipline / guitar",
        summary:
          "I enjoy playing guitar, listening to Led Zeppelin and Pink Floyd, watching films like The Godfather, and reading Dostoevsky. Crime and Punishment is my favorite book.",
        category: "personal",
        status: "active",
        x: 20,
        y: 45,
        tags: ["Guitar", "The Godfather", "Led Zeppelin", "Dostoevsky"],
        metrics: ["Patience", "Intensity", "Curiosity / discipline"],
      },
      {
        id: "belong",
        label: "Belong AI Systems",
        eyebrow: "Current work",
        summary:
          "AI Architect work focused on AI agent development, payment systems, backend reliability, and autonomous workflows inside financial infrastructure.",
        category: "payments",
        status: "operational",
        x: 50,
        y: 45,
        tags: ["AI agents", ".NET", "Payments", "Backend"],
        metrics: ["United States", "Full-time", "Financial systems"],
      },
      {
        id: "gestio",
        label: "Gestio",
        eyebrow: "Side product",
        summary:
          "ERP and operations platform with accounting, AFIP/ARCA flows, memberships, and business automation.",
        category: "side-project",
        status: "operational",
        x: 80,
        y: 45,
        tags: ["ERP", "Accounting", "React", "Spring"],
        metrics: ["AFIP/ARCA domain", "Business rules", "Production focus"],
      },
      {
        id: "financebro",
        label: "FinanceBRO",
        eyebrow: "Local LLM research",
        summary:
          "Weekly portfolio research pipeline that uses local LLMs running on the machine to generate investment research and summaries.",
        category: "side-project",
        status: "active",
        x: 35,
        y: 78,
        tags: ["Finance", "Local LLMs", "Automation", "Research"],
        metrics: ["Runs on local models", "Weekly research", "Portfolio context"],
      },
      {
        id: "kalman",
        label: "Kalman",
        eyebrow: "Quant research",
        summary:
          "Paper-first trading and IBKR research platform focused on validation before promotion.",
        category: "side-project",
        status: "research",
        x: 65,
        y: 78,
        tags: ["Quant", "Paper trading", "Risk"],
        metrics: ["Paper-first", "Regime-aware", "IBKR research"],
      },
    ],
    links: graphLinks,
    sections: {
      projectsKicker: "Public project links",
      projectsTitle: "Repos, products, and experiments worth opening.",
      projectsTableLabel: "Project matrix",
      projectHeaders: ["System", "Domain", "Role", "Stack", "Impact", "Status", "Link"],
      terminalLine: "architect systems that compound.",
      experienceKicker: "LinkedIn experience and studies",
      experienceTitle: "AI agents, financial systems, and backend architecture.",
      experienceLabel: "Experience",
      educationLabel: "Education",
      contactKicker: "Contact",
      contactTitle: "Let's talk systems.",
      contactBody:
        "Best fit: AI agents, backend platforms, payments, and financial systems. Clear scope, serious execution, no noise.",
    },
    projects: [
      {
        name: "Gestio",
        domain: "ERP operations",
        role: "Founder / Architect",
        stack: ["React", "Spring Boot", "Postgres", "AWS"],
        impact: "Business platform for accounting, memberships, and AFIP/ARCA workflows.",
        status: "operational",
        tags: ["side-project", "backend"],
        url: "https://app-gestio.com/",
        linkLabel: "Open product",
      },
      {
        name: "FinanceBRO",
        domain: "Financial analytics",
        role: "Builder",
        stack: ["Python", "Local LLMs", "Reports", "Automation"],
        impact:
          "Scheduled research pipeline that runs local language models on the machine to generate portfolio research and weekly summaries.",
        status: "active",
        tags: ["side-project", "ai"],
        url: "https://github.com/lucionigro/FinanceBro",
        linkLabel: "GitHub",
      },
      {
        name: "Kalman",
        domain: "Quant research",
        role: "Research builder",
        stack: ["Python", "IBKR", "Paper trading", "Risk"],
        impact: "Trading research platform with validation gates before live exposure.",
        status: "research",
        tags: ["side-project", "backend"],
        url: "https://github.com/lucionigro/Kalman",
        linkLabel: "GitHub",
      },
    ],
    experience: [
      {
        company: "Belong",
        location: "United States",
        mode: "Full-time",
        total: "5 months",
        roles: [
          {
            title: "AI Architect",
            dates: "Mar 2026 - Present · 3 months",
            detail: "AI agent development and financial system architecture",
          },
          {
            title: "Backend Payments Engineer",
            dates: "Jan 2026 - Apr 2026 · 4 months",
            detail: "Hybrid",
          },
        ],
      },
      {
        company: "Banco Hipotecario",
        location: "Argentina · Hybrid",
        mode: "Full-time",
        total: "2 years 1 month",
        roles: [
          {
            title: "Financial Operations Developer Analyst",
            dates: "Jul 2024 - Jan 2026 · 1 year 7 months",
          },
          {
            title: "Corporate Banking Developer Analyst",
            dates: "Jan 2024 - Jul 2024 · 7 months",
          },
        ],
      },
      {
        company: "Qservices",
        location: "Argentina · Remote",
        mode: "Consulting / software delivery",
        total: "1 year 4 months",
        roles: [
          {
            title: ".NET Developer",
            dates: "Mar 2023 - Jan 2024 · 11 months",
            detail: "Full-time",
          },
          {
            title: ".NET Trainee",
            dates: "Oct 2022 - Mar 2023 · 6 months",
            detail: "Part-time",
          },
        ],
      },
    ],
    education: [
      {
        institution: "Universidad del CEMA",
        program: "Python for Finance, Finance, General",
        dates: "Oct 2025 - Dec 2025",
      },
      {
        institution: "Universidad Tecnologica Nacional BA",
        program: ".NET Development, Systems Engineering",
        dates: "Oct 2022 - Dec 2022",
        detail: "Skills: .NET Core, C#",
      },
      {
        institution: "Universidad Nacional de Cordoba",
        program: "Post-intermediate English language certificate",
        dates: "Oct 2019 - Nov 2019",
        detail: "Grade: B2",
      },
    ],
  },
  es: {
    meta: {
      title: "Lucio Nigro | AI Architect",
      description:
        "Portfolio de Lucio Nigro: AI architect y backend developer especializado en sistemas financieros, agentes de IA y arquitectura backend.",
    },
    profile: {
      name: "Lucio Nigro",
      role: "AI Architect / Backend Developer",
      headline: "AI Architect para sistemas financieros y agentes autonomos",
      summary:
        "AI engineer especializado en sistemas financieros, arquitectura backend y herramientas agenticas que convierten operaciones complejas en productos usables.",
      identity:
        "Lucio Nigro, 24 anos. Vivo en Capital Federal, Buenos Aires. Desde chico estuve cerca de las computadoras, y me gusta construir sistemas complejos con paciencia, disciplina y mucha atencion al detalle.",
      personality:
        "Fuera del trabajo disfruto tocar la guitarra. Mis bandas favoritas son Led Zeppelin y Pink Floyd, me encanta el cine, mi pelicula favorita es El Padrino y mi libro favorito es Crimen y castigo, de Fedor Dostoievsky.",
      photo,
      links: sharedLinks,
    },
    navItems: [
      { id: "work", label: "Inicio" },
      { id: "experience", label: "Experiencia" },
      { id: "projects", label: "Proyectos" },
      { id: "contact", label: "Contacto" },
    ],
    filters: [
      { value: "all", label: "Todo" },
      { value: "ai", label: "IA" },
      { value: "backend", label: "Backend" },
      { value: "side-project", label: "Productos" },
    ],
    statusLabel: "",
    statusValue: "",
    hero: {
      terminal: "> lucio.nigro/systems",
      whoami: "whoami",
      identityFile: "Archivo de identidad",
      identityCaption: "Belong · AI Architect · AI agents / Payments / Backend systems",
      place: "Capital Federal, Buenos Aires",
      mapTitle: "Mapa personal de sistemas",
      mapStatus: "Live",
      commands: [
        {
          href: "#projects",
          label: "Ver proyectos",
          description: "Repositorios y productos activos",
        },
        {
          href: "#experience",
          label: "Abrir experiencia",
          description: "Roles, sistemas y estudios",
        },
        {
          href: "#contact",
          label: "Contacto",
          description: "Iniciar canal directo",
        },
      ],
    },
    systemNodes: [
      {
        id: "lucio",
        label: "Lucio Nigro",
        eyebrow: "Quien soy",
        summary:
          "AI Architect y Backend Developer especializado en sistemas financieros, agentes autonomos y plataformas backend.",
        category: "identity",
        status: "operational",
        x: 50,
        y: 16,
        tags: ["AI Architect", "Backend Developer", "Sistemas financieros", "Agentes IA"],
        metrics: ["24 anos", "Capital Federal", "Obsesivo con el detalle"],
      },
      {
        id: "personality",
        label: "Capa personal",
        eyebrow: "Gusto / disciplina / guitarra",
        summary:
          "Disfruto tocar la guitarra, escuchar Led Zeppelin y Pink Floyd, ver peliculas como El Padrino y leer a Dostoievsky. Crimen y castigo es mi libro favorito.",
        category: "personal",
        status: "active",
        x: 20,
        y: 45,
        tags: ["Guitarra", "El Padrino", "Led Zeppelin", "Dostoievsky"],
        metrics: ["Paciencia", "Intensidad", "Curiosidad / disciplina"],
      },
      {
        id: "belong",
        label: "Belong AI Systems",
        eyebrow: "Trabajo actual",
        summary:
          "Trabajo como AI Architect desarrollando agentes de IA, sistemas de pagos, confiabilidad backend y workflows autonomos dentro de infraestructura financiera.",
        category: "payments",
        status: "operational",
        x: 50,
        y: 45,
        tags: ["Agentes IA", ".NET", "Payments", "Backend"],
        metrics: ["Estados Unidos", "Full-time", "Sistemas financieros"],
      },
      {
        id: "gestio",
        label: "Gestio",
        eyebrow: "Producto propio",
        summary:
          "ERP y plataforma operativa con contabilidad, flujos AFIP/ARCA, membresias y automatizacion de negocios.",
        category: "side-project",
        status: "operational",
        x: 80,
        y: 45,
        tags: ["ERP", "Contabilidad", "React", "Spring"],
        metrics: ["Dominio AFIP/ARCA", "Reglas de negocio", "Foco productivo"],
      },
      {
        id: "financebro",
        label: "FinanceBRO",
        eyebrow: "Research con LLM local",
        summary:
          "Pipeline semanal de research de portfolio que usa LLM locales corriendo en la propia maquina para generar investigacion y resumenes.",
        category: "side-project",
        status: "active",
        x: 35,
        y: 78,
        tags: ["Finanzas", "LLM locales", "Automatizacion", "Research"],
        metrics: ["Corre con modelos locales", "Research semanal", "Contexto de portfolio"],
      },
      {
        id: "kalman",
        label: "Kalman",
        eyebrow: "Research cuantitativo",
        summary:
          "Plataforma de trading e investigacion IBKR con enfoque paper-first antes de pasar a exposicion real.",
        category: "side-project",
        status: "research",
        x: 65,
        y: 78,
        tags: ["Quant", "Paper trading", "Riesgo"],
        metrics: ["Paper-first", "Regimenes de mercado", "Research IBKR"],
      },
    ],
    links: graphLinks,
    sections: {
      projectsKicker: "Links publicos",
      projectsTitle: "Repos, productos y experimentos que vale la pena abrir.",
      projectsTableLabel: "Matriz de proyectos",
      projectHeaders: ["Sistema", "Dominio", "Rol", "Stack", "Impacto", "Estado", "Link"],
      terminalLine: "arquitectar sistemas que acumulen valor.",
      experienceKicker: "Experiencia y estudios de LinkedIn",
      experienceTitle: "Agentes de IA, sistemas financieros y arquitectura backend.",
      experienceLabel: "Experiencia",
      educationLabel: "Estudios",
      contactKicker: "Contacto",
      contactTitle: "Hablemos de sistemas.",
      contactBody:
        "Me interesan agentes de IA, plataformas backend, pagos y sistemas financieros. Alcance claro, ejecucion seria y cero ruido.",
    },
    projects: [
      {
        name: "Gestio",
        domain: "ERP operativo",
        role: "Founder / Architect",
        stack: ["React", "Spring Boot", "Postgres", "AWS"],
        impact: "Plataforma de negocio para contabilidad, membresias y flujos AFIP/ARCA.",
        status: "operational",
        tags: ["side-project", "backend"],
        url: "https://app-gestio.com/",
        linkLabel: "Abrir producto",
      },
      {
        name: "FinanceBRO",
        domain: "Analitica financiera",
        role: "Builder",
        stack: ["Python", "LLM locales", "Reportes", "Automatizacion"],
        impact:
          "Pipeline programado que corre modelos de lenguaje locales en la maquina para generar research de portfolio y resumenes semanales.",
        status: "active",
        tags: ["side-project", "ai"],
        url: "https://github.com/lucionigro/FinanceBro",
        linkLabel: "GitHub",
      },
      {
        name: "Kalman",
        domain: "Research cuantitativo",
        role: "Research builder",
        stack: ["Python", "IBKR", "Paper trading", "Riesgo"],
        impact: "Plataforma de research de trading con validaciones antes de exposicion live.",
        status: "research",
        tags: ["side-project", "backend"],
        url: "https://github.com/lucionigro/Kalman",
        linkLabel: "GitHub",
      },
    ],
    experience: [
      {
        company: "Belong",
        location: "Estados Unidos",
        mode: "Jornada completa",
        total: "5 meses",
        roles: [
          {
            title: "AI Architect",
            dates: "mar. 2026 - actualidad · 3 meses",
            detail: "Desarrollo de agentes de IA y arquitectura de sistemas financieros",
          },
          {
            title: "Backend Payments Engineer",
            dates: "ene. 2026 - abr. 2026 · 4 meses",
            detail: "Hibrido",
          },
        ],
      },
      {
        company: "Banco Hipotecario",
        location: "Argentina · Hibrido",
        mode: "Jornada completa",
        total: "2 anos 1 mes",
        roles: [
          {
            title: "Analista Desarrollador de Operaciones Financieras",
            dates: "jul. 2024 - ene. 2026 · 1 ano 7 meses",
          },
          {
            title: "Analista Desarrollador de Banca Empresas",
            dates: "ene. 2024 - jul. 2024 · 7 meses",
          },
        ],
      },
      {
        company: "Qservices",
        location: "Argentina · Remoto",
        mode: "Consulting / software delivery",
        total: "1 ano 4 meses",
        roles: [
          {
            title: ".NET Developer",
            dates: "mar. 2023 - ene. 2024 · 11 meses",
            detail: "Jornada completa",
          },
          {
            title: ".NET Trainee",
            dates: "oct. 2022 - mar. 2023 · 6 meses",
            detail: "Jornada parcial",
          },
        ],
      },
    ],
    education: [
      {
        institution: "Universidad del CEMA",
        program: "Python para Finanzas, Finance, General",
        dates: "oct. 2025 - dic. 2025",
      },
      {
        institution: "Universidad Tecnologica Nacional BA",
        program: "Desarrollo .NET, Systems Engineering",
        dates: "oct. 2022 - dic. 2022",
        detail: "Aptitudes: .NET Core, C#",
      },
      {
        institution: "Universidad Nacional de Cordoba",
        program: "Certificado de lengua inglesa nivel post-intermedio",
        dates: "oct. 2019 - nov. 2019",
        detail: "Nota: B2",
      },
    ],
  },
} satisfies Record<Language, PortfolioContent>;
