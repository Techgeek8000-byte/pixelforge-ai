import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pixelforge-ai-chi.vercel.app';

  const toolSlugs = [
    'text-to-image', 'ai-avatar', 'ai-logo', 'ai-wallpaper', 'ai-thumbnail',
    'ai-social', 'ai-art', 'ai-icon', 'ai-meme', 'ai-product',
  ];

  const toolPages = toolSlugs.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    ...toolPages,
  ];
}