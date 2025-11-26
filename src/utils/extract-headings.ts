import type { Headings } from './hooks/use-headings'

export function extractHeadingsFromLexical(content: any): Headings[] {
  const headings: Headings[] = []

  function traverse(node: any) {
    if (!node) return

    // Handle root node
    if (node.root) {
      traverse(node.root)
      return
    }

    // Handle array of nodes
    if (Array.isArray(node)) {
      node.forEach((child) => traverse(child))
      return
    }

    // Handle heading nodes
    if (node.type === 'heading' && node.tag && node.children) {
      const text = extractTextFromNode(node)
      // node.tag is already like 'h1', 'h2', etc., so just extract the number
      const level = parseInt(node.tag.replace(/^h/, ''), 10)
      const id = text
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '')

      headings.push({ id, text, level })
    }

    // Recursively traverse children
    if (node.children) {
      traverse(node.children)
    }
  }

  function extractTextFromNode(node: any): string {
    if (!node) return ''

    if (Array.isArray(node)) {
      return node.map((child) => extractTextFromNode(child)).join('')
    }

    if (node.type === 'text') {
      return node.text || ''
    }

    if (node.children) {
      return extractTextFromNode(node.children)
    }

    return ''
  }

  traverse(content)
  return headings
}
