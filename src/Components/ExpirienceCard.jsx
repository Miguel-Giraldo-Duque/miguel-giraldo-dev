import { motion } from "framer-motion";

export const ExpirienceCard = ({ project }) => {
  // Animación para la CARD (fade-in + ligero desplazamiento desde abajo)
  const cardAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Animación para los TAGS (fade-in + desplazamiento con delay escalonado)
  const tagAnimation = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.5, // Delay escalonado (0.15s entre cada tag)
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <motion.div
      key={project.id}
      className="project__card"
      variants={cardAnimation}
      initial="hidden"
      animate="visible"
    >
      <img src={project.image} alt={project.title} className="project-image" />

      {project.projectLink ? (
        <a
          href={project.projectLink}
          style={{ textDecoration: "none", color: "white" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="project__content">
            <h1 className="project__title">{project.title}</h1>

            {/* Contenedor de TAGS con animación escalonada */}
            <div className="project__tags">
              {project.tags.map((tag, index) => (
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

            <p className="project__description">{project.description}</p>
          </div>
        </a>
      ) : (
        <div className="project__content">
          <h1 className="project__title">{project.title} (private)</h1>

          {/* Contenedor de TAGS con animación escalonada */}
          <div className="project__tags">
            {project.tags.map((tag, index) => (
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

          <p className="project__description">{project.description}</p>
        </div>
      )}
    </motion.div>
  );
};
