import { countriesResource } from '../../api/countries-resource';
import { useMemo, useState } from 'react';
import './countries-table.css';
import countriesByRegion from '../../utils/countries-by-region';
import { Row } from '../../components/row';
import React from 'react';

export type RegionKey = keyof typeof countriesByRegion;

export function CountriesTableComponent({
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
  console.log(countries);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const countryEntries = useMemo(() => {
    return Object.entries(countries)
      .filter(([name]) => !selectedCountry || name === selectedCountry)
      .filter(([name]) => {
        if (!selectedRegion) return true;
        const countryArray = countriesByRegion[selectedRegion];
        return countryArray.includes(name);
      })
      .sort(([nameA], [nameB]) => {
        if (sortOrder === 'asc') {
          return nameA.localeCompare(nameB);
        }
        return nameB.localeCompare(nameA);
      });
  }, [countries, selectedCountry, selectedRegion, sortOrder]);

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
          <th>ISO Code</th>
          <th>
            CO<sub>2</sub>
          </th>
          <th>
            CO<sub>2</sub>Per Capita
          </th>
          {methaneColumn && <th>Methane</th>}
          {methanePerCapitaColumn && <th>Methane Per Capita</th>}
        </tr>
      </thead>
      <tbody>
        {countryEntries.map(([name, info]) => (
          <Row
            key={name}
            name={name}
            info={info}
            selectedYear={selectedYear}
            sortOrder={sortOrder}
            methaneColumn={methaneColumn}
            methanePerCapitaColumn={methanePerCapitaColumn}
          />
        ))}
      </tbody>
    </table>
  );
}

export const CountriesTable = React.memo(CountriesTableComponent);
