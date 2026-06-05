"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Clock, Calendar, Search } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import type { BlogPost } from "@/lib/blog"
import { categoryColors } from "@/lib/category-colors"

interface BlogPageClientProps {
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


const ALL = "All"

export function BlogPageClient({ posts }: BlogPageClientProps) {
  const { t, language } = useLanguage()
  const bl = t.blog

  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState(ALL)

  const categories = [ALL, ...Array.from(new Set(posts.map((p) => p.category)))]

  const filtered = posts.filter((post) => {
    const matchSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase())
    const matchCategory = activeCategory === ALL || post.category === activeCategory
    return matchSearch && matchCategory
  })

  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <p className="text-sm font-medium text-primary mb-3 uppercase tracking-widest">{bl.label}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{bl.title}</h1>
          <p className="text-muted-foreground max-w-xl text-lg">{bl.subtitle}</p>
        </div>

        {/* Search + filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={language === "id" ? "Cari artikel..." : "Search articles..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition-colors"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-sm px-3.5 py-1.5 rounded-full border font-medium transition-colors ${
                  activeCategory === cat
                    ? "border-primary bg-primary text-white"
                    : "border-border text-muted-foreground hover:border-primary/60 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Post grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            {language === "id" ? "Tidak ada artikel yang sesuai." : "No articles found."}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post, index) => {
              const colorClass = categoryColors[post.category] ?? categoryColors.General
              return (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link href={`/blog/${post.slug}`} className="group block h-full">
                    <div className="h-full flex flex-col rounded-xl border border-border/50 bg-card p-6 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                      <div className="flex items-center justify-between mb-4">
                        <span className={`text-sm font-medium px-2.5 py-1 rounded-full border ${colorClass}`}>
                          {post.category}
                        </span>
                        <span className="text-sm font-medium text-muted-foreground uppercase">{post.lang}</span>
                      </div>
                      <h2 className="font-semibold text-foreground text-base mb-3 group-hover:text-primary transition-colors line-clamp-2 flex-1">
                        {post.title}
                      </h2>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-5">{post.excerpt}</p>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/40">
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
        )}

        <div className="mt-12 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowRight className="w-4 h-4 rotate-180" />
            {language === "id" ? "Kembali ke Beranda" : "Back to Home"}
          </Link>
        </div>
      </div>
    </main>
  )
}
