'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import '@/styles/pages/packages.css';

const studioPackages = [
  { name: 'Mini Session', tagline: 'Quick & Beautiful', featured: false, badge: null,
    features: ['1-hour photo session','75+ edited photos','1 outfit change','Digital delivery','7-day online gallery'] },
  { name: 'Standard Session', tagline: 'Photo + Video Combo', featured: true, badge: 'Most Popular',
    features: ['2-hour photo session','150+ edited photos','14×14 signing board','3–5 min highlight video','Digital + USB delivery','15-day online gallery','2 outfit changes'] },
  { name: 'Premium Session', tagline: 'Full Studio Experience', featured: false, badge: 'Premium',
    features: ['4-hour photo session','300+ edited photos','Custom 20×16 canvas print','10–15 min cinematic video','Drone footage (if applicable)','Digital + USB + print delivery','30-day online gallery','Unlimited outfit changes'] },
];

const eventPackages = [
  { name: 'Basic', tagline: 'Photo Only', featured: false, badge: null,
    features: ['2hrs photo coverage','150+ edited photos','14×14 signing board','Digital delivery','15-day online gallery','1 photographer'] },
  { name: 'Standard', tagline: 'Photo + Short Video', featured: false, badge: null,
    features: ['3hrs photo coverage','200+ edited photos','30-min highlight video','14×14 signing board','Digital delivery','15-day online gallery','1 photographer + 1 videographer'] },
  { name: 'Standard Plus', tagline: 'Photo + Full Video', featured: true, badge: 'Most Popular',
    features: ['4hrs coverage','300+ edited photos','45min–1hr edited video','14×14 signing board','Digital + USB delivery','30-day online gallery','1 photographer + 1 videographer','Same-day social media sneak peek'] },
  { name: 'Exclusive', tagline: 'Wedding Special', featured: false, badge: 'Premium',
    features: ['8hrs full-day coverage','500+ edited photos','1:30–2hr cinematic film','Drone footage','Custom wedding album','Digital + USB delivery','60-day online gallery','2 photographers + 2 videographers','Engagement session included','Same-day social media sneak peek'] },
];

const comparisonRows = [
  { feature: 'Coverage Duration',    vals: ['2 hrs', '3 hrs', '4 hrs', '8 hrs'] },
  { feature: 'Edited Photos',        vals: ['150+', '200+', '300+', '500+'] },
  { feature: 'Video',                vals: [false, '30 min', '45min–1hr', '1:30–2hr'] },
  { feature: 'Drone',                vals: [false, false, false, true] },
  { feature: 'Wedding Album',        vals: [false, false, false, true] },
  { feature: 'Signing Board',        vals: [true, true, true, true] },
  { feature: 'USB Delivery',         vals: [false, false, true, true] },
  { feature: 'Online Gallery',       vals: ['15 days', '15 days', '30 days', '60 days'] },
  { feature: 'Engagement Session',   vals: [false, false, false, true] },
  { feature: 'Sneak Peek',           vals: [false, false, true, true] },
];

const addons = [
  { icon: 'fa-helicopter',        title: 'Drone Coverage',          desc: 'Stunning aerial footage for outdoor venues.' },
  { icon: 'fa-photo-video',       title: 'Photo Booth',             desc: 'Fun, instant photo prints for guests — unlimited sessions.' },
  { icon: 'fa-film',              title: 'Same-Day Slideshow',      desc: 'Curated photo slideshow played at your reception.' },
  { icon: 'fa-book-open',         title: 'Custom Photo Album',      desc: 'Premium lay-flat albums in your choice of cover and size.' },
  { icon: 'fa-expand-arrows-alt', title: 'Extended Coverage Hours', desc: 'Add extra hours to any package at a per-hour rate.' },
  { icon: 'fa-map-marker-alt',    title: 'Second Location Shoot',   desc: 'Add a secondary venue or scenic location to your session.' },
];

const faqs = [
  { q: 'How do I book?', a: "Simply reach out via our contact form, phone, or WhatsApp. We'll discuss your event details and confirm availability. A signed agreement and deposit secures your date." },
  { q: 'Do you travel outside DC/Maryland?', a: 'Yes! We serve the entire DMV area and regularly travel to other states. We also serve Addis Ababa, Ethiopia. Travel fees may apply for events more than 50 miles from Silver Spring, MD.' },
  { q: 'How long until I receive my photos/video?', a: 'Photos are typically delivered within 2–3 weeks. Videos take 3–5 weeks depending on the package. Rush delivery is available as an add-on.' },
  { q: 'Are your prices negotiable?', a: "Our packages are priced fairly to reflect the quality, time, and expertise involved. We're happy to discuss customizing a package to fit your specific needs and budget." },
  { q: 'What happens if the weather is bad on my event day?', a: "We always have contingency plans. For outdoor shoots, we carry professional lighting equipment to handle any conditions. We'll work with you to reschedule if necessary." },
  { q: 'Do you have experience with Ethiopian cultural events?', a: 'Absolutely. We specialize in Ethiopian cultural celebrations — habesha weddings, timkat, meskel, Enkutatash, and more. Our team understands the traditions, timing, and significance of these events deeply.' },
];

