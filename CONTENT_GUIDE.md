# Tenki Blog - Content Creation Guide

Welcome to the Tenki Blog CMS! This guide will help you create, manage, and publish blog content using Payload CMS.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Creating Blog Posts](#creating-blog-posts)
3. [Managing Authors](#managing-authors)
4. [Working with Categories](#working-with-categories)
5. [Using Tags](#using-tags)
6. [SEO Best Practices](#seo-best-practices)
7. [Publishing Workflow](#publishing-workflow)
8. [Image Guidelines](#image-guidelines)
9. [Tips & Tricks](#tips--tricks)

---

## Getting Started

### Accessing the CMS

1. Navigate to `https://your-domain.com/admin` (replace with your actual domain)
2. Log in with your credentials
3. You'll see the Payload CMS dashboard

### User Roles

- **Admin**: Full access to all features, can delete content
- **Marketing**: Can create, edit, and publish posts
- **Product**: Can create, edit, and publish posts
- **Viewer**: Read-only access

---

## Creating Blog Posts

### Step 1: Navigate to Posts

1. Click **Collections** in the sidebar
2. Select **Posts**
3. Click **Create New** button

### Step 2: Fill in Required Fields

#### Title (Required)
- Keep it concise and compelling (max 100 characters)
- Use action words and make it engaging
- Example: "How We Reduced Load Time by 60%"

#### Slug (Required)
- URL-friendly version of the title
- Use lowercase letters and hyphens
- Example: `how-we-reduced-load-time-by-60`
- **Important**: Once published, don't change the slug (it breaks links)

#### Excerpt (Required)
- Brief summary of the post (max 300 characters)
- Used in blog listings and social sharing
- Make it engaging to encourage clicks
- Example: "Learn how our engineering team optimized our application performance, reducing load times by 60% and improving user experience."

#### Content (Required)
- Your main blog post content
- Use the rich text editor with formatting options:
  - **Headings**: Structure your content with H2, H3, etc.
  - **Bold/Italic**: Emphasize important points
  - **Links**: Add relevant external/internal links
  - **Lists**: Use bullet points or numbered lists
  - **Code blocks**: For technical content
  - **Images**: Embed images within the content

#### Featured Image (Required)
- Main image for the post
- **Recommended size**: 1200x630px (OG image standard)
- Shows on listing pages and social media shares
- Must include alternative text for accessibility

#### Author (Required)
- Select yourself or the appropriate author
- If you're not in the list, ask an admin to create an author profile

#### Category (Required)
- Choose the most relevant category
- Available categories:
  - Product Updates
  - Engineering
  - Company News
  - Tutorials
  - Case Studies
- Contact admin if you need a new category

#### Tags (Optional)
- Add relevant tags (e.g., "performance", "react", "cloudflare")
- Use existing tags when possible
- Keep it to 3-5 relevant tags per post

### Step 3: Configure Publishing Settings

In the right sidebar:

#### Status
- **Draft**: Work in progress, not visible to public
- **Published**: Live on the website

#### Published At
- Schedule when the post goes live
- Leave empty for immediate publishing
- Use date/time picker for scheduled posts

#### Reading Time
- Estimated minutes to read
- Auto-calculated if left empty
- Based on ~200 words per minute

### Step 4: Optimize for SEO

Expand the **SEO** section at the bottom:

#### Meta Title (Optional)
- Custom title for search engines (max 60 chars)
- Defaults to post title if empty
- Include target keywords

#### Meta Description (Optional)
- Custom description for search results (max 160 chars)
- Defaults to excerpt if empty
- Make it compelling to improve click-through rate

#### OG Image (Optional)
- Custom image for social sharing
- Defaults to featured image if empty
- Use 1200x630px for best results

#### Canonical URL (Optional)
- Only use if content was originally published elsewhere
- Helps avoid duplicate content issues
- Format: `https://example.com/original-post`

#### No Index (Checkbox)
- Check to prevent search engines from indexing
- Useful for internal/test content
- Leave unchecked for normal posts

#### Keywords (Optional)
- Add target keywords for SEO
- One keyword per entry
- Focus on 3-5 primary keywords

### Step 5: Save and Publish

1. **Save Draft**: Click "Save" to save as draft
2. **Auto-save**: Content auto-saves every few seconds
3. **Publish**:
   - Set status to "Published"
   - Set "Published At" date (or leave empty for now)
   - Click "Save"

---

## Managing Authors

### Creating an Author Profile

1. Navigate to **Collections** > **Authors**
2. Click **Create New**
3. Fill in:
   - **Name**: Full name
   - **Email**: Contact email (must be unique)
   - **Bio**: Brief description (shown on posts)
   - **Avatar**: Profile photo
   - **Role**: Marketing/Product/Engineering/Leadership
   - **Social Links**: Twitter, LinkedIn, GitHub URLs

### Editing Your Profile

1. Go to **Collections** > **Authors**
2. Find your profile and click to edit
3. Update information as needed
4. Click **Save**

---

## Working with Categories

### When to Create a Category

- Categories are broad content groups
- Should have multiple posts
- Examples: Product Updates, Engineering, Tutorials

### Creating a Category

1. Navigate to **Collections** > **Categories**
2. Click **Create New**
3. Fill in:
   - **Name**: Display name (e.g., "Product Updates")
   - **Slug**: URL-friendly version (e.g., "product-updates")
   - **Description**: Brief explanation
   - **Color**: Hex color for badges (e.g., "#3B82F6")

---

## Using Tags

### Tag Best Practices

- Tags are specific topics within posts
- Use existing tags when possible
- Keep tags consistent (e.g., "JavaScript" not "javascript", "JS", "js")
- 3-5 tags per post is ideal

### Creating a Tag

1. Navigate to **Collections** > **Tags**
2. Click **Create New**
3. Fill in:
   - **Name**: Display name (e.g., "Machine Learning")
   - **Slug**: URL-friendly version (e.g., "machine-learning")

---

## SEO Best Practices

### Title Optimization

- Keep titles under 60 characters
- Include target keyword near the beginning
- Make it compelling and click-worthy
- Use numbers when relevant ("5 Ways to...", "Top 10...")

### Description Optimization

- Keep under 160 characters
- Include target keyword naturally
- Add a call-to-action
- Make it unique for each post

### Content Structure

1. Use proper heading hierarchy (H1 > H2 > H3)
2. Break up text with subheadings
3. Use short paragraphs (2-4 sentences)
4. Include relevant internal/external links
5. Add alt text to all images

### Keywords

- Research relevant keywords before writing
- Use keywords naturally in:
  - Title
  - First paragraph
  - Headings
  - Throughout content
  - Image alt text
- Avoid keyword stuffing

---

## Publishing Workflow

### Draft → Review → Publish

1. **Create Draft**
   - Write your content
   - Status: Draft
   - Save frequently

2. **Internal Review**
   - Share draft link with team
   - Gather feedback
   - Make revisions

3. **Final Check**
   - Proofread for typos
   - Check all links work
   - Verify images display correctly
   - Review SEO fields

4. **Publish**
   - Set Status: Published
   - Set Published At date/time
   - Click Save

### Scheduling Posts

- Set "Published At" to a future date/time
- Post will automatically go live at that time
- Useful for maintaining consistent publishing schedule

### Updating Published Posts

1. Find the post in **Collections** > **Posts**
2. Make your edits
3. Click **Save**
4. Changes are live immediately
5. **Important**: Don't change the slug of published posts

---

## Image Guidelines

### Featured Images

- **Size**: 1200x630px (OG image standard)
- **Format**: JPG or PNG
- **File size**: Under 500KB for fast loading
- **Content**: Clear, high-quality, relevant to post
- **Alt text**: Required - describe the image for accessibility

### In-Content Images

- **Size**: Max width 1200px
- **Format**: JPG for photos, PNG for graphics/screenshots
- **File size**: Optimize before upload (use tools like TinyPNG)
- **Alt text**: Always include descriptive alt text

### Image Best Practices

1. Use high-quality, relevant images
2. Optimize file size for web
3. Include descriptive alt text for accessibility
4. Give proper credit if using third-party images
5. Use consistent image style across blog

---

## Tips & Tricks

### Writing Engaging Content

1. **Hook readers early**: Start with a compelling intro
2. **Use subheadings**: Make content scannable
3. **Add examples**: Real-world examples resonate
4. **Include visuals**: Break up text with images
5. **End with CTA**: Guide readers to next action

### Content Ideas

- Product announcements
- Feature tutorials
- Behind-the-scenes stories
- Industry insights
- Customer success stories
- Team member spotlights
- Technical deep-dives

### Version History

- Payload CMS tracks post versions
- You can revert to previous versions if needed
- Access via "Versions" tab when editing

### Keyboard Shortcuts

- **Save**: Cmd/Ctrl + S
- **Bold**: Cmd/Ctrl + B
- **Italic**: Cmd/Ctrl + I
- **Link**: Cmd/Ctrl + K

### Preview Before Publishing

1. Click the preview icon (eye) in the toolbar
2. View how post will appear on the site
3. Check formatting, images, and layout
4. Return to edit if needed

---

## Need Help?

- **Technical issues**: Contact the engineering team
- **Content questions**: Reach out to the marketing lead
- **Access problems**: Contact your admin
- **Feature requests**: Submit via your project management tool

---

## Quick Reference

### Post Checklist

- [ ] Compelling title (under 60 chars)
- [ ] Clean, descriptive slug
- [ ] Engaging excerpt (under 300 chars)
- [ ] Well-structured content with headings
- [ ] Featured image (1200x630px) with alt text
- [ ] Author selected
- [ ] Category selected
- [ ] 3-5 relevant tags
- [ ] SEO fields filled out
- [ ] All links tested
- [ ] Proofread for typos
- [ ] Preview checked
- [ ] Published date set
- [ ] Status set to Published

### Character Limits

- Title: 100 characters
- Slug: No limit (but keep it concise)
- Excerpt: 300 characters
- Meta Title: 60 characters
- Meta Description: 160 characters

### Image Sizes

- Featured Image: 1200x630px
- Thumbnail: 400x300px (auto-generated)
- Card: 768x512px (auto-generated)
- In-Content: Max 1200px width

---

**Last Updated**: November 2025
**Version**: 1.0

For the latest updates and additional resources, check the internal documentation portal.
