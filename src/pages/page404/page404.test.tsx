import { screen, render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ThemeProvider } from '../../components/theme-context/theme-context';
import { Layout } from '../../components/Layout/Layout';
import { Home } from '../home/home';
import { About } from '../about/about';
import { Page404 } from '../page404/page404';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

describe('Page404', () => {
  it('renders 404 page on unknown route', () => {
    render(
      <ThemeProvider>
        <MemoryRouter initialEntries={['/some-non-existent-route']}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="*" element={<Page404 />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });
});
