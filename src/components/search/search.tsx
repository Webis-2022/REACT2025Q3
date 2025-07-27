import type { SearchProps } from './search.types';
import { useState, type JSX } from 'react';
import { useRestoreSearchQuery } from '../../hooks/useRestoreSearchQuery';

export function Search({ onSearch, setHasResults }: SearchProps): JSX.Element {
  const restoredValue = useRestoreSearchQuery();
  const [inputValue, setInputValue] = useState<string>(restoredValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    onSearch(inputValue);
    if (!inputValue) return;
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
