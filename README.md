# Amen Pictures — Next.js Website

Washington DC's premier wedding & event photography studio.  
Built with **Next.js 14 (App Router)**, MongoDB, Cloudinary, SendGrid & Stripe.

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
Copy `.env.local` and fill in your actual values:
```bash
# MongoDB Atlas
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/amen-pictures

# SendGrid
SENDGRID_API_KEY=SG.xxxx
EMAIL_FROM=info@amenpictures.com
EMAIL_TO=info@amenpictures.com

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Stripe
STRIPE_SECRET_KEY=sk_test_xxxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxx

# JWT (min 32 chars)
JWT_SECRET=your_super_secret_jwt_key_here

# Site URL
NEXT_PUBLIC_SITE_URL=https://amenpictures.com
```

### 3. Add your images
Place your photos in `/public/images/` following this structure:
```
public/
  images/
    logo/
      logo-white.png   (400×120px, transparent bg)
      logo-gold.png    (400×120px, transparent bg)
    hero/
      hero-bg.jpg      (1920×1080px)
    portfolio/
      weddings/        wedding-1.jpg … wedding-6.jpg
      events/          event-1.jpg … event-4.jpg
      portraits/       portrait-1.jpg … portrait-4.jpg
      corporate/       corporate-1.jpg … corporate-3.jpg
      ethiopia/        ethiopia-1.jpg … ethiopia-3.jpg
    team/
      team-1.jpg       (800×600px)
      team-2.jpg
      team-3.jpg
    about/
      team.jpg         (900×1125px)
  video/
    hero-reel.mp4      (1920×1080, H.264, under 15MB)
```

### 4. Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### 5. Deploy to Vercel
```bash
npm install -g vercel
vercel
```
Add all environment variables in Vercel dashboard.

---

## 📁 Project Structure

```
amen-pictures/
├── app/                    ← Next.js App Router pages
│   ├── layout.js           ← Root layout (Navbar + Footer)
│   ├── page.js             ← Home page
│   ├── about/page.js
│   ├── services/page.js
│   ├── packages/page.js
│   ├── portfolio/page.js
│   ├── reviews/page.js
│   ├── contact/page.js
│   ├── admin/page.js       ← Admin dashboard
│   └── api/
│       ├── contact/        ← POST: save inquiry + send email
│       ├── bookings/       ← GET/PATCH: manage bookings
│       ├── reviews/        ← GET/POST/PATCH: manage reviews
│       ├── portfolio/      ← GET/POST/DELETE: manage photos
│       └── payments/       ← POST: Stripe payment intent
├── components/             ← React components
│   ├── layout/             ← Navbar, Footer
│   ├── home/               ← HomeClient (all homepage sections)
│   ├── shared/             ← WhatsAppButton
│   ├── admin/              ← AdminClient dashboard
│   └── *.jsx               ← Page client components
├── hooks/
│   ├── useLanguage.js      ← EN/AM bilingual context
│   └── useScrollReveal.js  ← Scroll animations + counter
├── lib/
│   ├── mongodb.js          ← DB connection
│   ├── sendgrid.js         ← Email sending
│   ├── cloudinary.js       ← Image upload/delete
│   └── stripe.js           ← Payment processing
├── models/
│   ├── Booking.js          ← Mongoose schema
│   ├── Review.js
│   └── Portfolio.js
├── styles/
│   ├── globals.css         ← Master CSS import
│   ├── style.css           ← Design tokens + reset
│   ├── layout.css          ← Navbar + footer
│   ├── components.css      ← Buttons, cards, modals
│   ├── animations.css      ← Keyframes + scroll reveal
│   └── pages/              ← Page-specific styles
└── public/                 ← Static assets
    ├── images/
    └── video/
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact` | Submit contact form → saves to DB + sends email |
| GET | `/api/bookings` | Get all bookings (admin) |
| PATCH | `/api/bookings` | Update booking status |
| GET | `/api/reviews` | Get approved reviews |
| POST | `/api/reviews` | Submit a review (pending approval) |
| PATCH | `/api/reviews` | Approve/feature a review (admin) |
| GET | `/api/portfolio` | Get portfolio images |
| POST | `/api/portfolio` | Upload image to Cloudinary |
| DELETE | `/api/portfolio` | Delete image |
| POST | `/api/payments` | Create Stripe payment intent |
| PUT | `/api/payments` | Stripe webhook handler |

---

## 🌐 Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, stats, services, portfolio, testimonials, packages, Instagram |
| `/about` | About — story, team, equipment, locations, values |
| `/services` | Services — photography, videography, events, design, process |
| `/packages` | Packages — studio/event tabs, comparison, add-ons, FAQ |
| `/portfolio` | Portfolio — filterable gallery, lightbox, video reel |
| `/reviews` | Reviews — rating summary, grid, filter, leave review |
| `/contact` | Contact — form with validation, sidebar, map, mini FAQ |
| `/admin` | Admin — bookings, reviews, portfolio upload |

---

## 🌍 Bilingual Support (EN / አማርኛ)
Language toggled via the navbar button.  
Preference saved to `localStorage`.  
All translatable strings go through the `useLang()` hook.

---

## 📞 Contact
- **Phone:** +1 (240) 855-1199
- **Email:** amenpicture@outlook.com
- **Studio:** 8209 Fenton St, Suite #9, Silver Spring, MD 20910
- **Instagram:** [@amen_pictures_](https://www.instagram.com/amen_pictures_/)
