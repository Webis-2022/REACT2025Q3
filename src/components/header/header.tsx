import type { RegionKey } from '../countries-table/countries-table';
import { RegionSelector } from '../region-selector';
import { YearSelector } from '../year-selector';
import './header.css';

type HeaderCallbacks = {
  setSelectedYear: (value: string) => void;
  setSelectedCountry: (value: string) => void;
  setSelectedRegion: (value: RegionKey | undefined) => void;
};

type HeaderProps = {
  selectedYear: string;
  selectedRegion: RegionKey | undefined;
  callbacks: HeaderCallbacks;
  onOpen: () => void;
};

export function Header({
  selectedYear,
  selectedRegion,
  callbacks,
  onOpen,
}: HeaderProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    callbacks.setSelectedCountry(e.target.value);
  };
  return (
    <header>
      <YearSelector
        selectedYear={selectedYear}
        onSelect={callbacks.setSelectedYear}
      />
      <RegionSelector
        selectedRegion={selectedRegion}
        onSelect={callbacks.setSelectedRegion}
      />
      <input
        type="text"
        className="country"
        placeholder="Please type a country"
        onChange={handleChange}
      />
      <button className="add-columns" onClick={onOpen}>
        Add Columns
      </button>
    </header>
  );
}
