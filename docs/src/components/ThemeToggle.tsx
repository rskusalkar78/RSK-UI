import React, { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.dataset.theme === 'dark')

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
  }, [dark])

  return (
    <button onClick={() => setDark((s) => !s)} aria-pressed={dark} className="theme-toggle">
      {dark ? '🌙' : '☀️'}
    </button>
  )
}
