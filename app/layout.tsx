import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "VellCareAI — Super AI Health Ecosystem",
  description: "AI-powered family health platform. Monitor your health, care for your parents, and live better with AI.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <style dangerouslySetInnerHTML={{ __html: `
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          html, body { overflow-x: hidden !important; max-width: 100vw !important; width: 100% !important; }
          body { font-family: -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif; background: #FAFAFA; }
          img, svg { max-width: 100%; }
          input, button, select, textarea { font-family: inherit; }
          a { text-decoration: none; color: inherit; }
        `}} />
      </head>
      <body>{children}</body>
    </html>
  )
}
