'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  nav: {
    home:      { en: 'Home',      am: 'መነሻ' },
    about:     { en: 'About',     am: 'ስለ እኛ' },
    services:  { en: 'Services',  am: 'አገልግሎቶች' },
    packages:  { en: 'Packages',  am: 'ፓኬጆች' },
    portfolio: { en: 'Portfolio', am: 'ፖርትፎሊዮ' },
    reviews:   { en: 'Reviews',   am: 'ግምገማዎች' },
    contact:   { en: 'Contact',   am: 'ያግኙን' },
    bookNow:   { en: 'Book Now',  am: 'አሁን ይያዙ' },
  },
  hero: {
    eyebrow:   { en: 'Washington DC • Maryland • Virginia • Addis Ababa', am: 'ዋሽንግተን ዲሲ • ሜሪላንድ • ቨርጂኒያ • አዲስ አበባ' },
    headline:  { en: "Washington DC's Premier Wedding & Event Photographers", am: 'ዋሽንግተን ዲሲ ምርጥ የሰርግ እና ዝግጅት ፎቶግራፈር' },
    sub:       { en: "Capturing Life's Moments, One Click at a Time", am: 'የህይወት ቅጽበቶችን ያሳያል፣ አንድ ጠቅ በአንድ ጊዜ' },
    viewWork:  { en: 'View Our Work', am: 'ስራዎቻችንን ይመልከቱ' },
    book:      { en: 'Book a Consultation', am: 'ምክክር ይያዙ' },
  },
  footer: {
    tagline:   { en: "Washington DC's premier wedding and event photography studio. Serving MD, DC, VA and Addis Ababa, Ethiopia.", am: 'ዋሽንግተን ዲሲ ምርጥ የሰርግ እና ዝግጅት ፎቶ ስቱዲዮ።' },
    quickLinks:{ en: 'Quick Links', am: 'ፈጣን አገናኞች' },
    services:  { en: 'Services', am: 'አገልግሎቶች' },
    contactUs: { en: 'Contact Us', am: 'ያግኙን' },
    rights:    { en: 'All Rights Reserved.', am: 'መብቶች ሁሉ የተጠበቁ ናቸው።' },
    designed:  { en: 'Designed by Amen Graphics', am: 'በ አሜን ግራፊክስ ተሰርቷል' },
  },
  cta: {
    whatsapp:  { en: 'Chat on WhatsApp', am: 'WhatsApp ላይ ይወያዩ' },
  },
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    const saved = localStorage.getItem('amen_language');
    if (saved === 'am' || saved === 'en') setLang(saved);
  }, []);

  const toggleLang = () => {
    const next = lang === 'en' ? 'am' : 'en';
    setLang(next);
    localStorage.setItem('amen_language', next);
    document.documentElement.lang = next;
    document.body.classList.toggle('lang-am', next === 'am');
  };

  const t = (obj) => (typeof obj === 'object' ? obj[lang] || obj.en : obj);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
