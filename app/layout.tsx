import type { Metadata } from 'next'
import './globals.css'
export const metadata: Metadata = {
  title: 'VitaFlow - AI Health Coach',
  description: 'Track your body, get AI meal plans, workouts and gamified health quests.',
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
