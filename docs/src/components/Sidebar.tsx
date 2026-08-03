import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const items = [
  { to: '/', label: 'Home' },
  { to: '/getting-started', label: 'Getting Started' },
  { to: '/installation', label: 'Installation' },
  { to: '/theming', label: 'Theming' },
  { to: '/components', label: 'Components' },
  { to: '/hooks', label: 'Hooks' },
  { to: '/icons', label: 'Icons' },
  { to: '/examples', label: 'Examples' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contributing', label: 'Contributing' },
  { to: '/roadmap', label: 'Roadmap' },
  { to: '/changelog', label: 'Changelog' }
]

export default function Sidebar() {
  const [open, setOpen] = useState(true)

  return (
    <aside className={`docs-sidebar ${open ? 'open' : 'closed'}`} aria-label="Sidebar navigation">
      <button className="sidebar-toggle" onClick={() => setOpen(!open)} aria-expanded={open}>
        ☰
      </button>
      <nav>
        <ul>
          {items.map((it) => (
            <li key={it.to}>
              <Link to={it.to}>{it.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
