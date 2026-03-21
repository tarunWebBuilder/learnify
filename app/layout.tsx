import React from "react"
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { AuthKitProvider } from '@workos-inc/authkit-nextjs/components'

import './globals.css'

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'tutorly-ai | AI-Powered Exam Engine for JEE, CLAT, & NID',
  description: 'Master your exams with tutorly-ai. Generate adaptive mock tests for JEE, NEET, CLAT, NID, and NIFT mapped to your weakest topics.',
  openGraph: {
    title: 'tutorly-ai | AI-Powered Exam Engine',
    description: 'Master your exams with tutorly-ai. Generate adaptive mock tests mapped to your weakest topics.',
    url: 'https://tutorly-ai.com',
    siteName: 'tutorly-ai',
    images: [
      {
        url: 'https://tutorly-ai.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'tutorly-ai AI Simulation Engine',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'tutorly-ai | AI-Powered Exam Engine',
    description: 'Master your exams with tutorly-ai. Generate adaptive mock tests mapped to your weakest topics.',
    images: ['https://tutorly-ai.com/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} font-sans antialiased bg-zinc-950 text-zinc-50`}>
        <AuthKitProvider>{children}</AuthKitProvider>
      </body>
    </html>
  )
}
