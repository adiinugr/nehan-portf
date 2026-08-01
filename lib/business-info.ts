export const BUSINESS_NAME =
  process.env.NEXT_PUBLIC_BUSINESS_NAME || "Nehan Dev Indonesia"
export const BUSINESS_ADDRESS = process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || ""
export const BUSINESS_EMAIL =
  process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "service@nehandev.com"
export const BUSINESS_PHONE = process.env.NEXT_PUBLIC_BUSINESS_PHONE || ""
// Digits only (no leading +), e.g. "62895335501192" — for wa.me links
export const BUSINESS_PHONE_DIGITS = BUSINESS_PHONE.replace(/\D/g, "")
export const BUSINESS_WHATSAPP_URL = `https://wa.me/${BUSINESS_PHONE_DIGITS}`
