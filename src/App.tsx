import { Header } from './components/header/header';
import { Search } from './components/search/search';
import { useEffect, useRef, useState } from 'react';
// import { DialogWindow } from './components/dialog-window/dialog-window';
import { BuggyComponent } from './components/crash-button/crash-button';
import { ErrorBoundary } from './components/error-boundary/error-boundary';
import { Results } from './components/results/results';
import './App.css';
import type { DialogWindowHandle } from './components/dialog-window/dialog-window.types';
import type { Character } from './components/card-list/card-list.types';

export function App() {
  const [items, setItems] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [responseStatus, setResponseStatus] = useState<number | undefined>(
    undefined
  );

  const dialogRef = useRef<DialogWindowHandle>(null);

  const openDialog = () => {
    dialogRef.current?.open();
  };

  useEffect(() => {
    const savedInputValue = localStorage.getItem('inputValue');
    if (savedInputValue) {
      handleSearch(savedInputValue);
    } else {
      handleSearch('');
    }
  }, []);

  const handleSearch = async (searchTerm: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const url =
        searchTerm === ''
          ? `https://swapi.py4e.com/api/people`
          : `https://swapi.py4e.com/api/people/?search=${searchTerm}`;

      const response = await fetch(url);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const data = await response.json();
      if (
        (response.status === 404 && dialogRef.current) ||
        (response.status === 500 && dialogRef.current) ||
        (data.count === 0 && dialogRef.current)
      ) {
        openDialog();
        setItems([]);
        setIsLoading(false);
        setError(null);
        return;
      }
      setItems(data.results);
      setIsLoading(false);
      setHasResults(data.results.length > 0);
      setResponseStatus(response.status);
    } catch (error) {
      setError((error as Error).message);
      setIsLoading(false);
    }
  };

  const updateHasResults = (value: boolean) => {
    setHasResults(value);
  };

  return (
    <>
      <Header />
      <main>
        <Search onSearch={handleSearch} setHasResults={updateHasResults} />
        <Results
          items={items}
          isLoading={isLoading}
          hasResults={hasResults}
          error={error}
          dialogRef={dialogRef}
          responseStatus={responseStatus}
        />
        <ErrorBoundary>
          <BuggyComponent />
        </ErrorBoundary>
      </main>
    </>
  );
}
