"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { Language, translations, Translations } from "./translations"

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType>({
  language: "id",
  setLanguage: () => {},
  t: translations["id"]
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("id")

  useEffect(() => {
    try {
      const saved = localStorage.getItem("nd-language") as Language | null
      if (saved === "en" || saved === "id") {
        setLanguageState(saved)
      }
    } catch {
      // localStorage can throw (e.g. blocked storage, some crawler/sandboxed
      // renderers) — fall back to the default language silently.
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    try {
      localStorage.setItem("nd-language", lang)
    } catch {
      // Ignore — language still works for this session via state.
    }
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] as Translations }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
