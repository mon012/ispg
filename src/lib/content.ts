import pages from '../data/pages.json';
import { SHOW_CAMBRIDGE, cam } from '../data/accreditation';

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

/* Article copy is data, so it cannot call cam() inline. While the Cambridge
   name is gated, swap the one mention in it here; with the flag on the records
   pass through untouched. */
const swap = (s: string) =>
  s.replace('the Cambridge Curriculum', cam('the Cambridge Curriculum', 'our international curriculum'));

const all = (pages as ContentRecord[]).map((r) =>
  SHOW_CAMBRIDGE ? r : { ...r, title: swap(r.title), description: swap(r.description), html: swap(r.html) },
);

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
