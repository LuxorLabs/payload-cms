'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Overview', href: 'https://tenki.cloud' },
  { label: 'Pricing', href: 'https://tenki.cloud/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'Docs', href: 'https://tenki.cloud/docs', external: true },
  { label: 'Careers', href: 'https://tenki.cloud/careers' },
]

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isNavItemActive = (href: string) => {
    if (href === '/blog') {
      return pathname?.startsWith('/blog')
    }
    return pathname === href
  }

  return (
    <header className="flex w-full justify-center">
      <nav
        className={cn(
          'fixed z-[999] w-full transition-all duration-300 ease-in-out',
          isScrolled && 'md:rounded-xl md:border md:border-[#1D232A] lg:mt-8 xl:w-[1200px]',
        )}
        style={{
          background:
            'linear-gradient(to right, rgba(0,10,21,0) 0%, rgba(0,10,21,0.7) 34%, rgba(0,10,21,1) 48%, rgba(0,10,21,0.7) 61%, rgba(0,10,21,0) 100%)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div
          className="absolute bottom-0 left-0 right-0 h-[1px] w-full"
          style={{
            background: 'linear-gradient(to right, rgba(0,10,21,0), #1D232A, rgba(0,10,21,0))',
          }}
        />
        <div className="relative mx-auto flex max-w-[1200px] items-center justify-between px-6 py-3 transition-all duration-300 lg:gap-0 lg:py-4">
          {/* Logo */}
          <div className="flex items-center justify-between lg:min-w-44">
            <Link href="/blog" aria-label="home" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-white">Tenki</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <ul className="mx-auto hidden divide-x divide-solid divide-white/[4%] rounded-lg border border-white/[4%] p-1 lg:flex">
            {navItems.map((item, idx) => {
              const isActive = isNavItemActive(item.href)
              return (
                <li
                  key={`nav-desktop-${idx}`}
                  className={cn(
                    'relative inline-block border-0 px-3 py-1 text-sm text-gray-400 transition-all duration-200',
                    isActive && 'text-white',
                  )}
                >
                  {isActive && (
                    <span className="absolute inset-0 -z-10 size-full rounded-[4px] bg-[#1a1a1a]" />
                  )}
                  <Link
                    href={item.href}
                    className="relative"
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* CTA Buttons */}
          <div className="flex items-center gap-2">
            <Link
              className={cn(
                'hidden text-sm text-white transition-colors hover:text-gray-300 lg:block',
              )}
              href="https://app.tenki.cloud/auth/login"
              target="_blank"
            >
              Login
            </Link>
            <Link
              className={cn(
                'hidden rounded-md bg-blue-600 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-700 lg:block',
              )}
              href="https://app.tenki.cloud/auth/registration"
              target="_blank"
            >
              Sign Up
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              className="flex size-10 items-center justify-center lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-white/[8%] bg-[#000D1B]/90 backdrop-blur-sm lg:hidden">
            <ul className="divide-y divide-solid divide-white/[8%]">
              {navItems.map((item, idx) => {
                const isActive = isNavItemActive(item.href)
                return (
                  <li
                    key={`nav-mobile-${idx}`}
                    className={cn(
                      'px-4 py-4 text-lg text-gray-400',
                      isActive && 'font-bold text-white',
                    )}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </nav>
    </header>
  )
}
