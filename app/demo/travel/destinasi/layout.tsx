import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Destinasi Wisata — Demo Jelajah Nusantara | NehanDev",
  description:
    "Jelajahi katalog destinasi wisata Indonesia pada demo website travel Jelajah Nusantara, contoh proyek dari NehanDev.",
  alternates: { canonical: "https://www.nehandev.com/demo/travel/destinasi" },
  openGraph: {
    title: "Destinasi Wisata — Demo Jelajah Nusantara | NehanDev",
    description: "Katalog destinasi wisata Indonesia pada demo website travel Jelajah Nusantara.",
    url: "https://www.nehandev.com/demo/travel/destinasi"
  }
}

export default function DestinasiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
