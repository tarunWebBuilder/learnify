import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://tutorly-ai.com'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/settings/', '/dashboard/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
