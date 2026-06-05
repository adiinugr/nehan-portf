"use client"

import { motion } from "framer-motion"
import {
  UtensilsCrossed,
  Plane,
  BedDouble,
  Building2,
  Megaphone,
  ShoppingBag,
  LucideIcon
} from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

const iconMap: Record<string, LucideIcon> = {
  UtensilsCrossed,
  Plane,
  BedDouble,
  Building2,
  Megaphone,
  ShoppingBag
}


export function ServicesSection() {
  const { t } = useLanguage()
  const sv = t.services

  return (
    <section id="layanan" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header — left-aligned, editorial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 flex flex-col md:flex-row md:items-end gap-6 justify-between"
        >
          <div>
            <span className="text-sm font-semibold tracking-widest uppercase text-primary">
              {sv.label}
            </span>
            <h2
              className="mt-3 uppercase leading-[0.9] text-foreground"
              style={{
                fontFamily: "var(--font-bebas)",
                fontSize: "clamp(48px, 7vw, 96px)",
              }}
            >
              {sv.title}
            </h2>
          </div>
          <p className="text-muted-foreground max-w-xs text-base leading-relaxed md:text-right">
            {sv.subtitle}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sv.items.map((service, index) => {
            const Icon = iconMap[service.icon]
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="group flex flex-col rounded-xl bg-background p-6 transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-black/8"
              >
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 font-bold text-foreground text-base">{service.title}</h3>
                <p className="text-base text-muted-foreground leading-relaxed flex-1">{service.desc}</p>
              </motion.div>
            )
          })}
        </div>


      </div>
    </section>
  )
}
