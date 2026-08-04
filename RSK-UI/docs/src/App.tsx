import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import GettingStarted from './pages/GettingStarted'
import Installation from './pages/Installation'
import Theming from './pages/Theming'
import ComponentsPage from './pages/Components'
import Hooks from './pages/Hooks'
import Icons from './pages/Icons'
import Examples from './pages/Examples'
import FAQ from './pages/FAQ'
import Contributing from './pages/Contributing'
import Roadmap from './pages/Roadmap'
import Changelog from './pages/Changelog'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="getting-started" element={<GettingStarted />} />
        <Route path="installation" element={<Installation />} />
        <Route path="theming" element={<Theming />} />
        <Route path="components" element={<ComponentsPage />} />
        <Route path="hooks" element={<Hooks />} />
        <Route path="icons" element={<Icons />} />
        <Route path="examples" element={<Examples />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="contributing" element={<Contributing />} />
        <Route path="roadmap" element={<Roadmap />} />
        <Route path="changelog" element={<Changelog />} />
      </Route>
    </Routes>
  )
}
