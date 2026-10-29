import {
  SiCss,
  SiCypress,
  SiGraphql,
  SiHtml5,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiShopify,
  SiThreedotjs,
  SiTypescript,
  SiVitest,
} from "react-icons/si";
import { projects } from "@/data/projects";

const TAG_ICON_COLOR = "#ffe200";

const TAG_ICONS = {
  React: SiReact,
  TypeScript: SiTypescript,
  "Next.js": SiNextdotjs,
  Cypress: SiCypress,
  Vitest: SiVitest,
  CSS: SiCss,
  "Node.js": SiNodedotjs,
  GraphQL: SiGraphql,
  HTML: SiHtml5,
  "Three.js": SiThreedotjs,
  Shopify: SiShopify,
};

const skills = ["React", "TypeScript", "Next.js", "Node.js", "UX/UI", "Cypress", "Vitest", "CSS"];

function initials(title) {
  return title
    .split(/\s+/)
    .filter((word) => /^[A-ZÁÉÍÓÚÑ]/.test(word))
    .slice(0, 3)
    .map((word) => word[0])
    .join("");
}

function Tags({ names }) {
  return (
    <div className="project__tags">
      {names.map((name) => {
        const Icon = TAG_ICONS[name];
        return (
          <span key={name} className="project__tag">
            {Icon ? (
              <Icon className="project__tag__icon" color={TAG_ICON_COLOR} size={16} aria-hidden />
            ) : null}
            <span>{name}</span>
          </span>
        );
      })}
    </div>
  );
}

function ProjectMedia({ project }) {
  if (project.image) {
    return <img className="work-row__media" src={project.image} alt="" />;
  }

  return (
    // TODO: remove this slot once project.image points at a real file.
    <div className="work-row__media work-row__placeholder" aria-hidden="true">
      <span>{initials(project.title) || "···"}</span>
    </div>
  );
}

function WorkRow({ project, index, locale, labels }) {
  const copy = (
    <>
      <div className="work-row__copy">
        <p className="work-row__index">
          <span>{String(index + 1).padStart(2, "0")}</span>
          {project.private ? <span className="work-row__private">{labels.private}</span> : null}
          {project.href ? (
            <span className="work-row__arrow" aria-hidden="true">
              →
            </span>
          ) : null}
        </p>
        <h2 className="work-row__title">{project.title}</h2>
        <Tags names={project.tags} />
        <p className="work-row__description">{project.description[locale] ?? project.description.es}</p>
      </div>
      <ProjectMedia project={project} />
    </>
  );

  if (!project.href) {
    return (
      <li>
        <article className="work-row">{copy}</article>
      </li>
    );
  }

  return (
    <li>
      <a className="work-row" href={project.href} target="_blank" rel="noopener noreferrer">
        {copy}
        <span className="sr-only">{labels.newTab}</span>
      </a>
    </li>
  );
}

export function Projects({ dict, locale }) {
  return (
    <section className="work" id="work" aria-labelledby="work-title">
      <header className="portfolio__header">
        <h3 className="portfolio__header__subtitle">{dict.kicker}</h3>
        <h1 id="work-title">
          {dict.titleLine1}
          <br />
          {dict.titleLine2Before} <span className="highlight">{dict.titleHighlight}</span>
        </h1>
        <div className="portfolio__header__tags">
          <Tags names={skills} />
        </div>
      </header>
      <ol className="work-list">
        {projects.map((project, index) => (
          <WorkRow key={project.id} project={project} index={index} locale={locale} labels={dict} />
        ))}
      </ol>
    </section>
  );
}
