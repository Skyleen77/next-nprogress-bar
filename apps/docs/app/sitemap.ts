import { source } from '@/lib/source';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: 'https://bprogress.vercel.app',
      lastModified: new Date().toISOString(),
    },
    ...source.getPages().map((page) => ({
      url: `https://bprogress.vercel.app${page.url}`,
      lastModified: new Date().toISOString(),
    })),
  ];
}
