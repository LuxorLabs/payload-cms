import React from 'react'

interface RichTextProps {
  content: any
}

function serializeLexical(node: any): React.ReactNode {
  if (!node) return null

  // Handle root node
  if (node.root) {
    return serializeLexical(node.root)
  }

  // Handle array of children
  if (Array.isArray(node)) {
    return node.map((child, i) => <React.Fragment key={i}>{serializeLexical(child)}</React.Fragment>)
  }

  // Handle children array
  if (node.children) {
    const children = serializeLexical(node.children)

    // Render based on node type
    switch (node.type) {
      case 'root':
        return <div>{children}</div>
      case 'paragraph':
        return <p>{children}</p>
      case 'heading':
        const HeadingTag = `h${node.tag}` as keyof JSX.IntrinsicElements
        return <HeadingTag>{children}</HeadingTag>
      case 'list':
        return node.listType === 'number' ? <ol>{children}</ol> : <ul>{children}</ul>
      case 'listitem':
        return <li>{children}</li>
      case 'quote':
        return <blockquote>{children}</blockquote>
      case 'link':
        return (
          <a href={node.url} target={node.newTab ? '_blank' : undefined} rel={node.newTab ? 'noopener noreferrer' : undefined}>
            {children}
          </a>
        )
      default:
        return <div>{children}</div>
    }
  }

  // Handle text nodes
  if (node.type === 'text') {
    let text = <>{node.text}</>

    if (node.format & 1) {
      // Bold
      text = <strong>{text}</strong>
    }
    if (node.format & 2) {
      // Italic
      text = <em>{text}</em>
    }
    if (node.format & 4) {
      // Strikethrough
      text = <s>{text}</s>
    }
    if (node.format & 8) {
      // Underline
      text = <u>{text}</u>
    }
    if (node.format & 16) {
      // Code
      text = <code>{text}</code>
    }

    return text
  }

  // Handle line break
  if (node.type === 'linebreak') {
    return <br />
  }

  return null
}

export function RichText({ content }: RichTextProps) {
  if (!content) {
    return null
  }

  return (
    <div className="rich-text">
      {serializeLexical(content)}
    </div>
  )
}
