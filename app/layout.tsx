import type { Metadata } from 'next'
import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'

export const metadata: Metadata = {
  title: {
    default: 'ImaginePDF Docs',
    template: '%s – ImaginePDF Docs',
  },
  description:
    'Design business documents once in ImaginePDF, then generate them by the thousand — via the visual editor, the REST API, or Claude Code.',
  metadataBase: new URL('https://docs.imaginepdf.com'),
  icons: { icon: '/icon.svg' },
}

const logo = (
  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/icon.svg" alt="" width={26} height={26} />
    <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: '-0.02em' }}>
      Imagine<span style={{ color: '#F43F5E' }}>PDF</span>
    </span>
  </span>
)

const navbar = (
  <Navbar
    logo={logo}
    projectLink="https://github.com/imaginepdf/imaginepdf-docs"
  />
)

const footer = (
  <Footer>
    <span>
      {/* Brand: always "ImaginePDF" in user-facing copy. */}
      © {new Date().getFullYear()} ImaginePDF ·{' '}
      <a href="https://imaginepdf.com" style={{ textDecoration: 'underline' }}>
        imaginepdf.com
      </a>
    </span>
  </Footer>
)

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head>
        <meta name="theme-color" content="#4F46E5" />
      </Head>
      <body>
        <Layout
          navbar={navbar}
          footer={footer}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/imaginepdf/imaginepdf-docs/tree/main"
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          editLink="Edit this page on GitHub"
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
