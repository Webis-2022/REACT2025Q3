export function YearSelector({
  selectedYear,
  onSelect,
}: {
  selectedYear: string;
  onSelect: (value: string) => void;
}) {
  const startYear = 1750;
  const lastYear = 2023;
  const yearsArray = Array.from(
    { length: lastYear - startYear + 1 },
    (_, i) => startYear + i
  );

  return (
    <select
      name="years"
      id="years"
      value={selectedYear}
      onChange={(e) => onSelect(e.target.value)}
    >
      <option value="">Choose Year</option>
      {yearsArray.map((year) => (
        <option value={year} key={year}>
          {year}
        </option>
      ))}
    </select>
  );
}
