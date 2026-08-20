# ISPG — website redesign (Astro)

A rebuild of the International School of Phangan site on **Astro 5**, using the
ISPG design system imported from Claude Design
(project `fc104ad9-c2dc-44a5-b0a3-2d8ed0251116`).

The previous site was a WordPress export. Its copy was migrated once into
`src/data/pages.json`, which is now the source of truth and edited by hand —
nothing here reads from `../old/` or depends on WordPress.

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output in dist/
npm run preview
```

---

## What the design system contributes

Imported verbatim from the Claude Design project and kept in `src/styles/tokens/`:

| File | Contents |
|---|---|
| `fonts.css` | Cormorant Garamond (display serif) + DM Sans (UI sans) |
| `colors.css` | Navy / sky / warm-accent / neutral scales, all derived from the school crest |
| `typography.css` | Display, heading, body and eyebrow scales |
| `spacing.css` | 4px spacing scale, radii, shadows, motion, layout widths |
| `base.css` | Element defaults |

`src/styles/global.css` imports all five and adds the layout utilities.
`src/styles/legacy-content.css` styles the migrated WordPress copy.

The React components from the design project were ported to Astro in
`src/components/ui/` — Button, Eyebrow, Badge, Avatar, Card, ImageCard,
SectionHeading. Same API and visual behaviour, as plain CSS rather than inline
styles.

Both typefaces are self-hosted variable fonts in `public/fonts/` (latin and
latin-ext subsets), so the first paint needs no third-party connection.

Brand in one line: warm editorial school brand — heraldic **navy**, island **sky
blue**, joyful **coral/orange/gold**, in Cormorant Garamond with italic emphasis
plus DM Sans, on warm paper. **FLAIR** is the organising idea.

---

## Structure

```
src/
  components/
    ui/          design-system primitives (ported from the design project)
    site/        SiteHeader, SiteFooter, Icon (inlined Lucide-style icons)
    sections/    PageHero, PupilPathway, KeyAreas, StageBlock, CtaBand,
                 GumletVideo, DeftForm
  data/          site.ts, curriculum.ts, flair.ts, fees.ts, admission.ts,
                 teachers.ts, pages.json (migrated content)
  layouts/       BaseLayout.astro, ContentPage.astro
  lib/           content.ts — queries over pages.json
  pages/         routes (see SITEMAP.md in the repo root)
  styles/        tokens/, global.css, legacy-content.css
public/media/    brand assets, curated photography, migrated uploads
public/fonts/    self-hosted woff2 (Cormorant Garamond, DM Sans)
scripts/         check-overflow.mjs, check-console.mjs
```

---

## Content

`src/data/pages.json` holds the ten articles plus the pages whose copy is
preserved verbatim (application form, thank-you, privacy, terms).
`src/pages/[slug].astro` renders each one through `ContentPage.astro`, and
`legacy-content.css` styles the markup.

The one-off migration scripts have been removed now that the content has been
cleaned up in place; edit `pages.json` directly. What the cleanup left behind is
plain HTML: no WordPress classes beyond the handful `legacy-content.css` styles,
no vendor placeholder markup, every `<img>` lazy with a real `alt`, and each
YouTube embed reduced to a poster that only loads the player on click
(`.yt` — the handler lives in `ContentPage.astro`).

---

## Performance

The site ships static HTML with no framework runtime. What keeps it fast:

- **No third-party requests on load.** Fonts are self-hosted and preloaded;
  YouTube, Gumlet, Deftform, Canva and Instagram are all deferred or reduced to
  a link, so a cold article page is ~340 KB over 9 requests, all same-origin.
- **Click-to-load video.** A poster image stands in for each YouTube player
  until a reader presses play — the heaviest article carried ten embeds.
- **Images.** WebP only, capped at 1800px, every one lazy except the hero, which
  is `fetchpriority="high"`. Where a photo appears as a small circle it loads a
  256px crop from `public/media/site/thumb/` instead of the full-width original.
- **The homepage mosaic's four Gumlet clips** wait for an IntersectionObserver;
  the browser's own lazy loading starts them more than a screen too early.
- **CSS is split per route** by Astro; only `tokens/` + `global.css` are shared.
- **Hover prefetch** (`astro.config.mjs`) warms the next route before the click.

---

## Checks

```bash
npm run build
npm run preview                   # both checks read a running server
npm run check:overflow            # needs: npx playwright install chromium
npm run check:console
```

`check-overflow.mjs` loads every built route at 375 / 768 / 1440px and fails if
anything scrolls sideways. `check-console.mjs` reports page errors, console
errors and failed requests, separating third-party embed noise from our own.

---

## Known gaps

- **Fonts are substitutes.** No brand font files were supplied; Cormorant
  Garamond and DM Sans are the nearest Google Fonts matches, self-hosted in
  `public/fonts/`. Swap the files and the `@font-face` blocks in
  `src/styles/tokens/fonts.css` if licensed files arrive, and update the two
  preloads in `BaseLayout.astro`.
- **Photography is the school's own**, pulled from the WordPress uploads (mostly
  the Open House and swimming shoots). It is renamed on copy to stable, semantic
  names (`public/media/site/circle-time.webp`, `swim-joy.webp`, `meals.webp`, …)
  so a page never references a camera filename — drop in a replacement photo at
  the same name and nothing else changes. Everything is WebP, capped at 1800px
  wide; keep new photography to the same budget. The old site's architectural
  renders were deliberately left out: they show a building that is not the
  campus.
- One image referenced by `/raising-children-to-thrive/` is absent from the
  WordPress export; the migration drops that `<img>` rather than shipping a
  broken image.

---

## Third-party embeds

Carried over from the old site, all configured in `src/data/site.ts`:
Gumlet (school film, Open House film), Deftform (application form, Open House
registration), Google Calendar (`/calendar/`), Google Maps (`/contact/`), Canva
(school profile).

Inside migrated articles, YouTube is loaded only on click and Instagram posts
are plain links out — their embed scripts never ran after the migration anyway.
