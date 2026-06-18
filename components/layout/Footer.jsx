import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-grid container">
        {/* Brand */}
        <div className="footer-col footer-brand">
          <Image
            src="/images/logo/logo-white.png"
            alt="Amen Pictures"
            width={140}
            height={48}
            className="footer-logo"
          />
          <p>Washington DC&apos;s premier wedding and event photography studio. Serving MD, DC, VA and Addis Ababa, Ethiopia.</p>
          <div className="social-links">
            <a href="https://www.facebook.com/share/1CsgD3edP6/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fab fa-facebook-f" /></a>
            <a href="https://www.instagram.com/amen_pictures_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram" /></a>
            <a href="https://www.tiktok.com/@amen_pictures" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><i className="fab fa-tiktok" /></a>
            <a href="https://wa.me/12408551199" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><i className="fab fa-whatsapp" /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            {[['/', 'Home'], ['/about', 'About'], ['/services', 'Services'],
              ['/packages', 'Packages'], ['/portfolio', 'Portfolio'],
              ['/reviews', 'Reviews'], ['/contact', 'Contact']].map(([href, label]) => (
              <li key={href}><Link href={href}>{label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div className="footer-col">
          <h4>Services</h4>
          <ul>
            <li><Link href="/services#photography">Photography</Link></li>
            <li><Link href="/services#videography">Videography</Link></li>
            <li><Link href="/services#events">Event Coverage</Link></li>
            <li><Link href="/services#design">Graphic Design</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col footer-contact">
          <h4>Contact Us</h4>
          <ul>
            <li><a href="tel:+12408551199"><i className="fas fa-phone" aria-hidden="true" /> +1 (240) 855-1199</a></li>
            <li><a href="https://wa.me/12408551199" target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp" aria-hidden="true" /> WhatsApp</a></li>
            <li><a href="mailto:info@amenpictures.com"><i className="fas fa-envelope" aria-hidden="true" /> info@amenpictures.com</a></li>
            <li><span><i className="fas fa-map-marker-alt" aria-hidden="true" /> 8209 Fenton St, Suite #9, Silver Spring, MD 20910</span></li>
            <li><span><i className="fas fa-map-marker-alt" aria-hidden="true" /> Addis Ababa, Ethiopia</span></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {year} Amen Pictures. All Rights Reserved. | Designed by Amen Graphics</p>
      </div>
    </footer>
  );
}
