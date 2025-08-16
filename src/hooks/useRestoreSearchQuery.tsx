'use client';

import { useState, useEffect } from 'react';

export function useRestoreSearchQuery(): string {
  const [value, setValue] = useState('');
  useEffect(() => {
    const saved = localStorage.getItem('inputValue') || '';
    if (saved) setValue(saved);
  }, []);
  return value;
}
