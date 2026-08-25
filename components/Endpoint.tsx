/**
 * The method + path banner that opens every endpoint section.
 *
 * Replaces a bare ```` ``` POST /designs ``` ```` fence. A fence renders as a
 * code BLOCK — the same weight as the request bodies below it — so on a page
 * with six endpoints nothing announces where one ends and the next begins.
 * This gives the verb its own coloured pill and sets the path in mono at
 * heading weight, which is the convention every API reference a reader has
 * already used follows.
 *
 * Verb colour carries meaning: read is quiet, write is brand, destructive is
 * danger. GET stays neutral precisely because it is the safe one — a page of
 * uniformly loud pills teaches nothing.
 *
 * Registered globally in mdx-components.js, so MDX pages use it without an
 * import.
 */

type Method = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'

const METHOD_COLOR: Record<Method, { fg: string; bg: string; bd: string }> = {
  GET: { fg: 'var(--ink-body)', bg: 'var(--sunken)', bd: 'var(--line-strong)' },
  POST: { fg: '#fff', bg: 'var(--brand)', bd: 'var(--brand)' },
  PATCH: { fg: 'var(--warning-ink)', bg: 'var(--warning-tint)', bd: 'var(--warning-line)' },
  PUT: { fg: 'var(--warning-ink)', bg: 'var(--warning-tint)', bd: 'var(--warning-line)' },
  DELETE: { fg: '#fff', bg: 'var(--danger, #8e1b12)', bd: 'var(--danger, #8e1b12)' },
}

interface Props {
  method: Method
  /** Path relative to the API base, e.g. `/designs/:id/tree`. */
  path: string
  /** Overrides the default `https://api.imaginepdf.com/api/v1` prefix label. */
  base?: string
}

export function Endpoint({ method, path, base = '/api/v1' }: Props) {
  const c = METHOD_COLOR[method]
  return (
    <div className="ip-endpoint">
      <span
        className="ip-endpoint-method"
        style={{ color: c.fg, background: c.bg, borderColor: c.bd }}
      >
        {method}
      </span>
      <span className="ip-endpoint-path">
        <span className="ip-endpoint-base">{base}</span>
        {path}
      </span>
    </div>
  )
}

export default Endpoint
