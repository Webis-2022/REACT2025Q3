// import { fireEvent, render, screen, waitFor } from '@testing-library/react';
// import {
//   describe,
//   it,
//   expect,
//   vi,
//   afterEach,
//   beforeEach,
//   type MockInstance,
// } from 'vitest';
// import { Home } from '../home/home';
// import { Provider } from 'react-redux';
// import { store } from '../../store';
// import { MemoryRouter } from 'react-router-dom';
// import * as api from '../../services/api';

// const mockUseGetCharactersQuery = vi.fn(() => ({
//   data: { results: [{ name: 'Luke Skywalker' }], count: 1 },
//   isLoading: false,
//   error: undefined,
//   refetch: vi.fn(),
//   isFetching: false,
//   isSuccess: true,
//   isError: false,
// }));

// describe('App', () => {
//   let spy: MockInstance;

//   beforeEach(() => {
//     spy = vi
//       .spyOn(api, 'useGetCharactersQuery')
//       .mockImplementation(mockUseGetCharactersQuery);
//   });

//   afterEach(() => {
//     vi.restoreAllMocks();
//   });

//   it('makes initial API call on component mount', () => {
//     render(
//       <Provider store={store}>
//         <MemoryRouter>
//           <Home />
//         </MemoryRouter>
//       </Provider>
//     );
//     expect(spy).toHaveBeenCalledWith(
//       expect.stringContaining('https://swapi.py4e.com/api/people')
//     );
//   });
//   it('handles search term from localStorage on initial load', () => {
//     const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
//     render(
//       <Provider store={store}>
//         <MemoryRouter>
//           <Home />
//         </MemoryRouter>
//       </Provider>
//     );
//     expect(getItemSpy).toHaveBeenCalledTimes(2);
//   });
//   it('manages loading states during API calls', async () => {
//     globalThis.fetch = vi.fn().mockImplementationOnce(() => {
//       new Promise((resolve) => {
//         setTimeout(() => {
//           resolve({
//             ok: true,
//             json: async () => ({ results: [{}] }),
//           });
//         }, 20);
//       });
//     });
//     render(
//       <Provider store={store}>
//         <MemoryRouter>
//           <Home />
//         </MemoryRouter>
//       </Provider>
//     );

//     fireEvent.change(screen.getByRole('textbox'), {
//       target: { value: 'Luke' },
//     });
//     fireEvent.click(screen.getByText('Search'));
//     expect(screen.getByRole('status')).toBeInTheDocument();

//     await waitFor(
//       () => {
//         expect(screen.queryByRole('status')).not.toBeInTheDocument();
//       },
//       { timeout: 2000 }
//     );
//   });

//   beforeEach(() => {
//     const mockResponse: Response = {
//       ok: true,
//       status: 200,
//       statusText: 'OK',
//       headers: new Headers(),
//       json: () => Promise.resolve({ results: [], count: 0 }),
//       redirected: false,
//       type: 'basic',
//       url: '',
//       clone: function () {
//         return this;
//       },
//       body: null,
//       bodyUsed: false,
//       arrayBuffer: function () {
//         return Promise.resolve(new ArrayBuffer(0));
//       },
//       blob: function () {
//         return Promise.resolve(new Blob());
//       },
//       formData: function () {
//         return Promise.resolve(new FormData());
//       },
//       text: function () {
//         return Promise.resolve('');
//       },
//       bytes: function (): Promise<Uint8Array> {
//         throw new Error('Function not implemented.');
//       },
//     };

//     globalThis.fetch = vi.fn(() => Promise.resolve(mockResponse));

//     Storage.prototype.getItem = vi.fn(() => null);
//   });

//   afterEach(() => {
//     vi.restoreAllMocks();
//   });

//   it('should call base API URL on initial load', async () => {
//     render(
//       <Provider store={store}>
//         <MemoryRouter>
//           <Home />
//         </MemoryRouter>
//       </Provider>
//     );

//     await waitFor(() => {
//       expect(spy).toHaveBeenCalledWith('https://swapi.py4e.com/api/people');
//     });
//   });

//   it('calls API with search term', async () => {
//     render(
//       <Provider store={store}>
//         <MemoryRouter>
//           <Home />
//         </MemoryRouter>
//       </Provider>
//     );

//     const searchTerm = 'Luke';
//     await waitFor(() => {
//       expect(screen.getByRole('textbox')).toHaveValue(searchTerm);
//     });
//     fireEvent.click(screen.getByText('Search'));

//     await waitFor(() => {
//       expect(spy).toHaveBeenCalledWith({
//         search: searchTerm,
//         page: 1,
//       });
//     });
//   });
//   it('calls API with no search term', () => {
//     render(
//       <Provider store={store}>
//         <MemoryRouter>
//           <Home />
//         </MemoryRouter>
//       </Provider>
//     );
//     const searchTerm = '';
//     fireEvent.change(screen.getByRole('textbox'), {
//       target: { value: searchTerm },
//     });
//     fireEvent.click(screen.getByText('Search'));
//     expect(spy).toHaveBeenCalledWith({
//       search: '',
//       page: 1,
//     });
//   });
// });

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { vi, expect, describe, beforeEach, afterEach, it } from 'vitest';
import { store } from '../../store/index';
import * as api from '../../services/api';
import { Home } from '../home/home';

vi.mock('../../services/api', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../services/api')>();
  return {
    ...actual,
    useLazyGetCharactersQuery: vi.fn().mockReturnValue([
      vi.fn(), // trigger function
      {
        // query result
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
        // lastPromiseInfo
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
      expect(screen.getByText(/error/i)).toBeInTheDocument();
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
