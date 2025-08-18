import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card } from './card';
import { mockCharacter } from './card.types';

describe('Card', () => {
  it('displays item name and description correctly', () => {
    render(
      <Card
        key={0}
        character={{
          name: 'Luke',
          height: '172',
          mass: '77',
          hair_color: 'blond',
          skin_color: 'fair',
          eye_color: 'blue',
          birth_year: '19BBY',
          gender: 'male',
        }}
        hasResults={false}
      />
    );
    expect(screen.getByText('Luke')).toBeInTheDocument();
    expect(screen.getByText(/172/)).toBeInTheDocument();
    expect(screen.getByText(/male/i)).toBeInTheDocument();
  });
  it('handles missing props gracefully', () => {
    render(<Card character={undefined} hasResults={undefined} />);
    expect(screen.getByText(/no data/i)).toBeInTheDocument();
    expect(screen.getByText(/unknown/i)).toBeInTheDocument();
  });
});

describe('Card', () => {
  it('displays all character info correctly', () => {
    render(<Card character={mockCharacter} />);

    expect(screen.getByText(/172 cm/)).toBeInTheDocument();
    expect(screen.getByText(/77 kg/)).toBeInTheDocument();
    expect(screen.getByText(/born 19BBY/)).toBeInTheDocument();
    expect(screen.getByText(/blond hair/)).toBeInTheDocument();
    expect(screen.getByText(/blue eyes/)).toBeInTheDocument();
    expect(screen.getByText(/fair skin/)).toBeInTheDocument();
  });

  it('handles undefined values', () => {
    render(
      <Card
        character={{
          ...mockCharacter,
          height: undefined,
          mass: undefined,
        }}
      />
    );

    expect(screen.getByText(/- cm/)).toBeInTheDocument();
    expect(screen.getByText(/- kg/)).toBeInTheDocument();
  });

  it('handles null values', () => {
    render(
      <Card
        character={{
          ...mockCharacter,
          birth_year: null,
          hair_color: null,
        }}
      />
    );

    expect(screen.getByText(/born Unknown/)).toBeInTheDocument();
    expect(screen.getByText(/Unknown hair/)).toBeInTheDocument();
  });
});
