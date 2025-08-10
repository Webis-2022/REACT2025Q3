import { render, screen } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
vi.mock('../../utils/downloadFile', async () => {
  const originalModule = await vi.importActual('../../utils/downloadFile');
  return {
    ...originalModule,
    downloadFile: vi.fn(),
  };
});

import { downloadFile } from '../../utils/downloadFile';
import { SelectedItemsPanel } from './selected-items-panel';

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

  it('dispatches clear action when unselect button clicked', async () => {
    const store = createTestStore([1]);
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <SelectedItemsPanel itemArrLength={1} />
      </Provider>
    );

    const unselectBtn = screen.getByRole('button', { name: /unselect/i });
    await user.click(unselectBtn);

    expect(mockDispatch).toHaveBeenCalled();
  });
  it('function downloadFile called when download button clicked', async () => {
    const store = createTestStore([1]);
    render(
      <Provider store={store}>
        <SelectedItemsPanel itemArrLength={1} />
      </Provider>
    );
    const user = userEvent.setup();
    const btn = screen.getByText(/download/i);
    expect(btn).toBeInTheDocument();
    await user.click(btn);
    expect(downloadFile).toHaveBeenCalled();
  });
});
