import React from 'react'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'

export default async function BlogLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <>
      <Navigation />
      <main>{children}</main>
      <section className="relative lg:h-[500px]">
        <Footer />
      </section>
    </>
  )
}
