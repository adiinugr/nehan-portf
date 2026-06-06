import Link from "next/link"

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Demo Banner */}
      <div
        className="w-full px-4 flex items-center justify-center gap-3 text-sm font-medium sticky top-0 z-[100]"
        style={{ backgroundColor: "#0f172a", color: "#94a3b8", height: "40px" }}
      >
        <span className="hidden sm:inline">🌐 Ini adalah demo website yang dibuat oleh</span>
        <span className="sm:hidden">Demo oleh</span>
        <span style={{ color: "#f1f5f9", fontWeight: 700 }}>NehanDev</span>
        <span className="hidden sm:inline">·</span>
        <Link
          href="https://wa.me/62895335501192?text=Halo%20NehanDev%2C%20saya%20tertarik%20dengan%20demo%20website%20travel.%20Bisa%20dibuatkan%20untuk%20bisnis%20saya%3F"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold transition-colors"
          style={{ backgroundColor: "#6366f1", color: "#ffffff" }}
        >
          Minta Website Seperti Ini →
        </Link>
      </div>
      {children}
    </>
  )
}
