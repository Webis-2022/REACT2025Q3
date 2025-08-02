import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App.tsx';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/index.ts';
import { ErrorBoundary } from './components/error-boundary/error-boundary.tsx';

const rootEl = document.getElementById('root');
if (rootEl) {
  createRoot(rootEl).render(
    <StrictMode>
      <HashRouter>
        <Provider store={store}>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </Provider>
      </HashRouter>
    </StrictMode>
  );
}
