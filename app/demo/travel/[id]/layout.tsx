import type { Metadata } from "next"
import { packages } from "../data"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.nehandev.com"

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const pkg = packages.find((p) => p.id === id)
  const url = `${siteUrl}/demo/travel/${id}`

  if (!pkg) {
    return {
      title: "Paket Wisata — Demo Jelajah Nusantara",
      alternates: { canonical: url }
    }
  }

  const title = `${pkg.name} — Demo Jelajah Nusantara`
  const description = `${pkg.tagline}. ${pkg.days} hari ${pkg.nights} malam ke ${pkg.dest}, mulai ${pkg.priceLabel} — contoh halaman paket wisata dari demo website travel NehanDev.`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | NehanDev`,
      description: pkg.tagline,
      url,
      images: [{ url: `${siteUrl}${pkg.img}` }]
    }
  }
}

export default function TravelPackageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
