"use client"

// Catches errors thrown in the root layout itself (e.g. providers wrapping
// the whole app). Must render its own <html>/<body> since it replaces the
// root layout entirely — keep it dependency-light so it can't fail too.
export default function GlobalError({
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="id">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem",
          background: "#fcfcfd",
          color: "#151420",
          fontFamily:
            "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
          backgroundImage:
            "radial-gradient(circle, rgba(99,102,241,0.18) 1px, transparent 1px)",
          backgroundSize: "32px 32px"
        }}
      >
        <div style={{ maxWidth: 440, textAlign: "center" }}>
          <div
            style={{
              width: 56,
              height: 56,
              margin: "0 auto 1.75rem",
              borderRadius: 16,
              background: "rgba(99,102,241,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <span style={{ fontSize: 24, color: "#6366f1" }} aria-hidden>
              ⚠
            </span>
          </div>

          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "0 0 0.5rem" }}>
            Ada yang tidak berjalan mestinya
          </h1>
          <p
            style={{
              fontSize: "0.95rem",
              lineHeight: 1.6,
              color: "#5c5a6b",
              margin: "0 0 2rem"
            }}
          >
            Halaman gagal dimuat karena kesalahan teknis. Muat ulang halaman,
            atau kembali ke beranda.
          </p>

          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap"
            }}
          >
            <button
              onClick={() => reset()}
              style={{
                background: "#6366f1",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "0.75rem 1.5rem",
                fontSize: "0.9rem",
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              Muat Ulang
            </button>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- plain anchor is intentional: this page replaces the root layout on a root-level crash, so it must not depend on the client router */}
            <a
              href="/"
              style={{
                background: "transparent",
                color: "#151420",
                border: "1px solid rgba(21,20,32,0.15)",
                borderRadius: 8,
                padding: "0.75rem 1.5rem",
                fontSize: "0.9rem",
                fontWeight: 600,
                textDecoration: "none"
              }}
            >
              Kembali ke Beranda
            </a>
          </div>
        </div>
      </body>
    </html>
  )
}
