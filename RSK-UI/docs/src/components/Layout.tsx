import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import Breadcrumbs from './Breadcrumbs'

export default function Layout() {
  return (
    <div className="docs-root">
      <Header />
      <div className="docs-body">
        <Sidebar />
        <main className="docs-main">
          <Breadcrumbs />
          <div className="docs-content">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
