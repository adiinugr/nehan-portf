import { Oswald, Manrope } from "next/font/google"

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
})

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
})

export default function RentalDemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${oswald.variable} ${manrope.variable}`}>{children}</div>
  )
}
