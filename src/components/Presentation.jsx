"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SAME_AS } from "@/lib/site";

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

const [linkedinUrl, githubUrl] = SAME_AS;

export function Presentation({ dict }) {
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
      <Image
        className="presentation__photo"
        src="/FotoPerfil2.webp"
        alt="Miguel Angel Giraldo Duque"
        width={220}
        height={220}
        priority
        sizes="(max-width: 740px) 160px, 220px"
      />
      <div className="presentation__info">
        <motion.h1 variants={itemVariants}>Miguel Angel Giraldo Duque</motion.h1>
        <motion.p variants={itemVariants}>
          {dict.before}{" "}
          <span className="highlight">
            <strong>{dict.highlight}</strong>
          </span>
          {dict.after}{" "}
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
          <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
            <img src="/linkedin.svg" alt="LinkedIn" width={25} height={25} />
          </a>
          <a href={githubUrl} target="_blank" rel="noopener noreferrer">
            <img src="/github.svg" alt="GitHub" width={25} height={25} />
          </a>
        </div>
      </div>
    </motion.section>
  );
}
