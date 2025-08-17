'use client';

import { Search } from '../../components/search/search';
import { useEffect, useRef, useState } from 'react';
import { Results } from '../../components/results/results';
import type { DialogWindowHandle } from '../../components/dialog-window/dialog-window.types';
import type { Character } from '../../components/card-list/card-list.types';
import { Pagination } from '../../components/pagination/pagination';
import type { PaginationProps } from '../../components/pagination/pagination.types';
import { useSelector } from 'react-redux';
import { SelectedItemsPanel } from '../../components/selected-items-panel/selected-items-panel';
import type { RootState } from '../../store';
import { useLazyGetCharactersQuery } from '../../services/api';
import { useTranslations } from 'next-intl';
import { MyContext } from '../../utils/CharacterContext';

export default function Home() {
  const [page, setPage] = useState(1);
  const [fullData, setFullData] = useState<PaginationProps | null>(null);
  const [items, setItems] = useState<Character[]>([]);
  const [responseStatus, setResponseStatus] = useState<number | undefined>(
    undefined
  );
  const [search, setSearch] = useState('');
  const itemArrLength: number = useSelector(
    (state: RootState) => state.characters.selectedIds.length
  );
  const [trigger, { isLoading }] = useLazyGetCharactersQuery();

  const dialogRef = useRef<DialogWindowHandle>(null);
  const t = useTranslations('Main');

  const openDialog = () => {
    dialogRef.current?.open();
  };

  useEffect(() => {
    const savedInputValue = localStorage.getItem('inputValue') || '';
    setSearch(savedInputValue);
    if (savedInputValue) {
      handleSearch(savedInputValue);
    } else {
      handleSearch('');
    }
  }, []);

  const handleSearch = async (searchTerm: string) => {
    try {
      const result = await trigger({ search: searchTerm }).unwrap();

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
        <button
          className="refresh-cache-btn"
          onClick={() =>
            trigger({ search: '', page: page, cacheBuster: Date.now() })
          }
          disabled={isLoading}
        >
          {t('button')}
        </button>
        <Results
          search={search}
          page={page}
          dialogRef={dialogRef}
          responseStatus={responseStatus}
        />
        {fullData && fullData.count > 10 ? (
          <Pagination
            currentPage={page}
            onPageChange={setPage}
            count={fullData.count}
            results={items}
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
