import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiGraphql,
  SiNodedotjs,
  SiCss,
  SiHtml5,
  SiThreedotjs,
  SiCypress,
  SiVitest,
} from "react-icons/si";
import "./App.css";
import { ExpirienceCard } from "./Components/ExpirienceCard";

const TAG_ICON_COLOR = "#ffe200";

// Configuración de animaciones reutilizables
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const tagAnimation = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

function App() {
  const projects = [
    {
      id: 1,
      title: "UDA Full-Stack Developer",
      image: "./UDA2.webp",
      description:
        "As Frontend Lead, I spearheaded development while contributing to backend architecture. At QNOW, I helped launch 'UDA'—the company's first profitable project—an automated payment-review system processing 10,000+ transactions, slashing client operational costs by 80% through streamlined workflows.",
      projectLink: null,
      tags: [
        { name: "React", Icon: SiReact },
        { name: "TypeScript", Icon: SiTypescript },
        { name: "Next.js", Icon: SiNextdotjs },
        { name: "Cypress", Icon: SiCypress },
        { name: "Vitest", Icon: SiVitest },
        { name: "CSS", Icon: SiCss },
        { name: "Node.js", Icon: SiNodedotjs },
      ],
    },
    {
      id: 4,
      title: "Qnow Space",
      image: "./qnow-space.webp",
      description:
        "Built and shipped QnowTech’s corporate site on Next.js App Router + Sanity CMS—live content editing, knowledge-graph visualization for fintech trust cases, and GTM analytics. Public face of Qnow’s product work alongside private UDA delivery.",
      projectLink: "https://qnow.space/",
      tags: [
        { name: "Next.js", Icon: SiNextdotjs },
        { name: "TypeScript", Icon: SiTypescript },
        { name: "React", Icon: SiReact },
        { name: "UX/UI" },
      ],
    },
    {
      id: 5,
      title: "BTZ Sport (Contractor Full Stack Developer)",
      image: "./btz-sport.webp",
      description:
        "Headless e-commerce storefront for sustainable fashion brand BTZ—Next.js + Shopify GraphQL with size-aware cart, WhatsApp-assisted checkout, sustainability impact metrics, and Spanish/Colombia localization (es-CO, COP) on Vercel.",
      projectLink: "https://www.btzsport.com/",
      tags: [
        { name: "GraphQL", Icon: SiGraphql },
        { name: "Next.js", Icon: SiNextdotjs },
        { name: "React", Icon: SiReact },
      ],
    },
    {
      id: 6,
      title: "Closet dinamico (Contractor Full Stack Developer)",
      image: "./pasaporte-circular.webp",
      description:
        "Digital garment passport for circular fashion in Latin America—Next.js + TypeScript flows that surface material composition, ownership history, and impact KPIs, plus circular actions (repair, exchange, recycle) for registered garments.",
      projectLink: "https://dpp-ui-omega.vercel.app/login",
      tags: [
        { name: "React", Icon: SiReact },
        { name: "Node.js", Icon: SiNodedotjs },
        { name: "Next.js", Icon: SiNextdotjs },
      ],
    },
    {
      id: 2,
      title: "AI Concept Visuals (Contractor Frontend Developer)",
      description:
        "Created a key visual for Alejandro Giraldo Londoño’s talk, demonstrating AI’s seamless transformation into actionable knowledge. The design framed this cognitive shift as an interactive journey—making abstract ideas tangible and emphasizing human-centric exploration.",
      image: "./particles2.webp",
      projectLink: "https://morhp-particles.vercel.app/",
      tags: [
        { name: "React", Icon: SiReact },
        { name: "HTML", Icon: SiHtml5 },
        { name: "UX/UI" },
        { name: "Three.js", Icon: SiThreedotjs },
      ],
    },
    {
      id: 3,
      title: "Andrés Giraldo Portfolio (Contractor Frontend Developer)",
      description:
        "Built responsive landing page components with UX-focused design, leveraging HTML/CSS to strengthen brand identity. Enhanced Andrés’ client conversion rates by 30% through fluid animations and intuitive interfaces.",
      image: "./case-andres.webp",
      projectLink: "https://ambiguous-darlings-317556.framer.app/Vercion-final",
      tags: [
        { name: "React", Icon: SiReact },
        { name: "UX/UI" },
        { name: "HTML", Icon: SiHtml5 },
      ],
    },
  ];

  const tags = [
    { name: "React", Icon: SiReact },
    { name: "TypeScript", Icon: SiTypescript },
    { name: "Next.js", Icon: SiNextdotjs },
    { name: "Node.js", Icon: SiNodedotjs },
    { name: "UX/UI" },
    { name: "Cypress", Icon: SiCypress },
    { name: "Vitest", Icon: SiVitest },
    { name: "CSS", Icon: SiCss },
  ];

  return (
    <motion.div
      className="container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <section className="presentation">
        <img
          src="./FotoPerfil2.webp"
          alt="Miguel Angel Giraldo"
          loading="eager"
          fetchPriority="high"
          width="220"
          height="212"
        />
        <div className="presentation__info">
          <motion.h2 variants={itemVariants}>
            Miguel Angel Giraldo Duque
          </motion.h2>
          <motion.p variants={itemVariants}>
            {" "}
            Born in Colombia and based in Buenos Aires, Argentina, I’m a
            <span className="highlight">
              <strong>
                {" "}
                Full Stack Developer with +4 years of experience and +2 years as
                a UX/UI designer
              </strong>
            </span>
            . I combine engineering and design to build end-to-end products—from
            interface and business logic to integration and deployment—across
            sustainable fashion e-commerce as well as quantum computing and
            knowledge mining at{" "}
            <a
              href="https://www.linkedin.com/company/qnow-tech/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
            >
              Qnow
            </a>
            .
          </motion.p>

          <div className="presentation__info__social">
            <a
              href="https://www.linkedin.com/in/miguel-giraldo-duke-5a680b299/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="./linkedin.svg" alt="LinkedIn" />
            </a>
            <a
              href="https://github.com/Miguel-Giraldo-Duque"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="./github.svg" alt="GitHub" />
            </a>
          </div>
        </div>
      </section>

      <div className="color__1"></div>

      <div className="color__2"></div>

      <header className="portfolio__header">
        <h3 className="portfolio__header__subtitle">Experience</h3>
        <h1>
          What I Learn and
          <br />
          Apply to the <span className="highlight">World</span>
        </h1>
        <div className="portfolio__header__tags">
          {tags.map((tag, index) => {
            const Icon = tag.Icon;
            return (
              <motion.div
                key={tag?.name}
                className="project__tag"
                variants={tagAnimation}
                custom={index}
                initial="hidden"
                animate="visible"
              >
                {Icon && (
                  <Icon
                    className="project__tag__icon"
                    color={TAG_ICON_COLOR}
                    size={16}
                    aria-hidden
                  />
                )}
                <span>{tag?.name}</span>
              </motion.div>
            );
          })}
        </div>
      </header>

      <section className="projects-grid">
        {projects.map((project) => (
          <ExpirienceCard key={project.id} project={project} />
        ))}
      </section>
    </motion.div>
  );
}

export default App;
