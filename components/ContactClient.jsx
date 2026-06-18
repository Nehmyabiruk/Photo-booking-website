'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BookingSchema } from '@/lib/validations/booking';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import '@/styles/pages/contact.css';

const hours = [
  { day: 'Monday – Friday', time: '9:00 AM – 7:00 PM' },
  { day: 'Saturday',        time: '8:00 AM – 8:00 PM' },
  { day: 'Sunday',          time: '10:00 AM – 5:00 PM' },
];

const quickButtons = [
  { href: 'tel:+12408551199',                       icon: 'fa-phone',     fab: false, className: 'quick-btn-phone',     label: 'Call Us',     detail: '+1 (240) 855-1199' },
  { href: 'https://wa.me/12408551199',              icon: 'fa-whatsapp',  fab: true,  className: 'quick-btn-whatsapp',  label: 'WhatsApp',    detail: 'Chat instantly' },
  { href: 'mailto:amenpicture@outlook.com',           icon: 'fa-envelope',  fab: false, className: 'quick-btn-email',     label: 'Email Us',    detail: 'amenpicture@outlook.com' },
  { href: 'https://www.instagram.com/amen_pictures_/', icon: 'fa-instagram', fab: true, className: 'quick-btn-instagram', label: 'Instagram', detail: '@amen_pictures_' },
];

const miniFaqs = [
  { icon: 'fa-calendar', q: 'How far in advance should I book?', a: 'We recommend booking at least 3–6 months in advance for weddings, and 4–8 weeks for smaller events. We do accommodate last-minute requests when available.' },
  { icon: 'fa-dollar-sign', q: 'What is the deposit to secure my date?', a: 'A 30–50% deposit is required to confirm your booking. The balance is due 1 week before your event date.' },
  { icon: 'fa-clock', q: 'What are your response times?', a: 'We respond to all inquiries within 24 hours. For urgent requests, WhatsApp is the fastest way to reach us.' },
];

