import { Poppins } from "next/font/google";
import "./globals.css";
import ConditionalShell from "./components/ConditionalShell";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import Script from "next/script";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = "https://www.ansadesigner.cloud";

export const metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default:
      "ANSA | Where Fabric Meets Elegance | Luxury Redefined",
    template: "%s | ANSA",
  },

  description:
    "At ANSA Designer Lounge in Ajmer, we curate premium fabrics blending craftsmanship with contemporary elegance. Discover wedding sherwanis, safari blazers, velvet blazers, and bespoke couture.",

  keywords: [
    "ANSA",
    "ANSA Designer Lounge",
    "ANSA Designer",
    "ANSA Ajmer",
    "Luxury Fabrics",
    "Wedding Sherwani",
    "Safari Blazer",
    "Velvet Blazer",
    "Men's Couture Ajmer",
    "Designer Fabrics Rajasthan",
    "Bespoke Tailoring Ajmer",
    "Timeless Fashion",
  ],

  authors: [
    {
      name: "ANSA Designer Lounge",
      url: siteUrl,
    },
  ],

  creator: "ANSA",
  publisher: "ANSA",

  formatDetection: {
    telephone: true,
    email: true,
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "ANSA",

    title: "ANSA | Where Fabric Meets Elegance | Luxury Redefined",

    description:
      "At ANSA, we curate premium fabrics that blend craftsmanship with contemporary elegance. Discover fabrics and couture that inspire.",

    images: [
      {
        url: "/collection-banner.png",
        width: 1200,
        height: 630,
        alt: "ANSA Collections",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "ANSA | Where Fabric Meets Elegance",
    description:
      "Curating premium fabrics that blend craftsmanship with contemporary elegance.",
    images: ["/collection-banner.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: siteUrl,
  },

  icons: {
    icon: "/title_logo.png",
    apple: "/title_logo.png",
  },
};

// ClothingStore structured data
const orgStructuredData = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  name: "ANSA Designer Lounge",
  url: siteUrl,
  logo: `${siteUrl}/title_logo.png`,
  description:
    "ANSA Designer Lounge in Ajmer curates refined fabrics, luxury wedding sherwanis, safari blazers, velvet blazers, and bespoke men's couture.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Railway Station, Police Chowki, Cinema Road, opp. Sardar Light, Dayanand Colony",
    addressLocality: "Ajmer",
    addressRegion: "Rajasthan",
    postalCode: "305001",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91 96100 13835",
    contactType: "customer service",
    availableLanguage: ["English", "Hindi"],
  },
  sameAs: [
    "https://maps.app.goo.gl/Las7yC4LUc6fDndU6",
    "https://www.ansadesigner.cloud/",
    "https://instagram.com/ansadesigner.in",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Charm:wght@400;700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap"
          rel="stylesheet"
        />
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
        {/*Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(orgStructuredData),
          }}
        />
      </head>

      <body
        suppressHydrationWarning
        className={`${poppins.variable} antialiased bg-[var(--primary)] min-h-screen`}
      >
        <AuthProvider>
          <CartProvider>
            <div className="overflow-x-hidden min-h-screen">
              <ConditionalShell>{children}</ConditionalShell>
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

