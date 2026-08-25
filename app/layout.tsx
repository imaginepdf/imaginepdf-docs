import type { Metadata } from 'next'
import { Gabarito, Figtree } from 'next/font/google'
import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import './brand.css'

// The same two faces the marketing site loads (see
// imaginepdf-react-app/app/layout.tsx). Gabarito's variable cut covers 400-900
// in one file — smaller than the static 700 + 800 pair, and next/font
// self-hosts both, so there is no render-blocking round trip to Google.
const gabarito = Gabarito({
  variable: '--font-gabarito',
  subsets: ['latin'],
  display: 'swap',
})

const figtree = Figtree({
  variable: '--font-figtree',
  subsets: ['latin'],
  display: 'swap',
})

const DESCRIPTION =
  'Design business documents once in ImaginePDF, then generate them by the thousand — via the visual editor, the REST API, the hosted MCP server, or Claude Code.'

export const metadata: Metadata = {
  title: {
    default: 'ImaginePDF Docs',
    template: '%s – ImaginePDF Docs',
  },
  description: DESCRIPTION,
  metadataBase: new URL('https://docs.imaginepdf.com'),
  icons: {
    icon: '/icon.svg',
    apple: '/brand/mark-512.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'ImaginePDF Docs',
    title: 'ImaginePDF Docs',
    description: DESCRIPTION,
    url: 'https://docs.imaginepdf.com',
    images: [
      { url: '/brand/mark-512.png', width: 512, height: 512, alt: 'ImaginePDF' },
    ],
  },
  twitter: {
    card: 'summary',
    site: '@tryimaginepdf',
    title: 'ImaginePDF Docs',
    description: DESCRIPTION,
    images: ['/brand/mark-512.png'],
  },
}

/**
 * The lock-up, sized off the WORDMARK rather than the mark — Gabarito's
 * x-height is short, so a wordmark set to the same nominal size as the
 * neighbouring tile reads smaller than it measures. 30px mark / 1.28rem text
 * puts the cap height at roughly two-thirds of the tile, which is the `md`
 * ratio from assets/brand/README.md.
 *
 * The wordmark is live type, not an outlined SVG: selectable, crisp at any
 * size, and it can never drift from the type the marketing site sets. It is
 * lowercase as a VISUAL treatment only, which is why the accessible name on
 * the link says "ImaginePDF".
 */
const logo = (
  <span
    aria-label="ImaginePDF"
    style={{ display: 'flex', alignItems: 'center', gap: 10 }}
  >
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/brand/mark.svg" alt="" width={30} height={30} />
    {/* The wordmark drops below 480px. The navbar there is already carrying a
        search field, two actions and a hamburger, and the mark alone still
        identifies the brand — that is what the compact cut exists for. */}
    <span className="ip-wordmark">
      imagine<span style={{ color: 'var(--brand)' }}>pdf</span>
    </span>
  </span>
)

const navbar = (
  <Navbar
    logo={logo}
    logoLink="https://imaginepdf.com"
    projectLink="https://github.com/imaginepdf/claude-imaginepdf"
  >
    {/* Docs are a dead end without a route back into the product. These are the
        two things a reader arrives wanting: the editor, and a key. */}
    <a
      href="https://imaginepdf.com/dashboard"
      style={{
        fontSize: '0.875rem',
        fontWeight: 600,
        color: 'var(--ink-body)',
        whiteSpace: 'nowrap',
      }}
    >
      Dashboard
    </a>
    <a
      href="https://imaginepdf.com/register"
      style={{
        fontFamily: 'var(--font-display)',
        fontSize: '0.875rem',
        fontWeight: 700,
        color: '#fff',
        background: 'var(--brand)',
        padding: '0.4rem 0.85rem',
        borderRadius: 8,
        whiteSpace: 'nowrap',
      }}
    >
      Start free
    </a>
  </Navbar>
)

const FOOTER_LINKS: [string, string][] = [
  ['Product', 'https://imaginepdf.com'],
  ['Templates', 'https://imaginepdf.com/templates'],
  ['Pricing', 'https://imaginepdf.com/pricing'],
  ['Developer blog', 'https://imaginepdf.com/blog'],
  ['Claude Code plugin', 'https://github.com/imaginepdf/claude-imaginepdf'],
]

const footer = (
  <Footer>
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        width: '100%',
        fontSize: '0.875rem',
      }}
    >
      <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/mark.svg" alt="" width={20} height={20} />
        {/* Brand: always "ImaginePDF" in user-facing copy. */}
        <span style={{ color: 'var(--ink-muted)' }}>
          © {new Date().getFullYear()} ImaginePDF
        </span>
      </span>
      <span style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem' }}>
        {FOOTER_LINKS.map(([label, href]) => (
          <a key={href} href={href} style={{ color: 'var(--ink-body)' }}>
            {label}
          </a>
        ))}
      </span>
    </div>
  </Footer>
)

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${gabarito.variable} ${figtree.variable}`}
      suppressHydrationWarning
    >
      <Head
        color={{
          // Nextra paints the browser theme-color and its own accent from
          // these. Vermilion as hsl parts — see assets/brand/tokens.json.
          hue: 3,
          saturation: 72,
          lightness: { light: 45, dark: 66 },
        }}
        backgroundColor={{ light: '#fbf8f7', dark: '#181412' }}
      >
        <meta name="theme-color" content="#e8433a" />
      </Head>
      <body>
        <Layout
          navbar={navbar}
          footer={footer}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/imaginepdf/imaginepdf-docs/tree/main"
          sidebar={{ defaultMenuCollapseLevel: 1, autoCollapse: false }}
          editLink="Edit this page on GitHub"
          feedback={{ content: 'Question? Give us feedback', labels: 'documentation' }}
          toc={{ backToTop: 'Back to top' }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
