import { screen, render } from '@testing-library/react';
import { describe, it, expect, vi, type Mock, beforeEach } from 'vitest';
import { CardList } from './card-list';
import { type Character } from './card-list.types';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { MyContext } from '../../pages/home/home';
import * as api from '../../services/api';

vi.mock('../../services/api', async () => {
  const originalModule = await vi.importActual('../../services/api');
  return {
    ...originalModule,
    useGetCharactersQuery: vi.fn(),
  };
});

const mockItems: Character[] = [
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
  {
    name: 'Leia Organa',
    height: '150',
    mass: '49',
    hair_color: 'brown',
    skin_color: 'light',
    eye_color: 'brown',
    birth_year: '19BBY',
    gender: 'female',
    url: '',
  },
];

describe('CardList', () => {
  beforeEach(() => {
    (api.useGetCharactersQuery as Mock).mockClear();
  });
  it('renders correct number of items when data is provided', () => {
    (api.useGetCharactersQuery as Mock).mockReturnValue({
      data: { results: mockItems },
      isLoading: false,
      error: null,
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MyContext.Provider value={mockItems}>
            <CardList page={1} />
          </MyContext.Provider>
        </MemoryRouter>
      </Provider>
    );

    const cards = screen.getAllByTestId('card');
    expect(cards).toHaveLength(mockItems.length);
  });

  it('shows loading state while fetching data', () => {
    (api.useGetCharactersQuery as Mock).mockReturnValue({
      data: { results: mockItems },
      isLoading: true,
      error: null,
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CardList page={1} />
        </MemoryRouter>
      </Provider>
    );
    const loader = screen.getByRole('status', { name: /loading/i });
    expect(loader).toBeInTheDocument();
  });
  it('handles missing or undefined data gracefully', () => {
    const mockItems2 = [
      {
        name: 'Unknown Hero',
        height: undefined,
        mass: '',
        hair_color: null,
        skin_color: undefined,
        eye_color: '',
        birth_year: null,
        gender: 'Male',
        url: '',
      },
    ];
    (api.useGetCharactersQuery as Mock).mockReturnValue({
      data: { results: mockItems2 },
      isLoading: false,
      error: null,
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <CardList page={1} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/unknown hero/i)).toBeInTheDocument();
    const unknownElements = screen.getAllByText(/unknown|n\/a|—/i);
    expect(unknownElements.length).toBeGreaterThan(0);
  });
  it('displays error message when API call fails', () => {
    (api.useGetCharactersQuery as Mock).mockReturnValue({
      data: { results: mockItems },
      isLoading: false,
      error: { status: 404, data: {} },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MyContext.Provider value={mockItems}>
            <CardList page={1} />
          </MyContext.Provider>
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/404/)).toBeInTheDocument();
  });
  describe('CardList', () => {
    it('shows/hides based on loading prop', () => {
      (api.useGetCharactersQuery as unknown as Mock).mockReturnValue({
        data: undefined,
        isLoading: true,
        isFetching: false,
        error: null,
      });
      render(
        <Provider store={store}>
          <MemoryRouter>
            <MyContext.Provider value={mockItems}>
              <CardList page={1} />
            </MyContext.Provider>
          </MemoryRouter>
        </Provider>
      );
      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });
});
