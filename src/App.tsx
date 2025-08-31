import { useState, Suspense, useMemo, useCallback } from 'react';
import './App.css';
import { CountriesTable } from './components/countries-table/countries-table';
import { Header } from './components/header/header';
import { Loader } from './components/loader/loader';
import { ModalWidget } from './components/modal-widget/modal-widget';
import type { RegionKey } from './components/countries-table/countries-table';

export default function App() {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<RegionKey>();
  const [selectedCountry, setSelectedCountry] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [methaneColumn, setMethaneColumn] = useState('');
  const [methanePerCapitaColumn, setMethanePerCapitaColumn] = useState('');

  const modalWidgetCallbacks = useMemo(
    () => ({
      setMethaneColumn,
      setMethanePerCapitaColumn,
    }),
    [setMethaneColumn, setMethanePerCapitaColumn]
  );

  const headerCallbacks = useMemo(
    () => ({
      setSelectedYear,
      setSelectedCountry,
      setSelectedRegion,
    }),
    [setSelectedYear, setSelectedCountry, setSelectedRegion]
  );

  const onOpen = useCallback(() => setIsOpen(true), []);
  const onClose = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Header
          selectedYear={selectedYear}
          selectedRegion={selectedRegion}
          callbacks={headerCallbacks}
          onOpen={onOpen}
        />
        {isOpen && (
          <ModalWidget onClose={onClose} callbacks={modalWidgetCallbacks} />
        )}
        <CountriesTable
          selectedYear={selectedYear}
          selectedCountry={selectedCountry}
          selectedRegion={selectedRegion}
          methaneColumn={methaneColumn}
          methanePerCapitaColumn={methanePerCapitaColumn}
        />
      </Suspense>
    </>
  );
}
