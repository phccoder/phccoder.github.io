/**
 * Portfolio.jsx — single-page React portfolio for gulifardo.dev
 *
 * Renders `window.PORTFOLIO_DATA` (set inline by index.html) or a `data` prop.
 * No build step: works with React UMD + Babel standalone from any CDN.
 */

const ICONS = {
  github:
    "M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.69 1.25 3.34.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 2.87-.39c.97 0 1.95.13 2.87.39 2.18-1.49 3.14-1.18 3.14-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.7 5.39-5.27 5.67.41.36.77 1.06.77 2.14v3.17c0 .31.21.67.8.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z",
  mail:
    "M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z",
  telegram:
    "M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.53 8.14-1.92 9.07c-.14.64-.52.8-.99.5l-2.74-2.02-1.32 1.27c-.15.15-.27.27-.55.27l.2-2.78 5.07-4.58c.22-.2-.05-.3-.34-.11L7.3 14.04l-2.7-.85c-.59-.18-.6-.59.12-.87l10.56-3.85c.49-.18.92.12.76.67z",
  link: "M19.35 10.04a5.5 5.5 0 0 0-7.78 0L10 11.61a5.5 5.5 0 0 0 0 7.77l.06.06a1 1 0 0 0 1.42-1.42l-.06-.06a3.5 3.5 0 0 1 0-4.95l1.57-1.57a3.5 3.5 0 0 1 4.95 0 1 1 0 0 0 1.41-1.41zM4.65 13.96a5.5 5.5 0 0 0 7.78 0L14 12.4a5.5 5.5 0 0 0 0-7.78l-.06-.06a1 1 0 0 0-1.42 1.42l.06.06a3.5 3.5 0 0 1 0 4.95l-1.57 1.57a3.5 3.5 0 0 1-4.95 0 1 1 0 0 0-1.41 1.41z",
  arrow: "M14 5l7 7-7 7M4 12h16",
  external: "M14 3h7v7M21 3l-9.5 9.5M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
  code: "M16 18l6-6-6-6M8 6l-6 6 6 6",
  server: "M2 4h20v6H2zM2 14h20v6H2zM6 7h.01M6 17h.01",
  monitor: "M2 4h20v13H2zM8 21h8M12 17v4",
  database: "M12 2C7 2 3 4 3 7v10c0 3 4 5 9 5s9-2 9-5V7c0-3-4-5-9-5zM3 7c0 3 4 5 9 5s9-2 9-5M3 12c0 3 4 5 9 5s9-2 9-5",
  broadcast: "M4.93 19.07a10 10 0 0 1 0-14.14M19.07 4.93a10 10 0 0 1 0 14.14M8 16a5 5 0 0 1 0-8M16 8a5 5 0 0 1 0 8M12 12h.01",
  cpu: "M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3M7 7h10v10H7z",
  package: "M21 8l-9-5-9 5v8l9 5 9-5V8zM3 8l9 5 9-5M12 13v8",
  cloud: "M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z",
  sparkles: "M12 3l1.8 4.9 4.9 1.8-4.9 1.8L12 16.4l-1.8-4.9-4.9-1.8 4.9-1.8L12 3zM19 14l.9 2.4 2.4.9-2.4.9L19 20.8l-.9-2.4-2.4-.9 2.4-.9.9-2.4z",
  globe: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z",
  linkedin:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  facebook:
    "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  kofi:
    "M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.683-2.566s.132-3.318.221-5.339c.159-3.411 4.285-3.592 4.285-3.592l-.033.109c.885-.224 1.341-1.219 1.341-1.219.324-.732.124-3.114.124-3.114H23.881z"
};

const CONTACT_ICONS = {
  website: "globe",
  github: "github",
  email: "mail",
  telegram: "telegram",
  linkedin: "linkedin",
  kofi: "kofi",
  facebook: "facebook"
};

const FILL_BRANDS = ["github", "telegram", "linkedin", "facebook", "kofi"];

