import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App.tsx';
import { HashRouter } from 'react-router-dom';

const rootEl = document.getElementById('root');
if (rootEl) {
  createRoot(rootEl).render(
    <StrictMode>
      <HashRouter basename="/REACT2025Q3/">
        <App />
      </HashRouter>
    </StrictMode>
  );
}
