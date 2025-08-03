import { screen, render } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Layout } from '../Layout/Layout';
import { userEvent } from '@testing-library/user-event';
import { ThemeProvider } from '../theme-context/theme-context';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Home } from '../../pages/home/home';
import { About } from '../../pages/about/about';
import { Page404 } from '../../pages/page404/page404';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { downloadFile } from './selected-items-panel';

describe('SelectedItemsPanel', () => {
  beforeEach(() => {
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
  });

  it('panel exists on the page after selecting any character using checkbox', async () => {
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

    const character = await screen.findByText(/luke/i);
    expect(character).toBeInTheDocument();

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(screen.getByTestId('panel-container')).toBeInTheDocument();
  });
  it('checkbox is unchecked after Unselect button clicking', async () => {
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
    const unselectButton = screen.getByText(/unselect/i);
    await user.click(unselectButton);
    expect(checkbox).not.toBeChecked();
  });
  it('triggers file download with correct content and name', () => {
    const mockCreateObjectURL = vi.fn(() => 'blob:http://localhost/fake-url');
    const mockRevokeObjectURL = vi.fn();
    const mockClick = vi.fn();

    vi.stubGlobal('URL', {
      createObjectURL: mockCreateObjectURL,
      revokeObjectURL: mockRevokeObjectURL,
    });

    const mockLink = {
      href: '',
      download: '',
      click: mockClick,
    };

    vi.spyOn(document, 'createElement').mockReturnValue(
      mockLink as unknown as HTMLAnchorElement
    );

    downloadFile(
      [1],
      [
        {
          name: 'Luke Skywalker',
          height: '172',
          mass: '77',
          hair_color: 'blond',
          skin_color: 'fair',
          eye_color: 'blue',
          birth_year: '19BBY',
          gender: 'male',
          url: '',
        },
      ]
    );

    expect(mockCreateObjectURL).toHaveBeenCalled();
    expect(mockLink.download).toMatch(/items\.csv$/);
    expect(mockClick).toHaveBeenCalled();
    expect(mockRevokeObjectURL).toHaveBeenCalledWith(
      'blob:http://localhost/fake-url'
    );
  });
});
