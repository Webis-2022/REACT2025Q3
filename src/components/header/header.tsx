import { CountriesSelector } from "../countries-selector";
import './header.css';

export function Header({
  selectedCountry,
  onSelect,
  onOpen
}: {
  selectedCountry: string;
  onSelect: (value: string) => void;
  onOpen: () => void;
}) {
  return (
    <header>
      <CountriesSelector
        selectedCountry={selectedCountry}
        onSelect={onSelect}
      />
      <button className="add-columns" onClick={onOpen}>Add Columns</button>
    </header>
  )
}