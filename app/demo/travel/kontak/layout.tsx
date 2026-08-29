import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Kontak — Demo Jelajah Nusantara | NehanDev",
  description:
    "Hubungi tim pada demo website travel Jelajah Nusantara, contoh proyek dari NehanDev.",
  alternates: { canonical: "https://www.nehandev.com/demo/travel/kontak" },
  openGraph: {
    title: "Kontak — Demo Jelajah Nusantara | NehanDev",
    description: "Halaman kontak pada demo website travel Jelajah Nusantara.",
    url: "https://www.nehandev.com/demo/travel/kontak"
  }
}

export default function KontakLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
