import { Cormorant_Garamond, Jost } from "next/font/google"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
})

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
})

export default function HotelDemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${cormorant.variable} ${jost.variable}`}>{children}</div>
  )
}
