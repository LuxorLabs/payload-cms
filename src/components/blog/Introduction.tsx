'use client'

import React from 'react'
import { HeroBackground } from '@/components/hero-background'

export const Introduction = () => {
  return (
    <section className="relative mx-auto overflow-hidden">
      <HeroBackground />
      <div className="mx-auto mb-0 flex min-h-100 w-full max-w-[1000px] flex-col px-6 md:px-12 lg:mb-6 lg:items-start lg:justify-between xl:px-0"></div>
    </section>
  )
}
