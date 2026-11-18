import {
  KNOWS_ABOUT,
  PERSON,
  SAME_AS,
  SITE_URL,
  absoluteUrl,
  localeHomePath,
} from "./site";

/**
 * Build a ProfilePage + Person + WebSite + FAQPage graph for the home page.
 * FAQ answers must match the visible FAQ copy (pass `faq.items` from the dictionary).
 */
export function buildHomeJsonLd({ locale, description, faqItems }) {
  const pageUrl = absoluteUrl(localeHomePath(locale));
  const personId = `${SITE_URL}/#person`;
  const websiteId = `${SITE_URL}/#website`;
  const profileId = `${pageUrl}#profile`;

  const person = {
    "@type": "Person",
    "@id": personId,
    name: PERSON.name,
    givenName: PERSON.givenName,
    familyName: PERSON.familyName,
    alternateName: PERSON.alternateName,
    url: absoluteUrl(PERSON.homePath),
    image: absoluteUrl(PERSON.imagePath),
    jobTitle: PERSON.jobTitle,
    email: PERSON.email,
    description,
    knowsAbout: KNOWS_ABOUT,
    sameAs: SAME_AS,
    address: {
      "@type": "PostalAddress",
      addressLocality: PERSON.location.locality,
      addressCountry: PERSON.location.country,
    },
    worksFor: {
      "@type": "Organization",
      name: "Qnow",
      url: "https://www.linkedin.com/company/qnow-tech/",
    },
  };

  const website = {
    "@type": "WebSite",
    "@id": websiteId,
    url: SITE_URL,
    name: PERSON.name,
    description,
    inLanguage: ["es", "en"],
    publisher: { "@id": personId },
  };

  const profilePage = {
    "@type": "ProfilePage",
    "@id": profileId,
    url: pageUrl,
    name: PERSON.name,
    inLanguage: locale,
    isPartOf: { "@id": websiteId },
    mainEntity: { "@id": personId },
    about: { "@id": personId },
  };

  const graph = [website, person, profilePage];

  if (Array.isArray(faqItems) && faqItems.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      url: pageUrl,
      inLanguage: locale,
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
