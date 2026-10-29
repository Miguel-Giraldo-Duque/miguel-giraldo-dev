"use client";

import { motion } from "framer-motion";

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

export function Presentation() {
  return (
    <motion.section
      className="presentation"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
      }}
    >
      <img
        src="/FotoPerfil2.webp"
        alt="Miguel Angel Giraldo"
        loading="eager"
        fetchPriority="high"
        width="220"
        height="212"
      />
      <div className="presentation__info">
        <motion.h2 variants={itemVariants}>Miguel Angel Giraldo Duque</motion.h2>
        <motion.p variants={itemVariants}>
          {" "}
          Born in Colombia and based in Buenos Aires, Argentina, I’m a
          <span className="highlight">
            <strong>
              {" "}
              Full Stack Developer with +4 years of experience and +2 years as a UX/UI designer
            </strong>
          </span>
          . I combine engineering and design to build end-to-end products—from interface and
          business logic to integration and deployment—across sustainable fashion e-commerce as
          well as quantum computing and knowledge mining at{" "}
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
            <img src="/linkedin.svg" alt="LinkedIn" />
          </a>
          <a
            href="https://github.com/Miguel-Giraldo-Duque"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/github.svg" alt="GitHub" />
          </a>
        </div>
      </div>
    </motion.section>
  );
}
