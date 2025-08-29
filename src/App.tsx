import { useState, Suspense } from 'react';
import './App.css';
import { CountriesTable } from './components/countries-table/countries-table';
import { Header } from './components/header/header';
import { Loader } from './components/loader/loader';
import { ModalWidget } from './components/modal-widget/modal-widget';

export default function App() {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [methaneColumn, setMethaneColumn] = useState('');
  const [methanePerCapitaColumn, setMethanePerCapitaColumn] = useState('');

  const callbacks = {
    setMethaneColumn,
    setMethanePerCapitaColumn,
  };

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Header
          selectedYear={selectedYear}
          onSelect={setSelectedYear}
          onChange={setSelectedCountry}
          onOpen={() => setIsOpen(true)}
        />
        {isOpen && (
          <ModalWidget onClose={() => setIsOpen(false)} callbacks={callbacks} />
        )}
        <CountriesTable
          selectedYear={selectedYear}
          selectedCountry={selectedCountry}
          methaneColumn={methaneColumn}
          methanePerCapitaColumn={methanePerCapitaColumn}
        />
      </Suspense>
    </>
  );
}
