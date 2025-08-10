import type { SearchProps } from './search.types';
import { useState, type JSX } from 'react';
import { useRestoreSearchQuery } from '../../hooks/useRestoreSearchQuery';
import { useDispatch } from 'react-redux';
import { clearSelection } from '../../store/characterSlice';

export function Search({ onSearch }: SearchProps): JSX.Element {
  const restoredValue = useRestoreSearchQuery();
  const [inputValue, setInputValue] = useState<string>(restoredValue);
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    onSearch(inputValue);
    localStorage.setItem('inputValue', inputValue.trim());
  };

  return (
    <div className="search">
      <input
        id="search-input"
        type="text"
        value={inputValue}
        onChange={handleChange}
      />
      <button
        className="search-btn"
        onClick={() => {
          handleSearch();
          dispatch(clearSelection());
        }}
      >
        Search
      </button>
    </div>
  );
}
