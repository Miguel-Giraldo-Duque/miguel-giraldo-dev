import { motion } from "framer-motion";
import "./App.css";
import { ExpirienceCard } from "./Components/ExpirienceCard";

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
      delay: i * 0.2, // Delay escalonado (0.15s entre cada tag)
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
        {
          name: "React",
          icon: {
            url: "./react-logo-react.svg",
            alt: "React logo",
          },
        },
        {
          name: "HTML",
          icon: {
            url: "./html.svg",
            alt: "Html logo",
          },
        },
        {
          name: "Node.js",
          icon: {
            url: "./icon-js-square.svg",
            alt: "Node.js logo",
          },
        },
      ],
    },
    {
      id: 2,
      title: "AI Concept Visuals (Freelance Frontend Developer)",
      description:
        "Created a key visual for Alejandro Giraldo Londoño’s talk, demonstrating AI’s seamless transformation into actionable knowledge. The design framed this cognitive shift as an interactive journey—making abstract ideas tangible and emphasizing human-centric exploration.",
      image: "./particles2.webp",
      projectLink: "https://morhp-particles.vercel.app/",
      tags: [
        {
          name: "React",
          icon: {
            url: "./react-logo-react.svg",
            alt: "React logo",
          },
        },
        {
          name: "HTML",
          icon: {
            url: "./html.svg",
            alt: "Html logo",
          },
        },

        {
          name: "ux/ui",
          icon: {
            url: "./diseño.svg",
            alt: "UX/UI logo",
          },
        },
        {
          name: "Three.js",
          icon: {
            url: "./Three.js.svg",
            alt: "Three.js logo",
          },
        },
      ],
    },
    {
      id: 3, // Fixed duplicate ID (previously "id: 2")
      title: "Andrés Giraldo Portfolio (Freelance Frontend Developer)",
      description:
        "Built responsive landing page components with UX-focused design, leveraging HTML/CSS to strengthen brand identity. Enhanced Andrés’ client conversion rates by 30% through fluid animations and intuitive interfaces.",
      image: "./case-andres.webp",
      projectLink: "https://ambiguous-darlings-317556.framer.app/Vercion-final",
      tags: [
        {
          name: "React",
          icon: {
            url: "./react-logo-react.svg",
            alt: "React logo",
          },
        },
        {
          name: "ux/ui",
          icon: {
            url: "./diseño.svg",
            alt: "UX/UI logo",
          },
        },
        {
          name: "HTML",
          icon: {
            url: "./html.svg",
            alt: "Html logo",
          },
        },
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
        {
          name: "React",
          icon: {
            url: "./react-logo-react.svg",
            alt: "React logo",
          },
        },
        {
          name: "Node.js",
          icon: {
            url: "./icon-js-square.svg",
            alt: "Node.js logo",
          },
        },
        {
          name: "HTML",
          icon: {
            url: "./html.svg",
            alt: "Html logo",
          },
        },
      ],
    },
    {
      id: 5,
      title: "BTZ Sport",
      image: "./btz-sport.webp",
      description:
        "Headless e-commerce storefront for sustainable fashion brand BTZ—Next.js + Shopify GraphQL with size-aware cart, WhatsApp-assisted checkout, sustainability impact metrics, and Spanish/Colombia localization (es-CO, COP) on Vercel.",
      projectLink: "https://www.btzsport.com/",
      tags: [
        {
          name: "React",
          icon: {
            url: "./react-logo-react.svg",
            alt: "React logo",
          },
        },
        {
          name: "Node.js",
          icon: {
            url: "./icon-js-square.svg",
            alt: "Node.js logo",
          },
        },
        {
          name: "ux/ui",
          icon: {
            url: "./diseño.svg",
            alt: "UX/UI logo",
          },
        },
      ],
    },
    {
      id: 6,
      title: "Pasaporte Circular",
      image: "./pasaporte-circular.webp",
      description:
        "Digital garment passport for circular fashion in Latin America—Next.js + TypeScript flows that surface material composition, ownership history, and impact KPIs, plus circular actions (repair, exchange, recycle) for registered garments.",
      projectLink: "https://dpp-ui-omega.vercel.app/login",
      tags: [
        {
          name: "React",
          icon: {
            url: "./react-logo-react.svg",
            alt: "React logo",
          },
        },
        {
          name: "Node.js",
          icon: {
            url: "./icon-js-square.svg",
            alt: "Node.js logo",
          },
        },
        {
          name: "HTML",
          icon: {
            url: "./html.svg",
            alt: "Html logo",
          },
        },
      ],
    },
  ];

  const tags = [
    {
      name: "React",
      icon: {
        url: "./react-logo-react.svg",
        alt: "React logo",
      },
    },
    {
      name: "ux/ui",
      icon: {
        url: "./diseño.svg",
        alt: "UX/UI logo",
      },
    },
    {
      name: "HTML ",
      icon: {
        url: "./html.svg",
        alt: "Html logo",
      },
    },
    {
      name: "Javascript ",
      icon: {
        url: "./icon-js-square.svg",
        alt: "Javascript logo",
      },
    },
    {
      name: "Node.js",
      icon: {
        url: "./icon-js-square.svg",
        alt: "Node.js logo",
      },
    },
    {
      name: "MySql ",
      icon: {
        url: "./mysql.svg",
        alt: "MySql logo",
      },
    },
    {
      name: "Three.js",
      icon: {
        url: "./Three.js.svg",
        alt: "Three.js logo",
      },
    },
    {
      name: "CSS",
      icon: {
        url: "./css.svg",
        alt: "CSS.js logo",
      },
    },
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
          width="220" // Ancho explícito (ajusta según diseño)
          height="212" // Alto explícito (ajusta según diseño
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
                full-stack developer with 1+ years of experience . Currently
                working at quantum computing startup{" "}
                <a
                  href="https://www.linkedin.com/company/qnow-tech/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Qnow
                </a>
              </strong>
            </span>
            , I build end-to-end products while practicing calisthenics in my
            free time.
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
          {tags.map((tag, index) => (
            <motion.div
              key={tag?.name}
              className="project__tag"
              variants={tagAnimation}
              custom={index} // Índice para el delay escalonado
              initial="hidden"
              animate="visible"
            >
              {tag?.icon?.url && (
                <img
                  src={tag.icon.url}
                  alt={tag.icon.alt || "Tag icon"}
                  className="project__tag__icon"
                />
              )}
              <span>{tag?.name}</span>
            </motion.div>
          ))}
        </div>
      </header>

      <section className="projects-grid">
        {projects.map((project) => (
          <ExpirienceCard key={project.id} project={project} /> // Added missing `key`
        ))}
      </section>
    </motion.div>
  );
}

export default App;
