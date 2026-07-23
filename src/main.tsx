import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from './providers/theme-provider';
import { useTheme } from './hooks/use-theme';
import './styles/globals.css';

function App() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background text-foreground transition-colors duration-300">
      <div className="max-w-md w-full p-8 rounded-2xl border border-border bg-card shadow-2xl text-center space-y-6">
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-indigo-400 bg-clip-text text-transparent">
          rsk-ui Workspace
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Design system project architecture is successfully configured with React 19, TypeScript,
          Vite, and Tailwind CSS v4.
        </p>

        <div className="flex justify-center gap-2">
          {(['light', 'dark', 'system'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all duration-200 cursor-pointer capitalize ${
                theme === t
                  ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-105'
                  : 'bg-secondary text-secondary-foreground border-border hover:bg-muted'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="pt-4 border-t border-border flex justify-between text-xs text-muted-foreground">
          <span>
            Active Theme: <strong className="capitalize">{theme}</strong>
          </span>
          <span>
            Status: <strong className="text-emerald-500">Ready</strong>
          </span>
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
