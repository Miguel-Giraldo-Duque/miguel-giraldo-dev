import { reviews } from "@/data/reviews";

function formatReviewDate(isoDate) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${isoDate}T12:00:00`));
}

function ReviewChat({ review }) {
  return (
    <article className="review-card review-card--chat">
      <header className="review-card__header">
        <span className="review-avatar" aria-hidden="true">
          {review.author.slice(0, 1)}
        </span>
        <div>
          <h3 className="review-card__author">{review.author}</h3>
          <p className="review-card__meta">
            {review.source} · {formatReviewDate(review.date)}
          </p>
        </div>
      </header>
      <div className="review-bubbles">
        {review.messages.map((message) => (
          <p key={message} className="review-bubble">
            {message}
          </p>
        ))}
      </div>
    </article>
  );
}

function ReviewQuote({ review }) {
  return (
    <article className="review-card">
      <blockquote className="review-quote">
        <p>{review.messages[0]}</p>
      </blockquote>
      <footer className="review-card__footer">
        <span className="review-avatar review-avatar--small" aria-hidden="true">
          {review.author.slice(0, 1)}
        </span>
        <div>
          <p className="review-card__author">{review.author}</p>
          <p className="review-card__meta">
            {[review.role, review.source, formatReviewDate(review.date)].filter(Boolean).join(" · ")}
          </p>
        </div>
      </footer>
    </article>
  );
}

export function Reviews() {
  return (
    <section className="reviews" id="reviews" aria-labelledby="reviews-title">
      <p className="section-kicker">Reviews</p>
      <h2 id="reviews-title" className="section-title">
        What it is like to ship something together
      </h2>
      <div className="reviews__grid">
        {reviews.map((review) =>
          review.messages.length > 1 ? (
            <ReviewChat key={review.id} review={review} />
          ) : (
            <ReviewQuote key={review.id} review={review} />
          ),
        )}
      </div>
    </section>
  );
}
