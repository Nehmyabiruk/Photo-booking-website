import '@/styles/globals.css';
import { LanguageProvider } from '@/hooks/useLanguage';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/shared/WhatsAppButton';

export const metadata = {
  title: {
    template: '%s | Amen Pictures — DC\'s Premier Wedding & Event Photographers',
    default: 'Amen Pictures — DC\'s Premier Wedding & Event Photographers',
  },
  description: 'Amen Pictures is Washington DC\'s premier wedding and event photography and videography studio. Serving Maryland, DC, Virginia and Addis Ababa, Ethiopia.',
  keywords: 'wedding photographer DC, Silver Spring photographer, Ethiopian wedding photographer Maryland, event videographer DC',
  openGraph: {
    siteName: 'Amen Pictures',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Poppins:wght@300;400;500;600&family=Noto+Serif+Ethiopic:wght@400;600&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>
      <body>
        <LanguageProvider>
          <a href="#main-content" className="skip-link">Skip to content</a>
          <Navbar />
          <main id="main-content">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </LanguageProvider>
      </body>
    </html>
  );
}
