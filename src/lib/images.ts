/**
 * Site imagery lives in `src/assets/media/` so Astro can actually process it —
 * files under `public/` are copied verbatim and never optimised or resized.
 *
 * Everything still *refers* to images by their original `/media/...` path
 * (data files, page frontmatter), so this maps those paths onto the imported
 * asset instead of forcing a rewrite of every reference.
 *
 * Migrated WordPress imagery stays under `public/media/` — it is referenced
 * from HTML strings that get dumped in with `set:html`, which Astro cannot
 * process. `img()` returns undefined for those; callers fall back to a plain
 * `<img>`.
 */
const modules = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/media/**/*.{webp,avif,png,jpg,jpeg,svg}',
  { eager: true },
);

const byPublicPath = new Map<string, ImageMetadata>(
  Object.entries(modules).map(([file, mod]) => [file.replace('/src/assets', ''), mod.default]),
);

/** The processed asset for a `/media/...` path, or undefined if it isn't one we own. */
export function img(path: string | null | undefined): ImageMetadata | undefined {
  return path ? byPublicPath.get(path) : undefined;
}

/** Every path this module can resolve — used by scripts/check-a11y.mjs. */
export const knownImagePaths = [...byPublicPath.keys()];

/** What each shared photo shows — the fallback alt text wherever a component
 *  renders an image it was not given a description for (hero banners, the
 *  home-page mosaic). Keep one entry per photo so the wording stays the same
 *  wherever it appears. */
const c = (n: number) => `/media/site/class/class-${String(n).padStart(2, '0')}.webp`;
const descriptions: Record<string, string> = {
  [c(0)]: 'ISPG pupils colouring at their desks',
  [c(1)]: 'A pupil writing at her desk in an ISPG classroom',
  [c(2)]: 'A teacher checking pupils’ work at their desks',
  [c(3)]: 'Two young pupils working on worksheets',
  [c(4)]: 'Pupils working at their desks in a bright ISPG classroom',
  [c(5)]: 'Primary pupils concentrating on their worksheets',
  [c(6)]: 'A young pupil drawing with crayons',
  [c(7)]: 'A teacher guiding pupils through a writing task',
  [c(8)]: 'A pupil working on a worksheet in class',
  [c(9)]: 'A teacher talking with pupils during a lesson',
  [c(10)]: 'A teacher leading a lesson at the front of the class',
  [c(11)]: 'Pupils listening during a lesson at ISPG',
  [c(12)]: 'A pupil writing in her exercise book',
  [c(13)]: 'A pupil having fun during a lesson',
  [c(14)]: 'A pupil writing at her desk',
  [c(15)]: 'An ISPG classroom with pupils facing their teacher',
  [c(16)]: 'A pupil writing with a pencil',
  [c(17)]: 'A pupil smiling among classmates',
  [c(18)]: 'A pupil looking up thoughtfully, pencil in hand',
  [c(19)]: 'A teacher helping a pupil with her work',
  [c(20)]: 'Young pupils working with learning materials on the floor',
  [c(21)]: 'A teacher with her class in a bright ISPG classroom',
  [c(22)]: 'Kindergarten pupils working with learning materials',
  [c(23)]: 'A pupil working with Montessori materials',
  [c(24)]: 'The ISPG computer room',
  [c(25)]: 'Pupils working at computers in the ISPG computer room',
  [c(26)]: 'A smiling pupil in an ISPG classroom',
  [c(27)]: 'A pupil gluing paper during an art lesson',
  [c(28)]: 'Pupils at their desks during an art lesson',
  [c(29)]: 'Two pupils making paper crafts',
  [c(30)]: 'A pupil drawing at his desk',
  [c(31)]: 'A teacher helping a pupil at his desk',
  [c(32)]: 'Pupils working together in an art lesson',
  [c(33)]: 'Two pupils working on a craft project',
  '/media/site/campus-aerial.webp': 'Aerial view of the ISPG campus and its 25-metre pool',
  '/media/site/campus-aerial-2.webp': 'Aerial view of the ISPG campus by the sea on Koh Phangan',
  '/media/site/pool.webp': 'The 25-metre pool on the ISPG campus',
  '/media/2026/02/S__62652467zz.webp': 'The Blue Dolphins pool lanes at ISPG',
  '/media/site/meals.webp': 'Freshly cooked school lunches at ISPG',
  '/media/site/fruit.webp': 'Fresh tropical fruit served at ISPG',
  '/media/site/medals.webp': 'ISPG medals ready for prize-giving',
  '/media/site/badges.webp': 'Visitor badges at ISPG',
  '/media/site/meeting.webp': 'ISPG staff meeting with parents',
};

/** Alt text for a shared `/media/...` photo, or `fallback` when it has none. */
export function altFor(path: string | null | undefined, fallback = 'International School of Phangan'): string {
  return (path && descriptions[path]) || fallback;
}
