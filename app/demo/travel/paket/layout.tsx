import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Paket Wisata — Demo Jelajah Nusantara | NehanDev",
  description:
    "Jelajahi katalog paket wisata pada demo website travel Jelajah Nusantara, contoh proyek dari NehanDev.",
  alternates: { canonical: "https://www.nehandev.com/demo/travel/paket" },
  openGraph: {
    title: "Paket Wisata — Demo Jelajah Nusantara | NehanDev",
    description: "Katalog paket wisata pada demo website travel Jelajah Nusantara.",
    url: "https://www.nehandev.com/demo/travel/paket"
  }
}

export default function PaketLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
