'use client'

import React from 'react'
import Link from 'next/link'
import { Heart } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative w-full bg-[#000A15]/60 backdrop-blur-sm backdrop-filter">
      <div
        className="absolute top-0 right-0 left-0 h-[1px] w-full"
        style={{
          background: 'linear-gradient(to right, rgba(0,10,21,0), #1D232A, rgba(0,10,21,0))',
        }}
      />

      <div className="relative mx-auto flex h-full w-full max-w-[1200px] flex-col gap-12 md:items-center md:gap-28 lg:gap-24">
        <div className="z-50 flex flex-col gap-8 px-6 pt-6 md:mx-auto md:w-full md:flex-row md:justify-between md:px-16 md:pt-8 lg:px-6 lg:pt-12 xl:px-0">
          {/* Logo and Description */}
          <div className="flex flex-col gap-4 md:max-w-[228px] lg:max-w-[250px]">
            <div className="flex flex-col gap-2">
              <Link href="/blog" aria-label="home" className="flex items-center space-x-2">
                <span className="text-xl font-bold text-white">Tenki</span>
              </Link>
              <p className="text-sm text-gray-400">Tenki. Free to start. Priced to scale.</p>
            </div>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:gap-16">
            {/* Product Column */}
            <ul className="order-1 space-y-3 text-sm text-white">
              <li className="text-gray-400">Product</li>
              <li>
                <Link href="https://tenki.cloud">Overview</Link>
              </li>
              <li>
                <Link href="https://tenki.cloud/pricing">Pricing</Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
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

            {/* Connect Column */}
            <ul className="order-3 space-y-3 text-sm text-white md:order-2">
              <li className="text-gray-400">Connect</li>
              <li>
                <Link href="https://x.com/tenkicloud">X (Twitter)</Link>
              </li>
              <li>
                <Link href="https://www.linkedin.com/company/tenki">LinkedIn</Link>
              </li>
              <li>
                <Link href="https://www.producthunt.com/posts/tenki">Product Hunt</Link>
              </li>
            </ul>

            {/* Company Column */}
            <ul className="order-2 space-y-3 text-sm text-white md:order-3">
              <li className="text-gray-400">Company</li>
              <li>
                <Link href="https://tenki.cloud/docs/privacy-policy" target="_blank">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="https://tenki.cloud/docs/terms-of-service" target="_blank">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="https://tenki.cloud/careers">Careers</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="w-full max-w-[1200px] px-6 md:px-16 lg:px-6 xl:px-0">
          <div className="flex flex-col gap-y-2 border-t border-white/20 pb-6 text-gray-400 md:flex-row md:justify-between md:pb-8">
            <div className="order-2 mt-0 px-0 text-sm md:order-1 md:mt-3 md:text-xs lg:text-sm">
              © {currentYear} Tenki. All rights reserved.
            </div>
            <div className="order-1 mt-3 px-0 text-sm md:order-2 md:text-xs lg:text-sm">
              Made with love and passion by engineers{' '}
              <Heart className="inline-block -translate-y-px" size={16} fill="#60A5FA" color="#60A5FA" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
