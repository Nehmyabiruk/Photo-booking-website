'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import '@/styles/pages/services.css';

const photographyItems = [
  { icon: 'fa-heart',          titleEn: 'Wedding Photography',                  descEn: 'Complete wedding day coverage from prep to reception.' },
  { icon: 'fa-ring',           titleEn: 'Engagement Sessions',                  descEn: 'Romantic, natural engagement portraits at your favorite locations.' },
  { icon: 'fa-user',           titleEn: 'Portrait Photography',                 descEn: 'Professional headshots, family portraits, and personal branding imagery.' },
  { icon: 'fa-briefcase',      titleEn: 'Corporate / Branding Shoots',          descEn: 'Elevate your brand with polished, professional business photography.' },
  { icon: 'fa-star',           titleEn: 'Ethiopian Cultural Event Photography', descEn: 'Habesha weddings, timkat, meskel, and all Ethiopian community celebrations.' },
  { icon: 'fa-calendar-check', titleEn: 'Event Photography',                    descEn: 'Birthdays, graduations, galas, conferences — every event deserves documentation.' },
];

const videographyItems = [
  { icon: 'fa-film',         titleEn: 'Wedding Films',                descEn: 'Cinematic wedding films from highlight reels to full-length feature films.' },
  { icon: 'fa-play-circle',  titleEn: 'Event Highlight Videos',       descEn: 'Energetic, punchy highlight reels that capture the best of your event.' },
  { icon: 'fa-building',     titleEn: 'Corporate Promo Videos',       descEn: 'Professional brand videos, product demos, and corporate communications.' },
  { icon: 'fa-mobile-alt',   titleEn: 'Short Reels (Instagram/TikTok)',descEn: 'Vertical format social media content optimized for maximum engagement.' },
  { icon: 'fa-music',        titleEn: 'Music Videos',                 descEn: 'Creative music video production for artists in the DMV Ethiopian community.' },
  { icon: 'fa-photo-video',  titleEn: 'Documentary Films',            descEn: 'Long-form documentary filmmaking for community events and cultural stories.' },
];

const eventTypes = [
  { icon: 'fa-glass-cheers', titleEn: 'Weddings & Engagements',         descEn: 'From intimate ceremonies to grand habesha celebrations.' },
  { icon: 'fa-graduation-cap',titleEn: 'Graduations & Milestones',      descEn: 'Capture the achievement. Honor the journey.' },
  { icon: 'fa-birthday-cake', titleEn: 'Birthday & Anniversary Parties', descEn: 'Every milestone worth celebrating is worth documenting.' },
  { icon: 'fa-briefcase',     titleEn: 'Corporate Events & Conferences', descEn: 'Professional coverage for business events of all scales.' },
  { icon: 'fa-church',        titleEn: 'Religious & Cultural Ceremonies', descEn: 'Timkat, meskel, tezkar, and all sacred occasions.' },
  { icon: 'fa-music',         titleEn: 'Concerts & Live Performances',   descEn: 'Dynamic, action-oriented coverage for performing arts events.' },
];

const processSteps = [
  { titleEn: 'Initial Consultation',    descEn: "We start with a free consultation — phone, video, or in-person — to understand your vision, event details, and specific requirements." },
  { titleEn: 'Customized Proposal',     descEn: "Based on your needs, we create a tailored package and quote. No cookie-cutter pricing." },
  { titleEn: 'Agreement & Deposit',     descEn: "Once you're happy with the proposal, we formalize with a signed agreement and a deposit to lock in your date." },
  { titleEn: 'Pre-Event Planning',      descEn: "We coordinate timelines, scout venues if needed, and do a final briefing to ensure nothing is missed." },
  { titleEn: 'Event Day Coverage',      descEn: "We arrive early, stay focused, and capture everything — from the big moments to the tiny details that make your day unique." },
  { titleEn: 'Editing & Delivery',      descEn: "Professional editing, color grading, and delivery via your online gallery and/or USB within the agreed timeline." },
];

const designServices = [
  'Wedding Invitations', 'Event Flyers', 'Business Cards',
  'Social Media Graphics', 'Banners & Signage', 'Brand Identity',
];

