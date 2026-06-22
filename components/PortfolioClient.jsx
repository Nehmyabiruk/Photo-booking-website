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
/* ---------------- COMPONENT ---------------- */

export default function PortfolioClient() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxIdx, setLightboxIdx] = useState(null);

  useScrollReveal();

  // Extended gallery with new categories you requested
  const galleryItems = [
    // Weddings
    { src: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200&q=90', alt: 'Wedding ceremony', cat: 'weddings' },
    { src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&q=90', alt: 'Wedding reception', cat: 'weddings' },
    { src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=90', alt: 'Habesha wedding', cat: 'weddings' },
    { src: 'https://images.unsplash.com/photo-1519741497674-611027288377?w=1200&q=90', alt: 'Couple portrait', cat: 'couple' },

    // Events & Birthday
    { src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=90', alt: 'Corporate event', cat: 'events' },
    { src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=90', alt: 'Birthday celebration', cat: 'birthday' },
    { src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=90', alt: 'Vibrant birthday party', cat: 'birthday' },
    { src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=90', alt: 'Event setup', cat: 'events' },

    // Baby Shower
    { src: 'https://images.unsplash.com/photo-1515488042361-0e5b5c6e1b0a?w=1200&q=90', alt: 'Baby shower decoration', cat: 'baby-shower' },
    { src: 'https://images.unsplash.com/photo-1587486936624-9c2e2a5c9f3d?w=1200&q=90', alt: 'Baby shower celebration', cat: 'baby-shower' },

    // Portraits & Couple
    { src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1200&q=90', alt: 'Portrait shoot', cat: 'portraits' },
    { src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1200&q=90', alt: 'Family portrait', cat: 'portraits' },
    { src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&q=90', alt: 'Romantic couple', cat: 'couple' },

    // Corporate & Ethiopia
    { src: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200&q=90', alt: 'Corporate branding', cat: 'corporate' },
    { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=90', alt: 'Ethiopian wedding', cat: 'ethiopia' },
    { src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=90', alt: 'Traditional Ethiopian event', cat: 'ethiopia' },
  ];

  const filters = [
    { key: 'all', label: 'All Work' },
    { key: 'weddings', label: '💍 Wedding Stories' },
    { key: 'events', label: '🎉 Events' },
    { key: 'birthday', label: '🎂 Birthday' },
    { key: 'couple', label: '💑 Couple' },
    { key: 'baby-shower', label: '👶 Baby Shower' },
    { key: 'portraits', label: '👨‍👩‍👧 Portraits' },
    { key: 'corporate', label: '🏢 Corporate' },
    { key: 'ethiopia', label: '🇪🇹 Ethiopia' },
  ];

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
    <div className="portfolio-section py-16 bg-zinc-950">
      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-12 px-6">
        {filters.map(filter => (
          <button
            key={filter.key}
            onClick={() => setActiveFilter(filter.key)}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
              activeFilter === filter.key
                ? 'bg-white text-black shadow-lg scale-105'
                : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Photo Grid - Album Style Cards */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((item, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-3xl bg-zinc-900 cursor-pointer shadow-2xl hover:shadow-3xl transition-all duration-500 aspect-[4/3]"
              onClick={() => openLightbox(idx)}
            >
              {/* Album-style frame effect */}
              <div className="absolute inset-0 border-8 border-zinc-800 rounded-3xl z-10 pointer-events-none" />
              
              <div className="relative h-full w-full overflow-hidden">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 z-20">
                  <p className="text-white text-lg font-light tracking-wide">
                    {item.alt}
                  </p>
                  <div className="text-xs uppercase tracking-[2px] text-amber-400 mt-1">
                    {item.cat}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4">
          <div className="relative max-w-5xl w-full">
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white text-4xl hover:text-amber-400 transition-colors"
            >
              ×
            </button>
            
            <img
              src={slides[lightboxIdx].src}
              alt={slides[lightboxIdx].alt}
              className="max-h-[85vh] w-full object-contain rounded-2xl shadow-2xl"
            />
            
            <p className="text-center text-zinc-400 mt-6 text-lg">
              {slides[lightboxIdx].alt}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
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
