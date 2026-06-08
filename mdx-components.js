import { useMDXComponents as getDocsMDXComponents } from 'nextra-theme-docs'

// Nextra 4 requires a root-level mdx-components file. Merge the docs theme's
// MDX components with any per-page overrides.
export function useMDXComponents(components) {
  return {
    ...getDocsMDXComponents(),
    ...components,
  }
}