export default function ContactClient() {
  useScrollReveal();

  const [serverError, setServerError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch
  } = useForm({
    resolver: zodResolver(BookingSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      eventType: '',
      eventDate: '',
      location: '',
      budget: '',
      message: ''
    }
  });

  const messageValue = watch('message', '');
const onSubmit = async (data) => {
  setServerError(null);

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.ok) {
      setSubmitted(true);
      reset();

      // OPEN WHATSAPP AUTOMATICALLY
      if (result.whatsappLink) {
        window.open(result.whatsappLink, '_blank');
      }
    } else {
      setServerError(result.error || 'Something went wrong. Please try again.');
    }
  } catch (err) {
    console.error(err);
    setServerError('Failed to send message. Please check your connection.');
  }
};

  return (
    <>
      {/* HERO */}
      <section className="page-hero contact-hero" aria-label="Contact page hero">
        <div className="page-hero-overlay" aria-hidden="true" />
        <div className="page-hero-content reveal-up">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true"> → </span>
            <span aria-current="page">Contact</span>
          </nav>
          <h1>Get In Touch</h1>
          <p>Ready to book? Have questions? We&apos;d love to hear from you.</p>
        </div>
      </section>

      {/* QUICK CONTACT BUTTONS */}
      <section className="quick-contact section-padding-sm" aria-label="Quick contact options">
        <div className="container">
          <div className="quick-contact-grid reveal-up">
            {quickButtons.map(btn => (
              <a key={btn.label} href={btn.href} target={btn.href.startsWith('http') ? '_blank' : undefined} rel={btn.href.startsWith('http') ? 'noopener noreferrer' : undefined} className={`quick-btn ${btn.className}`}>
                {btn.fab
                  ? <i className={`fab ${btn.icon}`} aria-hidden="true" />
                  : <i className={`fas ${btn.icon}`} aria-hidden="true" />
                }
                <div>
                  <span className="quick-label">{btn.label}</span>
                  <span className="quick-detail">{btn.detail}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN FORM + SIDEBAR */}
      <section className="contact-main section-padding" aria-label="Contact form">
        <div className="container">
          <div className="contact-grid">
            {/* FORM */}
            <div className="contact-form-wrapper">
              <h2>Send Us a Message</h2>
              <p>Fill out the form below and we&apos;ll get back to you within 24 hours.</p>

              {submitted ? (
                <div className="form-success" role="alert">
                  <i className="fas fa-check-circle" aria-hidden="true" />
                  <div>
                    <strong>Message sent successfully!</strong>
                    <p>Thank you for reaching out. We&apos;ll be in touch within 24 hours.</p>
                  </div>
                </div>
              ) : (
                <form className="contact-form" id="contactForm" onSubmit={handleSubmit(onSubmit)} noValidate>
                  {serverError && (
                    <div className="server-error" style={{ color: 'red', marginBottom: '1rem' }}>
                      <i className="fas fa-exclamation-triangle" /> {serverError}
                    </div>
                  )}

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name <span className="required">*</span></label>
                      <input 
                        id="firstName" 
                        {...register('firstName')} 
                        type="text" 
                        className={errors.firstName ? 'error' : ''} 
                        placeholder="e.g. Miriam" 
                      />
                      {errors.firstName && <span className="field-error" role="alert"><i className="fas fa-exclamation-circle" />{errors.firstName.message}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name <span className="required">*</span></label>
                      <input 
                        id="lastName" 
                        {...register('lastName')} 
                        type="text" 
                        className={errors.lastName ? 'error' : ''} 
                        placeholder="e.g. Tesfaye" 
                      />
                      {errors.lastName && <span className="field-error" role="alert"><i className="fas fa-exclamation-circle" />{errors.lastName.message}</span>}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Email Address <span className="required">*</span></label>
                      <input 
                        id="email" 
                        {...register('email')} 
                        type="email" 
                        className={errors.email ? 'error' : ''} 
                        placeholder="your@email.com" 
                      />
                      {errors.email && <span className="field-error" role="alert"><i className="fas fa-exclamation-circle" />{errors.email.message}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number <span className="required">*</span></label>
                      <input 
                        id="phone" 
                        {...register('phone')} 
                        type="tel" 
                        className={errors.phone ? 'error' : ''} 
                        placeholder="+1 (240) 000-0000" 
                      />
                      {errors.phone && <span className="field-error" role="alert"><i className="fas fa-exclamation-circle" />{errors.phone.message}</span>}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="eventType">Event Type <span className="required">*</span></label>
                      <select 
                        id="eventType" 
                        {...register('eventType')} 
                        className={errors.eventType ? 'error' : ''}
                      >
                        <option value="">Select event type...</option>
                        {['Wedding','Engagement Session','Birthday Party','Corporate Event','Graduation','Portrait Session','Family Photos','Cultural Event','Other'].map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                      {errors.eventType && <span className="field-error" role="alert"><i className="fas fa-exclamation-circle" />{errors.eventType.message}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="eventDate">Event Date <span className="required">*</span></label>
                      <input 
                        id="eventDate" 
                        {...register('eventDate')} 
                        type="date" 
                        className={errors.eventDate ? 'error' : ''}
                      />
                      {errors.eventDate && <span className="field-error" role="alert"><i className="fas fa-exclamation-circle" />{errors.eventDate.message}</span>}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="location">Event Location <span className="required">*</span></label>
                      <input 
                        id="location" 
                        {...register('location')} 
                        type="text" 
                        className={errors.location ? 'error' : ''}
                        placeholder="e.g. Silver Spring, MD" 
                      />
                      {errors.location && <span className="field-error" role="alert"><i className="fas fa-exclamation-circle" />{errors.location.message}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="budget">Budget Range</label>
                      <select id="budget" {...register('budget')}>
                        <option value="">Select budget range...</option>
                        {['Under $500','$500 – $1,000','$1,000 – $2,000','$2,000 – $3,500','$3,500 – $5,000','$5,000+','Flexible / Not sure yet'].map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message <span className="required">*</span></label>
                    <textarea 
                      id="message" 
                      {...register('message')} 
                      rows={5} 
                      className={errors.message ? 'error' : ''} 
                      placeholder="Tell us about your event, vision, or any questions..." 
                    />
                    <span className="char-count" id="charCount">
                      {messageValue.length} characters{messageValue.length < 10 ? ` (min 10)` : ''}
                    </span>
                    {errors.message && <span className="field-error" role="alert"><i className="fas fa-exclamation-circle" />{errors.message.message}</span>}
                  </div>

                  <div className="form-submit">
                    <button type="submit" className="btn btn-gold" disabled={isSubmitting}>
                      {isSubmitting ? <><i className="fas fa-spinner fa-spin" /> Sending…</> : <><i className="fas fa-paper-plane" /> Send Message</>}
                    </button>
                    <p className="form-note">We respond within 24 hours. Your information is kept private.</p>
                  </div>
                </form>
              )}
            </div>

            {/* SIDEBAR */}
            <aside className="contact-info-sidebar">
              <div className="info-card">
                <h3>Contact Information</h3>
                {[
                  { icon: 'fa-phone',        label: 'Phone',    val: '+1 (240) 855-1199',         href: 'tel:+12408551199' },
                  { icon: 'fa-envelope',     label: 'Email',    val: 'info@amenpictures.com',      href: 'mailto:amenpicture@outlook.com' },
                  { icon: 'fa-map-marker-alt',label: 'DC Office',val: '8209 Fenton St, Suite #9, Silver Spring, MD 20910', href: null },
                  { icon: 'fa-map-marker-alt',label: 'Ethiopia', val: 'Addis Ababa, Ethiopia',     href: null },
                ].map((row, i) => (
                  <div className="info-row" key={i}>
                    <div className="info-icon"><i className={`fas ${row.icon}`} aria-hidden="true" /></div>
                    <div className="info-row-text">
                      <strong>{row.label}</strong>
                      {row.href ? <a href={row.href}>{row.val}</a> : <span>{row.val}</span>}
                    </div>
                  </div>
                ))}
              </div>

              <div className="info-card">
                <h3>Business Hours</h3>
                <div className="hours-list">
                  {hours.map(h => (
                    <div className="hours-row" key={h.day}>
                      <span className="day">{h.day}</span>
                      <span className="time">{h.time}</span>
                    </div>
                  ))}
                </div>
                <div className="response-info">
                  <i className="fas fa-clock" aria-hidden="true" />
                  <div>
                    <strong>Response Time</strong>
                    <p>We respond to all inquiries within 24 hours. WhatsApp is fastest for urgent requests.</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="maps-section" aria-label="Location map">
        <div className="container">
          <div className="map-embed">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3102.6!2d-77.014!3d38.994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDU5JzQ3LjYiTiA3N8KwMDAnNTEuMyJX!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus" width="100%" height="350" style={{ border: 0 }} allowFullScreen loading="lazy" title="Amen Pictures location" />
          </div>
          <div className="map-cta">
            <a href="https://maps.google.com/?q=8209+Fenton+St+Silver+Spring+MD" target="_blank" rel="noopener noreferrer" className="btn btn-gold-outline">Get Directions</a>
          </div>
        </div>
      </section>

      {/* MINI FAQ */}
      <section className="contact-faq section-padding dark-section" aria-label="Quick FAQ">
        <div className="container">
          <div className="section-header reveal-up">
            <span className="section-tag">Quick Answers</span>
            <h2 className="section-title">Common Questions</h2>
          </div>
          <div className="mini-faq">
            {miniFaqs.map((f, i) => (
              <div className="mini-faq-item reveal-up" key={i} style={{ animationDelay: `${0.1 + i * 0.1}s` }}>
                <i className={`fas ${f.icon}`} aria-hidden="true" />
                <div>
                  <h3>{f.q}</h3>
                  <p>{f.a}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="section-cta reveal-up">
            <Link href="/packages" className="btn btn-gold-outline">See All Packages &amp; FAQ</Link>
          </div>
        </div>
      </section>
    </>
  );
}
