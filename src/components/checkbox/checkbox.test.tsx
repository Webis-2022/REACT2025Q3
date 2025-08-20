import { screen, render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Checkbox } from './checkbox';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { Layout } from '../Layout/Layout';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { About } from '../../pages/about/about';
import { Home } from '../../pages/home/home';
import { Page404 } from '../../pages/page404/page404';
import { ThemeProvider } from '../theme-context/theme-context';
import userEvent from '@testing-library/user-event';

describe('Checkbox', () => {
  it('checkbox exists on the page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Checkbox index={2} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });
  it('user navigates to the next page, and then goes back, previously selected items should be shown', async () => {
    window.fetch = vi.fn(() => {
      return Promise.resolve(
        new Response(
          JSON.stringify({
            count: 1,
            next: null,
            previous: null,
            results: [
              {
                name: 'Luke Skywalker',
                birth_year: '19BBY',
                gender: 'male',
              },
            ],
          }),
          {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
      );
    });
    render(
      <ThemeProvider>
        <Provider store={store}>
          <MemoryRouter initialEntries={['/']}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="*" element={<Page404 />} />
              </Route>
            </Routes>
          </MemoryRouter>
        </Provider>
      </ThemeProvider>
    );
    const user = userEvent.setup();
    const input = screen.getByRole('textbox');
    const button = screen.getByText(/search/i);

    await user.type(input, 'Luke');
    await user.click(button);
    const checkbox = await screen.findByRole('checkbox');
    await user.click(checkbox);
    const aboutPageLink = screen.getByText(/about/i);
    await user.click(aboutPageLink);
    const homePageLink = screen.getByText(/home/i);
    await user.click(homePageLink);
    expect(checkbox).toBeChecked();
  });
});
