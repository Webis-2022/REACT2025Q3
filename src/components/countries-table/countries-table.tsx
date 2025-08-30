import { countriesResource } from '../../api/countries-resource';
import { useState } from 'react';
import './countries-table.css';
import countriesByRegion from '../../utils/countries-by-region';
import type { Country, YearData } from '../../api/countries-resource';

export type RegionKey = keyof typeof countriesByRegion;

export function CountriesTable({
  selectedYear,
  selectedCountry,
  selectedRegion,
  methaneColumn,
  methanePerCapitaColumn,
}: {
  selectedYear: string;
  selectedCountry: string;
  selectedRegion: RegionKey | undefined;
  methaneColumn: string;
  methanePerCapitaColumn: string;
}) {
  const countries = countriesResource.read();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const formatNumber = (num: number | undefined) => {
    return num !== undefined
      ? num.toLocaleString(undefined, { maximumFractionDigits: 2 })
      : 'NA';
  }

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
            console.log(name);

            const latestData = selectedYear
              ? (sortedData.find((r) => r.year === Number(selectedYear)) ??
                sortedData[sortedData.length - 1])
              : sortedData[sortedData.length - 1];

            if (selectedRegion) {
              const countryArray = countriesByRegion[selectedRegion];
              if (!countryArray.includes(name)) return null;
            }

            return (
              <tr key={name}>
                <td>{name}</td>
                <td>{latestData?.population?.toLocaleString() ?? 'N/A'}</td>
                <td>{formatNumber(latestData?.co2)}</td>
                <td>{formatNumber(latestData?.co2_per_capita)}</td>
                {methaneColumn && <td>{formatNumber(latestData?.methane)}</td>}
                {methanePerCapitaColumn && (
                  <td>{formatNumber(latestData?.methane_per_capita)}</td>
                )}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}
