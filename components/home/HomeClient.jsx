'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import { useScrollReveal, useCounter, useStagger } from '@/hooks/useScrollReveal';
import { useLang } from '@/hooks/useLanguage';

import '@/styles/pages/home.css';

const stats = [
  { target: 10,   suffix: '+', labelEn: 'Years Experience',   labelAm: 'ዓመታት ልምድ' },
  { target: 500,  suffix: '+', labelEn: 'Events Captured',    labelAm: 'የተያዙ ዝግጅቶች' },
  { target: 1000, suffix: '+', labelEn: 'Satisfied Clients',  labelAm: 'ደስተኛ ደንበኞች' },
  { target: 2,    suffix: '',  labelEn: 'Locations (DC & Addis)', labelAm: 'ቦታዎች (DC እና አዲስ)' },
];

const services = [
  { href: '/services#photography', icon: 'fa-camera',       titleEn: 'Photography',    titleAm: 'ፎቶግራፊ',    descEn: 'Professional photography for weddings, events, portraits, and branding shoots.', linkEn: 'Explore Photography →' },
  { href: '/services#videography', icon: 'fa-video',        titleEn: 'Videography',    titleAm: 'ቪዲዮግራፊ',  descEn: "Cinematic video production that brings your most cherished moments to life.", linkEn: 'Explore Videography →' },
  { href: '/services#events',      icon: 'fa-calendar-star',titleEn: 'Event Coverage', titleAm: 'የዝግጅት ሽፋን', descEn: 'Full-day comprehensive event documentation from start to finish.', linkEn: 'Explore Events →' },
];

const whyItems = [
  { num: '01', titleEn: 'Reliability & Trust',    descEn: 'We show up early, fully equipped, and deliver exactly what we promise — every single time.' },
  { num: '02', titleEn: 'Proven Results',          descEn: 'Over 500 events captured and 1,000+ satisfied clients across DC, Maryland, and Addis Ababa.' },
  { num: '03', titleEn: 'Experienced Team',        descEn: '10+ years of experience capturing Ethiopian cultural events and American celebrations with equal mastery.' },
  { num: '04', titleEn: 'Personalized Approach',  descEn: "Every shoot is tailored to your story, your culture, and your vision — not a template." },
];

