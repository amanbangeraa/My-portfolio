import React from 'react'
import './globals.css'
import { Analytics } from "@vercel/analytics/next"

export const metadata = {
  title: 'Aman Bangera - Full Stack Developer',
  description: 'Passionate Full Stack Developer crafting modern web experiences with React, Node.js, Python and cutting-edge technologies.',
  keywords: 'Aman Bangera, Full Stack Developer, React, Node.js, Python, Web Development, Software Engineer',
  author: 'Aman Bangera',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  openGraph: {
    title: 'Aman Bangera - Full Stack Developer',
    description: 'Passionate Full Stack Developer crafting modern web experiences',
    type: 'website',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
