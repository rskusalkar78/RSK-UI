import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from './providers/theme-provider';
import { useTheme } from './hooks/use-theme';
import { ThemeToggle } from './components/theme-toggle/theme-toggle';
import './styles/globals.css';

function App() {
  const { theme, resolvedTheme, systemTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background text-foreground transition-colors duration-300">
      <div className="max-w-md w-full p-8 rounded-2xl border border-border bg-card shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-indigo-400 bg-clip-text text-transparent">
            rsk-ui
          </h1>
          <ThemeToggle variant="dropdown" size="md" />
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed">
          Production-ready theme engine with no-flash loading, system preference detection, and
          localStorage persistence.
        </p>

        {/* Toggle variants */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Toggle Variants
          </p>
          <div className="flex items-center gap-3">
            <ThemeToggle variant="icon" size="sm" />
            <span className="text-xs text-muted-foreground">Icon (binary)</span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle variant="cycle" size="sm" />
            <span className="text-xs text-muted-foreground">Cycle (3-way)</span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle variant="dropdown" size="sm" />
            <span className="text-xs text-muted-foreground">Dropdown (explicit)</span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle variant="icon" size="sm" showLabel />
            <span className="text-xs text-muted-foreground">Icon with label</span>
          </div>
        </div>

        {/* Status */}
        <div className="pt-4 border-t border-border grid grid-cols-3 gap-2 text-xs text-muted-foreground">
          <div className="space-y-0.5">
            <p className="text-[10px] font-semibold uppercase tracking-wider">Preference</p>
            <p className="font-semibold capitalize text-foreground">{theme}</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-[10px] font-semibold uppercase tracking-wider">Resolved</p>
            <p className="font-semibold capitalize text-foreground">{resolvedTheme}</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-[10px] font-semibold uppercase tracking-wider">System</p>
            <p className="font-semibold capitalize text-foreground">{systemTheme}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Failed to find the root element');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
