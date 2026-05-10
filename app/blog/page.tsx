import type { Metadata } from "next"
import { getAllPosts } from "@/lib/blog"
import { BlogPageClient } from "@/components/ui/blog-page-client"
import { Header } from "@/components/ui/header"
import { Footer } from "@/components/ui/footer"

export const metadata: Metadata = {
  title: "Blog | NehanDev",
  description:
    "Technical insights, tutorials, and thoughts on web development and education technology from the NehanDev team.",
  alternates: { canonical: "https://www.nehandev.com/blog" },
  openGraph: {
    title: "Blog | NehanDev",
    description: "Technical insights, tutorials, and thoughts on web development and education technology.",
    url: "https://www.nehandev.com/blog"
  }
}

export default function BlogPage() {
  const posts = getAllPosts()
  return (
    <>
      <Header />
      <BlogPageClient posts={posts} />
      <Footer />
    </>
  )
}
