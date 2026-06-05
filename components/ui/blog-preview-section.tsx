"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Clock, Calendar } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import type { BlogPost } from "@/lib/blog"
import { categoryColors } from "@/lib/category-colors"

interface BlogPreviewSectionProps {
  posts: BlogPost[]
}

function formatDate(dateString: string, locale: string) {
  try {
    return new Date(dateString).toLocaleDateString(locale === "id" ? "id-ID" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  } catch {
    return dateString
  }
}


export function BlogPreviewSection({ posts }: BlogPreviewSectionProps) {
  const { t, language } = useLanguage()
  const bl = t.blog

  if (posts.length === 0) return null

  return (
    <section id="blog" className="py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="text-sm font-semibold tracking-widest uppercase text-primary">
              {bl.label}
            </span>
            <h2
              className="mt-3 uppercase leading-[0.9] text-foreground"
              style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(48px, 7vw, 96px)" }}
            >
              {bl.title}
            </h2>
            <p className="mt-3 text-muted-foreground max-w-md text-base leading-relaxed">
              {bl.subtitle}
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden md:flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors group shrink-0"
          >
            {bl.viewAll}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, index) => {
            const colorClass = categoryColors[post.category] ?? categoryColors.General
            return (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <div className="h-full flex flex-col rounded-xl bg-background p-6 transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-black/8">
                    {/* Top: category + lang */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-sm font-medium px-2.5 py-1 rounded-full border ${colorClass}`}>
                        {post.category}
                      </span>
                      <span className="text-sm font-medium text-muted-foreground uppercase">
                        {post.lang}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-semibold text-foreground text-base mb-3 group-hover:text-primary transition-colors line-clamp-2 flex-1">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-5">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between mt-auto pt-4" style={{ borderTop: "1px solid hsl(240 8% 88%)" }}>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{formatDate(post.date, language)}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{post.readTime} {bl.minRead}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            )
          })}
        </div>

        {/* Mobile view all */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            {bl.viewAll}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
