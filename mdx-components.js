import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs'
import { Endpoint } from './components/Endpoint'

// Nextra 4 requires a root-level mdx-components file. Merge the docs theme's
// MDX components with the site's own, then any per-page overrides.
//
// `Endpoint` is provided here rather than imported per page: it opens every
// endpoint section in the API reference, and an import line at the top of ten
// MDX files is ten places for it to drift.
export function useMDXComponents(components) {
  return {
    ...getDocsMDXComponents(),
    Endpoint,
    ...components,
  }
}
