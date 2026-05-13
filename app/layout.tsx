"use client"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <title>VellCareAI — Super AI Health Ecosystem</title>
        <meta name="description" content="AI-powered family health platform." />
        <style>{`
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          html, body {
            overflow-x: hidden !important;
            max-width: 100vw !important;
            width: 100% !important;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          }
          img, video, svg { max-width: 100%; height: auto; }
          input, button, select, textarea { font-family: inherit; }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
