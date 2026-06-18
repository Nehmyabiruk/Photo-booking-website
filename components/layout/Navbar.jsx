'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLang, translations } from '@/hooks/useLanguage';

const navLinks = [
  { href: '/',          key: 'home' },
  { href: '/about',     key: 'about' },
  { href: '/services',  key: 'services' },
  { href: '/packages',  key: 'packages' },
  { href: '/portfolio', key: 'portfolio' },
  { href: '/reviews',   key: 'reviews' },
  { href: '/contact',   key: 'contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { lang, toggleLang, t } = useLang();
  const [scrolled, setScrolled]   = useState(false);
  const [hidden, setHidden]       = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setScrolled(current > 60);
      setHidden(current > lastScrollY && current > 200);
      setLastScrollY(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <>
      <nav
        id="navbar"
        role="navigation"
        aria-label="Main navigation"
        className={`navbar${scrolled ? ' scrolled' : ''}${hidden ? ' hidden' : ''}`}
      >
        <div className="nav-container">
          <Link href="/" className="nav-logo" aria-label="Amen Pictures Home">
            <Image
              src="/images/logo/logo-white.png"
              alt="Amen Pictures"
              width={140}
              height={48}
              className="logo-img"
              priority
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <span className="logo-text" style={{ display: 'none' }}>Amen Pictures</span>
          </Link>

          <ul className="nav-links" role="list">
            {navLinks.map(({ href, key }) => (
              <li key={key}>
                <Link
                  href={href}
                  className={`nav-link${pathname === href ? ' active' : ''}`}
                  aria-current={pathname === href ? 'page' : undefined}
                >
                  {t(translations.nav[key])}
                </Link>
              </li>
            ))}
          </ul>

          <div className="nav-right">
            <button
              className="lang-toggle"
              id="langToggle"
              onClick={toggleLang}
              aria-label="Toggle language between English and Amharic"
            >
              <span className={`lang-option${lang === 'en' ? ' active' : ''}`} id="langEN">EN</span>
              <span className="lang-divider">|</span>
              <span className={`lang-option${lang === 'am' ? ' active' : ''}`} id="langAM">አማርኛ</span>
            </button>
            <Link href="/contact" className="btn btn-gold">
              {t(translations.nav.bookNow)}
            </Link>
            <button
              className={`hamburger${menuOpen ? ' open' : ''}`}
              id="hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close mobile menu' : 'Open mobile menu'}
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`mobile-overlay${menuOpen ? ' open' : ''}`}
        id="mobileOverlay"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        onClick={(e) => { if (e.target === e.currentTarget) setMenuOpen(false); }}
      >
        <button
          className="mobile-close"
          id="mobileClose"
          onClick={() => setMenuOpen(false)}
          aria-label="Close mobile menu"
        >
          <i className="fas fa-times" />
        </button>

        <ul className="mobile-nav-links" role="list">
          {navLinks.map(({ href, key }) => (
            <li key={key}>
              <Link href={href} onClick={() => setMenuOpen(false)}>
                {t(translations.nav[key])}
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/contact" className="btn btn-gold mobile-book" onClick={() => setMenuOpen(false)}>
          {t(translations.nav.bookNow)}
        </Link>
      </div>
    </>
  );
}
