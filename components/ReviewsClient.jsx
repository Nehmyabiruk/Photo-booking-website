'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import '@/styles/pages/reviews.css';
import '@/styles/pages/reviews-extra.css';

const reviews = [
  { initial: 'M', name: 'Miriam & Daniel T.', cat: 'weddings', badge: 'Wedding', date: 'October 2024', text: 'Amen Pictures captured our wedding day beyond our wildest dreams. Every emotion, every detail — preserved forever. They understood our Ethiopian traditions and made everything beautiful. The film they produced made us cry happy tears every time we watch it.' },
  { initial: 'J', name: 'James K.', cat: 'events', badge: 'Corporate', date: 'August 2024', text: 'Professional, punctual, and incredibly talented. Our corporate conference looked stunning in photos. The team was unobtrusive but caught every key moment perfectly. We will definitely be hiring Amen Pictures for all our future events.' },
  { initial: 'S', name: 'Selamawit A.', cat: 'portraits', badge: 'Graduation', date: 'May 2024', text: "My daughter's graduation photos are absolutely stunning. Amen Pictures has a gift for capturing real, authentic moments — not stiff poses. We will treasure these photos forever. The turnaround was fast and the online gallery was easy to share with family." },
  { initial: 'H', name: 'Hana B.', cat: 'events', badge: 'Birthday', date: 'July 2024', text: "We hired Amen Pictures for my 30th birthday celebration and couldn't be happier. The photos were delivered fast, the editing was flawless, and everyone at the party loved the photographer's energy. They made everyone feel comfortable and natural." },
  { initial: 'T', name: 'Tigist & Yonas M.', cat: 'weddings', badge: 'Wedding', date: 'September 2024', text: 'From the consultation to the gallery delivery, Amen Pictures was exceptional. They captured our habesha wedding with such cultural sensitivity and artistry. They knew exactly when the most important moments would happen and were ready. Highly recommend!' },
  { initial: 'A', name: 'Almaz G.', cat: 'portraits', badge: 'Family', date: 'June 2024', text: 'We booked Amen Pictures for our family reunion photos and they exceeded every expectation. Managing a large Ethiopian family gathering is no easy task, but they handled it with grace, humor, and professionalism. The photos are stunning.' },
  { initial: 'L', name: 'Liya & Solomon B.', cat: 'weddings', badge: 'Wedding', date: 'August 2024', text: '10/10, no question. The photos from our wedding are magazine-quality. Our guests are still talking about how amazing the photographer was. Amen Pictures is worth every penny and then some. We are so grateful we chose them.' },
  { initial: 'F', name: 'Father Dawit M.', cat: 'events', badge: 'Religious', date: 'April 2024', text: "Amen Pictures documented our church anniversary celebration beautifully. They worked quietly and respectfully during the service, then captured all the joyful moments during the reception. The photos brought tears to our congregation's eyes." },
  { initial: 'Y', name: 'Yordanos T.', cat: 'portraits', badge: 'Headshots', date: 'March 2024', text: 'I needed updated professional headshots and Amen Pictures delivered beyond my expectations. They made me feel comfortable immediately, guided me through poses, and the results look like something from a fashion magazine. I got compliments on LinkedIn right away!' },
];

const filters = [
  { key: 'all', label: 'All Reviews' },
  { key: 'weddings', label: 'Weddings' },
  { key: 'events', label: 'Events' },
  { key: 'portraits', label: 'Portraits' },
];

