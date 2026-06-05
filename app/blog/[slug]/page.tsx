import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getPostBySlug, getAllPosts } from "@/lib/blog"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import Link from "next/link"
import Script from "next/script"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import { categoryColors } from "@/lib/category-colors"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  const siteUrl = "https://www.nehandev.com"
  const ogImage = `${siteUrl}/og-image-nehan.png`
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `${siteUrl}/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${siteUrl}/blog/${slug}`,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [`${siteUrl}/about`],
      tags: [post.category],
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
      siteName: "NehanDev"
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
      creator: "@nehandev"
    }
  }
}


export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const colorClass = categoryColors[post.category] ?? categoryColors.General

  const formattedDate = new Date(post.date).toLocaleDateString(
    post.lang === "id" ? "id-ID" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  )

  const siteUrl = "https://www.nehandev.com"
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "author": {
      "@type": "Organization",
      "name": "NehanDev",
      "url": siteUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": "NehanDev",
      "url": siteUrl,
      "logo": { "@type": "ImageObject", "url": `${siteUrl}/favicons/favicon.svg` }
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "mainEntityOfPage": { "@type": "WebPage", "@id": `${siteUrl}/blog/${slug}` },
    "inLanguage": post.lang === "id" ? "id-ID" : "en-US",
    "keywords": post.category,
    "image": `${siteUrl}/og-image-nehan.png`
  }

  return (
    <>
      <Script
        id={`article-schema-${slug}`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Header />
      <main className="min-h-screen py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {/* Post header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${colorClass}`}>
                {post.category}
              </span>
              <span className="text-xs font-medium text-muted-foreground uppercase">{post.lang}</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
              {post.title}
            </h1>

            <p className="text-lg text-muted-foreground mb-6">{post.excerpt}</p>

            <div className="flex items-center gap-5 text-sm text-muted-foreground pb-8 border-b border-border/40">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formattedDate}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readTime} min read
              </div>
              <span className="font-medium text-foreground">by {post.author}</span>
            </div>
          </header>

          {/* Post content */}
          <article className="prose-nehan">
            <MDXRemote
              source={post.content}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          </article>

          {/* Footer nav */}
          <div className="mt-16 pt-8 border-t border-border/40">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all articles
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
