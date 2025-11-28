'use client'

import React from 'react'
import Link from 'next/link'
import { LightbulbIcon } from '@phosphor-icons/react'
import { Logo } from '@/components/logo'
import { FooterBackground } from '@/components/footer-background'
import { ProductHuntTag } from '@/components/product-hunt-tag'
import { UneedCarousel } from '@/components/uneed-carousel'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative isolate w-full overflow-hidden border-t border-white/8 md:max-h-[400px] lg:absolute lg:bottom-0">
      <FooterBackground />
      <div className="fade-overlay-top pointer-events-none absolute top-0 left-0 z-50 hidden h-28 w-full md:block" />

      <div className="relative mx-auto flex h-full w-full max-w-[1200px] flex-col gap-12 md:items-center md:gap-28 lg:gap-24">
        <div className="z-50 flex flex-col gap-8 px-6 pt-6 md:mx-auto md:w-full md:flex-row md:justify-between md:px-16 md:pt-8 lg:px-6 lg:pt-12 xl:px-0">
          <div className="flex flex-col gap-4 md:max-w-[228px] lg:max-w-[250px]">
            <div className="flex flex-col gap-2">
              <Link href="/blog" aria-label="home" className="flex items-center space-x-2">
                <Logo />
              </Link>
              <p className="text-static-secondary text-sm">Tenki. Free to start. Priced to scale.</p>
            </div>

            <div className="flex flex-col justify-start gap-y-2">
              <ProductHuntTag theme="dark" />
              <UneedCarousel />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:gap-16">
            <ul className="text-static-primary order-1 space-y-3 text-sm">
              <li className="text-static-secondary">Product</li>
              <li>
                <Link href="https://tenki.cloud">Overview</Link>
              </li>
              <li>
                <Link href="https://tenki.cloud/pricing">Pricing</Link>
              </li>
              <li>
                <Link href="/blog">Blogs</Link>
              </li>
              <li>
                <Link href="https://tenki.cloud/docs/changelog" target="_blank">
                  Changelog
                </Link>
              </li>
              <li>
                <Link href="https://tenki.cloud/docs" target="_blank">
                  Documentation
                </Link>
              </li>
            </ul>
            <ul className="text-static-primary order-2 space-y-3 text-sm md:order-3">
              <li className="text-static-secondary">Company</li>
              <li>
                <Link href="https://tenki.cloud/docs/privacy-policy" target="_blank">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="https://tenki.cloud/docs/terms-of-service" target="_blank">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="https://tenki.cloud/careers" target="_blank">
                  Careers
                </Link>
              </li>
            </ul>
            <ul className="text-static-primary order-3 space-y-3 text-sm md:order-2">
              <li className="text-static-secondary">Connect</li>
              <li>
                <Link href="https://x.com/tenkicloud">X (Twitter)</Link>
              </li>
              <li>
                <Link href="https://www.linkedin.com/company/tenki-cloud/about">LinkedIn</Link>
              </li>
              <li>
                <Link href="https://discord.gg/qNFaWrR6um">Discord</Link>
              </li>
              <li>
                <Link href="https://www.producthunt.com/posts/tenki-cloud?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-tenki&#0045;cloud">Product Hunt</Link>
              </li>
              <li>
                <Link href="https://www.uneed.best/blog/tenki-review">Uneed</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full max-w-[1200px] px-6 md:px-16 lg:px-6 xl:px-0">
          <div className="text-static-secondary flex flex-col gap-y-2 border-t border-white/20 pb-6 md:flex-row md:justify-between md:pb-8">
            <div className="order-2 mt-0 px-0 text-sm md:order-1 md:mt-3 md:text-xs lg:text-sm">
              © {currentYear} Tenki. All rights reserved.
            </div>
            <div className="order-1 mt-3 px-0 text-sm md:order-2 md:text-xs lg:text-sm">
              <span className="flex items-center gap-1">
                <LightbulbIcon
                  size={16}
                  weight="fill"
                  className="order-1 inline-block -translate-y-px drop-shadow-[0_0_6px_#60A5FA] md:order-2"
                  color="#60A5FA"
                />
                <span className="order-2 md:order-1">Born from the same frustrations you face daily</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
