import React, { useMemo, useState } from 'react';
import '../../styles/globals.css';
import './playground.css';
import CodeBlock from './CodeBlock';
import { Button } from '../button/button';
import { IconButton } from '../icon-button/icon-button';
import { Badge } from '../badge/badge';

type PropType = 'string' | 'number' | 'boolean' | 'select' | 'color' | 'object';

type PropDef = {
  name: string;
  type: PropType;
  options?: string[];
  default?: any;
};

type ComponentDef = {
  name: string;
  render: (props: any) => React.ReactElement;
  props: PropDef[];
};

const components: ComponentDef[] = [
  {
    name: 'Button',
    render: (p) => <Button {...p}>{p.children ?? 'Button'}</Button>,
    props: [
      { name: 'children', type: 'string', default: 'Button' },
      { name: 'variant', type: 'select', options: ['primary', 'ghost'], default: 'primary' },
      { name: 'disabled', type: 'boolean', default: false },
      { name: 'style', type: 'object', default: { padding: '8px' } },
    ],
  },
  {
    name: 'IconButton',
    render: (p) => <IconButton {...p} />,
    props: [
      { name: 'icon', type: 'string', default: 'plus' },
      { name: 'ariaLabel', type: 'string', default: 'icon button' },
    ],
  },
  {
    name: 'Badge',
    render: (p) => <Badge {...p}>{p.children ?? 'Badge'}</Badge>,
    props: [
      { name: 'children', type: 'string', default: '1' },
      { name: 'color', type: 'color', default: '#ef4444' },
    ],
  },
];

function formatPropValue(p: PropDef, v: any) {
  if (p.type === 'string' || p.type === 'select' || p.type === 'color') return `"${String(v)}"`;
  if (p.type === 'number') return `{${Number(v)}}`;
  if (p.type === 'boolean') return `{${v ? 'true' : 'false'}}`;
  if (p.type === 'object') return `{${JSON.stringify(v)}}`;
  return `"${String(v)}"`;
}

export default function Playground() {
  const [selected, setSelected] = useState(components[0]?.name ?? 'Button');
  const comp = components.find((c) => c.name === selected)!;
  const initialProps = useMemo(() => {
    const obj: Record<string, any> = {};
    comp.props.forEach((p) => (obj[p.name] = p.default));
    return obj;
  }, [comp.name]);

  const [props, setProps] = useState<Record<string, any>>(initialProps);
  const [themeDark, setThemeDark] = useState(false);
  const [objErrors, setObjErrors] = useState<Record<string, string>>({});

  React.useEffect(() => {
    setProps(initialProps);
  }, [initialProps]);

  React.useEffect(() => {
    document.documentElement.dataset.theme = themeDark ? 'dark' : 'light';
  }, [themeDark]);

  const jsx = useMemo(() => {
    const propString = comp.props
      .filter((p) => p.name !== 'children')
      .map((p) => `${p.name}=${formatPropValue(p, props[p.name])}`)
      .join(' ');

    const children = props['children'] ?? '';
    return `<${comp.name} ${propString}>${children}</${comp.name}>`;
  }, [comp, props]);

  return (
    <div className="pg-root" role="region" aria-label="Component playground">
      <div className="pg-panel pg-controls" aria-label="Controls">
        <div>
          <label style={{ fontSize: 12, color: 'var(--pg-muted)' }}>Component</label>
          <select value={selected} onChange={(e) => setSelected(e.target.value)}>
            {components.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div
          style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'space-between' }}
        >
          <label style={{ fontSize: 12, color: 'var(--pg-muted)' }}>Theme</label>
          <div>
            <button
              onClick={() => setThemeDark(false)}
              aria-pressed={!themeDark}
              style={{ marginRight: 8 }}
            >
              Light
            </button>
            <button onClick={() => setThemeDark(true)} aria-pressed={themeDark}>
              Dark
            </button>
          </div>
        </div>

        <div style={{ marginTop: 8 }}>
          <div style={{ fontSize: 12, color: 'var(--pg-muted)', marginBottom: 6 }}>Props</div>
          {comp.props.map((p) => (
            <div key={p.name} className="pg-control" style={{ marginBottom: 8 }}>
              <label>{p.name}</label>
              {p.type === 'string' && (
                <input
                  value={props[p.name] ?? ''}
                  onChange={(e) => setProps((s) => ({ ...s, [p.name]: e.target.value }))}
                />
              )}
              {p.type === 'number' && (
                <input
                  type="number"
                  value={props[p.name] ?? 0}
                  onChange={(e) => setProps((s) => ({ ...s, [p.name]: Number(e.target.value) }))}
                />
              )}
              {p.type === 'boolean' && (
                <input
                  type="checkbox"
                  checked={!!props[p.name]}
                  onChange={(e) => setProps((s) => ({ ...s, [p.name]: e.target.checked }))}
                />
              )}
              {p.type === 'select' && (
                <select
                  value={props[p.name]}
                  onChange={(e) => setProps((s) => ({ ...s, [p.name]: e.target.value }))}
                >
                  {p.options!.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              )}
              {p.type === 'color' && (
                <input
                  type="color"
                  value={props[p.name] ?? '#000000'}
                  onChange={(e) => setProps((s) => ({ ...s, [p.name]: e.target.value }))}
                />
              )}
              {p.type === 'object' && (
                <>
                  <textarea
                    value={JSON.stringify(props[p.name] ?? {}, null, 2)}
                    onChange={(e) => {
                      const raw = e.target.value;
                      try {
                        const parsed = raw.trim() ? JSON.parse(raw) : {};
                        setProps((s) => ({ ...s, [p.name]: parsed }));
                        setObjErrors((errs) => ({ ...errs, [p.name]: '' }));
                      } catch (err: any) {
                        setObjErrors((errs) => ({ ...errs, [p.name]: err.message }));
                      }
                    }}
                  />
                  {objErrors[p.name] && <div className="error">{objErrors[p.name]}</div>}
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="pg-panel">
        <div className="pg-toolbar" style={{ marginBottom: 8 }}>
          <button onClick={() => navigator.clipboard?.writeText(jsx)}>Copy JSX</button>
        </div>

        <div className="pg-preview">
          <div style={{ minWidth: 120 }}>{comp.render(props)}</div>
        </div>
      </div>

      <div className="pg-panel pg-code">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 600 }}>JSX Preview</div>
        </div>
        <CodeBlock code={jsx} language="tsx" />
      </div>
    </div>
  );
}
