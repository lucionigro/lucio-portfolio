import {
  Activity,
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  CircuitBoard,
  ExternalLink,
  Filter,
  GraduationCap,
  Github,
  Linkedin,
  Mail,
  MapPin,
  PanelsTopLeft,
  ShieldCheck,
  UserRound,
  Zap,
} from "lucide-react";
import { motion, MotionConfig, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { DitheringShader } from "@/components/ui/dithering-shader";
import { FallingPattern } from "@/components/ui/falling-pattern";
import {
  portfolioContent,
  type Language,
  type PortfolioContent,
  type Project,
  type ProjectFilter,
  type SystemNode,
} from "./content/profile";

const iconByNode: Record<string, typeof CircuitBoard> = {
  lucio: UserRound,
  personality: BookOpen,
  belong: ShieldCheck,
  gestio: PanelsTopLeft,
  financebro: Activity,
  kalman: Zap,
};

function App() {
  const [language, setLanguage] = useState<Language>("en");
  const [activeNodeId, setActiveNodeId] = useState(portfolioContent.en.systemNodes[0].id);
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");
  const shouldReduceMotion = useReducedMotion();
  const content = portfolioContent[language];

  const activeNode = useMemo(
    () => content.systemNodes.find((node) => node.id === activeNodeId) ?? content.systemNodes[0],
    [activeNodeId, content.systemNodes],
  );

  const visibleProjects = useMemo(
    () =>
      content.projects.filter((project) => {
        if (activeFilter === "all") return true;
        return (project.tags as readonly ProjectFilter[]).includes(activeFilter);
      }),
    [activeFilter, content.projects],
  );

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = content.meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", content.meta.description);
  }, [content.meta.description, content.meta.title, language]);

  return (
    <MotionConfig reducedMotion={shouldReduceMotion ? "always" : "never"}>
      <div className="app-shell">
        <GridBackdrop />
        {shouldReduceMotion ? null : (
          <FallingPattern
            className="global-falling-pattern"
            color="rgba(255, 255, 255, 0.38)"
            backgroundColor="#030303"
            duration={128}
            blurIntensity="0.84em"
            density={1.08}
          />
        )}
        <TopBar
          content={content}
          language={language}
          onLanguageChange={setLanguage}
        />
        <main className="main-frame">
          <HeroSection
            content={content}
            activeNode={activeNode}
            activeNodeId={activeNodeId}
            onNodeSelect={setActiveNodeId}
          />
          <ExperienceSection content={content} />
          <ProjectSection
            content={content}
            activeFilter={activeFilter}
            projects={visibleProjects}
            onFilterChange={setActiveFilter}
          />
          <ContactSection content={content} />
        </main>
      </div>
    </MotionConfig>
  );
}

