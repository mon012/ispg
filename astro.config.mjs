// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ispg.ac.th',
  trailingSlash: 'always',
  build: { format: 'directory' },
  devToolbar: { enabled: true },

  // Warm the next page while a visitor is still deciding: every internal link
  // is fetched on hover, which makes navigation feel instant on the small
  // number of routes this site has.
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },

  server: { port: process.env.PORT ? Number(process.env.PORT) : 4321 },

  // 301s for URLs the old WordPress site had indexed that don't exist at the
  // same path in this rebuild — keeps their accumulated Search Console
  // authority instead of letting it 404 away. See public/_redirects for the
  // host-level equivalent (used when the static host reads that file itself
  // instead of serving these generated redirect pages).
  redirects: {
    '/bluedolphins/': '/blue-dolphins/',
    '/playgroup/': '/academics/kindergarten/',
    '/academics/early-years/': '/academics/kindergarten/',
    '/academics/key-stage/': '/academics/primary/',
    '/thailands-national-triathlon-team/': '/blog/',
    '/category/news/': '/blog/',
    '/category/nature-based-education/': '/blog/',
    '/category/child-development-learning/': '/blog/',
    '/adp/': '/',
    '/privateop/': '/',
    '/parenting-ai-world/': '/parenting-ai-age/',
  },

  integrations: [
    sitemap({
      // Campaign and transactional pages stay out of the index.
      filter: (page) =>
        !['/openhouse/', '/form/', '/thx/'].some((p) => page.endsWith(p)),
    }),
  ],
});
