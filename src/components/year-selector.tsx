import { countriesResource } from "../api/countries-resource";

// export function CountriesSelector({
//   selectedCountry,
//   onSelect
// }: {
//   selectedCountry: string;
//   onSelect: (value: string) => void;
// }) {
//   const countries = countriesResource.read();

//   return (
//     <select
//       name="countries"
//       id="countries"
//       value={selectedCountry}
//       onChange={e => onSelect(e.target.value)}
//     >
//       <option value="">Choose Country</option>
//       {Object.keys(countries).map(country => (
//         <option value={country} key={country}>
//           {country}
//         </option>
//       ))}
//     </select>
//   );
// }

export function YearSelector({
  selectedYear,
  onSelect
}: {
  selectedYear: string;
  onSelect: (value: string) => void;
}) {
  const startYear = 1750;
  const lastYear = 2023;
  const yearsArray = Array.from({ length: lastYear - startYear + 1 }, (_, i) => startYear + i);

  return (
    <select
      name="years"
      id="years"
      value={selectedYear}
      onChange={e => onSelect(e.target.value)}
    >
      <option value="">Choose Year</option>
      {yearsArray.map(year => (
        <option value={year} key={year}>
          {year}
        </option>
      ))}
    </select>
  );
}