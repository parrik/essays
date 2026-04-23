import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: any) {
  const essays = await getCollection('essays');
  essays.sort((a, b) => {
    const aDate = (a.data.updatedAt ?? a.data.publishedAt ?? new Date(0)).getTime();
    const bDate = (b.data.updatedAt ?? b.data.publishedAt ?? new Date(0)).getTime();
    return bDate - aDate;
  });
  return rss({
    title: 'parrik',
    description: 'Essays on distributed systems, biology, and the practice.',
    site: context.site ?? 'https://parrik.com',
    items: essays.map((e) => ({
      title: e.data.title,
      description: e.data.description ?? e.data.subtitle ?? '',
      pubDate: e.data.updatedAt ?? e.data.publishedAt ?? new Date(),
      link: `/essays/${e.id}/`,
    })),
  });
}
