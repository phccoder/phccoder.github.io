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
  external: "M14 3h7v7M21 3l-9.5 9.5M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
};

const Icon = ({ name, size = 16, className }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill={name === "github" || name === "telegram" ? "currentColor" : "none"} stroke={name === "github" || name === "telegram" ? "none" : "currentColor"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
          <h3 className="skill-group-title">{g.group}</h3>
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
  const entries = ["github", "website", "email", "telegram", "linkedin", "kofi", "facebook"].map((k) => contact[k]).filter(Boolean);
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
            <span className="contact-label">{c.label}</span>
            {c.href && <span className="contact-href">{c.href.replace(/^mailto:|^https?:\/\//, "") || "Set your LinkedIn URL in portfolio.json"}</span>}
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