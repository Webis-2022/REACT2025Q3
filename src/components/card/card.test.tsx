import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card } from './card';

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
