import { useState, Suspense } from 'react'
import './App.css'
import { CountriesTable } from './components/countries-table/countries-table';
import { CountriesSelector } from './components/countries-selector';
import { Loader } from './components/loader/loader';

export default function App() {
  const [selectedCountry, setSelectedCountry] = useState('');

  return (
    <>
      <Suspense fallback={<Loader />}>
        <CountriesSelector
          selectedCountry={selectedCountry}
          onSelect={setSelectedCountry}
        />
        <CountriesTable selectedCountry={selectedCountry} />
      </Suspense>
    </>
  );
}



