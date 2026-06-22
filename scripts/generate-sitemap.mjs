// Generates out/sitemap.xml from the static export produced by `next build`.
//
// The docs site uses `output: 'export'`, so Next.js route handlers
// (app/sitemap.ts) do NOT run. Instead we walk the built `out/` directory for
// .html pages after the export and emit a sitemap, so it auto-stays in sync as
// docs pages are added or removed. Run from `postbuild` (after pagefind).

import { readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const SITE_URL = 'https://docs.imaginepdf.com';
const OUT_DIR = join(process.cwd(), 'out');

// Directories/files that are not indexable content.
const EXCLUDE_DIRS = new Set(['_next', '_pagefind']);
const EXCLUDE_FILES = new Set(['404.html', '500.html']);

/** Recursively collect every .html file under `dir`. */
function collectHtml(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (EXCLUDE_DIRS.has(entry)) continue;
      out.push(...collectHtml(full));
    } else if (entry.endsWith('.html')) {
      out.push(full);
    }
  }
  return out;
}

/** Map a built .html file path to its public route path. */
function toRoute(file) {
  const rel = relative(OUT_DIR, file).split(sep).join('/');
  if (EXCLUDE_FILES.has(rel)) return null;
  // Strip the .html extension; collapse `index` to its directory.
  let route = rel.replace(/\.html$/, '');
  route = route.replace(/(^|\/)index$/, '');
  return '/' + route; // '' -> '/', 'api/overview' -> '/api/overview'
}

const lastmod = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

const routes = [...new Set(collectHtml(OUT_DIR).map(toRoute).filter(Boolean))]
  // Root first, then alphabetical for a stable, readable file.
  .sort((a, b) => (a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b)));

const urls = routes
  .map((route) => {
    const loc = route === '/' ? `${SITE_URL}/` : `${SITE_URL}${route}`;
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

writeFileSync(join(OUT_DIR, 'sitemap.xml'), xml);
console.log(`Wrote out/sitemap.xml with ${routes.length} URLs.`);
