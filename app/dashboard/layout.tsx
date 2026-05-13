"use client"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      overflowX: "hidden",
      width: "100%",
      maxWidth: "100vw",
      minHeight: "100vh",
      background: "#FAFAFA"
    }}>
      {children}
    </div>
  )
}
