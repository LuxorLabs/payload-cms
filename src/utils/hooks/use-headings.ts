import { useEffect, useState } from 'react'

export type Headings = {
  id: string
  text: string
  level: number
}

export const useHeadings = (html: string): [string, Headings[]] => {
  const [modified, setModified] = useState('')
  const [headings, setHeadings] = useState<Headings[]>([])

  useEffect(() => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    const headingElements = doc.querySelectorAll('h1, h2, h3, h4, h5, h6')
    const collectedHeadings: Headings[] = []

    headingElements.forEach((el) => {
      const text = el.textContent?.trim() || ''
      const level = parseInt(el.tagName.replace('H', ''), 10)
      const id =
        el.id ||
        text
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]/g, '')
      el.id = id
      el.classList.add('scroll-mt-30')

      collectedHeadings.push({ id, text, level })
    })

    setModified(doc.body.innerHTML)
    setHeadings(collectedHeadings)
  }, [html])

  return [modified, headings]
}
