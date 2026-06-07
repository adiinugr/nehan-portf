import { Anton, Work_Sans } from "next/font/google"

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
