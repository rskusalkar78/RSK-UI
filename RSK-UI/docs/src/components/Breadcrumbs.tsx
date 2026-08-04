import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Breadcrumbs() {
  const loc = useLocation()
  const parts = loc.pathname.split('/').filter(Boolean)

  return (
    <nav aria-label="Breadcrumbs" className="docs-breadcrumbs">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {parts.map((p, i) => {
          const to = '/' + parts.slice(0, i + 1).join('/')
          const label = p.replace(/-/g, ' ')
          return (
            <li key={to} aria-current={i === parts.length - 1 ? 'page' : undefined}>
              <Link to={to}>{label}</Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
