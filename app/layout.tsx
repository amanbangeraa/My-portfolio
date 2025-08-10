import React from 'react'
import './globals.css'

export const metadata = {
  title: 'Aman Bangera - Full Stack Developer',
  description: 'Passionate Full Stack Developer crafting modern web experiences with React, Node.js, Python and cutting-edge technologies.',
  keywords: 'Aman Bangera, Full Stack Developer, React, Node.js, Python, Web Development, Software Engineer',
  author: 'Aman Bangera',
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
      <body className="font-sans">{children}</body>
    </html>
  )
}
