import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card } from './card';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { DetailsWindow } from '../details-window/details-window';
import { useState } from 'react';
import type { Character } from '../card-list/card-list.types';
import { Provider } from 'react-redux';
import { store } from '../../store';

describe('Card', () => {
  it('opens DetailsWindow and displays character details', async () => {
    const WrapperComponent = () => {
      const [selectedCharacter, setSelectedCharacter] =
        useState<Character | null>(null);

      return (
        <Provider store={store}>
          <MemoryRouter>
            <Card
              key={0}
              character={{
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
              imgUrl="http://localhost:5173/REACT2025Q3/images/1.jpg"
              onSelect={setSelectedCharacter}
              index={0}
            />
            {selectedCharacter && (
              <DetailsWindow
                data={selectedCharacter}
                onClose={() => setSelectedCharacter(null)}
              />
            )}
          </MemoryRouter>
        </Provider>
      );
    };

    render(<WrapperComponent />);
    const user = userEvent.setup();

    const nameElement = screen.getByText('Luke Skywalker');
    await user.click(nameElement);

    expect(screen.getByText(/172/)).toBeInTheDocument();
    expect(screen.getByText(/male/i)).toBeInTheDocument();
  });
});
