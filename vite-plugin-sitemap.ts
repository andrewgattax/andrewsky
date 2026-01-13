import { writeFileSync } from 'fs'
import { join } from 'path'
import type { Plugin } from 'vite'

interface SitemapOptions {
  baseUrl: string
  outDir?: string
}

export function sitemapPlugin(options: SitemapOptions): Plugin {
  const { baseUrl, outDir = 'dist/client' } = options

  return {
    name: 'vite-plugin-sitemap',
    apply: 'build',

    closeBundle() {
      // This runs after the build is complete
      // Generate sitemap for the pre-rendered pages
      const sitemap = generateSitemap(baseUrl)
      const outputPath = join(outDir, 'sitemap.xml')

      try {
        writeFileSync(outputPath, sitemap)
        console.log(`✓ Generated sitemap.xml at ${outputPath}`)
      } catch (error) {
        console.error('Failed to generate sitemap:', error)
      }
    }
  }
}

function generateSitemap(baseUrl: string): string {
  const currentDate = new Date().toISOString().split('T')[0]

  // For now, we'll hardcode the landing page
  // In the future, this can be extended to discover all pre-rendered pages
  const pages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    // Add more pages here as you create them:
    // { url: '/about', priority: '0.8', changefreq: 'monthly' },
    // { url: '/pricing', priority: '0.9', changefreq: 'weekly' },
  ]

  const urls = pages.map((page) => {
    const fullUrl = `${baseUrl}${page.url}`
    return `  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  }).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls}
</urlset>
`
}
