import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { Home } from '../home/home';

type Character = { name: string };

const mockFunction = (res: Character[] = [{ name: '' }]) => {
  return vi.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({ results: res, count: res.length }),
  });
};

describe('App', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('makes initial API call on component mount', () => {
    globalThis.fetch = mockFunction();
    render(<Home />);
    expect(fetch).toHaveBeenCalledWith('https://swapi.py4e.com/api/people');
  });
  it('handles search term from localStorage on initial load', () => {
    const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
    render(<Home />);
    expect(getItemSpy).toHaveBeenCalledTimes(2);
  });
  it('manages loading states during API calls', async () => {
    globalThis.fetch = vi.fn().mockImplementationOnce(() => {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            ok: true,
            json: async () => ({ results: [{}] }),
          });
        }, 20);
      });
    });
    render(<Home />);

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Luke' },
    });
    fireEvent.click(screen.getByText('Search'));
    expect(screen.getByRole('status')).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.queryByRole('status')).not.toBeInTheDocument();
      },
      { timeout: 2000 }
    );
  });

  beforeEach(() => {
    const mockResponse: Response = {
      ok: true,
      status: 200,
      statusText: 'OK',
      headers: new Headers(),
      json: () => Promise.resolve({ results: [], count: 0 }),
      redirected: false,
      type: 'basic',
      url: '',
      clone: function () {
        return this;
      },
      body: null,
      bodyUsed: false,
      arrayBuffer: function () {
        return Promise.resolve(new ArrayBuffer(0));
      },
      blob: function () {
        return Promise.resolve(new Blob());
      },
      formData: function () {
        return Promise.resolve(new FormData());
      },
      text: function () {
        return Promise.resolve('');
      },
      bytes: function (): Promise<Uint8Array> {
        throw new Error('Function not implemented.');
      },
    };

    globalThis.fetch = vi.fn(() => Promise.resolve(mockResponse));

    Storage.prototype.getItem = vi.fn(() => null);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should call base API URL on initial load', async () => {
    render(<Home />);

    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledWith(
        'https://swapi.py4e.com/api/people'
      );
    });
  });

  it('calls API with search term', () => {
    render(<Home />);
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
    render(<Home />);
    const searchTerm = ' ';
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: searchTerm },
    });
    fireEvent.click(screen.getByText('Search'));
    expect(fetch).toHaveBeenCalledWith(
      `https://swapi.py4e.com/api/people/?search=${searchTerm}`
    );
  });
});
