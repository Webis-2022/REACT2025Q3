import { countriesResource } from "../api/countries-resource";

export function CountriesSelector({
  selectedCountry,
  onSelect
}: {
  selectedCountry: string;
  onSelect: (value: string) => void;
}) {
  const countries = countriesResource.read();

  return (
    <select
      name="countries"
      id="countries"
      value={selectedCountry}
      onChange={e => onSelect(e.target.value)}
    >
      <option value="">Choose Country</option>
      {Object.keys(countries).map(country => (
        <option value={country} key={country}>
          {country}
        </option>
      ))}
    </select>
  );
}