export default function ReviewsClient() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [reviewName, setReviewName] = useState('');
  const [reviewEmail, setReviewEmail] = useState('');
  const [reviewRating, setReviewRating] = useState('');
  const [reviewMessage, setReviewMessage] = useState('');

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: reviewName,
          email: reviewEmail,
          rating: reviewRating,
          review: reviewMessage,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Review submitted successfully!');
        setReviewName('');
        setReviewEmail('');
        setReviewRating('');
        setReviewMessage('');
      } else {
        alert('Failed to submit review.');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong.');
    }
  };

  useScrollReveal();

  const visible = reviews.filter(r => activeFilter === 'all' || r.cat === activeFilter);

  return (
    <>
      {/* HERO */}
      <section className="page-hero reviews-hero" aria-label="Reviews page hero">
        <div className="page-hero-overlay" aria-hidden="true" />
        <div className="page-hero-content reveal-up">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true"> → </span>
            <span aria-current="page">Reviews</span>
          </nav>
          <h1>Client Reviews</h1>
          <p>Real stories from real clients — see what people are saying about Amen Pictures.</p>
        </div>
      </section>

      {/* RATING SUMMARY */}
      <section className="rating-summary section-padding-sm dark-section" aria-label="Overall rating">
        <div className="container">
          <div className="rating-display reveal-up">
            <div className="rating-score">
              <span className="score-number">5.0</span>
              <div className="rating-stars" aria-label="5 stars">★★★★★</div>
              <p>Average Rating</p>
              <p className="rating-total">Based on 100+ reviews</p>
            </div>
            <div className="rating-platforms">
              {[
                { icon: 'fa-google', name: 'Google', rating: '5.0', count: '80+ reviews' },
                { icon: 'fa-facebook', name: 'Facebook', rating: '5.0', count: '20+ reviews' },
                { icon: 'fa-yelp', name: 'Yelp', rating: '5.0', count: '10+ reviews' },
              ].map(p => (
                <div className="platform-badge" key={p.name}>
                  <i className={`fab ${p.icon}`} aria-hidden="true" />
                  <div>
                    <strong>{p.name}</strong>
                    <span>{p.rating} ★ — {p.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS GRID */}
      <section className="reviews-section section-padding" aria-label="Client reviews">
        <div className="container">
          {/* Filter */}
          <div className="filter-bar reveal-up" role="group" aria-label="Filter reviews by category">
            {filters.map(f => (
              <button
                key={f.key}
                className={`filter-btn ${activeFilter === f.key ? 'active' : ''}`}
                onClick={() => setActiveFilter(f.key)}
                aria-pressed={activeFilter === f.key}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Reviews Grid */}
          <div className="reviews-grid" id="reviewsGrid">
            {visible.map((r, i) => (
              <article 
                className="review-card reveal-up" 
                key={i} 
                data-category={r.cat}
                style={{ animationDelay: `${0.1 + i * 0.05}s` }}
              >
                <div className="review-header">
                  <div className="reviewer-avatar" aria-hidden="true">{r.initial}</div>
                  <div className="reviewer-info">
                    <strong className="reviewer-name">{r.name}</strong>
                    <div className="review-meta">
                      <span className="event-badge">{r.badge}</span>
                      <span className="review-date">{r.date}</span>
                    </div>
                  </div>
                  <div className="review-stars" aria-label="5 out of 5 stars">★★★★★</div>
                </div>
                <blockquote className="review-text">
                  <p>&ldquo;{r.text}&rdquo;</p>
                </blockquote>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* LEAVE A REVIEW */}
      <section className="leave-review-section section-padding dark-section">
        <div className="container">
          <div className="section-header reveal-up">
            <span className="section-tag">Share Your Experience</span>
            <h2 className="section-title">Leave a Review</h2>
            <p className="section-sub">
              We'd love to hear about your experience with Amen Pictures.
            </p>
          </div>

          <form onSubmit={handleReviewSubmit} className="review-form">
            <div className="form-group">
              <input
                type="text"
                placeholder="Your Name"
                value={reviewName}
                onChange={(e) => setReviewName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                placeholder="Your Email"
                value={reviewEmail}
                onChange={(e) => setReviewEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <select
                value={reviewRating}
                onChange={(e) => setReviewRating(e.target.value)}
                required
              >
                <option value="">Select Rating</option>
                <option value="5">⭐️⭐️⭐️⭐️⭐️ Excellent</option>
                <option value="4">⭐️⭐️⭐️⭐️ Very Good</option>
                <option value="3">⭐️⭐️⭐️ Good</option>
                <option value="2">⭐️⭐️ Fair</option>
                <option value="1">⭐️ Poor</option>
              </select>
            </div>

            <div className="form-group">
              <textarea
                rows="5"
                placeholder="Write your review..."
                value={reviewMessage}
                onChange={(e) => setReviewMessage(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-gold">
              Submit Review
            </button>
          </form>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner" aria-label="Call to action">
        <div className="container cta-content reveal-up">
          <h2>Ready to create your own memories?</h2>
          <p>Join 1,000+ happy clients. Book your session today.</p>
          <div className="cta-buttons">
            <Link href="/contact" className="btn btn-black">Book Now</Link>
            <Link href="/portfolio" className="btn btn-black-outline">View Portfolio</Link>
          </div>
        </div>
      </section>
    </>
  );
}