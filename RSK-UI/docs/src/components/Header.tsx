import React from 'react'
import ThemeToggle from './ThemeToggle'
import Search from './Search'

export default function Header() {
  return (
    <header className="docs-header">
      <div className="docs-brand">RSK UI</div>
      <Search />
      <div className="docs-header-actions">
        <ThemeToggle />
      </div>
    </header>
  )
}
