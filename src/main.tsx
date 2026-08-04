import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from './providers/theme-provider';
import { Homepage } from './homepage';
import './styles/globals.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Failed to find the root element');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <Homepage />
    </ThemeProvider>
  </React.StrictMode>
);
