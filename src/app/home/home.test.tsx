import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { vi, expect, describe, beforeEach, afterEach, it } from 'vitest';
import { store } from '../../store/index';
import * as api from '../../services/api';
import { Home } from '../page';

vi.mock('../../services/api', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../services/api')>();
  return {
    ...actual,
    useLazyGetCharactersQuery: vi.fn().mockReturnValue([
      vi.fn(),
      {
        data: undefined,
        error: undefined,
        isLoading: false,
        isFetching: false,
        isSuccess: false,
        isError: false,
        refetch: vi.fn(),
        currentData: undefined,
        isUninitialized: true,
        status: 'uninitialized',
        reset: vi.fn(),
      },
      {
        lastArg: undefined,
      },
    ]),
  };
});

const mockUseLazyGetCharactersQuery = vi.mocked(api.useLazyGetCharactersQuery);

describe('Home page', () => {
  const mockData = {
    results: [{ name: 'Luke Skywalker' }],
    count: 1,
    next: null,
    previous: null,
  };

  beforeEach(() => {
    const triggerMock = vi.fn().mockResolvedValue({ data: mockData });

    mockUseLazyGetCharactersQuery.mockReturnValue([
      triggerMock,
      {
        data: mockData,
        error: undefined,
        isLoading: false,
        isFetching: false,
        isSuccess: true,
        isError: false,
        refetch: vi.fn(),
        currentData: mockData,
        isUninitialized: false,
        status: 'fulfilled',
        reset: vi.fn(),
      },
      {
        lastArg: { search: '' },
      },
    ]);

    Storage.prototype.getItem = vi.fn(() => null);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderHome = () =>
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

  it('renders without crashing', () => {
    renderHome();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('calls API on initial render', async () => {
    renderHome();
    await waitFor(() => {
      const [trigger] = mockUseLazyGetCharactersQuery.mock.results[0].value;
      expect(trigger).toHaveBeenCalledWith({ search: '' });
    });
  });

  it('shows loading state', async () => {
    mockUseLazyGetCharactersQuery.mockReturnValue([
      vi.fn(),
      {
        data: undefined,
        error: undefined,
        isLoading: true,
        isFetching: true,
        isSuccess: false,
        isError: false,
        refetch: vi.fn(),
        currentData: undefined,
        isUninitialized: false,
        status: 'pending',
        reset: vi.fn(),
      },
      {
        lastArg: { search: '' },
      },
    ]);

    renderHome();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('shows error message', async () => {
    mockUseLazyGetCharactersQuery.mockReturnValue([
      vi.fn(),
      {
        data: undefined,
        error: { status: 404, data: { detail: 'Not found' } },
        isLoading: false,
        isFetching: false,
        isSuccess: false,
        isError: true,
        refetch: vi.fn(),
        currentData: undefined,
        isUninitialized: false,
        status: 'rejected',
        reset: vi.fn(),
      },
      {
        lastArg: { search: 'invalid' },
      },
    ]);

    renderHome();

    await waitFor(() => {
      expect(screen.getByText(/no results/i)).toBeInTheDocument();
    });
  });

  it('handles search correctly', async () => {
    const triggerMock = vi.fn().mockResolvedValue({ data: mockData });
    mockUseLazyGetCharactersQuery.mockReturnValue([
      triggerMock,
      {
        data: mockData,
        error: undefined,
        isLoading: false,
        isFetching: false,
        isSuccess: true,
        isError: false,
        refetch: vi.fn(),
        currentData: mockData,
        isUninitialized: false,
        status: 'fulfilled',
        reset: vi.fn(),
      },
      {
        lastArg: { search: 'Luke' },
      },
    ]);

    renderHome();

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Luke' },
    });

    fireEvent.click(screen.getByText(/search/i));

    await waitFor(() => {
      expect(triggerMock).toHaveBeenCalledWith({ search: 'Luke' });
    });
  });
});
