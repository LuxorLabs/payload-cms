'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { GithubLogo } from '@/assets/svg/github-logo.svg'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/logo'

const navItems = [
  { label: 'Overview', href: 'https://tenki.cloud' },
  { label: 'Pricing', href: 'https://tenki.cloud/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'Docs', href: 'https://tenki.cloud/docs' },
  { label: 'Careers', href: 'https://tenki.cloud/careers' },
]

export const Navigation = () => {
  const [scrolled, setScrolled] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isNavItemActive = (currentPath: string, href: string) =>
    currentPath === href || (href !== '/' && currentPath.startsWith(href))

  return (
    <header className="flex w-full justify-center">
      <nav
        className={cn(
          'fixed z-[999] w-full border-[#1D232A] transition-all duration-300 ease-in-out',
          scrolled && 'md:rounded-xl md:border lg:mt-8 xl:w-[1200px]',
        )}
        style={{
          background:
            'linear-gradient(to right, rgba(0,10,21,0) 0%, rgba(0,10,21,0.7) 34%, rgba(0,10,21,1) 48%, rgba(0,10,21,0.7) 61%, rgba(0,10,21,0) 100%)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div
          className="absolute right-0 bottom-0 left-0 h-[1px] w-full"
          style={{
            background: 'linear-gradient(to right, rgba(0,10,21,0), #1D232A, rgba(0,10,21,0))',
          }}
        />
        <div className="relative mx-auto flex max-w-[1200px] items-center justify-between px-6 py-3 transition-all duration-300 lg:gap-0 lg:py-4">
          <div className="flex items-center justify-between lg:min-w-44">
            <Link href="/blog" aria-label="home" className="flex items-center space-x-2">
              <Logo />
            </Link>
          </div>

          <ul
            key={scrolled ? 'scrolled-nav-list' : 'default-nav-list'}
            className="mx-auto hidden divide-x divide-solid divide-white/[4%] rounded-lg border border-white/[4%] p-1 lg:flex"
          >
            {navItems.map((item, idx) => {
              const isActive = isNavItemActive(pathname, item.href)
              const showBackground = hoveredIndex === idx || (hoveredIndex === null && isActive)

              return (
                <li
                  key={`nav-desktop-${idx}`}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={cn(
                    'text-static-secondary relative inline-block border-0 px-3 py-1 text-sm transition-all duration-200',
                    isActive && 'text-static-primary',
                  )}
                >
                  {showBackground && (
                    <span className="bg-layer-3 absolute inset-0 -z-10 size-full rounded-[4px]" />
                  )}
                  <Link href={item.href} className="relative">
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              className={cn(
                buttonVariants({
                  size: 'sm',
                  variant: 'ghost',
                }),
              )}
              href="https://app.tenki.cloud/auth/login"
              target="_blank"
            >
              Login
            </Link>
            <Link
              className={cn(buttonVariants({ size: 'sm' }))}
              href="https://app.tenki.cloud/auth/registration"
              target="_blank"
            >
              <GithubLogo /> Sign Up
            </Link>
            <Button
              aria-label={isSheetOpen ? 'Close Menu' : 'Open Menu'}
              variant="ghost"
              className="relative flex size-10 items-center justify-center lg:hidden"
              onClick={() => setIsSheetOpen(!isSheetOpen)}
            >
              {isSheetOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isSheetOpen && (
          <div className="border-t border-white/[8%] bg-[#000D1B]/90 backdrop-blur-sm lg:hidden">
            <ul className="divide-y divide-solid divide-white/[8%]">
              {navItems.map((item, idx) => {
                const isActive = isNavItemActive(pathname, item.href)
                return (
                  <li
                    key={`nav-mobile-${idx}`}
                    className={cn(
                      'text-static-secondary px-4 py-4 text-lg',
                      isActive && 'font-bold text-white',
                    )}
                  >
                    <Link
                      href={item.href}
                      onClick={() => {
                        setIsSheetOpen(false)
                      }}
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
