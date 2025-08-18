import { screen, render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CardList } from './card-list';
import { type Character } from './card-list.types';

describe('CardList', () => {
  it('renders correct number of items when data is provided', () => {
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
      },
    ];
    render(
      <CardList
        items={mockItems}
        isLoading={false}
        hasResults={true}
        error={null}
      />
    );
    const cards = screen.getAllByRole('listitem');
    expect(cards).toHaveLength(mockItems.length);
  });
  it('displays "no results" message when data array is empty', () => {
    const items: Character[] = [];
    render(
      <CardList
        items={items}
        isLoading={false}
        hasResults={false}
        error={null}
      />
    );
    const noResultsMessage = screen.getByText(/no results/i);
    expect(noResultsMessage).toBeInTheDocument();
  });
  it('shows loading state while fetching data', () => {
    const items: Character[] = [];
    render(
      <CardList
        items={items}
        isLoading={true}
        hasResults={false}
        error={null}
      />
    );
    const loader = screen.getByRole('status', { name: /loading/i });
    expect(loader).toBeInTheDocument();
  });
  it('сorrectly displays item names and descriptions', () => {
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
      },
    ];
    render(
      <CardList
        items={mockItems}
        isLoading={false}
        hasResults={false}
        error={null}
      />
    );
    const name = screen.getByText(/luke skywalker/i);
    expect(name).toBeInTheDocument();
    expect(
      screen.getByText(
        /Male, 172 cm, 77 kg, born 19BBY, blond hair, blue eyes, fair skin/i
      )
    ).toBeInTheDocument();
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
      },
    ];

    render(
      <CardList
        items={mockItems}
        isLoading={false}
        hasResults={true}
        error={null}
      />
    );
    expect(screen.getByText(/unknown hero/i)).toBeInTheDocument();
    const unknownElements = screen.getAllByText(/unknown|n\/a|—/i);
    expect(unknownElements.length).toBeGreaterThan(0);
  });
  it('displays error message when API call fails', () => {
    render(
      <CardList
        items={[]}
        isLoading={false}
        hasResults={false}
        error={"Error: Failed to execute 'json'"}
      />
    );
    expect(
      screen.getByText(/Error: Failed to execute 'json'/)
    ).toBeInTheDocument();
  });
  describe('CardList', () => {
    it('shows/hides based on loading prop', () => {
      render(
        <CardList items={[]} isLoading={true} hasResults={true} error={null} />
      );
      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });
});
