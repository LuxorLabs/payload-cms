import React from 'react'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'

export default async function BlogLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
