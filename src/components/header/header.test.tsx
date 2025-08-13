import { screen, render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Header } from './header';
import { ThemeProvider } from '../theme-context/theme-context';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { userEvent } from '@testing-library/user-event';
import { Layout } from '../Layout/Layout';
import { Home } from '../../pages/home/home';
import { About } from '../../pages/about/about';
import { Page404 } from '../../pages/page404/page404';
import { Provider } from 'react-redux';
import { store } from '../../store';

describe('Header', () => {
  it('header exists', () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </ThemeProvider>
    );
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });
  it('header has select input, title and navigation menu', () => {
    render(
      <ThemeProvider>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </ThemeProvider>
    );
    expect(screen.getByTestId('select-input')).toBeInTheDocument();
    expect(screen.getByText('Find Your Star Wars Hero')).toBeInTheDocument();
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/about/i)).toBeInTheDocument();
  });
  it('can switch on the dark theme', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <MemoryRouter>
          <Layout />
        </MemoryRouter>
      </ThemeProvider>
    );
    const selectInputs = screen.getAllByTestId('select-input');
    const themeSelect = selectInputs[0];
    await user.selectOptions(themeSelect, screen.getByText('Dark'));
    expect(screen.getByTestId('layout')).toHaveClass('dark-theme');
  });
  it('opens the About page when About link is clicked', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <ThemeProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="*" element={<Page404 />} />
              </Route>
            </Routes>
          </ThemeProvider>
        </Provider>
      </MemoryRouter>
    );

    const aboutLink = screen.getByText('About');
    await user.click(aboutLink);

    expect(screen.getByText(/created by student/i)).toBeInTheDocument();
  });
});
