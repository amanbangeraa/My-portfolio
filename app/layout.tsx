import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aman Bangera - Portfolio",
  description: "Modern interactive portfolio showcasing creative design and development",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
  viewportFit: 'cover'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover, shrink-to-fit=no" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-tap-highlight" content="no" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('gesturestart', function(e) {
                e.preventDefault();
              });
              document.addEventListener('gesturechange', function(e) {
                e.preventDefault();
              });
              document.addEventListener('gestureend', function(e) {
                e.preventDefault();
              });
              document.addEventListener('touchstart', function(e) {
                if (e.touches.length > 1) {
                  e.preventDefault();
                }
              });
              document.addEventListener('touchend', function(e) {
                var now = (new Date()).getTime();
                if (now - lastTouchEnd <= 300) {
                  e.preventDefault();
                }
                lastTouchEnd = now;
              }, false);
              var lastTouchEnd = 0;
              document.addEventListener('wheel', function(e) {
                if (e.ctrlKey) {
                  e.preventDefault();
                }
              }, { passive: false });
              document.addEventListener('keydown', function(e) {
                if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-' || e.key === '=' || e.key === '0')) {
                  e.preventDefault();
                }
              });
            `
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
