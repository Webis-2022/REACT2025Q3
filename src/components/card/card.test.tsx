import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { Card } from './card';
import { DetailsWindow } from '../details-window/details-window';
import { store } from '../../store';
import { describe, expect, it, vi } from 'vitest';
import { useState } from 'react';
import type { Character } from '../card-list/card-list.types';

vi.mock('../../services/api', async (importOriginal) => {
  const actual =
    (await importOriginal()) as typeof import('../../services/api');
  return {
    ...actual,
    useGetCharactersQuery: vi.fn(() => ({
      data: {
        results: [
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
        ],
        next: null,
        previous: null,
      },
      error: null,
      isLoading: false,
    })),
  };
});

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
              imgUrl="test-image.jpg"
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
