import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const pages = [
  { path: '/', title: 'Home' },
  { path: '/getting-started', title: 'Getting Started' },
  { path: '/installation', title: 'Installation' },
  { path: '/theming', title: 'Theming' },
  { path: '/components', title: 'Components' },
  { path: '/hooks', title: 'Hooks' },
  { path: '/icons', title: 'Icons' },
  { path: '/examples', title: 'Examples' },
  { path: '/faq', title: 'FAQ' },
  { path: '/contributing', title: 'Contributing' },
  { path: '/roadmap', title: 'Roadmap' },
  { path: '/changelog', title: 'Changelog' }
]

export default function Search() {
  const [q, setQ] = useState('')

  const results = q
    ? pages.filter((p) => p.title.toLowerCase().includes(q.toLowerCase()))
    : []

  return (
    <div className="docs-search">
      <input
        aria-label="Search documentation"
        placeholder="Search..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      {results.length > 0 && (
        <ul className="search-results" role="listbox">
          {results.map((r) => (
            <li key={r.path} role="option">
              <Link to={r.path} onClick={() => setQ('')}>{r.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
