import { Search } from './search';
import { screen, render, waitFor } from '@testing-library/react';
import { it, describe, expect, vi, beforeEach } from 'vitest';
import { userEvent } from '@testing-library/user-event';

describe('Search', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const setup = () => {
    const onSearch = vi.fn();
    render(<Search onSearch={onSearch} />);
    const input = screen.getByRole('textbox');
    const button = screen.getByText(/search/i);
    const user = userEvent.setup();

    return { input, button, user, onSearch };
  };
  it('search input exists', () => {
    setup();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
  it('search button exists', () => {
    setup();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });
  it('input value equals value saved to LS', () => {
    setup();
    const savedValue = localStorage.getItem('inputValue') || '';
    expect(screen.getByDisplayValue(savedValue)).toBeInTheDocument();
  });
  it('input has exact value which user typed ', async () => {
    const { input, user } = setup();
    const testName = 'Luke';
    await user.type(input, testName);
    expect(input).toHaveValue(testName);
  });
  it('value from input is saved to LS', async () => {
    const { input, button, user } = setup();
    const testName = 'Luke';
    await user.type(input, testName);
    await user.click(button);
    expect(localStorage.getItem('inputValue')).toBe(testName);
  });
  it('value from input is saved to LS', async () => {
    const { input, button, user } = setup();
    const testName = '    Luke';
    const testNameTrimmed = 'Luke';
    await user.type(input, testName);
    await user.click(button);
    expect(localStorage.getItem('inputValue')).toBe(testNameTrimmed);
  });
  it('triggers search callback with correct parameters', async () => {
    const { input, button, user, onSearch } = setup();
    const testName = 'Luke';
    await user.type(input, testName);
    await user.click(button);
    expect(onSearch).toBeCalledTimes(1);
    expect(onSearch).toBeCalledWith('Luke');
  });
  it('retrieves saved search term on component mount', async () => {
    const getItemSpy = vi
      .spyOn(Storage.prototype, 'getItem')
      .mockReturnValue('Luke');

    setup();
    expect(getItemSpy).toHaveBeenCalledWith('inputValue');
    getItemSpy.mockRestore();
  });
  it('overwrites existing localStorage value when new search is performed', async () => {
    localStorage.setItem('inputValue', 'Luke');
    const { input, button, user } = setup();
    await user.clear(input);
    await user.type(input, 'Leia');
    await user.click(button);
    await waitFor(() => {
      const savedValue = localStorage.getItem('inputValue');
      expect(savedValue).toBe('Leia');
    });
  });
});
