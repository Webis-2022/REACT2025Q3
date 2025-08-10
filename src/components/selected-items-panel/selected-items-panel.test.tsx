import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { SelectedItemsPanel } from './selected-items-panel';
import userEvent from '@testing-library/user-event';

const mockDispatch = vi.fn();

const createTestStore = (selectedIds: number[]) => ({
  ...configureStore({
    reducer: {
      characters: () => ({
        selectedIds,
        characters: [],
        status: 'idle',
        error: null,
      }),
    },
  }),
  dispatch: mockDispatch,
});

vi.mock('../../services/api', () => ({
  useGetCharactersQuery: () => ({
    data: { results: [{ name: 'Luke Skywalker' }] },
    isLoading: false,
    error: null,
  }),
}));

describe('SelectedItemsPanel', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it('shows panel when items are selected', () => {
    const store = createTestStore([1]);

    render(
      <Provider store={store}>
        <SelectedItemsPanel itemArrLength={1} />
      </Provider>
    );

    expect(screen.getByText(/selected/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /download/i })
    ).toBeInTheDocument();
  });

  it('dispatches clear action when clear button clicked', async () => {
    const store = createTestStore([1]);
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <SelectedItemsPanel itemArrLength={1} />
      </Provider>
    );

    const clearBtn = screen.getByRole('button', { name: /unselect/i });
    await user.click(clearBtn);

    expect(mockDispatch).toHaveBeenCalled();

    expect(mockDispatch.mock.calls[0][0].type).toContain('clear');
  });
});
