import React from 'react'

export const HeroSection = () => {
  return (
    <section className="relative mx-auto overflow-hidden pt-28 md:pt-44">
      <div className="mx-auto flex max-w-5xl flex-col px-6 md:px-12 lg:items-start lg:justify-between xl:px-0">
        <div className="flex flex-col gap-y-3">
          <h1 className="text-3xl font-medium md:text-[32px] md:font-semibold lg:text-5xl">
            Tenki Blog
          </h1>
          <p className="text-sm text-gray-400 md:text-lg lg:max-w-1/2">
            This is where our engineers and team share product updates, in-depth breakdowns, and
            insights on all things Tenki — plus the stories and moments that have shaped our
            journey.
          </p>
          <hr className="relative mt-9 h-px min-w-fit border-t border-white/20" />
        </div>
      </div>
    </section>
  )
}
