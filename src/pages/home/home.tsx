import { Search } from '../../components/search/search';
import { createContext, useEffect, useRef, useState } from 'react';
import { BuggyComponent } from '../../components/crash-button/crash-button';
import { ErrorBoundary } from '../../components/error-boundary/error-boundary';
import { Results } from '../../components/results/results';
import type { DialogWindowHandle } from '../../components/dialog-window/dialog-window.types';
import type { Character } from '../../components/card-list/card-list.types';
import { Pagination } from '../../components/pagination/pagination';
import { makeApiQuery } from '../../api/api';
import type { PaginationProps } from '../../components/pagination/pagination.types';
import { useSelector } from 'react-redux';
import { SelectedItemsPanel } from '../../components/selected-items-panel/selected-items-panel';
import type { RootState } from '../../store';

export const MyContext = createContext<Character[] | null>(null);

export function Home() {
  const [fullData, setFullData] = useState<PaginationProps | null>(null);
  const [items, setItems] = useState<Character[]>([]);
  const [next, setNext] = useState<string | null>(
    fullData ? fullData.next : null
  );
  const [previous, setPrevious] = useState<string | null>(
    fullData ? fullData.previous : null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [responseStatus, setResponseStatus] = useState<number | undefined>(
    undefined
  );
  const itemArrLength: number = useSelector(
    (state: RootState) => state.characters.selectedIds.length
  );

  useEffect(() => {
    if (fullData) {
      setNext(fullData.next);
      setPrevious(fullData.previous);
    }
  }, [fullData]);

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

      const [data, response] = await makeApiQuery<PaginationProps>(url);
      setFullData(data);
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
      setResponseStatus(response.status);
    } catch (error) {
      setError((error as Error).message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <main>
        <Search onSearch={handleSearch} />
        <MyContext.Provider value={items}>
          <Results
            // items={items}
            isLoading={isLoading}
            error={error}
            dialogRef={dialogRef}
            responseStatus={responseStatus}
          />
        </MyContext.Provider>
        {fullData && fullData.count > 10 ? (
          <Pagination
            count={fullData.count}
            next={next}
            previous={previous}
            results={fullData.results}
            setItems={setItems}
            setNext={setNext}
            setPrevious={setPrevious}
          />
        ) : null}
        <ErrorBoundary>
          <BuggyComponent />
        </ErrorBoundary>
        <MyContext.Provider value={items}>
          {itemArrLength > 0 && (
            <SelectedItemsPanel itemArrLength={itemArrLength} />
          )}
        </MyContext.Provider>
      </main>
    </>
  );
}