function PackageCard({ pkg }) {
  return (
    <div className={`package-card${pkg.featured ? ' featured' : ''}`}>
      {pkg.badge && <span className={pkg.featured ? 'badge-popular' : 'badge-premium'}>{pkg.badge}</span>}
      <div className="package-header">
        <h3 className="pkg-name">{pkg.name}</h3>
        <p className="pkg-tagline">{pkg.tagline}</p>
      </div>
      <ul className="pkg-features">
        {pkg.features.map((f, i) => (
          <li key={i}><i className="fas fa-check" aria-hidden="true" /><span>{f}</span></li>
        ))}
      </ul>
      <Link href="/contact" className={`btn pkg-btn ${pkg.featured ? 'btn-gold' : 'btn-gold-outline'}`}>Book This Package</Link>
    </div>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item${open ? ' open' : ''}`}>
      <button className="faq-question" aria-expanded={open} onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <i className="fas fa-chevron-down" aria-hidden="true" />
      </button>
      {open && (
        <div className="faq-answer">
          <p>{a}</p>
        </div>
      )}
    </div>
  );
}

export default function PackagesClient() {
  const [activeTab, setActiveTab] = useState('studio');
  useScrollReveal();

  return (
    <>
      {/* HERO */}
      <section className="page-hero packages-hero" aria-label="Packages page hero">
        <div className="page-hero-overlay" aria-hidden="true" />
        <div className="page-hero-content reveal-up">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true"> → </span>
            <span aria-current="page">Packages</span>
          </nav>
          <h1>Packages &amp; Pricing</h1>
          <p>Transparent pricing. No surprises. Tailored to your day.</p>
        </div>
      </section>

      {/* TAB TOGGLE + PACKAGES */}
      <section className="packages-main section-padding" aria-label="Package options">
        <div className="container">
          <div className="tab-toggle-wrapper reveal-up" role="tablist" aria-label="Package type selection">
            <button
              className={`tab-btn${activeTab === 'studio' ? ' active' : ''}`}
              role="tab" aria-selected={activeTab === 'studio'}
              onClick={() => setActiveTab('studio')}
            >
              Studio / Portrait Packages
            </button>
            <button
              className={`tab-btn${activeTab === 'event' ? ' active' : ''}`}
              role="tab" aria-selected={activeTab === 'event'}
              onClick={() => setActiveTab('event')}
            >
              Wedding &amp; Event Packages
            </button>
          </div>

          {activeTab === 'studio' && (
            <div className="packages-panel active">
              <div className="section-header reveal-up">
                <span className="section-tag">Studio Sessions</span>
                <h2 className="section-title">Studio &amp; Portrait Packages</h2>
                <p className="section-sub">Perfect for portraits, headshots, family photos, branding, and personal shoots.</p>
              </div>
              <div className="packages-grid reveal-up">
                {studioPackages.map((pkg, i) => <PackageCard key={i} pkg={pkg} />)}
              </div>
            </div>
          )}

          {activeTab === 'event' && (
            <div className="packages-panel active">
              <div className="section-header reveal-up">
                <span className="section-tag">Wedding &amp; Events</span>
                <h2 className="section-title">Wedding &amp; Event Packages</h2>
                <p className="section-sub">Designed for weddings, graduation parties, birthdays, galas, and cultural celebrations.</p>
              </div>
              <div className="packages-grid reveal-up">
                {eventPackages.map((pkg, i) => <PackageCard key={i} pkg={pkg} />)}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="comparison-section section-padding dark-section" aria-label="Package comparison">
        <div className="container">
          <div className="section-header reveal-up">
            <span className="section-tag">Compare</span>
            <h2 className="section-title">Package Comparison (Wedding &amp; Events)</h2>
          </div>
          <div className="comparison-wrapper reveal-up">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th scope="col">Feature</th>
                  <th scope="col">Basic</th>
                  <th scope="col">Standard</th>
                  <th scope="col" className="highlight-col">Standard Plus</th>
                  <th scope="col">Exclusive</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={i}>
                    <td>{row.feature}</td>
                    {row.vals.map((v, j) => (
                      <td key={j} className={j === 2 ? 'highlight-col' : ''}>
                        {v === true  ? <i className="fas fa-check" aria-label="Included" /> :
                         v === false ? <i className="fas fa-minus" aria-label="Not included" /> :
                         v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ADD-ONS */}
      <section className="addons-section section-padding" aria-label="Add-on services">
        <div className="container">
          <div className="section-header reveal-up">
            <span className="section-tag">Add-Ons</span>
            <h2 className="section-title">Customize Your Package</h2>
            <p className="section-sub">Enhance any package with these add-on services.</p>
          </div>
          <div className="addons-grid">
            {addons.map((a, i) => (
              <div className="addon-card reveal-up" key={i} style={{ animationDelay: `${0.1 + i * 0.05}s` }}>
                <div className="addon-icon"><i className={`fas ${a.icon}`} aria-hidden="true" /></div>
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section section-padding dark-section" aria-label="FAQ">
        <div className="container">
          <div className="section-header reveal-up">
            <span className="section-tag">FAQ</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          <div className="faq-list">
            {faqs.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-banner" aria-label="Call to action">
        <div className="container cta-content reveal-up">
          <h2>Not sure which package is right for you?</h2>
          <p>Contact us — we&apos;ll build a custom quote tailored to your event.</p>
          <div className="cta-buttons">
            <Link href="/contact" className="btn btn-black">Get a Custom Quote</Link>
            <a href="tel:+12408551199" className="btn btn-black-outline">Call Us Now</a>
          </div>
        </div>
      </section>
    </>
  );
}
