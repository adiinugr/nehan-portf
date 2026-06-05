"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

const WA_NUMBER = "62895335501192"
const WA_MESSAGE = "Halo NehanDev, saya ingin konsultasi website untuk bisnis saya."
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`

export function WhatsAppButton() {
  const [visible, setVisible] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  // Appear after 2 seconds
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2000)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: 10, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-xl px-4 py-2.5 shadow-lg shadow-black/10 pointer-events-none"
                style={{ border: "1px solid rgba(0,0,0,0.06)" }}
              >
                <p className="text-sm font-semibold text-gray-800 whitespace-nowrap">
                  Konsultasi Gratis
                </p>
                <p className="text-xs text-gray-500 whitespace-nowrap">
                  Balas dalam hitungan menit
                </p>
                {/* Arrow */}
                <div
                  className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white rotate-45"
                  style={{ border: "1px solid rgba(0,0,0,0.06)", borderLeft: "none", borderBottom: "none" }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Button */}
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            aria-label="Chat WhatsApp"
            className="relative flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-transform duration-200 hover:scale-110 active:scale-95"
            style={{ backgroundColor: "#25D366" }}
          >
            {/* Pulse ring */}
            <span
              className="absolute inset-0 rounded-full animate-ping opacity-30"
              style={{ backgroundColor: "#25D366" }}
            />

            {/* WhatsApp SVG icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-7 h-7 relative z-10"
              fill="white"
            >
              <path d="M16 0C7.163 0 0 7.163 0 16c0 2.822.736 5.476 2.027 7.782L0 32l8.418-2.007A15.93 15.93 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 01-6.77-1.848l-.485-.288-5.003 1.194 1.218-4.864-.318-.5A13.267 13.267 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.273-9.878c-.398-.199-2.357-1.163-2.722-1.296-.365-.133-.631-.199-.897.199-.266.398-1.03 1.296-1.263 1.562-.232.266-.465.299-.863.1-.398-.199-1.682-.62-3.204-1.978-1.184-1.057-1.983-2.363-2.216-2.761-.232-.398-.025-.614.175-.812.18-.179.398-.465.597-.698.199-.232.266-.398.398-.664.133-.266.066-.498-.033-.697-.1-.199-.897-2.163-1.23-2.96-.323-.777-.653-.672-.897-.684-.232-.012-.498-.015-.764-.015-.266 0-.697.1-1.063.498-.365.398-1.395 1.363-1.395 3.326s1.428 3.86 1.627 4.126c.199.266 2.81 4.29 6.811 6.018.952.41 1.695.655 2.274.839.956.304 1.826.261 2.514.158.767-.115 2.357-.963 2.689-1.894.332-.93.332-1.727.232-1.894-.1-.166-.365-.266-.763-.465z" />
            </svg>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
