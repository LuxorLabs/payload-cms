import { useEffect, useState } from 'react'

export const useActiveSection = (headingIds: string[]) => {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (headingIds.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting)

        if (visibleEntries.length > 0) {
          const topEntry = visibleEntries.reduce((prev, current) => {
            return prev.boundingClientRect.top < current.boundingClientRect.top ? prev : current
          })

          setActiveId(topEntry.target.id)
        }
      },
      {
        rootMargin: '-20% 0% -60% 0%',
        threshold: 0,
      },
    )

    headingIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [headingIds])

  useEffect(() => {
    if (headingIds.length === 0) return

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.3

      let currentActiveId = ''

      for (const id of headingIds) {
        const element = document.getElementById(id)
        if (element) {
          const elementTop = element.offsetTop
          if (scrollPosition >= elementTop) {
            currentActiveId = id
          } else {
            break
          }
        }
      }

      if (currentActiveId) {
        setActiveId(currentActiveId)
      }
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [headingIds])

  return activeId
}
