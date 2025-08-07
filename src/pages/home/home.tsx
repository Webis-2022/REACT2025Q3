import { Search } from '../../components/search/search';
import { createContext, useEffect, useRef, useState } from 'react';
import { Results } from '../../components/results/results';
import type { DialogWindowHandle } from '../../components/dialog-window/dialog-window.types';
import type { Character } from '../../components/card-list/card-list.types';
import { Pagination } from '../../components/pagination/pagination';
import type { PaginationProps } from '../../components/pagination/pagination.types';
import { useSelector } from 'react-redux';
import { SelectedItemsPanel } from '../../components/selected-items-panel/selected-items-panel';
import type { RootState } from '../../store';
import { useLazyGetCharactersQuery } from '../../services/api';

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
  const [responseStatus, setResponseStatus] = useState<number | undefined>(
    undefined
  );
  const itemArrLength: number = useSelector(
    (state: RootState) => state.characters.selectedIds.length
  );
  const [trigger, { isLoading, error }] = useLazyGetCharactersQuery();
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
      const url =
        searchTerm === ''
          ? `https://swapi.py4e.com/api/people`
          : `https://swapi.py4e.com/api/people/?search=${searchTerm}`;

      const result = await trigger(url).unwrap();
      console.log(result);

      setFullData(result);
      setItems(result?.results);

      if (result.count === 0 && dialogRef.current) {
        openDialog();
        setResponseStatus(404);
      } else {
        setResponseStatus(200);
      }
    } catch (error: unknown) {
      if (
        typeof error === 'object' &&
        error !== null &&
        'status' in error &&
        typeof (error as { status: number }).status === 'number'
      ) {
        const status = (error as { status: number }).status;
        if ((status === 404 || status === 500) && dialogRef.current) {
          openDialog();
          setResponseStatus(status);
        }
      }
    }
  };

  return (
    <>
      <main>
        <Search onSearch={handleSearch} />
        <MyContext.Provider value={items}>
          <Results
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
        <MyContext.Provider value={items}>
          {itemArrLength > 0 && (
            <SelectedItemsPanel itemArrLength={itemArrLength} />
          )}
        </MyContext.Provider>
      </main>
    </>
  );
}
