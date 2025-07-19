import { screen, render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { App } from './App';

describe('App', () => {
  it('makes initial API call on component mount', () => {
    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ results: [] }),
    });
    render(<App />);
    expect(fetch).toHaveBeenCalledWith('https://swapi.py4e.com/api/people');
  });
  it('handles search term from localStorage on initial load', () => {
    const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
    render(<App />);
    expect(getItemSpy).toHaveBeenCalledTimes(1);
  });
});
