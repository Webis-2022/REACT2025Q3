import { screen, render } from '@testing-library/react';
import { it, describe, expect, vi } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import { DetailsWindow } from './details-window';
import { mockCharacter } from '../card/card.types';
import { useState } from 'react';

describe('DetailsWindow', () => {
  it('character details are rendered', () => {
    render(
      <DetailsWindow
        data={{
          name: 'Luke Skywalker',
          height: '172',
          mass: '77',
          hair_color: 'blond',
          skin_color: 'fair',
          eye_color: 'blue',
          birth_year: '19BBY',
          gender: 'male',
          url: '',
        }}
        onClose={vi.fn()}
      />
    );
    expect(screen.getByText(/172/)).toBeInTheDocument();
    expect(screen.getByText(/fair/i)).toBeInTheDocument();
  });
  it('close button exists in the component', () => {
    render(<DetailsWindow data={mockCharacter} onClose={vi.fn()} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  it('if close button clicked then the component is closed', async () => {
    const Wrapper = () => {
      const [isOpen, setIsOpen] = useState(true);
      return isOpen ? (
        <DetailsWindow data={mockCharacter} onClose={() => setIsOpen(false)} />
      ) : null;
    };

    const user = userEvent.setup();
    render(<Wrapper />);
    const closeButton = screen.getByRole('button');
    await user.click(closeButton);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
