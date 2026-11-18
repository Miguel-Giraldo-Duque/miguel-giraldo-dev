/**
 * Single source of truth for SEO / GEO / schema identity.
 * Keep values aligned with visible copy in dictionaries and Presentation.
 *
 * LinkedIn confirmed by Miguel: https://www.linkedin.com/in/miguel-giraldo-duque/
 * TODO(Miguel): add YouTube (or other) sameAs when a public channel exists.
 * TODO(Miguel): confirm English level for meta/FAQ (not stated on the site yet).
 * TODO(Miguel): reconfirm “+4 / +2 years” claims when they change.
 */
export const SITE_URL = "https://www.miguelgd.com";

export const PERSON = {
  name: "Miguel Angel Giraldo Duque",
  givenName: "Miguel Angel",
  familyName: "Giraldo Duque",
  alternateName: ["Miguel Giraldo", "Miguel Giraldo Duque"],
  // Matches the current hero framing: Full Stack + UX background, FDE/Applied AI focus.
  jobTitle: "Full Stack Developer",
  email: "hola@miguelgd.com",
  imagePath: "/FotoPerfil2.webp",
  homePath: "/es",
  location: {
    locality: "Buenos Aires",
    country: "AR",
  },
};

export const SAME_AS = [
  "https://www.linkedin.com/in/miguel-giraldo-duque/",
  "https://github.com/Miguel-Giraldo-Duque",
];

/**
 * Topics evidenced by projects, skills strip, or peer reviews on this site.
 * Do not add MCP / production RAG / GraphRAG until a public demo exists.
 */
export const KNOWS_ABOUT = [
  "Full Stack development",
  "Next.js",
  "TypeScript",
  "React",
  "Node.js",
  "UX/UI design",
  "Cypress",
  "Vitest",
  "Knowledge graph visualization",
  "Customer-facing product delivery",
  "Forward Deployed Engineer",
  "Applied AI Engineer",
  "Full-stack AI engineer",
];

export function absoluteUrl(path = "/") {
  if (!path || path === "/") return SITE_URL;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function localeHomePath(locale) {
  return `/${locale}`;
}

export function localePrivacyPath(locale) {
  return `/${locale}/privacidad`;
}
