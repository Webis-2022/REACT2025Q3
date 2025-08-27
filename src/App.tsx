import { useEffect, useState } from 'react'
import './App.css'

type YearData = {
  year: number;
  population?: number;
  co2?: number;
  co2_per_capita?: number;
};

type Country = {
  iso_code: string;
  data: YearData[];
};

function App() {
  const [countries, setCountries] = useState<Record<string, Country>>({})
  const [selectedCountry, setSelectedCountry] = useState('');

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json');
      const data = await response.json();
      setCountries(data);
      console.log(data);
    }
    getData();
  }, [])


  return (
    <>
      <select name="countries" id="countries" onChange={(e) => setSelectedCountry(e.target.value)}>
        <option value="">Choose Country</option>
        {Object.keys(countries).map((country) => {
          return (
            <option value={country} key={country}>{country}</option>
          )
        })}
      </select>

      <table>
        <thead>
          <tr>
            <th>
              Country
            </th>
            <th>
              Population
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(countries)
            .filter(([name]) => !selectedCountry || name === selectedCountry)
            .map(([name, info]) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{info.data[info.data.length - 1].population}</td>
              </tr>
            ))}
        </tbody>
      </table >
    </>
  )
}

export default App
