'use client';

import { useState } from 'react';
import Image from 'next/image';
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import '@/styles/pages/portfolio.css';

/* ---------------- DATA ---------------- */
const galleryItems = [
  { id: 1, src: '/images/logo/studio31.jpeg', alt: 'Wedding ceremony', cat: 'weddings' },
  { id: 2, src: '/images/logo/studio32.jpeg', alt: 'Wedding ceremony', cat: 'weddings' },
  { id: 32, src: '/images/logo/studio33.jpeg', alt: 'Wedding ceremony', cat: 'weddings' },
  { id: 3, src: '/images/logo/studio4.jpeg', alt: 'Studio portrait', cat: 'studio' },
  { id: 4, src: '/images/logo/studio3.jpeg', alt: 'Studio portrait', cat: 'studio' },
  { id: 5, src: '/images/logo/studio2.jpeg', alt: 'Studio portrait', cat: 'studio' },
  { id: 6, src: '/images/logo/studio21.jpeg', alt: 'Graduation', cat: 'graduation' },
  { id: 7, src: '/images/logo/studio20.jpeg', alt: 'Graduation', cat: 'graduation' },
  { id: 8, src: '/images/logo/studio19.jpeg', alt: 'Graduation', cat: 'graduation' },
  { id: 9, src: '/images/logo/studio6.jpeg', alt: 'Event', cat: 'events' },
  { id: 10, src: '/images/logo/studio5.jpeg', alt: 'Event', cat: 'events' },
  { id: 11, src: '/images/logo/studio9.jpeg', alt: 'Product', cat: 'products' },
  { id: 12, src: '/images/logo/studio8.jpeg', alt: 'Product', cat: 'products' },
  { id: 13, src: '/images/logo/studio7.jpeg', alt: 'Product', cat: 'products' },
  { id: 14, src: '/images/logo/studio10.jpeg', alt: 'Portrait', cat: 'portraits' },
  { id: 15, src: '/images/logo/studio12.jpeg', alt: 'Portrait', cat: 'portraits' },
  { id: 16, src: '/images/logo/studio11.jpeg', alt: 'Portrait', cat: 'portraits' },
  { id: 17, src: '/images/logo/studio15.jpeg', alt: 'Maternity', cat: 'maternity' },
  { id: 18, src: '/images/logo/studio14.jpeg', alt: 'Maternity', cat: 'maternity' },
  { id: 19, src: '/images/logo/studio13.jpeg', alt: 'Maternity', cat: 'maternity' },
  { id: 20, src: '/images/logo/studio18.jpeg', alt: 'Kids', cat: 'kids' },
  { id: 21, src: '/images/logo/studio17.jpeg', alt: 'Kids', cat: 'kids' },
  { id: 22, src: '/images/logo/studio16.jpeg', alt: 'Kids', cat: 'kids' },
  { id: 23, src: '/images/logo/studio24.jpeg', alt: 'Couple', cat: 'couple' },
  { id: 24, src: '/images/logo/studio23.jpeg', alt: 'Couple', cat: 'couple' },
  { id: 25, src: '/images/logo/studio22.jpeg', alt: 'Couple', cat: 'couple' },
  { id: 26, src: '/images/logo/studio25.jpeg', alt: 'Christening', cat: 'christening' },
  { id: 27, src: '/images/logo/studio26.jpeg', alt: 'Christening', cat: 'christening' },
  { id: 28, src: '/images/logo/studio27.jpeg', alt: 'Christening', cat: 'christening' },
  { id: 29, src: '/images/logo/studio29.jpeg', alt: 'Birthday', cat: 'birthday' },
  { id: 30, src: '/images/logo/studio30.jpeg', alt: 'Birthday', cat: 'birthday' },
  { id: 31, src: '/images/logo/studio1.jpeg', alt: 'Birthday', cat: 'birthday' },
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
  { cat: 'weddings', src: '/images/logo/studio33.jpeg', label: '💍 Weddings' },
  { cat: 'studio', src: '/images/logo/studio4.jpeg', label: '📷 Studio' },
  { cat: 'graduation', src: '/images/logo/studio21.jpeg', label: '🎓 Graduation' },
  { cat: 'events', src: '/images/logo/studio6.jpeg', label: '🎉 Events' },
  { cat: 'products', src: '/images/logo/studio9.jpeg', label: '📦 Products' },
  { cat: 'portraits', src: '/images/logo/studio10.jpeg', label: '👤 Portraits' },
  { cat: 'maternity', src: '/images/logo/studio15.jpeg', label: '🤰 Maternity' },
  { cat: 'kids', src: '/images/logo/studio18.jpeg', label: '👶 Kids' },
  { cat: 'couple', src: '/images/logo/studio24.jpeg', label: '💑 Couple' },
  { cat: 'christening', src: '/images/logo/studio25.jpeg', label: '⛪️ Christening' },
  { cat: 'birthday', src: '/images/logo/studio1.jpeg', label: '🎂 Birthday' },
];
export default function PortfolioClient() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [lightboxIdx, setLightboxIdx] = useState(null);

  //useScrollReveal();

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
      {/* HERO - Unchanged */}
      <section className="portfolio-hero-full">
        <Image src="https://images.unsplash.com/photo-1523438097201-512ae7d59c7a?w=1600&q=90" alt="Hero" fill style={{ objectFit: 'cover' }} priority />
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
     {selectedCategory && (
  <Lightbox
    open={lightboxIdx !== null}
    close={() => setLightboxIdx(null)}
    index={lightboxIdx ?? 0}
    slides={slides}
    plugins={[Zoom]}
  />
)}
    </>
  );
}