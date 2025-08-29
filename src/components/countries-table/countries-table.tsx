import { countriesResource } from '../../api/countries-resource';
import { useState } from 'react';
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
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);

  return (
    <table>
      <thead>
        <tr>
          <th className="table-head">
            Country
            <div className="sort-order">
              <span className="asc-order" onClick={() => setSortOrder('asc')}>
                ▲
              </span>
              <span className="desc-order" onClick={() => setSortOrder('desc')}>
                ▼
              </span>
            </div>
          </th>
          <th>Population</th>
          <th>
            CO<sub>2</sub>
          </th>
          <th>
            CO<sub>2</sub>_per_capita
          </th>
          {methaneColumn && <th>Methane</th>}
          {methanePerCapitaColumn && <th>Methane Per Capita</th>}
        </tr>
      </thead>
      <tbody>
        {Object.entries(countries)
          .filter(([name]) => !selectedCountry || name === selectedCountry)
          .sort(([nameA], [nameB]) => {
            if (sortOrder === 'asc') {
              return nameA.localeCompare(nameB);
            }
            return nameB.localeCompare(nameA);
          })
          .map(([name, info]) => {
            const sortedData =
              sortOrder === 'asc'
                ? [...info.data].sort((a, b) => a.year - b.year)
                : [...info.data].sort((a, b) => b.year - a.year);

            const row =
              sortedData.find((r) => r.year === Number(selectedYear)) ??
              sortedData[info.data.length - 1];

            return (
              <tr key={name}>
                <td>{name}</td>
                <td>{row.population ?? 'N/A'}</td>
                <td>{row.co2 ?? 'N/A'}</td>
                <td>{row.co2_per_capita ?? 'N/A'}</td>
                {methaneColumn && <td>{row.methane ?? 'N/A'}</td>}
                {methanePerCapitaColumn && (
                  <td>{row.methane_per_capita ?? 'N/A'}</td>
                )}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}
