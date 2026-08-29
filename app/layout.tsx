import type { Metadata, Viewport } from "next"
import { Syne, Yellowtail, Bebas_Neue } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { WhatsAppButton } from "@/components/ui/whatsapp-button"
import Script from "next/script"
import {
  BUSINESS_NAME,
  BUSINESS_STREET_ADDRESS,
  BUSINESS_CITY,
  BUSINESS_REGION,
  BUSINESS_POSTAL_CODE,
  BUSINESS_EMAIL,
  BUSINESS_PHONE_DIGITS
} from "@/lib/business-info"

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap"
})

const yellowtail = Yellowtail({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-yellowtail",
  display: "swap"
})

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
  display: "swap"
})

const siteUrl = "https://www.nehandev.com"
const ogImageUrl = `${siteUrl}/og-image-nehan.png`

export const viewport: Viewport = {
  themeColor: "#6366F1",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true
}

export const metadata: Metadata = {
  title: {
    default: "NehanDev | Solusi Digital untuk Usaha Lokal",
    template: "%s | NehanDev"
  },
  description:
    "Kami bantu UMKM dan bisnis kecil hadir secara digital — website profesional untuk restoran, travel, penginapan, dan lebih banyak lagi.",
  metadataBase: new URL(siteUrl),
  keywords: [
    "web development",
    "web design",
    "frontend development",
    "React",
    "Next.js",
    "portfolio",
    "professional websites",
    "jasa pembuatan website",
    "web developer Indonesia",
    "pengembangan web"
  ],
  authors: [{ name: "NehanDev", url: siteUrl }],
  creator: "NehanDev",
  publisher: "NehanDev",
  formatDetection: { email: true, address: true, telephone: true },
  category: "Technology",
  openGraph: {
    type: "website",
    locale: "id_ID",
    alternateLocale: ["en_US"],
    url: siteUrl,
    title: "NehanDev | Solusi Digital untuk Usaha Lokal",
    description:
      "Kami bantu UMKM dan bisnis kecil hadir secara digital — website profesional untuk restoran, travel, penginapan, dan lebih banyak lagi.",
    siteName: "NehanDev",
    images: [{ url: ogImageUrl, width: 1200, height: 630, alt: "NehanDev - Solusi Digital untuk Usaha Lokal" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "NehanDev | Solusi Digital untuk Usaha Lokal",
    description:
      "Kami bantu UMKM dan bisnis kecil hadir secara digital — website profesional untuk restoran, travel, penginapan, dan lebih banyak lagi.",
    images: [ogImageUrl],
    creator: "@nehandev",
    site: "@nehandev"
  },
  icons: {
    icon: [
      { url: "/favicons/favicon.svg", type: "image/svg+xml" },
      { url: "/favicons/favicon.ico", type: "image/x-icon" },
      { url: "/favicons/favicon-96x96.png", sizes: "96x96", type: "image/png" }
    ],
    apple: [
      { url: "/favicons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
    other: [
      { rel: "mask-icon", url: "/favicons/favicon.svg", color: "#6366F1" }
    ]
  },
  manifest: "/favicons/site.webmanifest",
  appleWebApp: {
    title: "NehanDev",
    statusBarStyle: "default",
    capable: true,
  },
  alternates: {
    canonical: siteUrl
  }
}

const businessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "NehanDev",
  legalName: BUSINESS_NAME,
  url: siteUrl,
  logo: `${siteUrl}/favicons/web-app-manifest-512x512.png`,
  image: ogImageUrl,
  description:
    "Kami bantu UMKM dan bisnis kecil hadir secara digital — website profesional untuk restoran, travel, penginapan, dan lebih banyak lagi.",
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS_STREET_ADDRESS,
    addressLocality: BUSINESS_CITY,
    addressRegion: BUSINESS_REGION,
    postalCode: BUSINESS_POSTAL_CODE,
    addressCountry: "ID"
  },
  email: BUSINESS_EMAIL,
  telephone: `+${BUSINESS_PHONE_DIGITS}`,
  sameAs: [
    "https://instagram.com/nehandev",
    "https://youtube.com/@nehandev",
    "https://github.com/nehandev",
    "https://linkedin.com/in/nehandev"
  ],
  priceRange: "$$",
  openingHours: "Mo-Fr 09:00-17:00",
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Web Development",
        description: "Custom website and web application development using Next.js, React, TypeScript"
      }
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Education Technology",
        description: "Online exam platforms and educational software for Indonesian schools"
      }
    }
  ]
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <meta name="msapplication-config" content="/favicons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#6366F1" />
        <meta name="msapplication-TileImage" content="/favicons/ms-icon-144x144.png" />
      </head>
      <body className={`${syne.variable} ${yellowtail.variable} ${bebasNeue.variable} font-sans`}>
        <ThemeProvider attribute="class" forcedTheme="light" disableTransitionOnChange>
          {children}
          <WhatsAppButton />
        </ThemeProvider>

        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}

        <script
          id="schema-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
        />
      </body>
    </html>
  )
}
