# Tenki Blog - Payload CMS on Cloudflare

A modern, SEO-optimized blog platform built with Payload CMS, Next.js 15, and deployed on Cloudflare infrastructure.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/payloadcms/payload/tree/main/templates/with-cloudflare-d1)

## Features

✨ **Full-Featured Blog**
- Rich text editing with Payload's Lexical editor
- Draft/publish workflow with scheduling
- Version history and autosave
- SEO optimization built-in
- Image management with Cloudflare R2

🎨 **Modern UI**
- Built with Next.js 15 and React 19
- Styled with Tailwind CSS and shadcn/ui
- Responsive design
- Dark mode support

🔐 **Role-Based Access Control**
- Admin, Marketing, Product, and Viewer roles
- Granular permissions for content management
- Secure authentication

🚀 **Cloudflare-Native**
- D1 SQLite database
- R2 object storage for media
- Workers for edge deployment
- Global CDN distribution

📊 **Content Collections**
- **Posts**: Blog posts with full SEO support
- **Authors**: Author profiles with social links
- **Categories**: Content organization
- **Tags**: Topic tagging system
- **Media**: Optimized image handling

## Documentation

- **[Content Guide](./CONTENT_GUIDE.md)**: Complete guide for content creators
- **[Deployment Guide](./DEPLOYMENT.md)**: Technical deployment instructions
- **[Migration Script](./scripts/migrate-blog-content.ts)**: Import existing blog content

## Quick Start

### Prerequisites

- Node.js 18.20.2+ or 20.9.0+
- pnpm 9+ or 10+
- Cloudflare account

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd payload-cms
pnpm install
```

### 2. Environment Setup

Create a `.env` file:

```bash
PAYLOAD_SECRET=your-secret-key  # Generate with: openssl rand -hex 32
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Generate Types

```bash
pnpm run generate:types
```

### 4. Start Development Server

```bash
pnpm run dev
```

Visit:
- Frontend: http://localhost:3000
- Blog: http://localhost:3000/blog
- Admin Panel: http://localhost:3000/admin

### 5. Create First User

1. Navigate to http://localhost:3000/admin
2. Register with:
   - Name
   - Email
   - Password
   - Role: Admin

## Collections

### Posts

Full-featured blog posts with:
- Rich text content (Lexical editor)
- SEO metadata (title, description, OG image, canonical URL)
- Featured images
- Author attribution
- Category and tag organization
- Draft/publish workflow
- Publishing scheduler
- Reading time estimation
- Version history

### Authors

Author profiles including:
- Name and bio
- Avatar image
- Role (Marketing, Product, Engineering, Leadership)
- Social links (Twitter, LinkedIn, GitHub)

### Categories

Broad content organization:
- Name and slug
- Description
- Color coding for badges

### Tags

Specific topic tagging:
- Name and slug
- Used for filtering and discovery

### Media

Image management with:
- Cloudflare R2 storage
- Alt text for accessibility
- Caption and credit fields
- Multiple size variants (thumbnail, card, featured)

## Project Structure

```
payload-cms/
├── src/
│   ├── app/
│   │   ├── (frontend)/          # Public-facing pages
│   │   │   ├── blog/            # Blog pages
│   │   │   │   ├── page.tsx     # Blog listing
│   │   │   │   ├── [slug]/      # Individual posts
│   │   │   │   ├── category/    # Category pages
│   │   │   │   └── tag/         # Tag pages
│   │   │   └── page.tsx         # Homepage
│   │   ├── (payload)/           # Admin panel
│   │   │   └── admin/           # Payload admin UI
│   │   └── globals.css          # Global styles
│   ├── collections/             # Payload collections
│   │   ├── Posts.ts
│   │   ├── Authors.ts
│   │   ├── Categories.ts
│   │   ├── Tags.ts
│   │   ├── Media.ts
│   │   └── Users.ts
│   ├── components/
│   │   ├── blog/               # Blog components
│   │   │   ├── BlogCard.tsx
│   │   │   └── RichText.tsx
│   │   └── ui/                 # shadcn/ui components
│   │       ├── card.tsx
│   │       └── badge.tsx
│   ├── lib/
│   │   └── utils.ts            # Utility functions
│   ├── payload.config.ts       # Payload configuration
│   └── payload-types.ts        # Generated types
├── scripts/
│   └── migrate-blog-content.ts # Migration script
├── CONTENT_GUIDE.md            # Content creator guide
├── DEPLOYMENT.md               # Deployment guide
└── README.md                   # This file
```

