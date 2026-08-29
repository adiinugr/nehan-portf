export const BUSINESS_NAME =
  process.env.NEXT_PUBLIC_BUSINESS_NAME || "Nehan Dev Indonesia"
export const BUSINESS_ADDRESS = process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || ""
// Split out for JSON-LD PostalAddress (schema.org expects these as
// separate fields, not crammed into one streetAddress string).
export const BUSINESS_STREET_ADDRESS =
  process.env.NEXT_PUBLIC_BUSINESS_STREET_ADDRESS ||
  "Alexandria Hills, Blok AH5-08, Damarsi, Buduran"
export const BUSINESS_CITY = process.env.NEXT_PUBLIC_BUSINESS_CITY || "Sidoarjo"
export const BUSINESS_REGION = process.env.NEXT_PUBLIC_BUSINESS_REGION || "Jawa Timur"
export const BUSINESS_POSTAL_CODE = process.env.NEXT_PUBLIC_BUSINESS_POSTAL_CODE || "61252"
export const BUSINESS_EMAIL =
  process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "service@nehandev.com"
export const BUSINESS_PHONE = process.env.NEXT_PUBLIC_BUSINESS_PHONE || ""
// Digits only (no leading +), e.g. "62895335501192" — for wa.me links
export const BUSINESS_PHONE_DIGITS = BUSINESS_PHONE.replace(/\D/g, "")
export const BUSINESS_WHATSAPP_URL = `https://wa.me/${BUSINESS_PHONE_DIGITS}`
