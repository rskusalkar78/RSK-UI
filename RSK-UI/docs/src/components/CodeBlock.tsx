import React, { useEffect, useRef } from 'react'
import Prism from 'prismjs'
import 'prismjs/themes/prism.css'

type Props = { code: string; language?: string }

export default function CodeBlock({ code, language = 'tsx' }: Props) {
  const ref = useRef<HTMLPreElement | null>(null)

  useEffect(() => {
    if (ref.current) Prism.highlightElement(ref.current)
  }, [code, language])

  return (
    <pre className={`language-${language}`}>
      <code ref={ref} className={`language-${language}`}>
        {code}
      </code>
    </pre>
  )
}
