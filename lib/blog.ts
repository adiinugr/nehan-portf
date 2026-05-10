import fs from "fs"
import path from "path"
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(), "content/blog")

export interface BlogPost {
  slug: string
  title: string
  date: string
  category: string
  lang: "en" | "id"
  excerpt: string
  readTime: string
  author: string
  content: string
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) return []

  const fileNames = fs.readdirSync(postsDirectory)

  return fileNames
    .filter((name) => name.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "")
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title ?? "",
        date: data.date ?? "",
        category: data.category ?? "General",
        lang: (data.lang ?? "en") as "en" | "id",
        excerpt: data.excerpt ?? "",
        readTime: data.readTime ?? "5",
        author: data.author ?? "NehanDev",
        content
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title ?? "",
      date: data.date ?? "",
      category: data.category ?? "General",
      lang: (data.lang ?? "en") as "en" | "id",
      excerpt: data.excerpt ?? "",
      readTime: data.readTime ?? "5",
      author: data.author ?? "NehanDev",
      content
    }
  } catch {
    return null
  }
}

export function getRecentPosts(count = 3): BlogPost[] {
  return getAllPosts().slice(0, count)
}
