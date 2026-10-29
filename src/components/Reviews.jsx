"use client";

import { useState } from "react";
import { reviews } from "@/data/reviews";

function formatReviewDate(isoDate, locale) {
  return new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "es-AR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${isoDate}T12:00:00`));
}

function creditFor(review, locale) {
  return [review.role, review.source, formatReviewDate(review.date, locale)].filter(Boolean).join(" · ");
}

export function Reviews({ dict, locale }) {
  const [index, setIndex] = useState(0);
  const count = reviews.length;
  const current = reviews[index];

  function go(step) {
    setIndex((value) => (value + step + count) % count);
  }

  return (
    <section
      className="reviews"
      id="reviews"
      aria-labelledby="reviews-title"
      aria-roledescription="carousel"
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          go(-1);
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          go(1);
        }
      }}
    >
      <h2 id="reviews-title" className="reviews__title">
        {dict.titleLead} <span className="highlight">{dict.titleHighlight}</span> {dict.titleTail}
        <br />
        {dict.titleSecond}
      </h2>

      <p className="sr-only" aria-live="polite">
        {dict.live
          .replace("{author}", current.author)
          .replace("{current}", String(index + 1))
          .replace("{count}", String(count))}
      </p>

      <div className="review-viewport">
        <div
          className="review-track"
          style={{
            transform: `translateX(calc((100% - var(--slide)) / 2 - ${index} * var(--slide)))`,
          }}
        >
          {reviews.map((review, slideIndex) => {
            const active = slideIndex === index;
            return (
              <div
                key={review.id}
                className={active ? "review-slide is-active" : "review-slide"}
                role={active ? "group" : "button"}
                tabIndex={active ? undefined : 0}
                aria-roledescription="slide"
                aria-label={`${review.author}, ${slideIndex + 1} ${dict.of} ${count}`}
                onClick={() => {
                  if (!active) setIndex(slideIndex);
                }}
                onKeyDown={(event) => {
                  if (active || (event.key !== "Enter" && event.key !== " ")) return;
                  event.preventDefault();
                  setIndex(slideIndex);
                }}
              >
                <article className="testimonial">
                  <header className="testimonial__bar">
                    <span>{dict.window}</span>
                    <span className="testimonial__win" aria-hidden="true">
                      <svg viewBox="0 0 12 12">
                        <path d="M2 6h8" />
                      </svg>
                      <svg viewBox="0 0 12 12">
                        <rect x="2.5" y="2.5" width="7" height="7" />
                      </svg>
                      <svg viewBox="0 0 12 12">
                        <path d="M3 3l6 6M9 3L3 9" />
                      </svg>
                    </span>
                  </header>
                  <div className="testimonial__body">
                    <div className="testimonial__copy">
                      <span className="review-avatar" aria-hidden="true">
                        {review.author.slice(0, 1)}
                      </span>
                      <div>
                        {review.messages.map((message) => (
                          <p key={message}>{message}</p>
                        ))}
                      </div>
                    </div>
                    <p className="testimonial__by">
                      <span className="highlight">{review.author}</span>
                      <span> // {creditFor(review, locale)}</span>
                    </p>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>

      <div className="review-nav">
        <button type="button" aria-label={dict.previous} onClick={() => go(-1)}>
          <span aria-hidden="true">‹</span>
        </button>
        <div
          className="review-nav__meter"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={count}
          aria-valuenow={index + 1}
          aria-label={dict.position}
        >
          <span style={{ width: `${((index + 1) / count) * 100}%` }} />
        </div>
        <button type="button" aria-label={dict.next} onClick={() => go(1)}>
          <span aria-hidden="true">›</span>
        </button>
      </div>
    </section>
  );
}
