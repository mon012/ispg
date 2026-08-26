import { site } from '../data/site';

export type Crumb = { name: string; href: string };

/** Human labels for the paths that make up the trail. Anything missing falls
 *  back to the page's own title, so a new route still gets a sane crumb. */
const SEGMENT_LABELS: Record<string, string> = {
  '/about/': 'About',
  '/academics/': 'Academics',
  '/academics/kindergarten/': 'Kindergarten',
  '/academics/primary/': 'Primary',
  '/admission/': 'Admissions',
  '/blog/': 'News & Blog',
  '/blue-dolphins/': 'Blue Dolphins',
  '/calendar/': 'School Calendar',
  '/contact/': 'Contact',
  '/fees/': 'School Fees',
  '/flair/': 'FLAIR Approach',
  '/our-teachers/': 'Our Teachers',
  '/privacy-policy/': 'Privacy Policy',
  '/school-life/': 'School Life',
  '/terms/': 'Terms & Conditions',
};

const titleCase = (segment: string) =>
  segment.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

/** The breadcrumb trail for a path, always starting at Home.
 *  `currentName` names the final crumb when the path is not in the label map
 *  (articles, whose slug is not a useful label); `parent` inserts a section
 *  that is not part of the URL — articles live at /slug/ but belong to /blog/. */
export function crumbsFor(
  pathname: string,
  { currentName, parent }: { currentName?: string; parent?: Crumb } = {},
): Crumb[] {
  const trail: Crumb[] = [{ name: 'Home', href: '/' }];
  if (parent) trail.push(parent);

  let acc = '';
  const parts = pathname.split('/').filter(Boolean);
  parts.forEach((part, i) => {
    acc += `/${part}`;
    const href = `${acc}/`;
    const last = i === parts.length - 1;
    const name = SEGMENT_LABELS[href] ?? (last && currentName ? currentName : titleCase(part));
    trail.push({ name, href });
  });

  return trail;
}

/** BreadcrumbList JSON-LD. Returns null for a trail with nothing to show. */
export function breadcrumbSchema(crumbs: Crumb[]) {
  if (crumbs.length < 2) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: new URL(c.href, site.url).href,
    })),
  };
}

export type FaqItem = { q: string; a: string };

/** FAQPage JSON-LD. Only ever call this for questions that are also visible on
 *  the page — schema that describes copy a visitor cannot see is a violation. */
export function faqSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

/** Article JSON-LD for a migrated blog record. */
export function articleSchema(record: {
  title: string;
  description: string;
  slug: string;
  hero: string | null;
  published: string | null;
  updated: string | null;
  topic: string | null;
}) {
  const url = new URL(`/${record.slug}/`, site.url).href;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: record.title,
    description: record.description,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    ...(record.hero ? { image: new URL(record.hero, site.url).href } : {}),
    ...(record.published ? { datePublished: record.published } : {}),
    ...(record.updated ?? record.published
      ? { dateModified: record.updated ?? record.published }
      : {}),
    ...(record.topic ? { articleSection: record.topic } : {}),
    author: { '@type': 'Organization', name: site.name, url: site.url },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      url: site.url,
      logo: {
        '@type': 'ImageObject',
        url: new URL('/media/brand/ispg-crest.png', site.url).href,
      },
    },
  };
}
