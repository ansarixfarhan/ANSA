# ANSA Designer Lounge — Luxury Men's Couture

> **Where Fabric Meets Elegance**  
> Monumental wedding celebrations, evening cocktail galas, and bespoke executive distinction.

---

## 🏛️ Brand Overview

**ANSA Designer Lounge** is an exclusive luxury menswear fashion house based in Ajmer, Rajasthan. The collection embodies timeless Indian craftsmanship fused with sharp contemporary tailoring:
- **Wedding (Shadi) Couture**: Royal Handcrafted Zari Sherwanis, Heritage Jodhpuri Bandhgalas, Velvet Achkans.
- **Party & Cocktail Wear**: Midnight Royal Micro-Velvet Tuxedos, Silk Jacquard Evening Bundi Sets.
- **Formal & Office Wear**: Italian Linen Safari Blazers, Executive Double-Breasted Suits.
- **Bespoke Fabrics**: Cut-lengths in Super 130s Italian Merino Wool, Raw Silks, and Fine Linens.

### Signature Designer Spotlight
All signature menswear silhouettes and custom royal ensembles are masterfully conceptualized and designed by **Kaif Designer** ([@kaif_designer888](https://instagram.com/kaif_designer888)).

- **Official Store Instagram**: [@ansadesigner.in](https://instagram.com/ansadesigner.in)
- **Flagship Location**: Shop 14, St. Anselm's School Complex, India Motor Circle, Ajmer, Rajasthan 305001.

---

## ⚡ Tech Stack & Architecture

- **Framework**: Next.js 15 (App Router)
- **Library**: React 19
- **Styling**: Tailwind CSS & Custom Design Tokens
- **Typography**: Google Fonts (*Charm* for brand wordmarks, *Cinzel* for royal serif headings, *Outfit* for modern sans-serif body)
- **Icons**: Lucide React
- **Authentication**: Stateless, edge-ready JWT via `jose` (HTTP-only secure cookies)
- **Local Database ($0 Cost)**: File-based persistent storage (`data/users.json`, `data/orders.json`) with atomic file writes and `scrypt` password hashing
- **Security**: In-memory sliding window rate limiter, strict HTTP security headers (nosniff, sameorigin, CSP/Permissions policy), no exposed secrets
- **Performance**: Automated WebP asset delivery, deferred script execution (`strategy="lazyOnload"`), Brotli/Gzip compression

---

## 🚀 Key Features

1. **Luxury Storefront & Occasions Navigation**:
   - Curated collections for Wedding, Party, Office, Safari Blazers, and Bespoke Fabrics.
   - High-resolution garment previews with progressive WebP loading.
   - Interactive cart drawer with real-time totals and live discount calculations.

2. **Customer Portal & Live Tracking**:
   - Patrons can create accounts, log in, manage saved delivery addresses, and view their purchase history.
   - Real-time parcel tracking via order number (e.g. `ANSA-769361`) with BlueDart Express courier sync.

3. **ANSA Admin Atelier (`/admin`)**:
   - Executive dashboard protected by dedicated admin credentials.
   - Real-time financial revenue metrics, orders queue, and registered patrons directory.
   - Complete order fulfillment workflow (status updater, AWB courier tracking assignment, order cancellation).

4. **Production Security & Optimization**:
   - **Zero Hardcoded Secrets**: All passwords, API keys, and JWT secrets stored in environment variables.
   - **Brute-Force Protection**: Sliding-window rate limiter on auth and checkout endpoints.
   - **Asset Optimization**: High-resolution PNGs compressed with `sharp` (5.5+ MB saved) and served via modern `<picture>` WebP tags.

---

## 🛠️ Getting Started

### 1. Prerequisites
- Node.js 18.18+ or 20+
- npm or yarn

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/ansarixfarhan/ANSA.git
cd ANSA

# Install dependencies
npm install
```

### 3. Environment Configuration
Copy the example environment configuration:
```bash
cp .env.example .env.local
```
Fill in your secrets in `.env.local`:
```env
ADMIN_USERNAME=admin@ansadesigner.cloud
ADMIN_PASSWORD=your_secure_admin_password
ADMIN_NAME="ANSA Master Admin"
JWT_SECRET=your_super_secret_jwt_encryption_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Structure

```
ANSA final/
├── app/                  # Next.js 15 App Router pages & API routes
│   ├── account/          # Customer profile & orders history
│   ├── admin/            # Executive Admin Atelier (/admin, /admin/login)
│   ├── api/              # REST APIs (auth, orders, admin, tracking)
│   ├── checkout/         # Streamlined checkout with COD & Razorpay
│   ├── collections/      # Occasion-specific catalog routes
│   ├── shop/             # Global menswear catalog with filters
│   └── track-order/      # Real-time parcel tracking
├── data/                 # Persistent local JSON store (users & orders)
├── lib/                  # Auth, database, rate limiting, and catalog helpers
├── public/               # Compressed WebP and PNG assets
└── scripts/              # Verification & maintenance utilities
```

---

## 📜 License
Private and proprietary property of **ANSA Designer Lounge, Ajmer**. All rights reserved.
