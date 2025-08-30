import type { RegionKey } from "./countries-table/countries-table";

export function RegionSelector({
  selectedRegion,
  onSelect,
}: {
  selectedRegion: RegionKey | undefined;
  onSelect: (value: RegionKey | undefined) => void;
}) {

  const regions = ['europe', 'asia', 'africa', 'northAmerica', 'southAmerica', 'oceania', 'antarctica']
  return (
    <select
      name="regions"
      id="regions"
      value={selectedRegion}
      onChange={(e) => onSelect(e.target.value as RegionKey)}
    >
      <option value="">Choose Region</option>
      {regions.map((region) => (
        <option value={region} key={region}>
          {region}
        </option>
      ))}
    </select>
  );
}