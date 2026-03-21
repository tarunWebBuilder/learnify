import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tutorly-ai.com'

  // Normally, you would fetch all your dynamic exams/topics from Convex here using your backend queries.
  // We'll generate a static list based on the main exams we support right now.
  const exams = ['jee', 'clat', 'nid', 'nift']
  
  const landingPages = exams.map((exam) => ({
    url: `${baseUrl}/practice/${exam}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/find-skills`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...landingPages,
  ]
}
