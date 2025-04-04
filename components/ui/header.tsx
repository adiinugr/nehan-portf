"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Header() {
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 h-16 w-full shadow-2xs bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold text-2xl text-primary">
            NehanDev
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="#projects"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Projects
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="hover:text-primary"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button
            asChild
            className="bg-primary hover:bg-primary/90 cursor-pointer hidden md:inline-flex"
          >
            <Link href="#contact">Get in Touch</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="absolute top-16 right-0 w-full bg-background shadow-lg md:hidden"
          >
            <div className="flex flex-col">
              <nav className="flex-1 p-4">
                <ul className="space-y-8">
                  <li>
                    <Link
                      href="#projects"
                      className="block text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Projects
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#contact"
                      className="block text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </nav>
              <div className="p-4">
                <Button
                  asChild
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  <Link href="#contact" onClick={() => setIsMenuOpen(false)}>
                    Get in Touch
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
