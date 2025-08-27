import { countriesResource } from "../../api/countries-resource";
import './countries-table.css';

export function CountriesTable({
  selectedCountry
}: {
  selectedCountry: string;
}) {
  const countries = countriesResource.read();

  return (
    <table>
      <thead>
        <tr>
          <th>Country</th>
          <th>Population</th>
          <th>CO<sub>2</sub></th>
          <th>CO<sub>2</sub>_per_capita</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(countries)
          .filter(([name]) => !selectedCountry || name === selectedCountry)
          .map(([name, info]) => (
            <tr key={name}>
              <td>{name}</td>
              <td>{info.data[info.data.length - 1]?.population ?? 'N/A'}</td>
              <td>{info.data[info.data.length - 1]?.co2 ?? 'N/A'}</td>
              <td>{info.data[info.data.length - 1]?.co2_per_capita ?? 'N/A'}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}