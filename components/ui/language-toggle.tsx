"use client"

import { useLanguage } from "@/lib/i18n/language-context"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-0.5 text-sm font-medium">
      <button
        onClick={() => setLanguage("en")}
        className={`px-2 py-1 rounded transition-colors ${
          language === "en"
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        EN
      </button>
      <span className="text-border">|</span>
      <button
        onClick={() => setLanguage("id")}
        className={`px-2 py-1 rounded transition-colors ${
          language === "id"
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        ID
      </button>
    </div>
  )
}
