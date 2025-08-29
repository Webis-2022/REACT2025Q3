import { YearSelector } from '../year-selector';
import './header.css';

export function Header({
  selectedYear,
  onSelect,
  // selectedCountry,
  onChange,
  onOpen,
}: {
  selectedYear: string;
  onSelect: (value: string) => void;
  // selectedCountry: string,
  onChange: (value: string) => void;
  onOpen: () => void;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return (
    <header>
      <YearSelector selectedYear={selectedYear} onSelect={onSelect} />
      <input type="text" className="country" onChange={handleChange} />
      <button className="add-columns" onClick={onOpen}>
        Add Columns
      </button>
    </header>
  );
}
