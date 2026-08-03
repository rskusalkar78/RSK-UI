import React from 'react'
import CodeBlock from '../components/CodeBlock'

export default function GettingStarted() {
  const code = `npm install rsk-ui`
  return (
    <article>
      <h1>Getting Started</h1>
      <p>Quick start guide for RSK UI.</p>
      <h2>Install</h2>
      <CodeBlock code={code} language="bash" />
    </article>
  )
}
