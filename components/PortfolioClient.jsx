'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import '@/styles/pages/portfolio.css';

/* ---------------- DATA ---------------- */

const galleryItems = [
  { src: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200&q=90', alt: 'Wedding ceremony', cat: 'weddings' },
  { src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&q=90', alt: 'Wedding reception', cat: 'weddings' },
  { src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=90', alt: 'Habesha wedding', cat: 'weddings' },

  { src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=90', alt: 'Corporate event', cat: 'events' },
  { src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=90', alt: 'Birthday event', cat: 'events' },

  { src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1200&q=90', alt: 'Portrait shoot', cat: 'portraits' },
  { src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1200&q=90', alt: 'Family portrait', cat: 'portraits' },

  { src: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200&q=90', alt: 'Corporate branding', cat: 'corporate' },
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=90', alt: 'Ethiopian wedding', cat: 'ethiopia' },
];

const filters = [
  { key: 'all', label: 'All Work' },
  { key: 'weddings', label: '💍 Wedding Stories' },
  { key: 'events', label: '🎉 Events' },
  { key: 'portraits', label: '👨‍👩‍👧 Portraits' },
  { key: 'corporate', label: '🏢 Corporate' },
  { key: 'ethiopia', label: '🇪🇹 Ethiopia' },
];

/* ---------------- COMPONENT ---------------- */

export default function PortfolioClient() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxIdx, setLightboxIdx] = useState(null);

  useScrollReveal();

  const visible = galleryItems.filter(
    item => activeFilter === 'all' || item.cat === activeFilter
  );

  const openLightbox = useCallback((idx) => {
    setLightboxIdx(idx);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIdx(null);
    document.body.style.overflow = '';
  }, []);

  const slides = visible.map(img => ({
    src: img.src,
    alt: img.alt
  }));

  return (
    <>
      {/* ---------------- HERO ---------------- */}
      <section className="portfolio-hero-full">
        <Image
          src="https://images.unsplash.com/photo-1523438097201-512ae7d59c7a?w=1600&q=90"
          alt="Portfolio hero"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1>Amen Pictures Portfolio</h1>
          <p>We capture moments that last forever</p>
        </div>
      </section>

      {/* ---------------- FILTER ---------------- */}
      <section className="gallery-section">
        <div className="container">

          <div className="filter-bar">
            {filters.map(f => (
              <button
                key={f.key}
                className={`filter-btn ${activeFilter === f.key ? 'active' : ''}`}
                onClick={() => setActiveFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* ---------------- MASONRY ---------------- */}
          <div className="masonry-gallery">
            {visible.map((item, idx) => (
              <div
                key={item.src}
                className="gallery-item"
                onClick={() => openLightbox(idx)}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={1000}
                  height={700}
                  style={{
                    objectFit: 'contain',   // ✅ FIX: no cropping
                    width: '100%',
                    height: '100%'
                  }}
                />
                <div className="overlay">
                  <span>{item.alt}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ---------------- LIGHTBOX (ZOOMED) ---------------- */}
      <Lightbox
        open={lightboxIdx !== null}
        close={closeLightbox}
        index={lightboxIdx ?? 0}
        slides={slides}
        plugins={[Zoom]}
        zoom={{
          maxZoomPixelRatio: 3,
          scrollToZoom: true,
          doubleTapDelay: 300
        }}
        animation={{ fade: 250 }}
      />
    </>
  );
}