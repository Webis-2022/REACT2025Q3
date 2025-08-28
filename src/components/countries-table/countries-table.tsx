import { countriesResource } from "../../api/countries-resource";
import './countries-table.css';

export function CountriesTable({
  selectedYear,
  selectedCountry,
  methaneColumn,
  methanePerCapitaColumn,
}: {
  selectedYear: string;
  selectedCountry: string;
  methaneColumn: string;
  methanePerCapitaColumn: string;
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
          {methaneColumn && <th>Methane</th>}
          {methanePerCapitaColumn && <th>Methane Per Capita</th>}
        </tr>
      </thead>
      <tbody>
        {Object.entries(countries)
          .filter(([name]) => !selectedCountry || name === selectedCountry)
          .map(([name, info]) => {
            const row =
              info.data.find(r => r.year === Number(selectedYear)) ??
              info.data[info.data.length - 1];

            return (
              <tr key={name}>
                <td>{name}</td>
                <td>{row.population ?? 'N/A'}</td>
                <td>{row.co2 ?? 'N/A'}</td>
                <td>{row.co2_per_capita ?? 'N/A'}</td>
                {methaneColumn && <td>{row.methane ?? 'N/A'}</td>}
                {methanePerCapitaColumn && <td>{row.methane_per_capita ?? 'N/A'}</td>}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}