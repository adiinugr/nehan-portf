import type { Metadata } from "next"
import { JasaWebsiteLanding } from "@/components/ui/jasa-website-landing"
import { jasaWebsiteNiches } from "@/lib/data/jasa-website-niches"

const niche = jasaWebsiteNiches["jasa-website-travel-wisata"]
const siteUrl = "https://www.nehandev.com"
const url = `${siteUrl}/layanan/${niche.slug}`

export const metadata: Metadata = {
  title: niche.metaTitle,
  description: niche.metaDescription,
  alternates: { canonical: url },
  openGraph: {
    title: niche.metaTitle,
    description: niche.metaDescription,
    url,
    siteName: "NehanDev"
  }
}

export default function Page() {
  return <JasaWebsiteLanding niche={niche} />
}
