import pages from '../data/pages.json';

export type ContentRecord = {
  slug: string;
  kind: 'page' | 'article';
  title: string;
  description: string;
  hero: string | null;
  published: string | null;
  updated: string | null;
  topic: string | null;
  noindex: boolean;
  html: string;
};

const all = pages as ContentRecord[];

export const allRecords = all;

export const articles = all
  .filter((r) => r.kind === 'article')
  .sort((a, b) => (b.published ?? '').localeCompare(a.published ?? ''));

export const topics = [...new Set(articles.map((a) => a.topic).filter(Boolean))] as string[];

/** Up to `n` other articles, preferring the same topic. */
export function related(slug: string, n = 3) {
  const self = articles.find((a) => a.slug === slug);
  const others = articles.filter((a) => a.slug !== slug);
  const sameTopic = others.filter((a) => a.topic === self?.topic);
  const rest = others.filter((a) => a.topic !== self?.topic);
  return [...sameTopic, ...rest].slice(0, n);
}

/** Strip tags for excerpts / meta descriptions. */
export function excerpt(html: string, limit = 180) {
  const text = html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length <= limit) return text;
  return text.slice(0, text.lastIndexOf(' ', limit)) + '…';
}