## Technology Stack

| Category | Technology |
|----------|------------|
| **CMS** | Payload CMS 3.63 |
| **Framework** | Next.js 15.4 |
| **UI Library** | React 19.1 |
| **Styling** | Tailwind CSS 4.1 |
| **Components** | shadcn/ui |
| **Database** | Cloudflare D1 (SQLite) |
| **Storage** | Cloudflare R2 |
| **Deployment** | Cloudflare Workers |
| **Editor** | Lexical (Payload) |
| **Language** | TypeScript 5.7 |

## Deployment

### Deploy to Cloudflare

```bash
# Set environment
export CLOUDFLARE_ENV=production

# Deploy (migrations + app)
pnpm run deploy
```

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## Content Migration

To migrate existing blog content:

1. Create `data/existing-blog-posts.json` with your content
2. Run the migration script:

```bash
pnpm tsx scripts/migrate-blog-content.ts
```

See [scripts/migrate-blog-content.ts](./scripts/migrate-blog-content.ts) for format details.

## Development Scripts

```bash
pnpm run dev              # Start development server
pnpm run build           # Build for production
pnpm run deploy          # Deploy to Cloudflare
pnpm run deploy:database # Deploy database migrations only
pnpm run deploy:app      # Deploy application only
pnpm run preview         # Preview production build locally
pnpm run generate:types  # Generate TypeScript types
pnpm run lint            # Run ESLint
pnpm run test            # Run tests
```

## Access Control

### Roles and Permissions

| Role | Posts | Authors | Categories | Tags | Delete |
|------|-------|---------|------------|------|--------|
| **Admin** | ✓ Create, Edit | ✓ Create, Edit | ✓ Create, Edit | ✓ Create, Edit | ✓ All |
| **Marketing** | ✓ Create, Edit | ✓ Create, Edit | ✓ Create, Edit | ✓ Create, Edit | ✗ None |
| **Product** | ✓ Create, Edit | ✓ Create, Edit | ✓ Create, Edit | ✓ Create, Edit | ✗ None |
| **Viewer** | Read only | Read only | Read only | Read only | ✗ None |

Public users can only read published posts.

## SEO Features

- **Meta Tags**: Custom title and description
- **Open Graph**: Social media preview images
- **Canonical URLs**: Avoid duplicate content
- **No-Index**: Control search indexing
- **Keywords**: Target keyword tracking
- **Structured Data**: Ready for schema markup
- **Sitemap**: Auto-generated from posts
- **Reading Time**: Auto-calculated

## Known Issues

### GraphQL

GraphQL support is currently limited due to [upstream issues in Workers](https://github.com/cloudflare/workerd/issues/5175). REST API is fully functional.

### Worker Size Limits

This template requires **Paid Workers** plan due to bundle size (3MB limit). We're actively working to reduce bundle size.

### Image Processing

Image cropping and focal point features are disabled on Workers due to lack of `sharp` support. Images are stored as-is with size variants generated.

## Support & Resources

- **Content Guide**: See [CONTENT_GUIDE.md](./CONTENT_GUIDE.md)
- **Deployment Guide**: See [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Payload Docs**: https://payloadcms.com/docs
- **Cloudflare Docs**: https://developers.cloudflare.com
- **Discord**: https://discord.com/invite/payload
- **GitHub Discussions**: https://github.com/payloadcms/payload/discussions

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

MIT

---

**Built with ❤️ by the Tenki team**

For questions or support, contact your engineering team.
