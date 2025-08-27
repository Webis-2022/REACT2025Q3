import { useState } from "react";
import { countriesResource } from "../../api/countries-resource";
import './countries-table.css';

export function CountriesTable({
  selectedCountry,
  methaneColumn,
  methanePerCapitaColumn,
}: {
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
          .map(([name, info]) => (
            <tr key={name}>
              <td>{name}</td>
              <td>{info.data[info.data.length - 1]?.population ?? 'N/A'}</td>
              <td>{info.data[info.data.length - 1]?.co2 ?? 'N/A'}</td>
              <td>{info.data[info.data.length - 1]?.co2_per_capita ?? 'N/A'}</td>
              {methaneColumn && <td>{info.data[info.data.length - 1]?.methane ?? 'N/A'}</td>}
              {methanePerCapitaColumn && <td>{info.data[info.data.length - 1]?.methane_per_capita ?? 'N/A'}</td>}
            </tr>
          ))}
      </tbody>
    </table>
  );
}