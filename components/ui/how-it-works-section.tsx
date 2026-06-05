"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/lib/i18n/language-context"

export function HowItWorksSection() {
  const { t } = useLanguage()
  const hw = t.howItWorks

  return (
    <section className="py-24 relative overflow-hidden bg-muted/40">
      <div className="container mx-auto px-4">
        {/* Section header — left aligned */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-primary">
            {hw.label}
          </span>
          <h2
            className="mt-3 uppercase leading-[0.9] text-foreground"
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(48px, 7vw, 96px)",
            }}
          >
            {hw.title}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-md text-base leading-relaxed">
            {hw.subtitle}
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
          {hw.steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative px-8 py-10 md:first:pl-0 md:last:pr-0 group"
            >
              {/* Content */}
              <div className="relative">
                <div
                  className="text-[96px] leading-none font-bold text-primary/20 select-none mb-2 transition-colors duration-300 group-hover:text-primary/35"
                  style={{ fontFamily: "var(--font-bebas)" }}
                >
                  {step.number}
                </div>
                <h3 className="font-bold text-foreground text-xl mb-3">{step.title}</h3>
                <p className="text-base text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
