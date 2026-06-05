import type { Metadata, Viewport } from "next"
import { Syne, Yellowtail, Bebas_Neue } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/lib/i18n/language-context"
import Script from "next/script"

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
    locale: "en_US",
    alternateLocale: ["id_ID"],
    url: siteUrl,
    title: "NehanDev | Professional Web Development Solutions",
    description:
      "Transform your digital vision into reality with NehanDev. We create beautiful, high-performance websites and applications tailored to your business needs.",
    siteName: "NehanDev",
    images: [{ url: ogImageUrl, width: 1200, height: 630, alt: "NehanDev - Professional Web Development" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "NehanDev | Professional Web Development Solutions",
    description:
      "Transform your digital vision into reality with NehanDev. We create beautiful, high-performance websites and applications tailored to your business needs.",
    images: [ogImageUrl],
    creator: "@nehandev",
    site: "@nehandev"
  },
  icons: {
    icon: [
      { url: "/favicons/favicon.svg", type: "image/svg+xml" },
      { url: "/favicons/favicon.ico" },
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicons/favicon-96x96.png", sizes: "96x96", type: "image/png" }
    ],
    apple: [
      { url: "/favicons/apple-touch-icon.png" },
      { url: "/favicons/apple-icon-180x180.png", sizes: "180x180", type: "image/png" }
    ],
    other: [
      { rel: "mask-icon", url: "/favicons/favicon.svg", color: "#6366F1" }
    ]
  },
  manifest: "/favicons/site.webmanifest",
  alternates: {
    canonical: siteUrl,
    languages: {
      "en": siteUrl,
      "id": siteUrl,
      "x-default": siteUrl
    }
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="alternate" hrefLang="en" href={siteUrl} />
        <link rel="alternate" hrefLang="id" href={siteUrl} />
        <link rel="alternate" hrefLang="x-default" href={siteUrl} />
        <meta name="msapplication-config" content="/favicons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#6366F1" />
        <meta name="msapplication-TileImage" content="/favicons/ms-icon-144x144.png" />
      </head>
      <body className={`${syne.variable} ${yellowtail.variable} ${bebasNeue.variable} font-sans`}>
        <ThemeProvider attribute="class" forcedTheme="light" disableTransitionOnChange>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>

        <Script id="schema-structured-data" type="application/ld+json" strategy="afterInteractive">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "NehanDev",
              "url": "${siteUrl}",
              "logo": "${siteUrl}/favicons/web-app-manifest-512x512.png",
              "image": "${ogImageUrl}",
              "description": "Transform your digital vision into reality with NehanDev. We create beautiful, high-performance websites and applications tailored to your business needs.",
              "address": { "@type": "PostalAddress", "addressCountry": "ID" },
              "email": "contact@nehandev.com",
              "sameAs": [
                "https://instagram.com/nehandev",
                "https://youtube.com/@nehandev",
                "https://github.com/nehandev",
                "https://linkedin.com/in/nehandev"
              ],
              "priceRange": "$$",
              "openingHours": "Mo-Fr 09:00-17:00",
              "makesOffer": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Web Development",
                    "description": "Custom website and web application development using Next.js, React, TypeScript"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Education Technology",
                    "description": "Online exam platforms and educational software for Indonesian schools"
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
