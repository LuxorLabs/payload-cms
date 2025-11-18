# Tenki Blog - Deployment Guide

This guide covers deployment and configuration for the Payload CMS blog on Cloudflare infrastructure.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Local Development](#local-development)
4. [Database Setup](#database-setup)
5. [Storage Configuration](#storage-configuration)
6. [Deployment](#deployment)
7. [Post-Deployment](#post-deployment)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- Node.js 18.20.2+ or 20.9.0+
- pnpm 9+ or 10+
- Cloudflare account with Workers enabled
- Wrangler CLI configured (`pnpm add -g wrangler`)

---

## Environment Setup

### 1. Required Environment Variables

Create a `.env` file in the root directory:

```bash
# Payload CMS
PAYLOAD_SECRET=your-secret-key-here  # Generate with: openssl rand -hex 32

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000  # Update for production

# Cloudflare (optional - for local development)
CLOUDFLARE_ENV=production  # or development
```

### 2. Generate Payload Secret

```bash
openssl rand -hex 32
```

Copy the output and add it to your `.env` file as `PAYLOAD_SECRET`.

---

## Local Development

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Generate TypeScript Types

```bash
pnpm run generate:types
```

This generates:
- Payload collection types (`src/payload-types.ts`)
- Cloudflare environment types (`cloudflare-env.d.ts`)

### 3. Run Development Server

```bash
pnpm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Admin Panel: http://localhost:3000/admin

### 4. Create First Admin User

1. Navigate to http://localhost:3000/admin
2. Fill in the registration form:
   - Name
   - Email
   - Password
   - Role: Admin
3. Click "Create"

---

## Database Setup

The blog uses Cloudflare D1 (SQLite) for data storage.

### 1. Create D1 Database

```bash
wrangler d1 create tenki-blog-db
```

This will output a database ID. Add it to your `wrangler.jsonc`:

```jsonc
{
  "database_id": "YOUR_DATABASE_ID_HERE"
}
```

### 2. Run Migrations Locally

```bash
pnpm run payload migrate
```

### 3. Run Migrations on Production

```bash
pnpm run deploy:database
```

---

## Storage Configuration

The blog uses Cloudflare R2 for media storage.

### 1. Create R2 Bucket

```bash
wrangler r2 bucket create tenki-blog-media
```

### 2. Configure Bucket in wrangler.jsonc

Ensure your `wrangler.jsonc` includes:

```jsonc
{
  "r2_buckets": [
    {
      "binding": "R2",
      "bucket_name": "tenki-blog-media"
    }
  ]
}
```

### 3. Configure Public Access (Optional)

If you want images publicly accessible:

```bash
wrangler r2 bucket update tenki-blog-media --public
```

---

## Deployment

### Method 1: Full Deployment (Recommended)

Deploys both database migrations and application:

```bash
export CLOUDFLARE_ENV=production
pnpm run deploy
```

### Method 2: Separate Deployments

#### Deploy Database Only

```bash
export CLOUDFLARE_ENV=production
pnpm run deploy:database
```

#### Deploy Application Only

```bash
export CLOUDFLARE_ENV=production
pnpm run deploy:app
```

### Method 3: Preview Deployment

Test production build locally before deploying:

```bash
export CLOUDFLARE_ENV=production
pnpm run preview
```

---

## Post-Deployment

### 1. Set Cloudflare Secrets

Add your Payload secret to Cloudflare Workers:

```bash
wrangler secret put PAYLOAD_SECRET --env=production
# Paste your secret when prompted
```

### 2. Configure Custom Domain

In Cloudflare Dashboard:
1. Go to **Workers & Pages**
2. Select your deployment
3. Go to **Custom Domains**
4. Add your domain (e.g., `blog.tenki.com`)

### 3. Create Initial Content

1. Navigate to your production admin panel
2. Create initial content:
   - **Categories**: Create 3-5 categories
   - **Tags**: Create 10-15 common tags
   - **Authors**: Add team members
   - **Posts**: Publish your first post

### 4. Verify Deployment

Check these URLs:
- ✓ Homepage: `https://your-domain.com/`
- ✓ Admin Panel: `https://your-domain.com/admin`
- ✓ Blog Listing: `https://your-domain.com/blog`
- ✓ API: `https://your-domain.com/api/posts`
- ✓ GraphQL: `https://your-domain.com/api/graphql`

---

## Migration from Existing Blog

### 1. Prepare Data

Export your existing blog data to JSON format. See the example in:
```
scripts/migrate-blog-content.ts
```

### 2. Create Data File

Create `data/existing-blog-posts.json` with your blog data:

```json
[
  {
    "title": "Your Post Title",
    "slug": "your-post-slug",
    "content": "Your post content...",
    "excerpt": "Brief summary",
    "publishedDate": "2024-01-01T00:00:00.000Z",
    "author": {
      "name": "Author Name",
      "email": "author@example.com",
      "bio": "Author bio"
    },
    "category": "Category Name",
    "tags": ["tag1", "tag2"],
    "metaTitle": "SEO Title",
    "metaDescription": "SEO Description"
  }
]
```

### 3. Run Migration

```bash
pnpm tsx scripts/migrate-blog-content.ts
```

### 4. Verify Migration

1. Check the admin panel
2. Verify posts are created correctly
3. Check categories and tags
4. Test post URLs on frontend

---

## Troubleshooting

### Build Errors

**Error: Module not found**
```bash
# Clear cache and reinstall
rm -rf .next node_modules
pnpm install
pnpm run build
```

**Error: TypeScript errors**
```bash
# Regenerate types
pnpm run generate:types
```

### Deployment Errors

**Error: Payload secret not found**
```bash
# Set secret in Cloudflare
wrangler secret put PAYLOAD_SECRET --env=production
```

**Error: Database migration failed**
```bash
# Check D1 database exists
wrangler d1 list

# Run migrations manually
wrangler d1 execute D1 --command "SELECT * FROM payload_migrations" --env=production
```

**Error: R2 bucket not found**
```bash
# Check R2 bucket exists
wrangler r2 bucket list

# Create if missing
wrangler r2 bucket create tenki-blog-media
```

### Runtime Errors

**Images not loading**
- Check R2 bucket is configured correctly
- Verify bucket binding in `wrangler.jsonc`
- Check bucket permissions (public access if needed)

**Admin panel not accessible**
- Verify route configuration in `src/app/(payload)/admin`
- Check build output for errors
- Verify deployment completed successfully

**Posts not appearing**
- Check post status is "Published"
- Verify `publishedAt` date is not in the future
- Check user role permissions

### Performance Issues

**Slow page loads**
- Enable caching in Cloudflare Dashboard
- Optimize images before upload
- Check D1 query performance

**Database queries slow**
- Add indexes to frequently queried fields
- Limit result sets with pagination
- Use `depth` parameter wisely in queries

---

## Maintenance

### Database Backups

Cloudflare D1 automatically backs up your database. To create manual backup:

```bash
# Export data
wrangler d1 execute D1 --command "SELECT * FROM posts" --json --env=production > backup.json
```

### Updating Dependencies

```bash
# Check for updates
pnpm outdated

# Update dependencies
pnpm update

# Regenerate types
pnpm run generate:types

# Test locally
pnpm run dev

# Deploy
pnpm run deploy
```

### Monitoring

Set up monitoring in Cloudflare Dashboard:
1. Go to **Workers & Pages**
2. Select your deployment
3. View **Analytics** tab for:
   - Request volume
   - Error rates
   - Response times
   - CPU usage

---

## Security Best Practices

1. **Rotate Secrets Regularly**
   ```bash
   # Generate new secret
   openssl rand -hex 32
   # Update in Cloudflare
   wrangler secret put PAYLOAD_SECRET --env=production
   ```

2. **Review User Permissions**
   - Regularly audit user roles
   - Remove inactive users
   - Use least privilege principle

3. **Keep Dependencies Updated**
   ```bash
   pnpm update
   pnpm audit
   ```

4. **Enable HTTPS Only**
   - Configure in Cloudflare SSL/TLS settings
   - Set to "Full (strict)" mode

5. **Rate Limiting**
   - Configure in Cloudflare Dashboard
   - Protect admin login endpoint
   - Limit API requests

---

## Support

For issues and questions:

- **Documentation**: https://payloadcms.com/docs
- **Cloudflare Docs**: https://developers.cloudflare.com
- **GitHub Issues**: [Your repository]
- **Team Chat**: [Your communication platform]

---

**Last Updated**: November 2025
**Version**: 1.0