function TopBar({
  content,
  language,
  onLanguageChange,
}: {
  content: PortfolioContent;
  language: Language;
  onLanguageChange: (language: Language) => void;
}) {
  return (
    <header className="top-bar">
      <a className="brand" href="#work" aria-label="Go to portfolio hero">
        <span className="brand-mark">LN</span>
        <span>
          <strong>{content.profile.name}</strong>
          <small>{content.profile.role}</small>
        </span>
      </a>

      <nav className="nav-links" aria-label="Primary navigation">
        {content.navItems.map((item) => (
          <a key={item.id} href={`#${item.id}`}>
            {item.label}
          </a>
        ))}
      </nav>

      <div className="top-actions">
        <div className="language-toggle" aria-label="Language selector">
          {(["en", "es"] as const).map((option) => (
            <button
              key={option}
              className={option === language ? "is-active" : undefined}
              onClick={() => onLanguageChange(option)}
              type="button"
              aria-label={`Switch language to ${option === "en" ? "English" : "Spanish"}`}
              aria-pressed={option === language}
            >
              {option.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

function HeroSection({
  content,
  activeNode,
  activeNodeId,
  onNodeSelect,
}: {
  content: PortfolioContent;
  activeNode: SystemNode;
  activeNodeId: string;
  onNodeSelect: (nodeId: string) => void;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="hero-grid section-panel" id="work" aria-labelledby="hero-title">
      <div className="hero-copy">
        <div className="hero-title-shader" aria-hidden="true">
          <DitheringShader
            width={1280}
            height={620}
            shape="wave"
            type="8x8"
            colorBack="#030303"
            colorFront="#f5f5f5"
            pxSize={4}
            speed={shouldReduceMotion ? 0 : 0.18}
            className="hero-title-shader-canvas"
          />
        </div>
        <div className="hero-primary">
          <p className="terminal-kicker">{content.hero.terminal}</p>
          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            {content.profile.headline}
            <span className="cursor" aria-hidden="true" />
          </motion.h1>
          <p className="hero-summary">{content.profile.summary}</p>
          <div className="whoami-thread">
            <span>{content.hero.whoami}</span>
            <p>{content.profile.identity}</p>
            <p>{content.profile.personality}</p>
          </div>
        </div>

        <div className="hero-dossier">
          <div className="identity-card" aria-label="Lucio Nigro identity dossier">
            <div className="identity-photo">
              <img src={content.profile.photo} alt={content.profile.name} />
            </div>
            <div>
              <span>{content.hero.identityFile}</span>
              <strong>{content.profile.name}</strong>
              <p>{content.hero.identityCaption}</p>
              <p className="identity-place">
                <MapPin size={14} aria-hidden="true" />
                {content.hero.place}
              </p>
            </div>
          </div>

          <div className="command-list" aria-label="Primary actions">
            {content.hero.commands.map((command) => (
              <CommandButton
                key={command.href}
                href={command.href}
                icon={
                  command.href === "#projects"
                    ? PanelsTopLeft
                    : command.href === "#experience"
                      ? BriefcaseBusiness
                      : Mail
                }
                label={command.label}
              >
                {command.description}
              </CommandButton>
            ))}
          </div>
        </div>
      </div>

      <div className="network-column" id="systems">
        <div className="panel-heading">
          <span>{content.hero.mapTitle}</span>
          <strong>{content.hero.mapStatus}</strong>
        </div>
        <SystemGraph
          nodes={content.systemNodes}
          links={content.links}
          activeNodeId={activeNodeId}
          activeNode={activeNode}
          onNodeSelect={onNodeSelect}
        />
      </div>
    </section>
  );
}

function CommandButton({
  href,
  icon: Icon,
  label,
  children,
}: {
  href: string;
  icon: typeof PanelsTopLeft;
  label: string;
  children: string;
}) {
  return (
    <a className="command-button" href={href}>
      <span className="command-icon">
        <Icon size={20} aria-hidden="true" />
      </span>
      <span>
        <strong>{label}</strong>
        <small>{children}</small>
      </span>
      <ArrowRight size={18} aria-hidden="true" />
    </a>
  );
}

function SystemGraph({
  nodes,
  links,
  activeNodeId,
  activeNode,
  onNodeSelect,
}: {
  nodes: SystemNode[];
  links: PortfolioContent["links"];
  activeNodeId: string;
  activeNode: SystemNode;
  onNodeSelect: (nodeId: string) => void;
}) {
  const nodeMap = useMemo(
    () => new Map(nodes.map((node) => [node.id, node])),
    [nodes],
  );

  return (
    <div className="graph-wrap" aria-label="Interactive project system graph">
      <div className="graph-canvas">
        <svg className="graph-lines" viewBox="0 0 100 100" aria-hidden="true">
          {links.map(([sourceId, targetId]) => {
            const source = nodeMap.get(sourceId);
            const target = nodeMap.get(targetId);
            if (!source || !target) return null;
            const isActive = source.id === activeNodeId || target.id === activeNodeId;

            return (
              <line
                key={`${sourceId}-${targetId}`}
                x1={source.x}
                y1={source.y}
                x2={target.x}
                y2={target.y}
                className={isActive ? "active" : undefined}
              />
            );
          })}
        </svg>

        {nodes.map((node) => {
          const Icon = iconByNode[node.id] ?? CircuitBoard;
          const isActive = node.id === activeNodeId;

          return (
            <button
              key={node.id}
              className={`system-node status-${node.status} ${isActive ? "is-active" : ""}`}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              onClick={() => onNodeSelect(node.id)}
              type="button"
              aria-label={`Open ${node.label} details`}
              aria-pressed={isActive}
            >
              <Icon size={22} aria-hidden="true" />
              <span>
                <strong>{node.label}</strong>
                <small>{node.eyebrow}</small>
                <em>{node.status}</em>
              </span>
            </button>
          );
        })}
      </div>

      <article className={`node-detail status-${activeNode.status}`}>
        <span>{activeNode.eyebrow}</span>
        <h2>{activeNode.label}</h2>
        <p>{activeNode.summary}</p>
        <div className="tag-row">
          {activeNode.tags.map((tag) => (
            <b key={tag}>{tag}</b>
          ))}
        </div>
        <ul>
          {activeNode.metrics.map((metric) => (
            <li key={metric}>{metric}</li>
          ))}
        </ul>
      </article>
    </div>
  );
}

function ProjectSection({
  content,
  activeFilter,
  projects,
  onFilterChange,
}: {
  content: PortfolioContent;
  activeFilter: ProjectFilter;
  projects: Project[];
  onFilterChange: (filter: ProjectFilter) => void;
}) {
  return (
    <section className="projects-grid section-panel" id="projects" aria-labelledby="projects-title">
      <div className="section-header">
        <div>
          <p className="section-kicker">{content.sections.projectsKicker}</p>
          <h2 id="projects-title">{content.sections.projectsTitle}</h2>
        </div>
        <div className="filter-group" aria-label="Project filters">
          <Filter size={16} aria-hidden="true" />
          {content.filters.map((filter) => (
            <button
              key={filter.value}
              className={filter.value === activeFilter ? "is-active" : undefined}
              onClick={() => onFilterChange(filter.value)}
              type="button"
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="project-table" role="table" aria-label={content.sections.projectsTableLabel}>
        <div className="project-row project-head" role="row">
          {content.sections.projectHeaders.map((header) => (
            <span key={header} role="columnheader">{header}</span>
          ))}
        </div>
        {projects.map((project) => (
          <article className="project-row" role="row" key={project.name}>
            <strong role="cell" data-label={content.sections.projectHeaders[0]}>{project.name}</strong>
            <span role="cell" data-label={content.sections.projectHeaders[1]}>{project.domain}</span>
            <span role="cell" data-label={content.sections.projectHeaders[2]}>{project.role}</span>
            <span role="cell" data-label={content.sections.projectHeaders[3]}>{project.stack.join(" / ")}</span>
            <span role="cell" data-label={content.sections.projectHeaders[4]}>{project.impact}</span>
            <span className={`status-pill status-${project.status}`} role="cell" data-label={content.sections.projectHeaders[5]}>
              {project.status}
            </span>
            <a
              className="project-link"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              role="cell"
              data-label={content.sections.projectHeaders[6]}
              aria-label={`Open ${project.name}: ${project.linkLabel}`}
            >
              {project.linkLabel}
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          </article>
        ))}
      </div>

      <div className="terminal-line">
        <span>root@lucio-nigro:~$</span> {content.sections.terminalLine}
      </div>
    </section>
  );
}

function ExperienceSection({ content }: { content: PortfolioContent }) {
  return (
    <section className="experience-section section-panel" id="experience" aria-labelledby="experience-title">
      <div className="section-header">
        <div>
          <p className="section-kicker">{content.sections.experienceKicker}</p>
          <h2 id="experience-title">{content.sections.experienceTitle}</h2>
        </div>
      </div>

      <div className="experience-layout">
        <div className="experience-stack">
          <div className="subsection-title">
            <BriefcaseBusiness size={18} aria-hidden="true" />
            <span>{content.sections.experienceLabel}</span>
          </div>
          {content.experience.map((item) => (
            <article className="experience-card" key={item.company}>
              <div className="company-line">
                <div>
                  <h3>{item.company}</h3>
                  <p>{item.mode} · {item.total}</p>
                </div>
                <span>{item.location}</span>
              </div>
              <ol>
                {item.roles.map((role) => (
                  <li key={`${item.company}-${role.title}`}>
                    <strong>{role.title}</strong>
                    <span>{role.dates}</span>
                    {role.detail ? <em>{role.detail}</em> : null}
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>

        <div className="education-stack">
          <div className="subsection-title">
            <GraduationCap size={18} aria-hidden="true" />
            <span>{content.sections.educationLabel}</span>
          </div>
          {content.education.map((item) => (
            <article className="education-card" key={`${item.institution}-${item.program}`}>
              <span>{item.dates}</span>
              <h3>{item.institution}</h3>
              <p>{item.program}</p>
              {item.detail ? <em>{item.detail}</em> : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection({ content }: { content: PortfolioContent }) {
  return (
    <footer className="contact-section" id="contact" aria-labelledby="contact-title">
      <div>
        <p className="section-kicker">{content.sections.contactKicker}</p>
        <h2 id="contact-title">{content.sections.contactTitle}</h2>
        <p>{content.sections.contactBody}</p>
        <p className="footer-signature">
          {content.profile.name} · {content.profile.role} · {content.hero.place}
        </p>
      </div>

      <div className="contact-actions">
        <a href={content.profile.links.linkedin} target="_blank" rel="noopener noreferrer">
          <Linkedin size={18} aria-hidden="true" />
          LinkedIn
        </a>
        <a href={content.profile.links.github} target="_blank" rel="noopener noreferrer">
          <Github size={18} aria-hidden="true" />
          GitHub
        </a>
        <a href={content.profile.links.portfolioRepository} target="_blank" rel="noopener noreferrer">
          <PanelsTopLeft size={18} aria-hidden="true" />
          Source
        </a>
        <a href={content.profile.links.email}>
          <Mail size={18} aria-hidden="true" />
          Email
        </a>
      </div>
    </footer>
  );
}

function GridBackdrop() {
  return (
    <div className="grid-backdrop" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}

export default App;
