'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import '@/styles/pages/portfolio.css';

/* ---------------- DATA ---------------- */

const galleryItems = [
  // Weddings
  { id: 1, src: '/images/logo/AR509567.jpg', alt: 'Wedding ceremony', cat: 'weddings' },
  { id: 3, src: '/images/logo/AR509277.jpg', alt: 'Wedding ceremony', cat: 'weddings' },

  // Studio Portraits
  { id: 5, src: '/images/logo/JPEG image-49D5-970A-4F-171.jpeg', alt: 'Studio portrait', cat: 'studio' },
  { id: 6, src: '/images/logo/JPEG image-49D5-970A-4F-172.jpeg', alt: 'Studio portrait', cat: 'studio' },
  { id: 7, src: '/images/logo/JPEG image-49D5-970A-4F-173.jpeg', alt: 'Studio portrait', cat: 'studio' },
  //{ id: 8, src: '/images/logo/599A3463.jpg', alt: 'Studio portrait', cat: 'studio' },

  // Graduation
  { id: 9, src: '/images/logo/JPEG image-49D5-970A-4F-56.jpeg', alt: 'Graduation', cat: 'graduation' },
  { id: 10, src: '/images/logo/JPEG image-49D5-970A-4F-57.jpeg', alt: 'Graduation', cat: 'graduation' },
  { id: 11, src: '/images/logo/JPEG image-49D5-970A-4F-59.jpeg', alt: 'Graduation', cat: 'graduation' },
  //{ id: 12, src: '/images/logo/AR506679.jpg', alt: 'Graduation', cat: 'graduation' },
  //{ id: 13, src: '/images/logo/AR506318.jpg', alt: 'Graduation', cat: 'graduation' },

  // Events
  { id: 17, src: '/images/logo/JPEG image-49D5-970A-4F-138.jpeg', alt: 'Special event', cat: 'events' },
  { id: 18, src: '/images/logo/JPEG image-49D5-970A-4F-141.jpeg', alt: 'Special event', cat: 'events' },

  // Products
  { id: 19, src: '/images/logo/599A1705.jpg', alt: 'Product', cat: 'products' },
  { id: 20, src: '/images/logo/599A1684.jpg', alt: 'Product', cat: 'products' },
  { id: 21, src: '/images/logo/599A1672.jpg', alt: 'Product', cat: 'products' },
  { id: 22, src: '/images/logo/599A1603.jpg', alt: 'Product', cat: 'products' },
  { id: 23, src: '/images/logo/599A1620.jpg', alt: 'Product', cat: 'products' },

  // Portraits
  { id: 25, src: '/images/logo/AR506234.jpg', alt: 'Portrait', cat: 'portraits' },
  { id: 26, src: '/images/logo/AR506359.jpg', alt: 'Portrait', cat: 'portraits' },
  { id: 27, src: '/images/logo/AR508966.jpg', alt: 'Portrait', cat: 'portraits' },
  { id: 28, src: '/images/logo/IMG_2819.JPG', alt: 'Portrait', cat: 'portraits' },

  // Maternity
  { id: 29, src: '/images/logo/599A9425.jpg', alt: 'Maternity', cat: 'maternity' },
  { id: 30, src: '/images/logo/599A9275.jpg', alt: 'Maternity', cat: 'maternity' },
  { id: 31, src: '/images/logo/599A9103.jpg', alt: 'Maternity', cat: 'maternity' },
  { id: 32, src: '/images/logo/599A9099.jpg', alt: 'Maternity', cat: 'maternity' },

  // Kids
  { id: 33, src: '/images/logo/599A4917.jpg', alt: 'Kids', cat: 'kids' },
  { id: 34, src: '/images/logo/AR507862.jpg', alt: 'Kids', cat: 'kids' },
  { id: 35, src: '/images/logo/AR509639 (1).jpg', alt: 'Kids', cat: 'kids' },
  { id: 36, src: '/images/logo/AR507520.jpg', alt: 'Kids', cat: 'kids' },

  // Couple
  { id: 39, src: '/images/logo/AR505878.jpg', alt: 'Couple', cat: 'couple' },
  { id: 40, src: '/images/logo/AR505738-Enhanced-NR.jpg', alt: 'Couple', cat: 'couple' },
  { id: 41, src: '/images/logo/599A8968.jpg', alt: 'Couple', cat: 'couple' },
  { id: 42, src: '/images/logo/599A8332.jpg', alt: 'Couple', cat: 'couple' },
  { id: 43, src: '/images/logo/599A6362.jpg', alt: 'Couple', cat: 'couple' },

  // Christening
  { id: 44, src: '/images/logo/AR500208.jpg', alt: 'Christening', cat: 'christening' },
  { id: 45, src: '/images/logo/AR500267.jpg', alt: 'Christening', cat: 'christening' },
  { id: 46, src: '/images/logo/AR508422.jpg', alt: 'Christening', cat: 'christening' },
  { id: 47, src: '/images/logo/AR508606.jpg', alt: 'Christening', cat: 'christening' },
  { id: 48, src: '/images/logo/AR508639.jpg', alt: 'Christening', cat: 'christening' },

  // Birthday
  { id: 49, src: '/images/logo/599A2388.jpg', alt: 'Birthday', cat: 'birthday' },
  { id: 50, src: '/images/logo/599A7528.jpg', alt: 'Birthday', cat: 'birthday' },
  { id: 51, src: '/images/logo/599A5186.jpg', alt: 'Birthday', cat: 'birthday' },
  { id: 52, src: '/images/logo/IMG_0106.jpg', alt: 'Birthday', cat: 'birthday' },
];