export default function ServicesClient() {
  useScrollReveal();

  return (
    <>
      {/* HERO */}
      <section className="page-hero services-hero" aria-label="Services hero">
        <div className="page-hero-overlay" aria-hidden="true" />
        <div className="page-hero-content reveal-up">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true"> → </span>
            <span aria-current="page">Services</span>
          </nav>
          <h1>Our Services</h1>
          <p>Professional multimedia production for every occasion.</p>
        </div>
      </section>

      {/* PHOTOGRAPHY */}
      <section className="service-section section-padding" id="photography" aria-label="Photography services">
        <div className="container">
          <div className="service-layout">
            <div className="service-content reveal-up">
              <span className="section-tag">Photography</span>
              <h2>Timeless Images That Last Forever</h2>
              <p>From the intimate moments of an engagement shoot to the grandeur of a full wedding day, our photography captures the emotion, beauty, and story of your event with artistic precision.</p>
              <div className="service-items">
                {photographyItems.map((item, i) => (
                  <div className="service-item" key={i}>
                    <i className={`fas ${item.icon}`} aria-hidden="true" />
                    <div>
                      <h4>{item.titleEn}</h4>
                      <p>{item.descEn}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/contact" className="btn btn-gold">Book a Photography Session</Link>
            </div>
            <div className="service-gallery reveal-up" style={{ animationDelay: '.2s' }}>
              <div className="service-gallery-grid">
                {[
                  ['https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80',   'Wedding photography'],
                  ['https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80', 'Portrait photography'],
                  ['https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80','Corporate photography'],
                  ['https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',       'Event photography'],
                ].map(([src, alt]) => (
                  <Image key={src} src={src} alt={alt} width={600} height={450} style={{ objectFit: 'cover' }} loading="lazy" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEOGRAPHY */}
      <section className="service-section section-padding dark-section" id="videography" aria-label="Videography services">
        <div className="container">
          <div className="service-layout reverse">
            <div className="service-content reveal-up">
              <span className="section-tag">Videography</span>
              <h2>Cinematic Stories, Beautifully Told</h2>
              <p>Our video team doesn&apos;t just document — they craft films. From award-worthy wedding cinematography to sharp corporate promo videos, we deliver content that moves people.</p>
              <div className="service-items">
                {videographyItems.map((item, i) => (
                  <div className="service-item" key={i}>
                    <i className={`fas ${item.icon}`} aria-hidden="true" />
                    <div>
                      <h4>{item.titleEn}</h4>
                      <p>{item.descEn}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="video-reel-box">
                <i className="fab fa-youtube" style={{ fontSize: '2rem', color: '#FF0000' }} aria-hidden="true" />
                <p className="video-reel-label">Watch our showreel and client films on YouTube</p>
                <a href="https://www.youtube.com/@amenpictures" target="_blank" rel="noopener noreferrer" className="btn btn-gold-outline btn-sm">Watch on YouTube</a>
              </div>
            </div>
            <div className="service-video-embed reveal-up" style={{ animationDelay: '.2s' }}>
              <div className="video-placeholder">
                <i className="fas fa-play-circle" aria-hidden="true" />
                <p>Watch Our Showreel</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section className="service-section section-padding" id="events" aria-label="Event coverage services">
        <div className="container">
          <div className="section-header reveal-up">
            <span className="section-tag">Event Coverage</span>
            <h2 className="section-title">We Cover Every Occasion</h2>
            <p className="section-sub">Whatever the celebration, we bring the same level of artistry, professionalism, and cultural awareness.</p>
          </div>
          <div className="events-grid">
            {eventTypes.map((e, i) => (
              <div className="event-card reveal-up" key={i} style={{ animationDelay: `${0.1 + i * 0.05}s` }}>
                <i className={`fas ${e.icon}`} aria-hidden="true" />
                <h3>{e.titleEn}</h3>
                <p>{e.descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GRAPHIC DESIGN */}
      <section className="service-section section-padding dark-section" id="design" aria-label="Graphic design services">
        <div className="container">
          <div className="design-promo">
            <div className="design-promo-content">
              <span className="section-tag">Graphic Design</span>
              <h2>Beyond the Lens — We Design Too</h2>
              <p>Amen Graphics, our design arm, creates stunning visual materials that complement your photography and videography packages. From wedding stationery to full brand identity systems.</p>
              <div className="design-services-list">
                {designServices.map((s) => (
                  <span key={s}><i className="fas fa-check" aria-hidden="true" />{s}</span>
                ))}
              </div>
              <Link href="/contact" className="btn btn-gold">Request Design Work</Link>
            </div>
            <div className="design-promo-icon" aria-hidden="true">
              <i className="fas fa-palette" />
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="process-section section-padding" aria-label="Our process">
        <div className="container">
          <div className="section-header reveal-up">
            <span className="section-tag">Our Process</span>
            <h2 className="section-title">How It Works</h2>
            <p className="section-sub">From first contact to final delivery — here&apos;s what to expect when you work with Amen Pictures.</p>
          </div>
          <div className="process-timeline">
            {processSteps.map((step, i) => (
              <div className="process-step reveal-up" key={i} style={{ animationDelay: `${0.1 + i * 0.1}s` }}>
                <div className="step-number" aria-hidden="true">{String(i + 1).padStart(2, '0')}</div>
                <div className="step-content">
                  <h3>{step.titleEn}</h3>
                  <p>{step.descEn}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner" aria-label="Call to action">
        <div className="container cta-content reveal-up">
          <h2>Ready to book your session?</h2>
          <p>Contact us today and let&apos;s start planning your perfect shoot.</p>
          <div className="cta-buttons">
            <Link href="/contact" className="btn btn-black">Book Now</Link>
            <Link href="/packages" className="btn btn-black-outline">View Packages</Link>
          </div>
        </div>
      </section>
    </>
  );
}
