'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CaretDownIcon, ListIcon, XIcon } from '@phosphor-icons/react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/logo'
import { NavSubmenu, type NavSubmenuItem } from '@/components/layout/nav-submenu'
import NavLinuxIcon from '@/assets/svg/nav-linux-icon.svg'
import NavAppleIcon from '@/assets/svg/nav-apple-icon.svg'
import NavVmIcon from '@/assets/svg/nav-vm-icon.svg'

const TENKI_STORAGE_BASE = 'https://storage.googleapis.com/tenki-cloud-assets/web'

interface NavItem {
  label: string
  href?: string
  submenu?: NavSubmenuItem[]
}

const navItems: NavItem[] = [
  {
    label: 'Features',
    href: 'https://tenki.cloud/features',
    submenu: [
      {
        label: 'Linux Runners',
        href: 'https://tenki.cloud/features/linux',
        image: `${TENKI_STORAGE_BASE}/nav-linux-runners.png`,
        icon: NavLinuxIcon,
        soon: false,
      },
      {
        label: 'Mac Runners',
        href: 'https://tenki.cloud/features/mac',
        image: `${TENKI_STORAGE_BASE}/nav-mac-runners.png`,
        icon: NavAppleIcon,
        soon: true,
      },
      {
        label: 'Virtual Machines',
        href: 'https://tenki.cloud/features/virtual-machine',
        image: `${TENKI_STORAGE_BASE}/nav-vm.png`,
        icon: NavVmIcon,
        soon: true,
      },
    ],
  },
  { label: 'Overview', href: 'https://tenki.cloud' },
  { label: 'Pricing', href: 'https://tenki.cloud/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'Docs', href: 'https://tenki.cloud/docs' },
  { label: 'Careers', href: 'https://tenki.cloud/careers' },
]

export const Navigation = () => {
  const [scrolled, setScrolled] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isNavItemActive = (currentPath: string, href?: string) =>
    href && (currentPath === href || (href !== '/' && currentPath.startsWith(href)))

  return (
    <header className={cn('flex w-full justify-center')}>
      <nav
        className={cn(
          'fixed z-[999] w-full border-[#1D232A] transition-all duration-300 ease-in-out',
          scrolled && 'xl:mt-6 xl:w-[1200px] xl:rounded-xl xl:border',
        )}
        onMouseLeave={() => {
          setOpenSubmenu(null)
        }}
        style={{
          background:
            'linear-gradient(to right, rgba(0,10,21,0) 0%, rgba(0,10,21,0.7) 34%, rgba(0,10,21,1) 48%, rgba(0,10,21,0.7) 61%, rgba(0,10,21,0) 100%)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div
          className={cn(
            'relative mx-auto flex max-w-[1200px] items-center justify-between px-3 py-3 transition-colors duration-300 lg:gap-0',
            'md:px-10 xl:mt-0 xl:rounded-lg xl:border-0 xl:px-4 xl:backdrop-blur-none',
            isSheetOpen && 'border-b-0.5 mx-2 mt-3.5 rounded-t-lg border border-white/8 px-2 md:px-2',
          )}
        >
          <div className="flex items-center justify-between lg:min-w-44">
            <Link href="/blog" aria-label="home" className="flex items-center space-x-2">
              <Logo />
            </Link>
          </div>

          <ul
            key={scrolled ? 'scrolled-nav-list' : 'default-nav-list'}
            className="mx-auto hidden divide-x divide-solid divide-white/[4%] rounded-lg lg:flex"
          >
            {navItems.map((item, idx) => {
              const isActive = isNavItemActive(pathname, item.href)
              const showBackground = hoveredIndex === idx
              const isSubMenuOpen = openSubmenu === idx

              return (
                <li
                  key={`nav-desktop-${idx}`}
                  onMouseEnter={() => {
                    setHoveredIndex(idx)
                    setOpenSubmenu(idx)
                  }}
                  onMouseLeave={() => {
                    setHoveredIndex(null)
                    setOpenSubmenu(null)
                  }}
                  className={cn(
                    'text-static-secondary relative inline-block border-0 px-3 py-1 text-sm transition-colors duration-200',
                    isActive && 'text-static-primary',
                  )}
                >
                  {showBackground && (
                    <span className="bg-layer-3 absolute inset-0 -z-10 size-full rounded-[4px]" />
                  )}
                  {item.submenu ? (
                    <>
                      <div className="relative flex cursor-pointer items-center gap-0.5">
                        {item.label}
                        <CaretDownIcon size={12} weight="bold" />
                      </div>
                      <NavSubmenu
                        submenu={item.submenu}
                        isVisible={isSubMenuOpen}
                        onHover={() => setOpenSubmenu(idx)}
                        onLeave={() => setOpenSubmenu(null)}
                      />
                    </>
                  ) : (
                    <Link href={item.href!} className="relative">
                      {item.label}
                    </Link>
                  )}
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
              Start For Free
            </Link>

            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen} modal={true}>
              <SheetTrigger asChild>
                <Button
                  aria-label={isSheetOpen ? 'Close Menu' : 'Open Menu'}
                  variant="ghost"
                  className="pointer-events-auto relative flex size-10 items-center justify-center lg:hidden"
                >
                  <ListIcon
                    className={cn(
                      'absolute transition-opacity duration-200 lg:hidden',
                      isSheetOpen && 'rotate-180 opacity-0',
                    )}
                  />
                  <XIcon
                    className={cn(
                      'absolute transition-opacity duration-200 lg:hidden',
                      !isSheetOpen && 'rotate-180 opacity-0',
                    )}
                  />
                </Button>
              </SheetTrigger>
              <SheetContent
                className="inset-0 mt-14 min-w-screen bg-[#000D1B]/90 px-2 backdrop-blur-sm"
                side={'left'}
              >
                <SheetHeader className="hidden">
                  <SheetTitle />
                </SheetHeader>
                <ul className="border-t-0.5 divide-y divide-solid divide-white/[8%] rounded-b-lg border border-white/8">
                  {navItems.map((item, idx) => {
                    const hasSubmenu = !!item.submenu
                    const isOpen = openSubmenu === idx
                    return (
                      <React.Fragment key={idx}>
                        {hasSubmenu ? (
                          <li
                            className={cn(
                              'text-static-secondary flex cursor-pointer items-center justify-between px-3 py-4 text-sm',
                              item.href &&
                                pathname.includes(item.href) &&
                                'text-static-primary font-bold',
                            )}
                            onClick={() => setOpenSubmenu(isOpen ? null : idx)}
                          >
                            <span>{item.label}</span>
                            <CaretDownIcon
                              size={16}
                              className={cn('transition-transform', isOpen && 'rotate-180')}
                            />
                          </li>
                        ) : (
                          <li>
                            <Link
                              href={item.href!}
                              onClick={() => setIsSheetOpen(false)}
                              className={cn(
                                'text-static-secondary flex justify-between px-3 py-4 text-sm',
                                pathname === item.href && 'text-static-primary font-bold',
                              )}
                            >
                              {item.label}
                            </Link>
                          </li>
                        )}
                        {hasSubmenu &&
                          isOpen &&
                          item.submenu?.map((sub, sIdx) => (
                            <li
                              key={sIdx}
                              className="text-static-secondary flex items-center gap-2 px-6 py-4 text-sm"
                            >
                              {sub.icon && <sub.icon className="size-4" />}
                              <Link href={sub.href} onClick={() => setIsSheetOpen(false)}>
                                {sub.label}
                              </Link>
                            </li>
                          ))}
                      </React.Fragment>
                    )
                  })}
                </ul>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  )
}
