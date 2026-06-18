'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import '@/styles/pages/about.css';

const team = [
  { name: 'Amen Tesfaye',  role: 'Lead Photographer & Founder', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', desc: 'With 10+ years behind the lens, Amen brings artistic vision and cultural depth to every shoot — specializing in weddings and cultural events.' },
  { name: 'Samuel Girma',  role: 'Lead Videographer',           img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80', desc: "Samuel crafts cinematic wedding films and event highlights with a storyteller's eye and an editor's precision." },
  { name: 'Hiwot Bekele',  role: 'Senior Photo Editor',         img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',       desc: 'Hiwot transforms raw captures into polished masterpieces, ensuring every gallery delivered exceeds client expectations.' },
];

const equipment = [
  { icon: 'fa-camera',      title: 'DSLR / Mirrorless Cameras',   desc: 'Sony Alpha series and Canon EOS systems for flawless image quality.' },
  { icon: 'fa-bullseye',    title: 'Cinema Lenses',                desc: 'Premium prime and zoom lenses for every lighting condition and composition.' },
  { icon: 'fa-helicopter',  title: 'Drone (Aerial Coverage)',      desc: 'DJI drone systems for stunning aerial perspectives on outdoor events.' },
  { icon: 'fa-lightbulb',   title: 'Professional Lighting',        desc: 'Studio strobes, speedlights, and continuous LED panels for perfect exposure.' },
  { icon: 'fa-microphone',  title: 'Audio Equipment',              desc: 'Wireless lapel mics and directional shotgun mics for crystal-clear audio in videos.' },
  { icon: 'fa-desktop',     title: 'Editing Software',             desc: 'Adobe Lightroom, Photoshop, and Premiere Pro for world-class post-production.' },
];

const values = [
  { icon: 'fa-palette',          title: 'Creativity',      desc: 'Every frame is a composition. Every moment is art. We never settle for ordinary.' },
  { icon: 'fa-handshake',        title: 'Reliability',     desc: "We honor every commitment. When we say we'll be there — we'll be there, fully prepared." },
  { icon: 'fa-star-and-crescent',title: 'Cultural Pride',  desc: 'Our Ethiopian-American roots give us a unique lens — honoring tradition while embracing modern artistry.' },
];

export default function AboutClient() {
  useScrollReveal();

  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=1200&q=80')" }} aria-label="About page hero">
        <div className="page-hero-overlay" aria-hidden="true" />
        <div className="page-hero-content reveal-up">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true"> → </span>
            <span aria-current="page">About</span>
          </nav>
          <h1>Our Story</h1>
          <p>From Silver Spring to Addis Ababa — capturing every moment that matters.</p>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="our-story section-padding" aria-label="Our story">
        <div className="container">
          <div className="story-grid">
            <div className="story-text reveal-up">
              <span className="section-tag">Who We Are</span>
              <h2>Built on Passion, Culture &amp; Craft</h2>
              <p>Amen Pictures was founded with one mission: to tell your story with beauty, authenticity, and artistry. As an Ethiopian-American studio rooted in the DC/Maryland area, we bring a unique cultural sensitivity to every shoot — understanding the traditions, the emotions, and the significance of each moment.</p>
              <p>With over 10 years of experience serving the DMV community, we have built a reputation for reliability, stunning imagery, and deep cultural understanding. From traditional habesha weddings to corporate conferences, we approach every project with the same level of dedication and creative excellence.</p>
              <p>Our dual presence in Washington DC and Addis Ababa, Ethiopia allows us to serve both communities — wherever your story unfolds, we&apos;re there to capture it.</p>
              <div className="story-stats">
                {[['10+', 'Years in business'], ['500+', 'Events captured'], ['2', 'Continents']].map(([num, label]) => (
                  <div className="story-stat" key={label}>
                    <span className="stat-num">{num}</span>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="story-image reveal-up" style={{ animationDelay: '.2s' }}>
              <Image src="/images/about/team.jpg" alt="The Amen Pictures team in their Silver Spring studio" fill style={{ objectFit: 'cover' }} loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="team-section section-padding dark-section" aria-label="Meet the team">
        <div className="container">
          <div className="section-header reveal-up">
            <span className="section-tag">The Team</span>
            <h2 className="section-title">The People Behind the Lens</h2>
          </div>
          <div className="team-grid">
            {team.map((member, i) => (
              <div className="team-card reveal-up" key={i} style={{ animationDelay: `${0.1 + i * 0.1}s` }}>
                <div className="team-photo">
                  <Image src={member.img} alt={`${member.name} at Amen Pictures`} fill style={{ objectFit: 'cover', objectPosition: 'top' }} loading="lazy" />
                </div>
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <span className="team-role">{member.role}</span>
                  <p>{member.desc}</p>
                  <a href="https://www.instagram.com/amen_pictures_/" target="_blank" rel="noopener noreferrer" className="team-social" aria-label="Follow on Instagram">
                    <i className="fab fa-instagram" aria-hidden="true" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EQUIPMENT */}
      <section className="equipment-section section-padding" aria-label="Our equipment">
        <div className="container">
          <div className="section-header reveal-up">
            <span className="section-tag">Our Gear</span>
            <h2 className="section-title">Professional Gear for Professional Results</h2>
          </div>
          <div className="equipment-grid">
            {equipment.map((e, i) => (
              <div className="equipment-item reveal-up" key={i} style={{ animationDelay: `${0.1 + i * 0.05}s` }}>
                <div className="equip-icon" aria-hidden="true"><i className={`fas ${e.icon}`} /></div>
                <h3>{e.title}</h3>
                <p>{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section className="locations-section section-padding dark-section" aria-label="Our locations">
        <div className="container">
          <div className="section-header reveal-up">
            <span className="section-tag">Locations</span>
            <h2 className="section-title">We&apos;re on Two Continents</h2>
          </div>
          <div className="locations-grid">
            <div className="location-card reveal-up" style={{ animationDelay: '.1s' }}>
              <div className="location-flag" aria-hidden="true">🇺🇸</div>
              <h3>Washington DC, USA</h3>
              <p className="location-address">8209 Fenton St, Suite #9, Silver Spring, MD 20910</p>
              <p>Serving all of Maryland, Washington DC, and Northern Virginia (DMV area).</p>
              <div className="location-map">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3102.6!2d-77.014!3d38.994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDU5JzQ3LjYiTiA3N8KwMDAnNTEuMyJX!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus" width="100%" height="200" style={{ border: 0, borderRadius: 8 }} allowFullScreen loading="lazy" title="Amen Pictures Silver Spring MD" />
              </div>
              <a href="https://maps.google.com/?q=8209+Fenton+St+Silver+Spring+MD" target="_blank" rel="noopener noreferrer" className="btn btn-gold-outline">Get Directions</a>
            </div>
            <div className="location-card reveal-up" style={{ animationDelay: '.2s' }}>
              <div className="location-flag" aria-hidden="true">🇪🇹</div>
              <h3>Addis Ababa, Ethiopia</h3>
              <p className="location-address">Addis Ababa, Ethiopia</p>
              <p>Specializing in Ethiopian weddings, cultural events, and premium productions in Addis Ababa and beyond.</p>
              <div className="location-info-box"><i className="fas fa-phone" aria-hidden="true" /><span>+1 (240) 855-1199</span></div>
              <div className="location-info-box"><i className="fas fa-envelope" aria-hidden="true" /><span>amenpicture@outlook.com</span></div>
              <Link href="/contact" className="btn btn-gold-outline">Book in Ethiopia</Link>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="values-section section-padding" aria-label="Our values">
        <div className="container">
          <div className="section-header reveal-up">
            <span className="section-tag">Our Values</span>
            <h2 className="section-title">What We Stand For</h2>
          </div>
          <div className="values-grid">
            {values.map((v, i) => (
              <div className="value-item reveal-up" key={i} style={{ animationDelay: `${0.1 + i * 0.1}s` }}>
                <div className="value-icon" aria-hidden="true"><i className={`fas ${v.icon}`} /></div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner" aria-label="Call to action">
        <div className="container cta-content reveal-up">
          <h2>Ready to work together?</h2>
          <p>Let&apos;s tell your story. Reach out today.</p>
          <div className="cta-buttons">
            <Link href="/contact" className="btn btn-black">Book a Consultation</Link>
            <Link href="/portfolio" className="btn btn-black-outline">View Our Work</Link>
          </div>
        </div>
      </section>
    </>
  );
}