const portfolioItems = [
  { src: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80',   alt: 'Ethiopian wedding ceremony captured in Silver Spring Maryland', cat: 'Weddings' },
  { src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',       alt: 'Corporate event photography in Washington DC',                cat: 'Events' },
  { src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80', alt: 'Professional portrait photography',                           cat: 'Portraits' },
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',  alt: 'Photography in Addis Ababa Ethiopia',                         cat: 'Ethiopia' },
  { src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80',   alt: 'Wedding reception photography DC',                            cat: 'Weddings' },
  { src: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80',alt: 'Branding shoot for business in Maryland',                    cat: 'Corporate' },
];

const testimonials = [
  { quote: 'Amen Pictures captured our wedding day beyond our wildest dreams. Every emotion, every detail — preserved forever. They understood our Ethiopian traditions and made everything beautiful.', name: 'Miriam & Daniel T.', badge: 'Wedding',    date: 'October 2024' },
  { quote: 'Professional, punctual, and incredibly talented. Our corporate event looked stunning in photos. The team was unobtrusive but caught every key moment perfectly.',                          name: 'James K.',          badge: 'Corporate', date: 'August 2024' },
  { quote: "My daughter's graduation photos are absolutely stunning. Amen Pictures has a gift for capturing real, authentic moments. We will treasure these photos forever.",                         name: 'Selamawit A.',      badge: 'Graduation',date: 'May 2024' },
  { quote: "We hired Amen Pictures for our birthday bash and couldn't be happier. The photos were delivered fast, the editing was flawless, and everyone at the party loved the photographer.",      name: 'Hana B.',           badge: 'Birthday',  date: 'July 2024' },
  { quote: 'From the consultation to the gallery delivery, Amen Pictures was exceptional. They captured our habesha wedding with such cultural sensitivity and artistry. Highly recommend!',         name: 'Tigist & Yonas M.', badge: 'Wedding',   date: 'September 2024' },
];

const packages = [
  {
    name: 'Basic',       nameAm: 'መሰረታዊ',
    type: 'Photo Only',  typeAm: 'ፎቶ ብቻ',
    featured: false, badge: null,
    features: ['2hrs photo shoot', '150+ edited photos', '14×14 signing board', 'Digital delivery', '15 days online gallery'],
  },
  {
    name: 'Standard Plus', nameAm: 'ስታንዳርድ ፕላስ',
    type: 'Photo + Video', typeAm: 'ፎቶ + ቪዲዮ',
    featured: true, badge: 'Most Popular',
    features: ['4hrs coverage', '300+ photos', '45min–1hr edited video', '1 photographer + 1 videographer', '30 days online gallery + USB'],
  },
  {
    name: 'Exclusive',      nameAm: 'ኤክስክሉሲቭ',
    type: 'Wedding Special',typeAm: 'የሰርግ ልዩ',
    featured: false, badge: 'Premium',
    features: ['8hrs full coverage', '500+ photos', '1:30–2hr cinematic film', 'Wedding album + USB', '60 days online gallery'],
  },
];

const instagramItems = [
  { src: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80',   alt: 'Amen Pictures Instagram post — wedding photography' },
  { src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',       alt: 'Amen Pictures Instagram post — event photography' },
  { src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80', alt: 'Amen Pictures Instagram post — portrait photography' },
  { src: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80',alt: 'Amen Pictures Instagram post — corporate photography' },
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',  alt: 'Amen Pictures Instagram post — Ethiopia photography' },
  { src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80',   alt: 'Amen Pictures Instagram post — wedding photography' },
];

export default function HomeClient() {
  const { t, lang } = useLang();
  useScrollReveal();
  useCounter();
  useStagger();

  // Carousel state
  useEffect(() => {
    const track   = document.getElementById('testimonialsTrack');
    const prevBtn = document.getElementById('testimonialPrev');
    const nextBtn = document.getElementById('testimonialNext');
    const dotsWrap = document.getElementById('testimonialDots');
    if (!track) return;

    const cards = [...track.querySelectorAll('.testimonial-card')];
    if (!cards.length) return;

    let current = 0;
    let autoTimer = null;
    const total = cards.length;

    // Build dots
    if (dotsWrap) {
      dotsWrap.innerHTML = '';
      cards.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'dot';
        dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(dot);
      });
    }

    const updateDots = () => {
      if (!dotsWrap) return;
      [...dotsWrap.children].forEach((d, i) => d.classList.toggle('active', i === current));
    };

    const goTo = (index) => {
      current = (index + total) % total;
      const cardWidth = cards[0].offsetWidth + 20;
      track.style.transform = `translateX(-${current * cardWidth}px)`;
      updateDots();
    };

    const goNext = () => goTo(current + 1);
    const goPrev = () => goTo(current - 1);

    const startAuto = () => { stopAuto(); autoTimer = setInterval(goNext, 5000); };
    const stopAuto  = () => { if (autoTimer) { clearInterval(autoTimer); autoTimer = null; } };

    if (prevBtn) prevBtn.addEventListener('click', () => { goPrev(); startAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { goNext(); startAuto(); });

    const slider = document.getElementById('testimonialsSlider');
    if (slider) {
      slider.addEventListener('mouseenter', stopAuto);
      slider.addEventListener('mouseleave', startAuto);
    }

    const handleResize = () => goTo(current);
    window.addEventListener('resize', handleResize, { passive: true });

    goTo(0);
    startAuto();

    return () => {
      stopAuto();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="hero" aria-label="Hero section">
        <video className="hero-video" autoPlay muted loop playsInline aria-hidden="true">
          <source src="/video/hero-reel.mp4" type="video/mp4" />
        </video>
        <div className="hero-bg" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80')" }} aria-hidden="true" />
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-content reveal-up">
          <p className="hero-eyebrow">Washington DC • Maryland • Virginia • Addis Ababa</p>
          <h1 className="hero-headline">
            Washington DC&apos;s Premier Wedding &amp; <em>Event Photographers</em>
          </h1>
          <p className="hero-sub">Capturing Life&apos;s Moments, One Click at a Time</p>
          <div className="hero-buttons">
            <Link href="/portfolio" className="btn btn-gold-outline">View Our Work</Link>
            <Link href="/contact" className="btn btn-gold">Book a Consultation</Link>
          </div>
        </div>
        <div className="hero-scroll-hint" aria-hidden="true"><i className="fas fa-chevron-down" /></div>
      </section>

      {/* STATS BAR */}
      <section className="stats-bar" aria-label="Company statistics">
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div className="stat-item" key={i}>
              <span className="stat-number" data-target={s.target} data-suffix={s.suffix}>0{s.suffix}</span>
              <span className="stat-label">{lang === 'am' ? s.labelAm : s.labelEn}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES OVERVIEW */}
      <section className="services-overview section-padding" aria-label="Services overview">
        <div className="container">
          <div className="section-header reveal-up">
            <span className="section-tag">What We Do</span>
            <h2 className="section-title">Professional Multimedia Production</h2>
          </div>
          <div className="services-grid">
            {services.map((s, i) => (
              <Link href={s.href} className="service-card reveal-up" key={i} style={{ animationDelay: `${0.1 + i * 0.1}s` }}>
                <div className="service-icon" aria-hidden="true"><i className={`fas ${s.icon}`} /></div>
                <h3>{lang === 'am' ? s.titleAm : s.titleEn}</h3>
                <p>{s.descEn}</p>
                <span className="card-link">{s.linkEn}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why-us section-padding dark-section" aria-label="Why choose Amen Pictures">
        <div className="container">
          <div className="section-header reveal-up">
            <span className="section-tag">Why Us</span>
            <h2 className="section-title">Why Amen Pictures?</h2>
          </div>
          <div className="why-grid">
            {whyItems.map((w, i) => (
              <div className="why-item reveal-up" key={i} style={{ animationDelay: `${0.1 + i * 0.1}s` }}>
                <span className="why-number" aria-hidden="true">{w.num}</span>
                <h3>{w.titleEn}</h3>
                <p>{w.descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO TEASER */}
      <section className="portfolio-teaser section-padding" aria-label="Portfolio preview">
        <div className="container">
          <div className="section-header reveal-up">
            <span className="section-tag">Our Work</span>
            <h2 className="section-title">Our Work Speaks for Itself</h2>
          </div>
          <div className="portfolio-masonry">
            {portfolioItems.map((p, i) => (
              <div className="portfolio-item reveal-up" key={i} style={{ animationDelay: `${0.1 + i * 0.05}s` }} data-category={p.cat}>
                <Image src={p.src} alt={p.alt} fill style={{ objectFit: 'cover' }} loading="lazy" />
                <div className="portfolio-overlay"><span>{p.cat}</span></div>
              </div>
            ))}
          </div>
          <div className="section-cta reveal-up">
            <Link href="/portfolio" className="btn btn-gold">View Full Portfolio</Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials section-padding dark-section" aria-label="Client testimonials">
        <div className="container">
          <div className="section-header reveal-up">
            <span className="section-tag">Testimonials</span>
            <h2 className="section-title">What Our Clients Say</h2>
          </div>
          <div className="testimonials-slider" id="testimonialsSlider" role="region" aria-label="Testimonials carousel">
            <div className="testimonials-track" id="testimonialsTrack">
              {testimonials.map((t, i) => (
                <div className="testimonial-card" key={i} role="article">
                  <div className="stars" aria-label="5 out of 5 stars">★★★★★</div>
                  <p className="testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
                  <div className="testimonial-meta">
                    <strong>{t.name}</strong>
                    <span className="event-badge">{t.badge}</span>
                    <span className="testimonial-date">{t.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="slider-controls" aria-label="Carousel controls">
            <button className="slider-btn prev" id="testimonialPrev" aria-label="Previous testimonial"><i className="fas fa-chevron-left" /></button>
            <div className="slider-dots" id="testimonialDots" role="tablist" aria-label="Testimonial navigation dots" />
            <button className="slider-btn next" id="testimonialNext" aria-label="Next testimonial"><i className="fas fa-chevron-right" /></button>
          </div>
        </div>
      </section>

      {/* PACKAGES PREVIEW */}
      <section className="packages-preview section-padding" aria-label="Packages preview">
        <div className="container">
          <div className="section-header reveal-up">
            <span className="section-tag">Pricing</span>
            <h2 className="section-title">Simple, Transparent Pricing</h2>
            <p className="section-sub">No hidden fees. Customized to your day.</p>
          </div>
          <div className="packages-grid">
            {packages.map((pkg, i) => (
              <div className={`package-card reveal-up${pkg.featured ? ' featured' : ''}`} key={i} style={{ animationDelay: `${0.1 + i * 0.1}s` }}>
                {pkg.badge && <span className={pkg.featured ? 'badge-popular' : 'badge-premium'}>{pkg.badge}</span>}
                <h3 className="pkg-name">{lang === 'am' ? pkg.nameAm : pkg.name}</h3>
                <p className="pkg-type">{lang === 'am' ? pkg.typeAm : pkg.type}</p>
                <ul className="pkg-features">
                  {pkg.features.map((f, fi) => <li key={fi}>{f}</li>)}
                </ul>
                <Link href="/contact" className={`btn ${pkg.featured ? 'btn-gold' : 'btn-gold-outline'}`}>
                  {lang === 'am' ? 'አሁን ይያዙ' : 'Book Now'}
                </Link>
              </div>
            ))}
          </div>
          <div className="section-cta reveal-up">
            <Link href="/packages" className="btn btn-ghost">See All Packages</Link>
          </div>
        </div>
      </section>

      {/* AMHARIC COMMUNITY SECTION */}
      <section className="amharic-section" aria-label="Amharic community section">
        <div className="amharic-overlay" aria-hidden="true" />
        <div className="container amharic-content">
          <h2 className="amharic-headline">አሜን ፒክቸርስ</h2>
          <p className="amharic-body">ለኢትዮጵያ ማህበረሰብ ካሜራ ጥበብ። ሰርጎቻቸው፣ ዝግጅቶቻቸው፣ ታሪካቸው — ሁሉም በጥበብ ይቀረፃሉ። ዋሽንግተን ዲሲ ውስጥ ምርጥ ፎቶ እና ቪዲዮ አገልግሎት።</p>
          <p className="amharic-sub">ልዩ ቀንዎትን በማስታወሻ የተደገፈ ለማድረግ አስበዋል?</p>
          <Link href="/contact" className="btn btn-gold amharic-cta">ይደውሉልን</Link>
        </div>
      </section>

      {/* INSTAGRAM GRID */}
      <section className="instagram-section section-padding" aria-label="Instagram feed">
        <div className="container">
          <div className="section-header reveal-up">
            <span className="section-tag">Instagram</span>
            <h2 className="section-title">Follow Our Work</h2>
            <p className="section-sub">@amen_pictures_ on Instagram</p>
          </div>
          <div className="instagram-grid">
            {instagramItems.map((item, i) => (
              <a key={i} href="https://www.instagram.com/amen_pictures_/" target="_blank" rel="noopener noreferrer" className="instagram-item reveal-up" style={{ animationDelay: `${0.1 + i * 0.05}s` }} aria-label="View photo on Instagram">
                <Image src={item.src} alt={item.alt} fill style={{ objectFit: 'cover' }} loading="lazy" />
                <div className="instagram-overlay"><i className="fab fa-instagram" aria-hidden="true" /></div>
              </a>
            ))}
          </div>
          <div className="section-cta reveal-up">
            <a href="https://www.instagram.com/amen_pictures_/" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <i className="fab fa-instagram" aria-hidden="true" /> Follow on Instagram
            </a>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="cta-banner" aria-label="Call to action">
        <div className="container cta-content reveal-up">
          <h2>Ready to capture your story?</h2>
          <p>Contact us today. We respond within 24 hours.</p>
          <div className="cta-buttons">
            <Link href="/contact" className="btn btn-black">Book Now</Link>
            <a href="tel:+12408551199" className="btn btn-black-outline">Call Us</a>
          </div>
        </div>
      </section>
    </>
  );
}
