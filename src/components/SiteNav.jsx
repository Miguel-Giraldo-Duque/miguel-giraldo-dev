export function SiteNav({ dict }) {
  return (
    <nav className="site-nav" aria-label={dict.label}>
      <a href="#work">{dict.work}</a>
      <a href="#reviews">{dict.reviews}</a>
      <a href="#contact">{dict.contact}</a>
    </nav>
  );
}
