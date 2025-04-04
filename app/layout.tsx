import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

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
    default: "NehanDev | Professional Web Development Solutions",
    template: "%s | NehanDev"
  },
  description:
    "Transform your digital vision into reality with NehanDev. We create beautiful, high-performance websites and applications tailored to your business needs.",
  metadataBase: new URL(siteUrl),
  keywords: [
    "web development",
    "web design",
    "frontend development",
    "React",
    "Next.js",
    "portfolio",
    "professional websites"
  ],
  authors: [{ name: "NehanDev", url: siteUrl }],
  creator: "NehanDev",
  publisher: "NehanDev",
  formatDetection: {
    email: true,
    address: true,
    telephone: true
  },
  category: "Technology",

  // OpenGraph metadata
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "NehanDev | Professional Web Development Solutions",
    description:
      "Transform your digital vision into reality with NehanDev. We create beautiful, high-performance websites and applications tailored to your business needs.",
    siteName: "NehanDev",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "NehanDev - Professional Web Development"
      }
    ]
  },

  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "NehanDev | Professional Web Development Solutions",
    description:
      "Transform your digital vision into reality with NehanDev. We create beautiful, high-performance websites and applications tailored to your business needs.",
    images: [ogImageUrl],
    creator: "@nehandev",
    site: "@nehandev"
  },

  // Alternative languages - add if you have multilingual support
  // alternates: {
  //   canonical: siteUrl,
  //   languages: {
  //     'en-US': `${siteUrl}/en`,
  //     'id-ID': `${siteUrl}/id`,
  //   },
  // },

  // App links - if you have mobile apps
  // appLinks: {
  //   ios: {
  //     url: "https://apps.apple.com/app/yourapp",
  //     app_store_id: "your_app_id",
  //   },
  //   android: {
  //     package: "com.example.yourapp",
  //     app_name: "Your App",
  //   },
  //   web: {
  //     url: siteUrl,
  //     should_fallback: true,
  //   },
  // },

  // Icons - multiple formats for broad device compatibility
  icons: {
    icon: [
      { url: "/favicons/favicon.ico" },
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicons/favicon-96x96.png", sizes: "96x96", type: "image/png" }
    ],
    apple: [
      { url: "/favicons/apple-touch-icon.png" },
      {
        url: "/favicons/apple-icon-57x57.png",
        sizes: "57x57",
        type: "image/png"
      },
      {
        url: "/favicons/apple-icon-72x72.png",
        sizes: "72x72",
        type: "image/png"
      },
      {
        url: "/favicons/apple-icon-114x114.png",
        sizes: "114x114",
        type: "image/png"
      },
      {
        url: "/favicons/apple-icon-180x180.png",
        sizes: "180x180",
        type: "image/png"
      }
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/favicons/apple-icon-precomposed.png"
      },
      {
        rel: "mask-icon",
        url: "/favicons/favicon.svg",
        color: "#6366F1"
      }
    ]
  },

  // Web manifest
  manifest: "/favicons/site.webmanifest"
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Windows and IE specific metadata */}
        <meta
          name="msapplication-config"
          content="/favicons/browserconfig.xml"
        />
        <meta name="msapplication-TileColor" content="#6366F1" />
        <meta
          name="msapplication-TileImage"
          content="/favicons/ms-icon-144x144.png"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>

        {/* JSON-LD structured data */}
        <Script
          id="schema-structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {`
            {
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "NehanDev",
              "url": "${siteUrl}",
              "logo": "${siteUrl}/favicons/web-app-manifest-512x512.png",
              "image": "${ogImageUrl}",
              "description": "Transform your digital vision into reality with NehanDev. We create beautiful, high-performance websites and applications tailored to your business needs.",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "ID"
              },
              "email": "contact@nehandev.com",
              "sameAs": [
                "https://instagram.com/nehandev",
                "https://youtube.com/@nehandev",
                "https://github.com/nehandev",
                "https://linkedin.com/in/nehandev"
              ],
              "priceRange": "$$",
              "openingHours": "Mo-Fr 09:00-17:00",
              "telephone": "+6281234567890",
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": "-6.1753942",
                  "longitude": "106.8249641"
                },
                "geoRadius": "50000"
              },
              "makesOffer": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Web Development",
                    "description": "Custom website development using modern technologies"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Web Design",
                    "description": "Modern and responsive website design"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Web Application Development",
                    "description": "Development of interactive web applications"
                  }
                }
              ]
            }
          `}
        </Script>
      </body>
    </html>
  )
}
