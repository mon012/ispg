/** Cambridge naming is gated until the accreditation is confirmed.
 *
 *  Cambridge does not yet permit us to use their name on the site, so every
 *  mention across pages, data files and metadata goes through `cam()` rather
 *  than being deleted. Flip SHOW_CAMBRIDGE to true to restore the original
 *  wording everywhere in one edit — no other file needs to change.
 *
 *  The one exception is article copy in pages.json, which is data and cannot
 *  call a function; src/lib/content.ts swaps that single mention behind the
 *  same flag. */
export const SHOW_CAMBRIDGE = false;

/** `on` is the approved-once-accredited wording, `off` the interim wording. */
export const cam = (on: string, off: string) => (SHOW_CAMBRIDGE ? on : off);

/** The "In partnership with Cambridge" band on the homepage. Needs the name,
 *  so it can never show while SHOW_CAMBRIDGE is false. Set both to true once
 *  the paperwork lands. */
export const SHOW_ACCREDITATION = SHOW_CAMBRIDGE && false;
