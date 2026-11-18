export function Faq({ dict }) {
  if (!dict?.items?.length) return null;

  return (
    <section id="faq" className="faq" aria-labelledby="faq-title">
      <p className="faq__kicker">{dict.kicker}</p>
      <h2 id="faq-title" className="faq__title">
        {dict.title}
      </h2>
      <p className="faq__lead">{dict.lead}</p>
      <dl className="faq__list">
        {dict.items.map((item) => (
          <div key={item.question} className="faq__item">
            <dt>
              <h3>{item.question}</h3>
            </dt>
            <dd>{item.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
