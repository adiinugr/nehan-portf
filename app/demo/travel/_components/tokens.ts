export const GREEN = "#2b5d4f"
export const GOLD = "#c9a84c"
export const BG = "#f7f6f2"
export const SERIF = "var(--font-playfair, 'Georgia', serif)"
export const SANS = "var(--font-dm-sans, sans-serif)"

export const NEHAN_WA = "62895335501192"
export const WA_GENERAL = `https://wa.me/${NEHAN_WA}?text=${encodeURIComponent("Halo NehanDev, saya tertarik membuat website travel seperti demo ini untuk bisnis saya.")}`

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
}
