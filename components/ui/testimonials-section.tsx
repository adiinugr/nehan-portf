"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/lib/i18n/language-context"

export function TestimonialsSection() {
  const { t } = useLanguage()
  const tm = t.testimonials

  return (
    <section className="py-24 bg-muted/40">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <span className="text-sm font-semibold tracking-widest uppercase text-primary">
              {tm.label}
            </span>
            <h2
              className="mt-3 uppercase leading-[0.9] text-foreground"
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(48px, 7vw, 96px)",
              }}
            >
              {tm.title}
            </h2>
          </div>
          <p className="text-base text-muted-foreground max-w-xs leading-relaxed md:text-right">
            {tm.subtitle}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tm.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-5 rounded-xl bg-background p-6 shadow-sm hover:shadow-md hover:shadow-black/8 transition-all duration-300 h-full"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <svg key={j} className="h-4 w-4 fill-primary text-primary" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-base text-foreground leading-relaxed flex-1 min-h-[80px]">
                &ldquo;{item.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4">
                <div className="h-10 w-10 rounded-full bg-primary/15 flex items-center justify-center text-primary font-bold text-base shrink-0">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <p className="text-base font-semibold text-foreground">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
