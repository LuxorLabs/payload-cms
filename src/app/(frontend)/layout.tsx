import React from 'react'
import '../globals.css'
import './styles.css'

export const metadata = {
  description: 'Tenki Blog - Insights, updates, and stories from the Tenki team',
  title: 'Tenki Blog',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col scroll-smooth bg-[#000A15]">
        {children}
      </body>
    </html>
  )
}
