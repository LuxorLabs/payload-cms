'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { StatusTag } from '@/components/ui/status-tag'

export interface NavSubmenuItem {
  label: string
  href: string
  image: string
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
  soon?: boolean
}

interface NavSubmenuProps {
  submenu: NavSubmenuItem[]
  isVisible: boolean
  onHover?: () => void
  onLeave?: () => void
}

export const NavSubmenu = ({ submenu, isVisible, onHover, onLeave }: NavSubmenuProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1, scale: 0.95, y: 8, pointerEvents: 'none' }}
          animate={{ opacity: 1, scale: 1, y: 0, pointerEvents: 'auto' }}
          exit={{ opacity: 0, scale: 0.95, y: 8, pointerEvents: 'none' }}
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
          transition={{ type: 'spring', stiffness: 120, damping: 12 }}
          className={cn('absolute top-[calc(100%)] left-1/2 z-50 -translate-x-1/2')}
        >
          <div className="mt-6 flex min-h-[152px] min-w-[632px] items-start justify-center gap-x-2 rounded-[10px] border border-[#003875]/8 bg-[#000f21] p-2 shadow-lg">
            {submenu.map((sub) => {
              return (
                <Link key={sub.label} href={sub.href}>
                  <div className="group flex shrink-0 flex-col items-center justify-center gap-y-1.5">
                    <div className="h-[100px] w-[200px] overflow-hidden rounded-md">
                      <Image
                        src={sub.image}
                        alt={sub.label}
                        width={200}
                        height={100}
                        className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                      />
                    </div>

                    <div className="flex items-center gap-x-2">
                      <p className={cn('text-static-primary text-sm transition-colors')}>{sub.label}</p>
                      {sub.soon && <StatusTag label="Soon" type="info" />}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
