import { MetadataRoute } from "next"
import { getAllPosts } from "@/lib/blog"
import { getPathname } from "@/i18n/navigation"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.nehandev.com"

type BilingualPage = {
  href: "/" | "/layanan" | "/projects" | "/education" | "/contact"
  priority: number
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]
}

const bilingualPages: BilingualPage[] = [
  { href: "/", priority: 1.0, changeFrequency: "weekly" },
  { href: "/layanan", priority: 0.9, changeFrequency: "monthly" },
  { href: "/projects", priority: 0.8, changeFrequency: "monthly" },
  { href: "/contact", priority: 0.7, changeFrequency: "yearly" },
  { href: "/education", priority: 0.6, changeFrequency: "monthly" }
]

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()

  const bilingualRoutes: MetadataRoute.Sitemap = bilingualPages.flatMap(({ href, priority, changeFrequency }) => {
    const idUrl = `${siteUrl}${getPathname({ locale: "id", href })}`
    const enUrl = `${siteUrl}${getPathname({ locale: "en", href })}`
    const languages = { id: idUrl, en: enUrl, "x-default": idUrl }

    return [
      { url: idUrl, lastModified: new Date(), changeFrequency, priority, alternates: { languages } },
      { url: enUrl, lastModified: new Date(), changeFrequency, priority, alternates: { languages } }
    ]
  })

  const otherStaticPages: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ]

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7
  }))

  return [...bilingualRoutes, ...otherStaticPages, ...blogRoutes]
}
