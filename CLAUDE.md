# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Development with Turbopack
npm run build     # Production build (also runs next-sitemap postbuild)
npm start         # Start production server
npm run lint      # ESLint
```

## Design System Rule

**Always invoke the `/frontend-design` skill before creating or significantly modifying any UI component.** This ensures consistent, production-grade design quality.

## Architecture

A **Next.js 15 single-page portfolio + blog** for NehanDev (`nehandev.com`). Dark-first design, bilingual (EN/ID), App Router.

### Page structure
```
Header → Hero → ProjectsSection → EducationSection → BlogPreviewSection → ContactSection → Footer
```

All section components live in `components/ui/`. Blog is at `/blog` and `/blog/[slug]`.

### Key files
- `app/page.tsx` — page composition, fetches recent posts for preview
- `app/layout.tsx` — root layout: `Outfit` font, `defaultTheme="dark"`, `LanguageProvider`, hreflang tags
- `app/blog/page.tsx` — blog listing (Server Component, passes posts to `BlogPageClient`)
- `app/blog/[slug]/page.tsx` — individual post (Server Component, renders MDX, generates metadata)
- `app/sitemap.ts` — Next.js native sitemap including blog posts
- `lib/blog.ts` — `getAllPosts()`, `getPostBySlug()`, `getRecentPosts()` using `gray-matter`
- `lib/i18n/translations.ts` — all EN/ID strings, organized by section
- `lib/i18n/language-context.tsx` — `LanguageProvider` + `useLanguage()` hook
- `content/blog/*.mdx` — blog post files with frontmatter
- `components/ui/education-section.tsx` — featured CBT Pro section (highlighted separately from regular projects)
- `components/ui/blog-preview-section.tsx` — 3 recent posts preview on homepage
- `components/ui/language-toggle.tsx` — EN | ID toggle in header

### Bilingual system
- `useLanguage()` returns `{ language, setLanguage, t }` where `t` is the full typed translation object
- Access strings with `t.hero.badge`, `t.nav.projects`, etc.
- Auto-detects `navigator.language` on mount, persists to `localStorage` as `nd-language`
- `document.documentElement.lang` is updated on language change

### Blog posts (MDX frontmatter)
```yaml
title: string
date: "YYYY-MM-DD"
category: "Tech" | "EdTech" | "Tutorial" | "Design" | "Pendidikan" | "Business"
lang: "en" | "id"
excerpt: string
readTime: "5"  # number as string (minutes)
author: "NehanDev"
```

### Styling & UI
- Tailwind CSS v4, `muted-foreground` uses CSS variable (not hardcoded)
- Font: `Outfit` (variable `--font-outfit`)
- Dark theme colors defined in `.dark` block in `globals.css` — deep navy `240 24% 5%` background
- Custom utility `.hero-dot-grid` for hero background pattern
- Custom class `.prose-nehan` for blog post content styling
- shadcn/ui components in `components/ui/button.tsx`, `input.tsx`, `textarea.tsx`
- Framer Motion for all section animations (viewport-triggered, `once: true`)

### Contact API
`POST /api/contact` uses nodemailer + Gmail. Required env vars:
```
EMAIL_USER=
EMAIL_APP_PASSWORD=    # Gmail app password
NEXT_PUBLIC_SITE_URL=  # Used for sitemap and canonical URLs
```

### Adding content
- **New project**: edit `projects` array in `components/ui/projects-section.tsx`, add image to `public/images/`
- **New blog post**: add `.mdx` file to `content/blog/` with required frontmatter
- **cbtpro.id screenshot**: add image to `public/images/cbtpro.png` and update `education-section.tsx`
