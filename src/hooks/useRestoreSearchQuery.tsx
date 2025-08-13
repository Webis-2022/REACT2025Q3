import { useState } from 'react';

export function useRestoreSearchQuery(): string {
  const [value] = useState(() => {
    return localStorage.getItem('inputValue') || '';
  });
  return value;
}