const filters = [
  { key: 'all', label: 'All Work' },
  { key: 'weddings', label: '💍 Weddings' },
  { key: 'studio', label: '📷 Studio' },
  { key: 'graduation', label: '🎓 Graduation' },
  { key: 'events', label: '🎉 Events' },
  { key: 'products', label: '📦 Products' },
  { key: 'portraits', label: '👤 Portraits' },
  { key: 'maternity', label: '🤰 Maternity' },
  { key: 'kids', label: '👶 Kids' },
  { key: 'couple', label: '💑 Couple' },
  { key: 'christening', label: '⛪️ Christening' },
  { key: 'birthday', label: '🎂 Birthday' },
];

const categoryCards = [
  { cat: 'weddings', src: '/images/logo/AR509567.jpg', label: '💍 Weddings' },
  { cat: 'studio', src: '/images/logo/599A8883.jpg', label: '📷 Studio' },
  { cat: 'graduation', src: '/images/logo/599A3265_1.jpg', label: '🎓 Graduation' },
  { cat: 'events', src: '/images/logo/AR509846.jpg', label: '🎉 Events' },
  { cat: 'products', src: '/images/logo/599A1705.jpg', label: '📦 Products' },
  { cat: 'portraits', src: '/images/logo/AR506234.jpg', label: '👤 Portraits' },
  { cat: 'maternity', src: '/images/logo/599A9425.jpg', label: '🤰 Maternity' },
  { cat: 'kids', src: '/images/logo/599A4917.jpg', label: '👶 Kids' },
  { cat: 'couple', src: '/images/logo/AR505878.jpg', label: '💑 Couple' },
  { cat: 'christening', src: '/images/logo/AR500208.jpg', label: '⛪️ Christening' },
  { cat: 'birthday', src: '/images/logo/599A2388.jpg', label: '🎂 Birthday' },
];

export default function PortfolioClient() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [lightboxIdx, setLightboxIdx] = useState(null);

  useScrollReveal();

  const visibleItems = activeFilter === 'all'
    ? categoryCards
    : categoryCards.filter(card => card.cat === activeFilter);

  const openAlbum = (cat) => setSelectedCategory(cat);
  const closeAlbum = () => {
    setSelectedCategory(null);
    setLightboxIdx(null);
  };

  const openLightbox = (idx) => setLightboxIdx(idx);

  const categoryImages = galleryItems.filter(item => item.cat === selectedCategory);
  const slides = categoryImages.map(img => ({ src: img.src, alt: img.alt }));

  return (
    <>
      {/* HERO */}
      <section className="portfolio-hero-full">
        <Image 
          src="https://images.unsplash.com/photo-1523438097201-512ae7d59c7a?w=1600&q=90" 
          alt="Hero" 
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

      {/* Gallery Section */}
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

          <div className="masonry-gallery">
            {visibleItems.map((card) => (
              <div
                key={card.cat}
                className="gallery-item"
                onClick={() => openAlbum(card.cat)}
              >
                <Image
                  src={card.src}
                  alt={card.label}
                  width={800}
                  height={600}
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
                <div className="overlay">
                  <span>{card.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Album Modal */}
      {selectedCategory && (
        <div className="category-modal" onClick={closeAlbum}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={closeAlbum}>✕</button>
            <div className="modal-header">
              <h2>{filters.find(f => f.key === selectedCategory)?.label}</h2>
            </div>
            <div className="modal-gallery">
              {categoryImages.map((item, idx) => (
                <div 
                  key={item.id} 
                  className="modal-gallery-item"
                  onClick={() => openLightbox(idx)}
                >
                  <Image 
                    src={item.src} 
                    alt={item.alt} 
                    width={900} 
                    height={600} 
                    style={{ objectFit: 'cover' }} 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      <Lightbox
        open={lightboxIdx !== null}
        close={() => setLightboxIdx(null)}
        index={lightboxIdx ?? 0}
        slides={slides}
        plugins={[Zoom]}
      />
    </>
  );
}