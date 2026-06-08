import nextra from 'nextra'

const withNextra = nextra({
  // Nextra 4 reads theme config from app/layout.tsx, not here.
})

export default withNextra({
  // Static HTML export — GitHub Pages serves the `out/` directory directly.
  output: 'export',
  // Required for `output: 'export'` (no Next.js image optimization server).
  images: { unoptimized: true },
  // Served from a custom domain at the root, so no basePath/assetPrefix needed.
})
