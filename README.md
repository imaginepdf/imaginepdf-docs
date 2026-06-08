# imaginepdf-docs

Documentation site for **ImaginePDF**, served at
[docs.imaginepdf.com](https://docs.imaginepdf.com).

Built with [Nextra 4](https://nextra.site) (Next.js App Router), statically
exported, and deployed to GitHub Pages by GitHub Actions on every push to
`main`.

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
```

Content lives in `content/` as MDX. Sidebar order is controlled by the
`_meta.js` file in each directory.

## Build

```bash
npm run build      # next build → out/, then Pagefind indexes out/_pagefind
```

The static site lands in `out/`. `npm run build` runs `next build`
(`output: 'export'`) followed by the `postbuild` Pagefind step that generates
the search index.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site
and publishes `out/` to GitHub Pages. `public/CNAME` pins the custom domain and
`public/.nojekyll` ensures the `_next/` and `_pagefind/` directories are served.

### One-time setup (GitHub + DNS)

1. Create the public repo `imaginepdf-docs` under the org and push this folder
   to `main`.
2. Repo **Settings → Pages → Source: GitHub Actions**.
3. Repo **Settings → Pages → Custom domain:** `docs.imaginepdf.com`. Enable
   **Enforce HTTPS** once the certificate provisions.
4. **DNS:** add a `CNAME` record `docs` → `<org>.github.io` at the
   imaginepdf.com DNS provider.

## Editing content

- Add a page: create `content/<section>/<page>.mdx` and add its slug to the
  section's `_meta.js`.
- Use [Nextra components](https://nextra.site/docs/built-ins) (e.g. `Callout`)
  by importing them from `nextra/components` at the top of the MDX file.
- Brand rule: always write **ImaginePDF** in user-facing copy — never
  "PDFCanva".
