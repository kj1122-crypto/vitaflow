"use client"

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ overflowX: "hidden", width: "100%", maxWidth: "100vw" }}>
      {children}
    </div>
  )
}
