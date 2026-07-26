import { motion } from "framer-motion";

const TAG_ICON_COLOR = "#ffe200";

export const ExpirienceCard = ({ project }) => {
  const cardAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const tagAnimation = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.5,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const renderTags = () => (
    <div className="project__tags">
      {project.tags.map((tag, index) => {
        const Icon = tag?.Icon;
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
  );

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
            {renderTags()}
            <p className="project__description">{project.description}</p>
          </div>
        </a>
      ) : (
        <div className="project__content">
          <h1 className="project__title">{project.title} (private)</h1>
          {renderTags()}
          <p className="project__description">{project.description}</p>
        </div>
      )}
    </motion.div>
  );
};
