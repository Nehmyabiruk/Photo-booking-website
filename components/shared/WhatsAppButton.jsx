'use client';
import { useEffect, useRef } from 'react';

export default function WhatsAppButton() {
  const btnRef = useRef(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;
    btn.style.opacity = '0';
    btn.style.transform = 'scale(0.8)';
    btn.style.transition = 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';
    const timer = setTimeout(() => {
      btn.style.opacity = '1';
      btn.style.transform = 'scale(1)';
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <a
      ref={btnRef}
      href="https://wa.me/12408551199"
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <i className="fab fa-whatsapp" aria-hidden="true" />
      <span className="whatsapp-tooltip">Chat on WhatsApp</span>
    </a>
  );
}