const Icon = ({ name, size = 16, className }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill={FILL_BRANDS.includes(name) ? "currentColor" : "none"} stroke={FILL_BRANDS.includes(name) ? "none" : "currentColor"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={ICONS[name]} />
  </svg>
);

const Tag = ({ children }) => <span className="tag">{children}</span>;

const Section = ({ eyebrow, title, subtitle, children }) => (
  <section className="section">
    <div className="section-head">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
    {children}
  </section>
);

const LinkButton = ({ href, children, kind = "ghost", icon, external = true }) =>
  href ? (
    <a href={href} className={`btn btn-${kind}`} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
      {icon && <Icon name={icon} size={14} />}
      <span>{children}</span>
    </a>
  ) : null;

const Hero = ({ profile, contact }) => (
  <header className="hero">
    <div className="hero-glow" aria-hidden="true" />
    <div className="hero-inner">
      <div className="hero-avatar">
        {profile.avatar ? (
          <img src={profile.avatar} alt={profile.name} />
        ) : (
          <span>{profile.name.charAt(0)}</span>
        )}
      </div>
      <div className="hero-text">
        <p className="hero-brand">{profile.brand}</p>
        <h1 className="hero-name">{profile.name}</h1>
        <p className="hero-role">{profile.role}</p>
        <p className="hero-tagline">{profile.tagline}</p>
        <p className="hero-bio">{profile.bio}</p>
        <div className="hero-actions">
          <LinkButton href={contact.github.href} kind="primary" icon="github">GitHub</LinkButton>
          <LinkButton href={contact.website.href} kind="ghost" icon="external">{profile.brand}</LinkButton>
          <LinkButton href={contact.email.href} kind="ghost" icon="mail" external={false}>Email</LinkButton>
          {profile.openToWork && <span className="availability"><span className="pulse" /> Open to work</span>}
        </div>
      </div>
      <div className="hero-stats">
        {profile.stats.map((s) => (
          <div className="stat" key={s.label}>
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
    <div className="highlight-strip">
      {profile.highlights.map((h) => (
        <span className="highlight" key={h}>{"// "}{h}</span>
      ))}
    </div>
  </header>
);

const Skills = ({ groups }) => (
  <Section eyebrow="Skill Matrix" title="What I Build With" subtitle="Technologies aggregated from live production systems — not tutorial projects.">
    <div className="skills-grid">
      {groups.map((g) => (
        <div className="skill-group" key={g.group}>
          <h3 className="skill-group-title">
            {g.icon && <Icon name={g.icon} size={16} className="group-icon" aria-hidden="true" />}
            <span>{g.group}</span>
          </h3>
          <div className="skill-items">
            {g.items.map((item) => (
              <span className="skill-chip" key={item}>{item}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </Section>
);

const FeaturedCard = ({ p, index }) => (
  <article className={`featured-card layout-${index % 2}`}>
    <div className="featured-media">
      {p.image ? (
        <img src={p.image} alt={p.title + " screenshot"} loading="lazy" />
      ) : (
        <div className="featured-placeholder">
          <span>{p.category.split(" · ")[0]}</span>
          <small>Drop a screenshot in here</small>
        </div>
      )}
      <span className="featured-index">{String(index + 1).padStart(2, "0")}</span>
    </div>
    <div className="featured-body">
      <p className="featured-category">{p.category}</p>
      <h3 className="featured-title">{p.title}</h3>
      <p className="featured-subtitle">{p.subtitle}</p>
      <p className="featured-pitch">{p.pitch}</p>
      <ul className="featured-list">
        {p.features.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      <div className="featured-tags">
        {p.tags.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
      <div className="featured-actions">
        <LinkButton href={p.repo} kind="primary" icon="github">Repository</LinkButton>
        {p.demo && <LinkButton href={p.demo} kind="ghost" icon="external">{p.demoLabel || "Live Demo"}</LinkButton>}
        {p.showcase && <LinkButton href={p.showcase} kind="ghost" icon="link">Showcase</LinkButton>}
        {p.caseStudy && <LinkButton href={p.caseStudy} kind="ghost" icon="link">Case Study</LinkButton>}
      </div>
    </div>
  </article>
);

const Featured = ({ items }) => (
  <Section eyebrow="Featured Projects" title="Flagship Systems" subtitle="Deep-dive breakdowns of the most detailed, production-shaped repositories.">
    <div className="featured-stack">
      {items.map((p, i) => (
        <FeaturedCard p={p} index={i} key={p.title} />
      ))}
    </div>
  </Section>
);

const ProjectGrid = ({ title, subtitle, items }) => (
  <div className="project-grid">
    {items.map((p) => (
      <article className="project-card" key={p.name}>
        <div className="project-head">
          <h4>{p.name}</h4>
          <a href={p.repo} target="_blank" rel="noopener noreferrer" aria-label={"Open " + p.name}>
            <Icon name="external" size={15} />
          </a>
        </div>
        <p>{p.oneLiner}</p>
        <div className="project-tags">
          {p.tags.map((t) => (
            <span className="mini-tag" key={t}>{t}</span>
          ))}
        </div>
      </article>
    ))}
  </div>
);

const Others = ({ projects, utilities }) => (
  <>
    <Section eyebrow="More Work" title="Other Notable Projects" subtitle="Brief summaries of case studies, tools, and experiments.">
      <ProjectGrid items={projects} />
    </Section>
    <Section eyebrow="Utilities & Experiments" title="Developer Utilities" subtitle="Smaller tools and API integration exercises — included for completeness.">
      <ProjectGrid items={utilities} />
    </Section>
  </>
);

const Contact = ({ contact }) => {
  const entries = ["github", "website", "email", "telegram", "linkedin", "kofi", "facebook"].map((k) => contact[k] && { key: k, ...contact[k] }).filter(Boolean);
  return (
    <section className="section contact">
      <div className="section-head">
        <span className="eyebrow">Contact</span>
        <h2 className="section-title">Let's Build Something</h2>
        <p className="section-subtitle">Open to full-stack engineering, desktop/edge systems, and ERP work.</p>
      </div>
      <div className="contact-grid">
        {entries.map((c) => (
          <a className="contact-card" href={c.href} key={c.label} target={c.href.startsWith("http") ? "_blank" : undefined} rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}>
            <span className="contact-icon"><Icon name={CONTACT_ICONS[c.key] || "link"} size={19} /></span>
            <span className="contact-meta">
              <span className="contact-label">{c.label}</span>
              {c.href && <span className="contact-href">{c.href.replace(/^mailto:|^https?:\/\//, "") || "Set your LinkedIn URL in portfolio.json"}</span>}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};

const Portfolio = ({ data }) => {
  const d = data || window.PORTFOLIO_DATA;
  if (!d) return <div className="error">Portfolio data not found — open index.html to render this component.</div>;
  return (
    <div className="page">
      <Hero profile={d.profile} contact={d.contact} />
      <main>
        <div className="container">
          <Skills groups={d.skills} />
          <Featured items={d.featured} />
          <Others projects={d.otherProjects} utilities={d.utilities} />
          <Contact contact={d.contact} />
        </div>
      </main>
      <footer className="footer">
        <p>{d.footer.note}</p>
        <p className="copy">&copy; {new Date().getFullYear()} {d.footer.copyright}.</p>
      </footer>
    </div>
  );
};

if (typeof window !== "undefined") {
  window.Portfolio = Portfolio;
}