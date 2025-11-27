import React from 'react'
import { Geist } from 'next/font/google'
import '../globals.css'
import { cn } from '@/lib/utils'

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist',
  fallback: ['system-ui', 'arial'],
})

export const metadata = {
  description: 'Tenki Blog - Insights, updates, and stories from the Tenki team',
  title: 'Tenki Blog',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={cn(geist.className, 'scroll-smooth')}>
      <body className="flex min-h-screen flex-col scroll-smooth bg-[#000A15]">
        {children}
      </body>
    </html>
  )
}
