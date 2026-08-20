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
