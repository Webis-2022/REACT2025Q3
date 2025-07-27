import type { SearchProps } from './search.types';
import { useState, useEffect, type JSX } from 'react';

export function Search({ onSearch, setHasResults }: SearchProps): JSX.Element {
  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    const savedInputValue = localStorage.getItem('inputValue');
    if (savedInputValue) {
      setInputValue(savedInputValue);
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    onSearch(inputValue);
    localStorage.setItem('inputValue', inputValue.trim());
    setHasResults(false);
  };
  return (
    <div className="search">
      <input
        id="search-input"
        type="text"
        value={inputValue}
        onChange={handleChange}
      />
      <button className="search-btn" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}
