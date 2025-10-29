"use client"

import { Button } from "@/components/ui/button"
import { SUPPORTED_LANGUAGES, type LanguageCode } from "@/lib/translations"
import { Globe } from "lucide-react"
import { useState } from "react"

interface LanguageSelectorProps {
  language: LanguageCode
  onLanguageChange: (lang: LanguageCode) => void
}

export default function LanguageSelector({ language, onLanguageChange }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const languages = Object.values(SUPPORTED_LANGUAGES)

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        size="sm"
        className="flex items-center gap-2 border-slate-600 text-slate-300 hover:bg-slate-700"
      >
        <Globe className="w-4 h-4" />
        <span className="text-xs">{SUPPORTED_LANGUAGES[language].nativeName}</span>
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-50">
          <div className="p-2 max-h-96 overflow-y-auto">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  onLanguageChange(lang.code)
                  setIsOpen(false)
                  // Persist language preference
                  if (typeof window !== "undefined") {
                    localStorage.setItem("preferred-language", lang.code)
                  }
                }}
                className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                  language === lang.code ? "bg-red-600 text-white font-semibold" : "text-slate-300 hover:bg-slate-700"
                }`}
              >
                <div className="font-medium">{lang.nativeName}</div>
                <div className="text-xs text-slate-400">{lang.name}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
