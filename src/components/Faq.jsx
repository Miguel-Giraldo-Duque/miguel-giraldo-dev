export function Faq({ dict }) {
  if (!dict?.items?.length) return null;

  return (
    <section id="faq" className="faq" aria-labelledby="faq-title">
      <p className="faq__kicker">{dict.kicker}</p>
      <h2 id="faq-title" className="faq__title">
        {dict.title}
      </h2>
      <p className="faq__lead">{dict.lead}</p>
      <div className="faq__list">
        {dict.items.map((item) => (
          <details key={item.question} className="faq__item">
            <summary className="faq__summary">
              <span className="faq__question">{item.question}</span>
              <span className="faq__chevron" aria-hidden="true" />
            </summary>
            <p className="faq__answer">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
