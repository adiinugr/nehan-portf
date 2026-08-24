"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <div className="absolute inset-0 hero-dot-grid opacity-100" />
      <div className="absolute -top-40 -left-40 w-[700px] h-[700px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-md text-center">
        <div className="mx-auto mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-2xl text-primary">
          ⚠
        </div>
        <h1 className="mb-2 text-2xl font-bold text-foreground">
          Ada yang tidak berjalan mestinya
        </h1>
        <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
          Halaman gagal dimuat karena kesalahan teknis. Coba muat ulang, atau
          kembali ke beranda.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button onClick={() => reset()}>Muat Ulang</Button>
          <Button variant="outline" asChild>
            <Link href="/">Kembali ke Beranda</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
