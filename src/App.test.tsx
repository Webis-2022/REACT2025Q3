import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { App } from './App';

type Character = { name: string };

const mockFunction = (res: Character[] = [{ name: '' }]) => {
  return vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({ results: res, count: res.length }),
  });
};

// const mockFunctionWithDelay = (delay = 50) =>
//   vi.fn().mockImplementation(() => {
//     new Promise((resolve) => {
//       setTimeout(() => {
//         resolve({
//           ok: true,
//           status: 200,
//           json: Promise.resolve({ results: [{}] }),
//         });
//       }, delay);
//     });
//   });

describe('App', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('makes initial API call on component mount', () => {
    globalThis.fetch = mockFunction();
    render(<App />);
    expect(fetch).toHaveBeenCalledWith('https://swapi.py4e.com/api/people');
  });
  it('handles search term from localStorage on initial load', () => {
    const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
    render(<App />);
    expect(getItemSpy).toHaveBeenCalledTimes(2);
  });
  // it('manages loading states during API calls', async () => {
  //   globalThis.fetch = vi.fn().mockImplementationOnce(() => {
  //     new Promise((resolve) => {
  //       setTimeout(() => {
  //         resolve({
  //           ok: true,
  //           json: async () => ({ results: [{}] }),
  //         });
  //       }, 20);
  //     });
  //   });
  //   render(<App />);

  //   fireEvent.change(screen.getByRole('textbox'), {
  //     target: { value: 'Luke' },
  //   });
  //   fireEvent.click(screen.getByText('Search'));
  //   expect(screen.getByRole('status')).toBeInTheDocument();

  //   await waitFor(
  //     () => {
  //       expect(screen.queryByRole('status')).not.toBeInTheDocument();
  //     },
  //     { timeout: 2000 }
  //   );
  // });

  it('calls API with base url', () => {
    render(<App />);
    expect(fetch).toHaveBeenCalledWith(`https://swapi.py4e.com/api/people`);
  });
  it('calls API with search term', () => {
    render(<App />);
    const searchTerm = 'Luke';
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: searchTerm },
    });
    fireEvent.click(screen.getByText('Search'));
    expect(fetch).toHaveBeenCalledWith(
      `https://swapi.py4e.com/api/people/?search=${searchTerm}`
    );
  });
  it('calls API with no search term', () => {
    render(<App />);
    const searchTerm = ' ';
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: searchTerm },
    });
    fireEvent.click(screen.getByText('Search'));
    expect(fetch).toHaveBeenCalledWith(
      `https://swapi.py4e.com/api/people/?search=${searchTerm}`
    );
  });
  // it('handles successful API response correctly', async () => {
  //   globalThis.fetch = mockFunction([
  //     { name: 'Luke Skywalker' },
  //     { name: 'Darth Vader' },
  //   ]);
  //   render(<App />);

  //   await waitFor(() => {
  //     expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  //     expect(screen.getByText('Darth Vader')).toBeInTheDocument();
  //   });
  // });
});
