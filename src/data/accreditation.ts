/** Cambridge naming, behind one switch.
 *
 *  Cambridge withheld permission to use their name while the paperwork was in
 *  progress, so every mention across pages, data files and metadata goes
 *  through `cam()` rather than being written inline. Permission has since been
 *  granted and SHOW_CAMBRIDGE is back on; the interim wording stays in place so
 *  the site can be switched back in one edit if that ever changes.
 *
 *  The one exception is article copy in pages.json, which is data and cannot
 *  call a function; src/lib/content.ts swaps that single mention behind the
 *  same flag. */
export const SHOW_CAMBRIDGE = true;

/** `on` is the wording that names Cambridge, `off` the neutral fallback. */
export const cam = (on: string, off: string) => (SHOW_CAMBRIDGE ? on : off);

/** The "In partnership with Cambridge" band on the homepage. It claims formal
 *  accreditation, a stronger claim than naming, so it keeps its own switch —
 *  and it can never show without the name, hence the conjunction. */
export const SHOW_ACCREDITATION = SHOW_CAMBRIDGE && true;
