# SEO / GEO for Forward Deployed AI Engineer positioning

Research and implementation notes for repositioning [miguelgd.com](https://www.miguelgd.com) toward recruiters hiring **Forward Deployed Engineer (FDE)**, **Applied AI Engineer**, and **Full-stack AI Engineer** roles (remote LatAm / international + Buenos Aires), without inventing experience.

## Market keywords (EN)

Recruiters and boards rarely use a single title. Common strings from 2025–2026 hiring writeups:

| Keyword / title | Why it matters | Sources |
| --- | --- | --- |
| Forward Deployed Engineer / Forward Deployed Software Engineer | Canonical FDE label (Palantir lineage; OpenAI, Databricks, Salesforce, Scale, Anthropic variants) | [FDE Dispatch — job titles](https://fdedispatch.com/fde-job-titles/), [HeroHunt 2026 guide](https://www.herohunt.ai/blog/recruiting-forward-deployed-engineers-2026/) |
| Applied AI Engineer | Used by labs (e.g. Anthropic Applied AI) and LatAm hiring posts | [FDE Dispatch](https://fdedispatch.com/fde-job-titles/), [Traxxia LinkedIn post](https://es.linkedin.com/posts/carlosniezen_perfil-del-applied-ai-full-stack-engineer-activity-7524224019252813824-w1zm) |
| AI Engineer, FDE / Frontier Agents Engineer | Databricks / Scale wording; agents + evals + guardrails show up in posting text | [FDE Dispatch](https://fdedispatch.com/fde-job-titles/), [GSDC FDE Job Hunt Kit](https://gsdcdata.gsdcouncil.org/gsdc/pdf/GSDC-FDE-Job-Hunt-Kit.pdf) |
| Full-stack AI engineer / Fullstack AI Software Engineer | LatAm remote postings pairing React/Next with LLM/RAG/agents | [Futureproofing Ashby](https://jobs.ashbyhq.com/futureproofing/2e49af5e-3415-46a9-ad0b-aa1516a99096), [Ruzora](https://www.ruzora.com/es/jobs/fullstack-ai-engineer), [LatamCent](https://jobs.ashbyhq.com/latamcent/d902fcc5-3058-4224-91f7-467137b02ecf/application) |
| AI Solutions / Implementation / Deployment Engineer | Broader semantic matches when literal “FDE” is missing | [Onward Deployed](https://onwarddeployed.com/), [Refolk sourcing note](https://www.refolk.ai/blog/how-to-source-forward-deployed-engineers) |

**Stack phrases that appear next to those titles:** TypeScript, Python, agents, LLM, RAG, evals, tool calling, MCP, Next.js/React, customer-facing delivery.

**Chosen primary keywords for this site:** `Forward Deployed Engineer`, `Applied AI Engineer`, `Full-stack AI Engineer`, plus evidenced stack (`Next.js`, `TypeScript`, `React`, `Node.js`, `Cypress`, `Vitest`). Secondary: knowledge graphs / customer delivery (already in projects/reviews). **Not claimed as shipped skills yet:** production RAG, GraphRAG demo, MCP integrations — mark for Miguel when the public demo lands.

## Market keywords (ES)

| Keyword | Context |
| --- | --- |
| Ingeniero/a Fullstack de IA | Used in LatAm remote listings (e.g. Ruzora) |
| Applied AI Full Stack Engineer | Bilingual LatAm hiring posts |
| Forward Deployed / ingeniero de despliegue de IA | Less standardized in Spanish; English title often kept |
| Remoto LatAm / Buenos Aires | Geography filters recruiters use |

Spanish copy on `/es` mirrors the English intent but keeps “Forward Deployed / Applied AI Engineer” as searchable role names.

## GEO (generative engine optimization)

Order of work used here (aligned with public GEO/AEO writeups):

1. **Crawlable identity** — unique titles/descriptions, canonical + hreflang, sitemap, robots with sitemap.
2. **Answer-shaped copy** — hero states who / stack / role target / city in the first viewport; FAQ answers stand alone.
3. **Honest structured data** — `ProfilePage` + `Person` + `WebSite` + `FAQPage` JSON-LD matching visible text; `sameAs` → LinkedIn + GitHub.
4. **Optional machine file** — `/llms.txt` per [llmstxt.org](https://llmstxt.org/) (cheap; not a Google ranking lever).

References: [Dinesh Solanki — SEO/AEO/GEO for engineer portfolios](https://dineshsolanki.in/blogs/geo-aeo-seo-for-engineer-portfolio/), [Person + llms.txt ADR](https://chrispezza.com/adr/067-person-entity-and-llms-txt/), [Portfolio AI search notes](https://hussain-nazary.github.io/portfolio-ai-search-optimization.html), [Karenya Lin — LLM SEO settings](https://karenyalin.com/en/blog/llm-search-optimization-ten-steps).

## What shipped in code

- Titles, meta descriptions, Open Graph, Twitter cards, `metadataBase`, canonical + `hreflang` (`es` / `en` / `x-default`).
- Hero + contact + privacy purpose repositioned away from cheap local landing CTAs.
- Visible FAQ (ES/EN) + matching `FAQPage` JSON-LD.
- `Person` / `ProfilePage` / `WebSite` JSON-LD with `sameAs` and `knowsAbout`.
- `src/app/sitemap.js`, `src/app/robots.js`, `public/llms.txt`.
- Hero uses `next/image`; project thumbs get width/height + lazy loading; name is `h1`.

## Checklist for Miguel (outside this PR)

- [x] LinkedIn public URL confirmed: `https://www.linkedin.com/in/miguel-giraldo-duque/` (old `miguel-giraldo-duke-5a680b299` was 404). Wired into hero + `sameAs`.
- [ ] Rewrite LinkedIn headline + About with the same role keywords (FDE / Applied AI / Full-stack AI + Next.js/TypeScript + Buenos Aires / remote).
- [ ] Set Open to Work for recruiters; Featured → portfolio + best case (UDA narrative / Qnow Space).
- [ ] Declare English level on site + LinkedIn (TODO in FAQ until then).
- [ ] Reconfirm “+4 years Full Stack / +2 UX” when dates move.
- [ ] Ship the public GraphRAG / agent demo, then add it to projects, `llms.txt`, `knowsAbout`, and FAQ — do not claim MCP/RAG in production before that.
- [ ] Add YouTube (or talks) to `sameAs` only if a real channel exists.
- [ ] Google Search Console: verify `www.miguelgd.com`, submit sitemap `https://www.miguelgd.com/sitemap.xml`, inspect `/es` and `/en`.
- [ ] Validate JSON-LD in [Google Rich Results Test](https://search.google.com/test/rich-results) and schema.org validator.
- [ ] Lawyer review of `/privacidad` (still a draft).
- [ ] Optional: compress review PNGs (Luis ~844KB) to WebP for CWV.
- [ ] Keep Qnow landing-page marketing paused as primary CTA; site contact is employer/product first.
