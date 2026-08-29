import type { Metadata } from "next"
import { Anton, Work_Sans } from "next/font/google"

export const metadata: Metadata = {
  title: "Demo Website Barbershop — Kings Barbershop",
  description:
    "Contoh website barbershop modern dari NehanDev: daftar layanan, harga, booking online, dan galeri hasil kerja.",
  alternates: { canonical: "https://www.nehandev.com/demo/barbershop" },
  openGraph: {
    title: "Demo Website Barbershop — Kings Barbershop | NehanDev",
    description: "Contoh website barbershop modern: daftar layanan, harga, booking online, dan galeri hasil kerja.",
    url: "https://www.nehandev.com/demo/barbershop"
  }
}

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
})

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
})

export default function BarbershopDemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${anton.variable} ${workSans.variable}`}>{children}</div>
  )
}
