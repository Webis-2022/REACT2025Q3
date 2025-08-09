import { screen, render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CardList } from './card-list';
import { type Character } from './card-list.types';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { MyContext } from '../../pages/home/home';

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
  it('renders correct number of items when data is provided', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MyContext.Provider value={mockItems}>
            <CardList page={1} isLoading={false} error={null} />
          </MyContext.Provider>
        </MemoryRouter>
      </Provider>
    );

    const cards = screen.getAllByTestId('card');
    expect(cards).toHaveLength(mockItems.length);
  });
  it('displays "no results" message when data array is empty', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MyContext.Provider value={[]}>
            <CardList page={1} isLoading={false} error={null} />
          </MyContext.Provider>
        </MemoryRouter>
      </Provider>
    );
    const noResultsMessage = screen.getByText(/no results/i);
    expect(noResultsMessage).toBeInTheDocument();
  });
  it('shows loading state while fetching data', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MyContext.Provider value={mockItems}>
            <CardList page={1} isLoading={true} error={null} />
          </MyContext.Provider>
        </MemoryRouter>
      </Provider>
    );
    const loader = screen.getByRole('status', { name: /loading/i });
    expect(loader).toBeInTheDocument();
  });
  it('handles missing or undefined data gracefully', () => {
    const mockItems = [
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

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MyContext.Provider value={mockItems}>
            <CardList page={1} isLoading={false} error={null} />
          </MyContext.Provider>
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/unknown hero/i)).toBeInTheDocument();
    const unknownElements = screen.getAllByText(/unknown|n\/a|—/i);
    expect(unknownElements.length).toBeGreaterThan(0);
  });
  it('displays error message when API call fails', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MyContext.Provider value={mockItems}>
            <CardList
              page={1}
              isLoading={false}
              error={"Error: Failed to execute 'json'"}
            />
          </MyContext.Provider>
        </MemoryRouter>
      </Provider>
    );
    expect(
      screen.getByText(/Error: Failed to execute 'json'/)
    ).toBeInTheDocument();
  });
  describe('CardList', () => {
    it('shows/hides based on loading prop', () => {
      render(<CardList page={1} isLoading={true} error={null} />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });
});
